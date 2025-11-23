import React, { memo, useMemo } from 'react';
import { toast } from 'sonner';
import { User } from '../types';
import SafeImage from './SafeImage';

interface UserListProps {
  users: User[];
  currentUserId?: string;
  currentUser?: User | null;
  isMobileView?: boolean;
  userColors?: Record<string, string>;
}

const UserItem: React.FC<{ user: User; isCurrentUser?: boolean; userColors?: Record<string, string>; currentUser?: User | null }> = memo(
  ({ user, isCurrentUser, userColors = {}, currentUser }) => {
    // Determinar si el usuario est├í offline
    const isOffline = user.online === false || user.status === 'offline';

    const isAdmin = currentUser && currentUser.role === 'admin';

    return (
      <div
        onClick={async () => {
          if (isAdmin) {
            try {
              await navigator.clipboard.writeText(user.id);
              toast.success('ID copiada al portapapeles');
            } catch (e) {
              toast.error('No se pudo copiar el ID');
            }
          }
        }}
        title={isAdmin ? 'Click para copiar ID de usuario' : undefined}
        className={`flex items-center py-2 sm:py-1.5 px-2 hover:bg-discord-hover rounded cursor-pointer group opacity-90 hover:opacity-100 min-h-[48px] sm:min-h-0 ${
          isCurrentUser ? 'bg-discord-hover/50 border border-discord-blurple/30' : ''
        }`}
      >
        <div className="relative mr-3">
          <SafeImage
            src={user.avatar}
            alt={user.username}
            className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full object-cover ${isOffline ? 'grayscale opacity-60' : ''}`}
            fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=5865F2&color=fff&size=128`}
          />
          {!isOffline && (
            <div
              className={`absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-3 sm:h-3 border-[3px] sm:border-[2.5px] border-[#2b2d31] rounded-full ${
                user.status === 'online'
                  ? 'bg-green-500'
                  : user.status === 'idle'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
              }`}
            ></div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center">
            <span
              className={`font-medium text-sm sm:text-[13px] truncate ${isOffline ? 'text-discord-text-muted' : ''}`}
              style={{ color: !isOffline ? (userColors[user.id] || user.color) : undefined }}
            >
              {user.username}
            </span>
            {user.isBot && (
              <span className="ml-1.5 bg-[#5865F2] text-white text-[9px] sm:text-[10px] px-1 rounded-[3px] uppercase font-bold leading-tight py-[1px]">
                Bot
              </span>
            )}
          </div>
          <div className="text-xs sm:text-[11px] text-discord-text-muted truncate h-4 opacity-0 group-hover:opacity-100 transition-opacity">
            {user.status === 'dnd' ? 'No molestar' : user.status === 'idle' ? 'Ausente' : ''}
          </div>
        </div>
      </div>
    );
  }
);

UserItem.displayName = 'UserItem';

const UserList: React.FC<UserListProps> = memo(({ users, currentUserId, isMobileView = false, userColors = {} }) => {
  const usersWithBot = useMemo(() => {
    // Forzar inclusión del bot UPG si no está presente
    const botUser = {
      id: 'bot',
      username: 'UPG',
      avatar: '/upg.png',
      status: 'online',
      isBot: true,
      color: '#5865F2',
      role: 'bot',
      online: true,
    };
    // Si hay bot, fuerza isBot: true
    const usersFixed = users.map(u => (u.id === 'bot' ? { ...u, isBot: true } : u));
    const hasBot = usersFixed.some(u => u.id === 'bot');
    return hasBot ? usersFixed : [...usersFixed, botUser];
  }, [users]);

  // Filtrar usuarios por estado de conexión (incluir usuario actual)
  const onlineUsers = usersWithBot.filter(u => {
    // El bot nunca debe aparecer en Disponible
    if (u.isBot) return false;
    return u.online === true || (u.online === undefined && u.status === 'online');
  });

  const bots = usersWithBot.filter(u => u.isBot);

  const offlineUsers = usersWithBot.filter(u => {
    // El bot nunca debe aparecer en Desconectado
    if (u.isBot) return false;
    return u.online === false || u.status === 'offline';
  });

  return (
    <div
      className={`${isMobileView ? 'w-full bg-discord-dark h-full' : 'w-full lg:w-60 bg-discord-sidebar shrink-0'} flex flex-col p-2 sm:p-3 overflow-y-auto custom-scrollbar border-l border-gray-900/20`}
    >
      {/* Online Category */}
      <div className="mb-4 sm:mb-5">
        <h2 className="text-xs font-bold text-discord-text-muted uppercase mb-2 px-2 tracking-wide">
          Disponible — {onlineUsers.length}
        </h2>
        {onlineUsers.map(user => (
          <UserItem key={user.id} user={user} isCurrentUser={user.id === currentUserId} userColors={userColors} />
        ))}
      </div>

      {/* Bots Category */}
      <div className="mb-4 sm:mb-5">
        <h2 className="text-xs font-bold text-discord-text-muted uppercase mb-2 px-2 tracking-wide">
          Bots — {bots.length}
        </h2>
        {bots.map(user => (
          <UserItem key={user.id} user={user} userColors={userColors} />
        ))}
      </div>

      {/* Offline Category */}
      <div>
        <h2 className="text-xs font-bold text-discord-text-muted uppercase mb-2 px-2 tracking-wide">
          Desconectado — {offlineUsers.length}
        </h2>
        {offlineUsers.map(user => (
          <UserItem key={user.id} user={user} isCurrentUser={user.id === currentUserId} userColors={userColors} />
        ))}
      </div>
    </div>
  );
});

UserList.displayName = 'UserList';

export default UserList;
