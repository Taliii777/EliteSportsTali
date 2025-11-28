import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForShortToken, exchangeShortForLongToken } from '@/lib/instagram-oauth';
import { saveInstagramToken } from '@/lib/instagram-token';
import { validateInstagramConfig } from '@/lib/instagram-config';

/**
 * Ruta de callback de OAuth de Instagram
 * 
 * Meta envía el código de autorización como query parameter "code"
 * Esta ruta debe ser configurada en Meta Developers como Redirect URI
 * 
 * GET /auth/instagram/callback?code=CODIGO_DE_AUTORIZACION
 */
export async function GET(request: NextRequest) {
  try {
    // Validar configuración
    const configValidation = validateInstagramConfig();
    if (!configValidation.valid) {
      return NextResponse.json(
        {
          error: 'Configuración incompleta',
          missing: configValidation.missing,
          message: 'Por favor, configura las variables de entorno necesarias.',
        },
        { status: 500 }
      );
    }

    // Obtener el código de autorización
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    // Verificar si hay un error de autorización
    if (error) {
      console.error('❌ Error de autorización:', error, errorDescription);
      return NextResponse.json(
        {
          error: 'Error de autorización',
          description: errorDescription || error,
        },
        { status: 400 }
      );
    }

    // Verificar que el código esté presente
    if (!code) {
      return NextResponse.json(
        {
          error: 'Código de autorización no proporcionado',
          message: 'El parámetro "code" es requerido en la URL de callback.',
        },
        { status: 400 }
      );
    }

    console.log('🔄 Intercambiando código por short-lived token...');

    // Paso 1: Intercambiar código por short-lived token
    const shortTokenData = await exchangeCodeForShortToken(code);
    console.log('✅ Short-lived token obtenido');

    console.log('🔄 Intercambiando short token por long-lived token...');

    // Paso 2: Intercambiar short token por long-lived token (60 días)
    const longTokenData = await exchangeShortForLongToken(shortTokenData.access_token);
    console.log('✅ Long-lived token obtenido');

    // Paso 3: Guardar el token largo
    await saveInstagramToken({
      access_token: longTokenData.access_token,
      token_type: longTokenData.token_type,
      expires_in: longTokenData.expires_in,
    });

    // Retornar respuesta de éxito
    return NextResponse.json(
      {
        success: true,
        message: 'Autorización completada, token guardado.',
        expires_in: longTokenData.expires_in,
        expires_in_days: Math.floor(longTokenData.expires_in / 86400),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Error en callback de Instagram:', error);
    
    return NextResponse.json(
      {
        error: 'Error al procesar la autorización',
        message: error.message || 'Error desconocido',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * También soportamos POST por si Meta lo requiere
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const code = body.code || request.nextUrl.searchParams.get('code');
    
    if (!code) {
      return NextResponse.json(
        { error: 'Código de autorización no proporcionado' },
        { status: 400 }
      );
    }

    // Reutilizar la lógica de GET
    const url = new URL(request.url);
    url.searchParams.set('code', code);
    return GET(new NextRequest(url));
  } catch (error: any) {
    console.error('❌ Error en POST callback:', error);
    return NextResponse.json(
      { error: 'Error al procesar la autorización', message: error.message },
      { status: 500 }
    );
  }
}

