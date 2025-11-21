// Servicio para obtener información de usuarios de Discord
// Versión sin token: usa configuración manual + CDN de Discord para avatares

import { DISCORD_USERS_CONFIG, DiscordUserConfig } from '../config/discordUsers';

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  bot?: boolean;
}

// Cache para usuarios Discord (evitar múltiples requests)
const userCache = new Map<string, { user: DiscordUser; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

// IDs de usuarios de Discord (para compatibilidad)
export const DISCORD_USER_IDS = DISCORD_USERS_CONFIG.map(u => u.id);

// Obtener información de un usuario de Discord (con token, opcional)
export const getDiscordUser = async (userId: string): Promise<DiscordUser | null> => {
  // Verificar cache primero
  const cached = userCache.get(userId);
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    return cached.user;
  }
  
  const botToken = (import.meta as any).env?.VITE_DISCORD_BOT_TOKEN || (process as any).env?.VITE_DISCORD_BOT_TOKEN;
  
  // Si no hay token, usar configuración manual
  if (!botToken) {
    const config = DISCORD_USERS_CONFIG.find(u => u.id === userId);
    if (config) {
      const user = {
        id: config.id,
        username: config.username,
        discriminator: '0',
        avatar: config.avatarHash || null,
        bot: false,
      };
      // Guardar en cache
      userCache.set(userId, { user, timestamp: Date.now() });
      return user;
    }
    return null;
  }

  // Si hay token, intentar obtener de la API
  try {
    const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Si falla la API, usar configuración manual como fallback
      const config = DISCORD_USERS_CONFIG.find(u => u.id === userId);
      if (config) {
        return {
          id: config.id,
          username: config.username,
          discriminator: '0',
          avatar: config.avatarHash || null,
          bot: false,
        };
      }
      return null;
    }

    const data = await response.json();
    const user = {
      id: data.id,
      username: data.username,
      discriminator: data.discriminator || '0',
      avatar: data.avatar,
      bot: data.bot || false,
    };
    // Guardar en cache
    userCache.set(userId, { user, timestamp: Date.now() });
    return user;
  } catch (error) {
    // Si hay error, usar configuración manual
    const config = DISCORD_USERS_CONFIG.find(u => u.id === userId);
    if (config) {
      return {
        id: config.id,
        username: config.username,
        discriminator: '0',
        avatar: config.avatarHash || null,
        bot: false,
      };
    }
    return null;
  }
};

// Obtener avatar URL de Discord (sin token, usando CDN público)
export const getDiscordAvatarUrl = (userId: string, avatarHash: string | null, discriminator?: string): string => {
  if (avatarHash) {
    // Avatar personalizado (si tenemos el hash)
    const extension = avatarHash.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${extension}?size=256`;
  } else {
    // Avatar por defecto (basado en el ID del usuario para consistencia)
    // Discord usa el último dígito del ID para el avatar por defecto
    const defaultAvatar = parseInt(userId.slice(-1)) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatar}.png`;
  }
};

// Intentar obtener avatar desde el CDN (sin garantía, pero funciona si el usuario tiene avatar)
// Esto intenta diferentes formatos comunes
export const tryGetDiscordAvatar = async (userId: string, avatarHash?: string | null): Promise<string> => {
  if (avatarHash) {
    return getDiscordAvatarUrl(userId, avatarHash);
  }

  // Sin hash, intentar obtener el avatar más reciente (puede fallar)
  // Nota: Esto solo funciona si el usuario tiene un avatar y conocemos el hash
  // Como no tenemos el hash sin token, usamos avatar por defecto
  return getDiscordAvatarUrl(userId, null);
};

// Obtener todos los usuarios de Discord (sin token, usa configuración manual)
export const getDiscordUsers = async (): Promise<DiscordUser[]> => {
  const users: DiscordUser[] = [];
  
  // Usar configuración manual directamente (más rápido y no requiere token)
  for (const config of DISCORD_USERS_CONFIG) {
    users.push({
      id: config.id,
      username: config.username,
      discriminator: '0',
      avatar: config.avatarHash || null,
      bot: false,
    });
  }
  
  // Si hay token, intentar actualizar con información real (opcional)
  const botToken = (import.meta as any).env?.VITE_DISCORD_BOT_TOKEN || (process as any).env?.VITE_DISCORD_BOT_TOKEN;
  if (botToken) {
    try {
      const userPromises = DISCORD_USER_IDS.map(userId => getDiscordUser(userId));
      const results = await Promise.allSettled(userPromises);
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
          // Actualizar con información real si está disponible
          const existingIndex = users.findIndex(u => u.id === result.value!.id);
          if (existingIndex >= 0) {
            users[existingIndex] = result.value;
          }
        }
      });
    } catch (error) {
      console.warn('Error actualizando usuarios desde API, usando configuración manual:', error);
    }
  }
  
  return users;
};

// Convertir usuario de Discord a User de la app
export const discordUserToAppUser = (discordUser: DiscordUser, status?: 'online' | 'idle' | 'dnd' | 'offline'): import('../types').User => {
  const colors = ['#3ba55c', '#5865F2', '#faa61a', '#ed4245', '#eb459e', '#57f287', '#fee75c'];
  const colorIndex = parseInt(discordUser.id) % colors.length;
  
  // Buscar configuración para obtener status y color personalizado
  const config = DISCORD_USERS_CONFIG.find(u => u.id === discordUser.id);
  const finalStatus = status || config?.status || 'online';
  const finalColor = config?.color || colors[colorIndex];
  
  return {
    id: discordUser.id,
    username: discordUser.discriminator === '0' ? discordUser.username : `${discordUser.username}#${discordUser.discriminator}`,
    avatar: getDiscordAvatarUrl(discordUser.id, discordUser.avatar, discordUser.discriminator),
    status: finalStatus,
    color: finalColor,
    isBot: discordUser.bot || false,
  };
};

