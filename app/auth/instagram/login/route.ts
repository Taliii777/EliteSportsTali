import { NextRequest, NextResponse } from 'next/server';
import { buildInstagramAuthUrl } from '@/lib/instagram-oauth';
import { validateInstagramConfig } from '@/lib/instagram-config';

/**
 * Ruta de login de Instagram OAuth
 * 
 * Esta ruta redirige automáticamente al usuario a la página de autorización de Instagram
 * 
 * GET /auth/instagram/login
 */
export async function GET(request: NextRequest) {
  try {
    // Validar configuración al inicio
    const configValidation = validateInstagramConfig();
    if (!configValidation.valid) {
      const missingList = configValidation.missing.join(', ');
      return new NextResponse(
        generateErrorHTML(
          'Configuración incompleta',
          `Faltan las siguientes variables de entorno: ${missingList}. Por favor, configura estas variables en tu archivo .env.local`
        ),
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Construir la URL de autenticación
    const authUrl = buildInstagramAuthUrl();

    // Redirigir automáticamente a la URL de autorización
    return NextResponse.redirect(authUrl);
  } catch (error: any) {
    console.error('❌ Error al construir URL de autenticación:', error);
    
    return new NextResponse(
      generateErrorHTML('Error al iniciar autorización', error.message || 'Error desconocido'),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
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


