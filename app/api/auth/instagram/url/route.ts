import { NextResponse } from 'next/server';
import { buildInstagramAuthUrl } from '@/lib/instagram-oauth';
import { validateInstagramConfig } from '@/lib/instagram-config';

/**
 * Obtiene la URL de autenticación OAuth de Instagram
 * 
 * GET /api/auth/instagram/url
 * 
 * Retorna la URL que el usuario debe visitar para autorizar la aplicación
 */
export async function GET() {
  try {
    // Validar configuración
    const configValidation = validateInstagramConfig();
    if (!configValidation.valid) {
      return NextResponse.json(
        {
          error: 'Configuración incompleta',
          missing: configValidation.missing,
          message: 'Por favor, configura las variables de entorno necesarias en .env.local',
        },
        { status: 500 }
      );
    }

    // Construir la URL de autenticación
    const authUrl = buildInstagramAuthUrl();

    return NextResponse.json(
      {
        auth_url: authUrl,
        message: 'Visita esta URL para autorizar la aplicación de Instagram',
        instructions: [
          '1. Copia la URL de "auth_url"',
          '2. Ábrela en tu navegador',
          '3. Autoriza la aplicación',
          '4. Serás redirigido automáticamente y el token se guardará',
        ],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Error al construir URL de autenticación:', error);
    
    return NextResponse.json(
      {
        error: 'Error al construir URL de autenticación',
        message: error.message || 'Error desconocido',
      },
      { status: 500 }
    );
  }
}

