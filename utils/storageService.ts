/**
 * Servicio centralizado para gestión de almacenamiento (Cookies y LocalStorage)
 * Elimina código duplicado y proporciona una API consistente
 */

import { User, UserRole } from '../types';

const COOKIE_EXPIRATION_DAYS = 30;
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'upg_access_token',
  CURRENT_USER: 'upg_current_user',
  USER_ID: 'upg_user_id',
  USERNAME: 'upg_username',
  AVATAR: 'upg_avatar',
  ROLE: 'upg_role'
} as const;

/**
 * Utilidad para parsear cookies en un objeto
 */
export function parseCookies(): Record<string, string> {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Utilidad para establecer una cookie con expiración
 */
export function setCookie(name: string, value: string, days: number = COOKIE_EXPIRATION_DAYS): void {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

/**
 * Utilidad para obtener el valor de una cookie
 */
export function getCookie(name: string): string | null {
  const cookies = parseCookies();
  return cookies[name] || null;
}

/**
 * Utilidad para eliminar una cookie
 */
export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=${new Date(0).toUTCString()}; path=/`;
}

/**
 * Eliminar todas las cookies relacionadas con UPG
 */
export function clearAllCookies(): void {
  document.cookie.split(";").forEach(c => {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}

/**
 * Guardar datos del usuario en cookies y localStorage
 */
export function saveUserData(user: User): void {
  // Guardar en cookies
  setCookie(STORAGE_KEYS.USER_ID, user.id);
  setCookie(STORAGE_KEYS.USERNAME, encodeURIComponent(user.username));
  setCookie(STORAGE_KEYS.AVATAR, encodeURIComponent(user.avatar));
  setCookie(STORAGE_KEYS.ROLE, user.role || UserRole.USER);

  // Guardar en localStorage como backup
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
}

/**
 * Cargar datos del usuario desde cookies o localStorage
 */
export function loadUserData(): User | null {
  // Intentar cargar desde cookies primero
  const cookies = parseCookies();
  
  if (cookies[STORAGE_KEYS.USERNAME] && cookies[STORAGE_KEYS.AVATAR]) {
    const username = decodeURIComponent(cookies[STORAGE_KEYS.USERNAME]);
    const role = (cookies[STORAGE_KEYS.ROLE] as UserRole) || UserRole.USER;
    const isAdmin = role === UserRole.ADMIN;
    
    return {
      id: cookies[STORAGE_KEYS.USER_ID] || `user-${Date.now()}`,
      username,
      avatar: decodeURIComponent(cookies[STORAGE_KEYS.AVATAR]),
      status: 'online',
      color: isAdmin ? '#ff4d0a' : '#3ba55c',
      role
    };
  }

  // Fallback a localStorage
  const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error('Error parseando datos de usuario:', error);
      return null;
    }
  }

  return null;
}

/**
 * Actualizar rol del usuario
 */
export function updateUserRole(role: UserRole): void {
  setCookie(STORAGE_KEYS.ROLE, role);
  
  // Actualizar en localStorage también
  const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (saved) {
    try {
      const user = JSON.parse(saved);
      user.role = role;
      user.color = role === UserRole.ADMIN ? '#ff4d0a' : '#3ba55c';
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error actualizando rol en localStorage:', error);
    }
  }
}

/**
 * Verificar si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) === 'granted';
}

/**
 * Establecer autenticación
 */
export function setAuthentication(authenticated: boolean): void {
  if (authenticated) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, 'granted');
  } else {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }
}

/**
 * Limpiar todos los datos del usuario (logout)
 */
export function clearUserData(): void {
  // Limpiar localStorage
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  
  // Limpiar todas las cookies
  clearAllCookies();
}

/**
 * Verificar si hay datos de usuario guardados
 */
export function hasUserData(): boolean {
  const cookies = parseCookies();
  return !!(cookies[STORAGE_KEYS.USERNAME] && cookies[STORAGE_KEYS.AVATAR]);
}
