import React, { memo } from 'react';
import { User } from '../types';
import SafeImage from './SafeImage';

interface UserListProps {
  users: User[];
  currentUserId?: string;
  isMobileView?: boolean;
}

const UserItem: React.FC<{ user: User; isCurrentUser?: boolean }> = memo(({ user, isCurrentUser }) => {
  // Determinar si el usuario est├í offline
  const isOffline = user.online === false || user.status === 'offline';
  
  return (
    <div 
      className={`flex items-center py-1.5 px-2 hover:bg-discord-hover rounded cursor-pointer group opacity-90 hover:opacity-100 ${
        isCurrentUser ? 'bg-discord-hover/50 border border-discord-blurple/30' : ''
      }`}
    >
      <div className="relative mr-3">
        <SafeImage 
          src={user.avatar} 
          alt={user.username} 
          className={`w-8 h-8 rounded-full object-cover ${isOffline ? 'grayscale opacity-60' : ''}`}
          fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=5865F2&color=fff&size=128`}
        />
        {!isOffline && (
            <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-[3px] border-[#2b2d31] rounded-full ${
                user.status === 'online' ? 'bg-green-500' : 
                user.status === 'idle' ? 'bg-yellow-500' : 
                'bg-red-500'
            }`}></div>
        )}
      </div>
      <div className="min-w-0">
        <div className="flex items-center">
            <span className={`font-medium text-sm truncate ${isOffline ? 'text-discord-text-muted' : ''}`} style={{ color: !isOffline ? user.color : undefined }}>
            {user.username}
            </span>
            {user.isBot && (
                <span className="ml-1.5 bg-[#5865F2] text-white text-[10px] px-1 rounded-[3px] uppercase font-bold leading-tight py-[1px]">
                    Bot
                </span>
            )}
        </div>
        <div className="text-xs text-discord-text-muted truncate h-4 opacity-0 group-hover:opacity-100 transition-opacity">
            {user.status === 'dnd' ? 'No molestar' : user.status === 'idle' ? 'Ausente' : ''}
        </div>
      </div>
    </div>
  );
});

UserItem.displayName = 'UserItem';

const UserList: React.FC<UserListProps> = memo(({ users, currentUserId, isMobileView = false }) => {
  // Filtrar usuarios por estado de conexi├│n (incluir usuario actual)
  const onlineUsers = users.filter(u => {
    if (u.isBot) return false;
    // Usuario est├í online si: online === true O (online no est├í definido Y status === 'online')
    return (u.online === true || (u.online === undefined && u.status === 'online'));
  });
  
  const bots = users.filter(u => u.isBot);
  
  const offlineUsers = users.filter(u => {
    if (u.isBot) return false;
    // Usuario est├í offline si: online === false O status === 'offline'
    return (u.online === false || u.status === 'offline');
  });

  return (
    <div className={`${
      isMobileView 
        ? 'w-full bg-discord-dark h-full' 
        : 'w-60 bg-discord-sidebar shrink-0 hidden lg:flex'
    } flex flex-col p-3 overflow-y-auto custom-scrollbar border-l border-gray-900/20`}>
       {/* Online Category */}
       <div className="mb-6">
         <h2 className="text-xs font-bold text-discord-text-muted uppercase mb-2 px-2">Disponible ÔÇö {onlineUsers.length}</h2>
         {onlineUsers.map(user => (
           <UserItem 
             key={user.id} 
             user={user} 
             isCurrentUser={user.id === currentUserId}
           />
         ))}
       </div>

       {/* Bots Category */}
       <div className="mb-6">
         <h2 className="text-xs font-bold text-discord-text-muted uppercase mb-2 px-2">Bots ÔÇö {bots.length}</h2>
         {bots.map(user => <UserItem key={user.id} user={user} />)}
       </div>

       {/* Offline Category */}
       <div>
         <h2 className="text-xs font-bold text-discord-text-muted uppercase mb-2 px-2">Desconectado ÔÇö {offlineUsers.length}</h2>
         {offlineUsers.map(user => (
           <UserItem 
             key={user.id} 
             user={user}
             isCurrentUser={user.id === currentUserId}
           />
         ))}
       </div>
    </div>
  );
});

UserList.displayName = 'UserList';

export default UserList;
