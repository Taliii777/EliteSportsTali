/**
 * Configuración de Instagram OAuth
 * 
 * IMPORTANTE: Crea un archivo .env.local en la raíz del proyecto con:
 * INSTAGRAM_APP_ID=tu_app_id
 * INSTAGRAM_APP_SECRET=tu_app_secret
 * INSTAGRAM_REDIRECT_URI=http://localhost:3000/auth/instagram/callback
 */

export const instagramConfig = {
  appId: process.env.INSTAGRAM_APP_ID || '',
  appSecret: process.env.INSTAGRAM_APP_SECRET || '',
  redirectUri: process.env.INSTAGRAM_REDIRECT_URI || 'http://localhost:3000/auth/instagram/callback',
};

/**
 * Valida que todas las credenciales estén configuradas
 */
export function validateInstagramConfig(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  if (!instagramConfig.appId) missing.push('INSTAGRAM_APP_ID');
  if (!instagramConfig.appSecret) missing.push('INSTAGRAM_APP_SECRET');
  if (!instagramConfig.redirectUri) missing.push('INSTAGRAM_REDIRECT_URI');
  
  return {
    valid: missing.length === 0,
    missing,
  };
}

