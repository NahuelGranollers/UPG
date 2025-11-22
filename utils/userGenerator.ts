import { User } from '../types';

// Generar un ID único para el dispositivo
const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('upg_device_id');

  if (!deviceId) {
    // Generar un ID único usando timestamp + random + user agent hash
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const userAgentHash = navigator.userAgent
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
      .toString(36);

    deviceId = `device-${timestamp}-${random}-${userAgentHash.substring(0, 8)}`;
    localStorage.setItem('upg_device_id', deviceId);
  }

  return deviceId;
};

// Nombres aleatorios para usuarios
const USERNAMES = [
  'GamerPro',
  'LunaSky',
  'NoobMaster',
  'ChillGuy',
  'TechWizard',
  'ShadowHunter',
  'DragonSlayer',
  'NightOwl',
  'CodeNinja',
  'PixelWarrior',
  'CyberGhost',
  'StarRunner',
  'FireStorm',
  'IceQueen',
  'ThunderBolt',
  'DarkKnight',
  'LightBringer',
  'SwiftArrow',
  'IronFist',
  'SilverFox',
  'BluePhoenix',
  'RedDragon',
  'GreenGiant',
  'PurpleHaze',
  'GoldenEagle',
];

// Colores para usuarios
const USER_COLORS = [
  '#3ba55c',
  '#5865F2',
  '#faa61a',
  '#ed4245',
  '#eb459e',
  '#57f287',
  '#fee75c',
  '#ff78a4',
  '#ff7b7b',
  '#ffcc17',
  '#ff4d0a',
  '#00d4ff',
  '#ff9300',
  '#ff006e',
  '#8338ec',
];

// Generar avatar único basado en el ID del usuario
const generateAvatar = (userId: string): string => {
  // Usar un servicio de avatares determinístico basado en el ID
  const seed = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
};

// Generar un usuario único por dispositivo
export const generateRandomUser = (): User => {
  const deviceId = getDeviceId();
  const savedUser = localStorage.getItem('upg_current_user');

  // Si ya existe un usuario guardado, usarlo
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      // Verificar que el usuario tenga un ID válido
      if (user.id && user.username) {
        return user;
      }
    } catch (e) {
      // Si hay error parseando, generar uno nuevo
    }
  }

  // Generar un ID único basado en el device ID
  const userId = `user-${deviceId}-${Date.now()}`;

  // Seleccionar nombre y color basados en el hash del device ID
  const hash = deviceId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const usernameIndex = hash % USERNAMES.length;
  const colorIndex = hash % USER_COLORS.length;

  const user: User = {
    id: userId,
    username: `${USERNAMES[usernameIndex]}${Math.floor(Math.random() * 1000)}`,
    avatar: generateAvatar(userId),
    status: 'online',
    color: USER_COLORS[colorIndex],
  };

  // Guardar en localStorage
  localStorage.setItem('upg_current_user', JSON.stringify(user));

  return user;
};

// Obtener o generar usuario
export const getOrCreateUser = (): User => {
  return generateRandomUser();
};
