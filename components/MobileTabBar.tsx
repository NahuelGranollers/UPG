import React, { memo } from 'react';
import { Users, MessageSquare, Menu, Newspaper } from 'lucide-react';

interface MobileTabBarProps {
  activeTab: 'channels' | 'chat' | 'users' | 'news';
  onTabChange: (tab: 'channels' | 'chat' | 'users' | 'news') => void;
  unreadCount?: number;
  showNewsTab?: boolean;
}

const MobileTabBar: React.FC<MobileTabBarProps> = memo(
  ({ activeTab, onTabChange, unreadCount = 0, showNewsTab = false }) => {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-discord-sidebar border-t border-gray-900/20 z-30 md:hidden safe-area-bottom">
        <div
          className={`flex items-center justify-around h-16 ${showNewsTab ? '' : 'justify-between'}`}
        >
          {/* Channels Tab */}
          <button
            onClick={() => onTabChange('channels')}
            className={`flex flex-col items-center justify-center ${showNewsTab ? 'flex-1' : 'flex-1'} h-full transition-all duration-200 relative ${
              activeTab === 'channels' ? 'text-white' : 'text-discord-text-muted'
            }`}
            aria-label="Canales"
          >
            {activeTab === 'channels' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white rounded-b-full" />
            )}
            <Menu
              size={24}
              className={`transition-transform ${activeTab === 'channels' ? 'scale-110' : ''}`}
            />
            <span className="text-xs mt-1 font-medium">Canales</span>
          </button>

          {/* Chat Tab */}
          <button
            onClick={() => onTabChange('chat')}
            className={`flex flex-col items-center justify-center ${showNewsTab ? 'flex-1' : 'flex-1'} h-full transition-all duration-200 relative ${
              activeTab === 'chat' ? 'text-white' : 'text-discord-text-muted'
            }`}
            aria-label="Chat"
          >
            {activeTab === 'chat' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white rounded-b-full" />
            )}
            <MessageSquare
              size={24}
              className={`transition-transform ${activeTab === 'chat' ? 'scale-110' : ''}`}
            />
            <span className="text-xs mt-1 font-medium">Chat</span>
            {unreadCount > 0 && (
              <div className="absolute top-1 right-1/4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </button>

          {/* News Tab - Only show when showNewsTab is true */}
          {showNewsTab && (
            <button
              onClick={() => onTabChange('news')}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 relative ${
                activeTab === 'news' ? 'text-white' : 'text-discord-text-muted'
              }`}
              aria-label="Noticias"
            >
              {activeTab === 'news' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white rounded-b-full" />
              )}
              <Newspaper
                size={24}
                className={`transition-transform ${activeTab === 'news' ? 'scale-110' : ''}`}
              />
              <span className="text-xs mt-1 font-medium">News</span>
            </button>
          )}

          {/* Users Tab */}
          <button
            onClick={() => onTabChange('users')}
            className={`flex flex-col items-center justify-center ${showNewsTab ? 'flex-1' : 'flex-1'} h-full transition-all duration-200 relative ${
              activeTab === 'users' ? 'text-white' : 'text-discord-text-muted'
            }`}
            aria-label="Usuarios"
          >
            {activeTab === 'users' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white rounded-b-full" />
            )}
            <Users
              size={24}
              className={`transition-transform ${activeTab === 'users' ? 'scale-110' : ''}`}
            />
            <span className="text-xs mt-1 font-medium">Usuarios</span>
          </button>
        </div>
      </div>
    );
  }
);

MobileTabBar.displayName = 'MobileTabBar';

export default MobileTabBar;
