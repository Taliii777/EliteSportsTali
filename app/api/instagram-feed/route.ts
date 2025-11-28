import { NextResponse } from 'next/server';
import { getInstagramToken } from '@/lib/instagram-token';

/**
 * Obtiene el feed de Instagram usando el token guardado
 * 
 * GET /api/instagram-feed
 * 
 * Retorna un JSON con los posts de Instagram
 */
export async function GET() {
  try {
    // Leer el token guardado
    const token = await getInstagramToken();

    if (!token) {
      return NextResponse.json(
        {
          error: 'Token no encontrado o expirado',
          message: 'Necesitas autorizar la aplicación primero. Visita /api/auth/instagram/url para obtener la URL de autorización.',
        },
        { status: 401 }
      );
    }

    console.log('📸 Obteniendo feed de Instagram...');

    // Solicitar el feed de Instagram
    const url = new URL('https://graph.instagram.com/me/media');
    url.searchParams.append('fields', 'id,caption,media_url,permalink,media_type,timestamp');
    url.searchParams.append('access_token', token.access_token);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Error al obtener feed:', errorData);
      
      // Si el token es inválido, podría ser que expiró
      if (response.status === 401) {
        return NextResponse.json(
          {
            error: 'Token inválido o expirado',
            message: 'El token ha expirado. Necesitas reautorizar la aplicación.',
          },
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          error: 'Error al obtener el feed de Instagram',
          status: response.status,
          details: errorData,
        },
        { status: response.status }
      );
    }

    const feedData = await response.json();
    console.log(`✅ Feed obtenido: ${feedData.data?.length || 0} posts`);

    // Retornar el feed
    return NextResponse.json(feedData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('❌ Error al obtener feed de Instagram:', error);
    
    return NextResponse.json(
      {
        error: 'Error al obtener el feed de Instagram',
        message: error.message || 'Error desconocido',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

