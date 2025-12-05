import { instagramConfig } from './instagram-config';

/**
 * Construye la URL de autenticación OAuth de Instagram
 * Esta URL debe ser abierta por el usuario para autorizar la aplicación
 */
export function buildInstagramAuthUrl(): string {
  const { appId, redirectUri } = instagramConfig;
  
  if (!appId) {
    throw new Error('INSTAGRAM_APP_ID no está configurado');
  }
  
  if (!redirectUri) {
    throw new Error('INSTAGRAM_REDIRECT_URI no está configurado');
  }

  const scopes = [
    'user_profile',
    'user_media',
  ].join(',');

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    scope: scopes,
    response_type: 'code',
  });

  return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
}

/**
 * Intercambia el código de autorización por un short-lived token
 */
export async function exchangeCodeForShortToken(code: string): Promise<{
  access_token: string;
  user_id: number;
}> {
  const { appId, appSecret, redirectUri } = instagramConfig;

  if (!appId || !appSecret) {
    throw new Error('Credenciales de Instagram no configuradas');
  }

  const response = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: appId,
      client_secret: appSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code: code,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Error al intercambiar código por token:', errorData);
    throw new Error(
      `Error al obtener short-lived token: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}

/**
 * Intercambia un short-lived token por un long-lived token (60 días)
 */
export async function exchangeShortForLongToken(shortToken: string): Promise<{
  access_token: string;
  token_type: string;
  expires_in: number;
}> {
  const { appSecret } = instagramConfig;

  if (!appSecret) {
    throw new Error('INSTAGRAM_APP_SECRET no está configurado');
  }

  const url = new URL('https://graph.instagram.com/access_token');
  url.searchParams.append('grant_type', 'ig_exchange_token');
  url.searchParams.append('client_secret', appSecret);
  url.searchParams.append('access_token', shortToken);

  const response = await fetch(url.toString(), {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Error al intercambiar short token por long token:', errorData);
    throw new Error(
      `Error al obtener long-lived token: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}

