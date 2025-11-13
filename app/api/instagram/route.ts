import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
  try {
    // La URL del feed RSS de RSS.app
    // El usuario debe proporcionar esta URL
    const RSS_FEED_URL = process.env.INSTAGRAM_RSS_FEED_URL;

    if (!RSS_FEED_URL) {
      return NextResponse.json(
        { error: 'Instagram RSS feed URL no configurada' },
        { status: 500 },
      );
    }

    // Parsear el feed RSS
    const feed = await parser.parseURL(RSS_FEED_URL);

    // Extraer las últimas 5 imágenes del feed
    const items = feed.items
      .slice(0, 10)
      .map((item) => {
        // Extraer la imagen del contenido HTML o del enclosure
        let imageUrl = '';

        // Intentar obtener la imagen del enclosure (método común en feeds RSS)
        if (item.enclosure?.url) {
          imageUrl = item.enclosure.url;
        }
        // Si no hay enclosure, buscar en el contenido HTML
        else if (item.content) {
          // Buscar diferentes formatos de imágenes en HTML
          const imgMatch = item.content.match(/<img[^>]+src=["']([^"']+)["']/i);
          if (imgMatch) {
            imageUrl = imgMatch[1];
          } else {
            // Buscar URLs de imágenes directamente en el contenido
            const urlMatch = item.content.match(
              /https?:\/\/[^\s"']+\.(jpg|jpeg|png|webp|gif)/i,
            );
            if (urlMatch) {
              imageUrl = urlMatch[0];
            }
          }
        }
        // Si no hay contenido, buscar en contentSnippet o description
        else if (item.contentSnippet) {
          const imgMatch = item.contentSnippet.match(
            /https?:\/\/[^\s]+\.(jpg|jpeg|png|webp|gif)/i,
          );
          if (imgMatch) {
            imageUrl = imgMatch[0];
          }
        }
        // También buscar en itunes:image o media:content (formato común en feeds de redes sociales)
        else if ((item as any)['itunes:image']?.href) {
          imageUrl = (item as any)['itunes:image'].href;
        } else if ((item as any)['media:content']?.url) {
          imageUrl = (item as any)['media:content'].url;
        }

        return {
          name: item.title || 'Instagram Post',
          image: imageUrl || item.link || '',
          link: item.link || '',
        };
      })
      .filter((item) => item.image); // Filtrar items sin imagen

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener el feed de Instagram:', error);
    return NextResponse.json(
      { error: 'Error al obtener el feed de Instagram', items: [] },
      { status: 500 },
    );
  }
}
