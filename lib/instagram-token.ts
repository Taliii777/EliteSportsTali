import { promises as fs } from 'fs';
import path from 'path';

const TOKEN_FILE_PATH = path.join(process.cwd(), 'instagram_token.json');

export interface InstagramToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at?: number; // Timestamp de expiración
}

/**
 * Guarda el token de Instagram en un archivo JSON
 */
export async function saveInstagramToken(token: InstagramToken): Promise<void> {
  try {
    // Calcular timestamp de expiración (60 días desde ahora)
    const expiresAt = Date.now() + (token.expires_in * 1000);
    const tokenWithExpiry = {
      ...token,
      expires_at: expiresAt,
    };

    await fs.writeFile(
      TOKEN_FILE_PATH,
      JSON.stringify(tokenWithExpiry, null, 2),
      'utf-8'
    );
    
    console.log('✅ Token de Instagram guardado exitosamente');
  } catch (error) {
    console.error('❌ Error al guardar el token:', error);
    throw new Error('No se pudo guardar el token de Instagram');
  }
}

/**
 * Lee el token de Instagram desde el archivo JSON
 */
export async function getInstagramToken(): Promise<InstagramToken | null> {
  try {
    const fileContent = await fs.readFile(TOKEN_FILE_PATH, 'utf-8');
    const token: InstagramToken = JSON.parse(fileContent);
    
    // Verificar si el token ha expirado
    if (token.expires_at && token.expires_at < Date.now()) {
      console.warn('⚠️ El token de Instagram ha expirado');
      return null;
    }
    
    return token;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log('ℹ️ No se encontró archivo de token. Necesitas autorizar la aplicación primero.');
      return null;
    }
    console.error('❌ Error al leer el token:', error);
    throw new Error('No se pudo leer el token de Instagram');
  }
}

/**
 * Verifica si existe un token válido
 */
export async function hasValidToken(): Promise<boolean> {
  const token = await getInstagramToken();
  return token !== null;
}

