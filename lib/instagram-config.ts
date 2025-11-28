/**
 * Configuración de Instagram OAuth
 * 
 * IMPORTANTE: Crea un archivo .env.local en la raíz del proyecto con:
 * META_APP_ID=tu_app_id
 * META_APP_SECRET=tu_app_secret
 * META_REDIRECT_URI=http://localhost:3000/auth/instagram/callback
 */

export const instagramConfig = {
  appId: process.env.META_APP_ID || '',
  appSecret: process.env.META_APP_SECRET || '',
  redirectUri: process.env.META_REDIRECT_URI || 'http://localhost:3000/auth/instagram/callback',
};

/**
 * Valida que todas las credenciales estén configuradas
 */
export function validateInstagramConfig(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  if (!instagramConfig.appId) missing.push('META_APP_ID');
  if (!instagramConfig.appSecret) missing.push('META_APP_SECRET');
  if (!instagramConfig.redirectUri) missing.push('META_REDIRECT_URI');
  
  return {
    valid: missing.length === 0,
    missing,
  };
}

