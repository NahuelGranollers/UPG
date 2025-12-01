import React, { useState, useCallback, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { useUsers } from '../context/UserContext';
import { useVoice } from '../hooks/useVoice';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import { UserRole } from '../types';

const AdminPanel = React.lazy(() => import('./AdminPanel'));
const UserProfileModal = React.lazy(() => import('./UserProfileModal'));

interface LayoutProps {
  children: React.ReactNode;
  activeSection?: 'home' | 'chat' | 'who' | 'voting' | 'upg' | 'impostor' | 'news' | 'hall_of_fame';
  onActiveSectionChange?: (section: 'home' | 'chat' | 'who' | 'voting' | 'upg' | 'impostor' | 'news' | 'hall_of_fame') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection = 'home', onActiveSectionChange }) => {
  const navigate = useNavigate();
  const { currentUser, loginWithDiscord, logout } = useAuth();
  const { socket } = useSocket();
  const { activeEffect } = useUsers();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const touchState = React.useRef({ startX: 0, startY: 0, started: false });

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchState.current = { startX: t.clientX, startY: t.clientY, started: true };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchState.current.started) return;
    const t = e.touches[0];
    const dx = t.clientX - touchState.current.startX;
    const dy = Math.abs(t.clientY - touchState.current.startY);
    if (dy > 75) return; // ignore vertical drags
    if (touchState.current.startX < 80 && dx > 60) {
      setMobileSidebarOpen(true);
      touchState.current.started = false;
    }
    if (mobileSidebarOpen && dx < -40) {
      setMobileSidebarOpen(false);
      touchState.current.started = false;
    }
  };

  const handleTouchEnd = () => {
    touchState.current.started = false;
  };

  // Función helper para navegación
  const navigateToSection = useCallback((section: string, setMobileTab = false) => {
    if (section === 'home') {
      navigate('/');
      if (onActiveSectionChange) onActiveSectionChange('home');
    } else {
      switch (section) {
        case 'chat':
          navigate('/');
          if (onActiveSectionChange) onActiveSectionChange('chat');
          break;
        case 'impostor':
          navigate('/impostor');
          if (onActiveSectionChange) onActiveSectionChange('impostor');
          break;
        case 'who':
          navigate('/quienes-somos');
          if (onActiveSectionChange) onActiveSectionChange('who');
          break;
        case 'voting':
          navigate('/votaciones');
          if (onActiveSectionChange) onActiveSectionChange('voting');
          break;
        case 'news':
          navigate('/noticias');
          if (onActiveSectionChange) onActiveSectionChange('news');
          break;
        case 'hall_of_fame':
          navigate('/salon-fama');
          if (onActiveSectionChange) onActiveSectionChange('hall_of_fame');
          break;
      }
    }
  }, [navigate, onActiveSectionChange]);

  const handleHomeClick = useCallback(() => {
    navigate('/');
    if (onActiveSectionChange) onActiveSectionChange('home');
  }, [navigate, onActiveSectionChange]);

  const handleUPGClick = useCallback(() => {
    navigate('/');
    if (onActiveSectionChange) onActiveSectionChange('chat');
  }, [navigate, onActiveSectionChange]);

  if (!currentUser) return null; // This shouldn't happen as auth is required

  return (
    <div
      className="flex h-[100dvh] w-full bg-discord-bg font-sans antialiased overflow-hidden relative text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full h-full">
        {/* Sidebar (single instance, fixed left) */}
        <Sidebar
          currentUser={currentUser}
          setCurrentUser={() => {}}
          activeSection={activeSection}
          onNavigate={navigateToSection}
          onHomeClick={handleHomeClick}
          onUPGClick={handleUPGClick}
          onOpenAdmin={() => setShowAdminPanel(true)}
          onEditProfile={() => setShowProfileModal(true)}
        />
        <div className="flex flex-1 min-w-0 relative">
          {children}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden h-full w-full flex-col relative overflow-hidden">
        {/* Centralized Menu Button (only when sidebar is closed) */}
        {!mobileSidebarOpen && (
          <button
            className="md:hidden fixed top-3 left-3 aspect-square w-12 liquid-glass rounded-lg shadow-lg z-[100] text-discord-text-normal hover:text-white border border-discord-hover flex items-center justify-center"
            aria-label="Abrir menú"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu mx-auto" aria-hidden="true"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>
          </button>
        )}
        <div className="flex-1 w-full overflow-hidden relative">
          {children}
        </div>

        {/* Mobile Sidebar available in all views */}
        <MobileSidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          onNavigate={navigateToSection}
          currentUser={currentUser}
          activeSection={activeSection}
        />
      </div>

      {/* Admin Panel Modal */}
      {currentUser?.role === UserRole.ADMIN && (
        <Suspense fallback={null}>
          <AdminPanel
            isOpen={showAdminPanel}
            onClose={() => setShowAdminPanel(false)}
            currentUser={currentUser}
            socket={socket}
          />
        </Suspense>
      )}

      {/* User Profile Modal */}
      <Suspense fallback={null}>
        <UserProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          user={currentUser}
          onLoginWithDiscord={loginWithDiscord}
        />
      </Suspense>

      {/* Effects Overlay */}
      {activeEffect === 'jumpscare' && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <img
            src="/scare.gif"
            alt="scare"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {activeEffect === 'confetti' && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 2 + 1}s`,
                animationDelay: `${Math.random()}s`
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Layout;