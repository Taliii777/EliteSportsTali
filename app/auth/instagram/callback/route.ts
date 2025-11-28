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
      return new NextResponse(
        generateErrorHTML('Configuración incompleta', 'Por favor, configura las variables de entorno necesarias.'),
        { status: 500, headers: { 'Content-Type': 'text/html' } }
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
      return new NextResponse(
        generateErrorHTML('Error de autorización', errorDescription || error),
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Verificar que el código esté presente
    if (!code) {
      return new NextResponse(
        generateErrorHTML('Código no proporcionado', 'El parámetro "code" es requerido en la URL de callback.'),
        { status: 400, headers: { 'Content-Type': 'text/html' } }
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

    // Retornar página de éxito
    const expiresInDays = Math.floor(longTokenData.expires_in / 86400);
    return new NextResponse(
      generateSuccessHTML(expiresInDays),
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error: any) {
    console.error('❌ Error en callback de Instagram:', error);
    
    return new NextResponse(
      generateErrorHTML('Error al procesar la autorización', error.message || 'Error desconocido'),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
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
      return new NextResponse(
        generateErrorHTML('Código no proporcionado', 'El código de autorización es requerido.'),
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Reutilizar la lógica de GET
    const url = new URL(request.url);
    url.searchParams.set('code', code);
    return GET(new NextRequest(url));
  } catch (error: any) {
    console.error('❌ Error en POST callback:', error);
    return new NextResponse(
      generateErrorHTML('Error al procesar la autorización', error.message),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}

/**
 * Genera HTML de éxito
 */
function generateSuccessHTML(expiresInDays: number): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Autorización Completada - Instagram OAuth</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      text-align: center;
    }
    .success-icon {
      width: 80px;
      height: 80px;
      background: #10b981;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
    }
    .success-icon::after {
      content: '✓';
      color: white;
      font-size: 48px;
      font-weight: bold;
    }
    h1 {
      color: #1f2937;
      font-size: 28px;
      margin-bottom: 16px;
    }
    p {
      color: #6b7280;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 8px;
    }
    .info {
      background: #f3f4f6;
      border-radius: 8px;
      padding: 16px;
      margin-top: 24px;
    }
    .info strong {
      color: #1f2937;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="success-icon"></div>
    <h1>¡Autorización Completada!</h1>
    <p>El token de Instagram se ha guardado exitosamente.</p>
    <div class="info">
      <p><strong>Token válido por:</strong> ${expiresInDays} días</p>
      <p style="margin-top: 8px; font-size: 14px;">Puedes cerrar esta ventana.</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Genera HTML de error
 */
function generateErrorHTML(title: string, message: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error - Instagram OAuth</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      text-align: center;
    }
    .error-icon {
      width: 80px;
      height: 80px;
      background: #ef4444;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
    }
    .error-icon::after {
      content: '✕';
      color: white;
      font-size: 48px;
      font-weight: bold;
    }
    h1 {
      color: #1f2937;
      font-size: 28px;
      margin-bottom: 16px;
    }
    p {
      color: #6b7280;
      font-size: 16px;
      line-height: 1.6;
    }
    .error-message {
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      border-radius: 4px;
      padding: 16px;
      margin-top: 24px;
      text-align: left;
    }
    .error-message strong {
      color: #dc2626;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="error-icon"></div>
    <h1>${escapeHtml(title)}</h1>
    <div class="error-message">
      <p><strong>Error:</strong> ${escapeHtml(message)}</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

