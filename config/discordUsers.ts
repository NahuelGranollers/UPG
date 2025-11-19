// Configuración manual de usuarios de Discord
// Puedes actualizar los nombres aquí sin necesidad de token

export interface DiscordUserConfig {
  id: string;
  username: string;
  avatarHash?: string | null; // Hash del avatar si lo conoces (opcional)
  status?: 'online' | 'idle' | 'dnd' | 'offline';
  color?: string;
}

// Configuración de usuarios de Discord
// Actualiza los nombres aquí según tus usuarios reales
export const DISCORD_USERS_CONFIG: DiscordUserConfig[] = [
  {
    id: '368377018372456459',
    username: 'Usuario1', // Cambia por el nombre real
    status: 'online',
  },
  {
    id: '751794590062739546',
    username: 'Usuario2', // Cambia por el nombre real
    status: 'idle',
  },
  {
    id: '303591426841772032',
    username: 'Usuario3', // Cambia por el nombre real
    status: 'dnd',
  },
  {
    id: '474207549550362625',
    username: 'Usuario4', // Cambia por el nombre real
    status: 'online',
  },
  {
    id: '488800120138104833',
    username: 'Usuario5', // Cambia por el nombre real
    status: 'online',
  },
  {
    id: '407615384838209558',
    username: 'Usuario6', // Cambia por el nombre real
    status: 'online',
  },
  {
    id: '491351079934623755', // apartado de moroso
    username: 'Usuario7', // Cambia por el nombre real
    status: 'offline',
  },
];

