import { NextResponse } from 'next/server';

/**
 * Endpoint proxy para obtener el feed público de Instagram
 * 
 * Usa múltiples métodos para obtener el feed:
 * 1. API pública de Instagram (si está disponible)
 * 2. Scraping mejorado del HTML
 * 3. Servicio de terceros como fallback
 * 
 * GET /api/instagram
 */
export async function GET() {
  try {
    const username = 'edelitesportsmanagement_';
    
    // Intentar método 1: Usar API pública de Instagram GraphQL (sin autenticación)
    try {
      const graphqlPosts = await tryGraphQLMethod(username);
      if (graphqlPosts && graphqlPosts.length > 0) {
        return NextResponse.json(
          {
            success: true,
            posts: graphqlPosts.slice(0, 12),
          },
          {
            status: 200,
            headers: {
              'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
            },
          }
        );
      }
    } catch (e) {
      console.log('[Instagram API] GraphQL method failed, trying HTML scraping...');
    }

    // Método 2: Scraping mejorado del HTML
    const instagramUrl = `https://www.instagram.com/${username}/`;
    console.log(`[Instagram API] Fetching profile: ${username}`);

    // Hacer fetch al perfil público con user-agent real
    const response = await fetch(instagramUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
        'Referer': 'https://www.instagram.com/',
      },
      // Cache de 30 minutos (1800 segundos)
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      console.error(`[Instagram API] HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    console.log(`[Instagram API] HTML received, length: ${html.length}`);

    // Buscar el script que contiene los datos JSON embebidos
    // Instagram puede usar diferentes formatos, intentamos varios
    let posts: any[] = [];

    // Método 1: Buscar window._sharedData (método más común)
    const sharedDataMatch = html.match(/window\._sharedData\s*=\s*({[\s\S]+?});/);
    if (sharedDataMatch) {
      try {
        console.log('[Instagram API] Trying method 1: _sharedData');
        const sharedData = JSON.parse(sharedDataMatch[1]);
        const userData = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user;
        if (userData?.edge_owner_to_timeline_media?.edges) {
          posts = extractPostsFromEdges(userData.edge_owner_to_timeline_media.edges);
          console.log(`[Instagram API] Method 1 success! Found ${posts.length} posts`);
        }
      } catch (e) {
        console.log('[Instagram API] Error parsing _sharedData:', e);
      }
    }

    // Método 2: Buscar en el script type="application/json" con id específico
    if (posts.length === 0) {
      console.log('[Instagram API] Trying method 2: application/json scripts');
      // Buscar específicamente el script con datos del usuario
      const jsonScriptPattern = /<script type="application\/json"[^>]*data-sveltekit-preload-data[^>]*>([\s\S]*?)<\/script>/;
      const jsonScriptMatch = html.match(jsonScriptPattern);
      
      if (jsonScriptMatch) {
        try {
          const jsonData = JSON.parse(jsonScriptMatch[1]);
          let userData = null;
          
          if (jsonData?.seo?.og_user?.id) {
            userData = jsonData;
          } else if (jsonData?.require?.[0]?.[3]?.[2]?.user) {
            userData = jsonData.require[0][3][2].user;
          } else if (jsonData?.entry_data?.ProfilePage?.[0]?.graphql?.user) {
            userData = jsonData.entry_data.ProfilePage[0].graphql.user;
          } else if (jsonData?.graphql?.user) {
            userData = jsonData.graphql.user;
          }

          if (userData?.edge_owner_to_timeline_media?.edges) {
            posts = extractPostsFromEdges(userData.edge_owner_to_timeline_media.edges);
            console.log(`[Instagram API] Method 2 success! Found ${posts.length} posts`);
          }
        } catch (e) {
          console.log('[Instagram API] Error parsing JSON script:', e);
        }
      }
      
      // Si no funcionó, intentar con todos los scripts JSON
      if (posts.length === 0) {
        const jsonScriptMatches = html.matchAll(/<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/g);
        for (const match of jsonScriptMatches) {
          try {
            const jsonData = JSON.parse(match[1]);
            let userData = null;
            
            if (jsonData?.seo?.og_user?.id) {
              userData = jsonData;
            } else if (jsonData?.require?.[0]?.[3]?.[2]?.user) {
              userData = jsonData.require[0][3][2].user;
            } else if (jsonData?.entry_data?.ProfilePage?.[0]?.graphql?.user) {
              userData = jsonData.entry_data.ProfilePage[0].graphql.user;
            } else if (jsonData?.graphql?.user) {
              userData = jsonData.graphql.user;
            }

            if (userData?.edge_owner_to_timeline_media?.edges) {
              posts = extractPostsFromEdges(userData.edge_owner_to_timeline_media.edges);
              if (posts.length > 0) {
                console.log(`[Instagram API] Method 2 (all scripts) success! Found ${posts.length} posts`);
                break;
              }
            }
          } catch (e) {
            continue;
          }
        }
      }
    }

    // Método 3: Buscar datos en window.__additionalDataLoaded
    if (posts.length === 0) {
      const additionalDataMatch = html.match(/window\.__additionalDataLoaded[^;]*\([^,]+,\s*({[\s\S]+?})\);/);
      if (additionalDataMatch) {
        try {
          const additionalData = JSON.parse(additionalDataMatch[1]);
          const userData = additionalData?.graphql?.user;
          if (userData?.edge_owner_to_timeline_media?.edges) {
            posts = extractPostsFromEdges(userData.edge_owner_to_timeline_media.edges);
          }
        } catch (e) {
          console.log('Error parsing __additionalDataLoaded:', e);
        }
      }
    }

    // Método 4: Buscar en el HTML directamente usando regex para extraer datos
    if (posts.length === 0) {
      console.log('[Instagram API] Trying method 4: Extract shortcodes from HTML');
      // Intentar extraer shortcodes de los enlaces en el HTML
      const postLinks = html.match(/\/p\/([A-Za-z0-9_-]+)\//g);
      if (postLinks && postLinks.length > 0) {
        // Eliminar duplicados
        const uniqueShortcodes = [...new Set(postLinks.map(link => link.match(/\/p\/([A-Za-z0-9_-]+)\//)?.[1]).filter(Boolean))];
        
        // Si encontramos enlaces, crear posts básicos
        posts = uniqueShortcodes.slice(0, 12).map((shortcode) => {
          return {
            image: `https://www.instagram.com/p/${shortcode}/media/?size=l`,
            caption: '',
            permalink: `https://www.instagram.com/p/${shortcode}/`,
          };
        });
        console.log(`[Instagram API] Method 4 success! Found ${posts.length} posts from shortcodes`);
      }
    }
    
    // Método 5: Buscar datos en window.__additionalDataLoaded o similar
    if (posts.length === 0) {
      console.log('[Instagram API] Trying method 5: __additionalDataLoaded');
      const additionalDataPatterns = [
        /window\.__additionalDataLoaded[^;]*\([^,]+,\s*({[\s\S]+?})\);/,
        /window\.__additionalDataLoaded\('[\s\S]*?',\s*({[\s\S]+?})\);/,
      ];
      
      for (const pattern of additionalDataPatterns) {
        const additionalDataMatch = html.match(pattern);
        if (additionalDataMatch) {
          try {
            const additionalData = JSON.parse(additionalDataMatch[1]);
            const userData = additionalData?.graphql?.user;
            if (userData?.edge_owner_to_timeline_media?.edges) {
              posts = extractPostsFromEdges(userData.edge_owner_to_timeline_media.edges);
              console.log(`[Instagram API] Method 5 success! Found ${posts.length} posts`);
              break;
            }
          } catch (e) {
            console.log('[Instagram API] Error parsing __additionalDataLoaded:', e);
          }
        }
      }
    }

    if (posts.length === 0) {
      console.error('[Instagram API] All methods failed. HTML length:', html.length);
      // Guardar un snippet del HTML para debug (solo en desarrollo)
      if (process.env.NODE_ENV === 'development') {
        console.log('[Instagram API] HTML snippet:', html.substring(0, 1000));
      }
      
      return NextResponse.json(
        {
          success: false,
          error: 'No se pudieron extraer los posts del perfil de Instagram. Instagram puede haber cambiado su estructura.',
          posts: [],
        },
        { status: 200 } // Retornamos 200 pero con success: false
      );
    }
    
    console.log(`[Instagram API] Success! Returning ${posts.length} posts`);

    return NextResponse.json(
      {
        success: true,
        posts: posts.slice(0, 12), // Limitar a 12 posts
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error: any) {
    console.error('Error al obtener feed de Instagram:', error);
    
    // Último recurso: retornar posts hardcodeados o usar un servicio de terceros
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error desconocido al obtener el feed',
        posts: [],
        message: 'Instagram está bloqueando el acceso. Considera usar un servicio de terceros o el widget oficial de Instagram.',
      },
      { status: 500 }
    );
  }
}

/**
 * Método alternativo: Usar API pública gratuita (Instagram Profile API)
 * Este método usa un servicio de terceros que funciona de forma más confiable
 */
async function tryGraphQLMethod(username: string): Promise<any[]> {
  try {
    // Método 1: Intentar con una API pública gratuita
    // Nota: Este es un ejemplo, puedes usar cualquier API pública disponible
    const apiUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'X-IG-App-ID': '936619743392459',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': `https://www.instagram.com/${username}/`,
        'Origin': 'https://www.instagram.com',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const edges = data?.data?.user?.edge_owner_to_timeline_media?.edges || [];
      if (edges.length > 0) {
        console.log(`[Instagram API] GraphQL method success! Found ${edges.length} posts`);
        return extractPostsFromEdges(edges);
      }
    } else {
      console.log(`[Instagram API] GraphQL method failed with status: ${response.status}`);
    }
  } catch (e) {
    console.log('[Instagram API] GraphQL method error:', e);
  }
  
  return [];
}

/**
 * Extrae y formatea los posts desde los edges de Instagram
 */
function extractPostsFromEdges(edges: any[]): any[] {
  return edges.map((edge: any) => {
    const node = edge.node;
    
    // Obtener la imagen (puede ser thumbnail_src, display_url, o la primera imagen del carousel)
    let image = node.thumbnail_src || node.display_url;
    
    // Si es un carousel, usar la primera imagen
    if (node.edge_sidecar_to_children?.edges?.[0]?.node) {
      image = node.edge_sidecar_to_children.edges[0].node.display_url || 
              node.edge_sidecar_to_children.edges[0].node.thumbnail_src;
    }
    
    // Obtener el caption
    const caption = node.edge_media_to_caption?.edges?.[0]?.node?.text || '';
    
    // Obtener el permalink
    const shortcode = node.shortcode;
    const permalink = `https://www.instagram.com/p/${shortcode}/`;

    return {
      image,
      caption: caption.substring(0, 200), // Limitar caption a 200 caracteres
      permalink,
    };
  });
}

