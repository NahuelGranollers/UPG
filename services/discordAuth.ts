// Discord OAuth2 Authentication Service

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID || '';
const DISCORD_REDIRECT_URI = import.meta.env.VITE_DISCORD_REDIRECT_URI || window.location.origin + '/auth/callback';

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  global_name?: string;
}

/**
 * Obtiene la URL del avatar de Discord
 */
export function getDiscordAvatarUrl(userId: string, avatarHash: string | null, size: number = 128): string {
  if (!avatarHash) {
    // Avatar por defecto basado en el discriminador
    const defaultAvatarNum = parseInt(userId) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNum}.png`;
  }
  
  const extension = avatarHash.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${extension}?size=${size}`;
}

/**
 * Inicia el flujo de OAuth2 con Discord
 */
export function startDiscordAuth() {
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: 'token',
    scope: 'identify',
  });

  const authUrl = `https://discord.com/api/oauth2/authorize?${params.toString()}`;
  window.location.href = authUrl;
}

/**
 * Procesa el callback de OAuth2 (fragment URL)
 */
export function handleDiscordCallback(): string | null {
  const fragment = window.location.hash.substring(1);
  const params = new URLSearchParams(fragment);
  const accessToken = params.get('access_token');

  if (accessToken) {
    // Limpiar el hash de la URL
    window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
    return accessToken;
  }

  return null;
}

/**
 * Obtiene la información del usuario desde Discord API
 */
export async function getDiscordUser(accessToken: string): Promise<DiscordUser> {
  const response = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error obteniendo datos de Discord');
  }

  return await response.json();
}

/**
 * Guarda el token en localStorage
 */
export function saveDiscordToken(token: string) {
  localStorage.setItem('discord_token', token);
}

/**
 * Obtiene el token de localStorage
 */
export function getDiscordToken(): string | null {
  return localStorage.getItem('discord_token');
}

/**
 * Elimina el token de localStorage
 */
export function clearDiscordToken() {
  localStorage.removeItem('discord_token');
}

/**
 * Verifica si hay una sesión activa
 */
export function hasActiveSession(): boolean {
  return !!getDiscordToken();
}
