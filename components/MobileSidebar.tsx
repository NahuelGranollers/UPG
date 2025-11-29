import React from 'react';
import Sidebar from './Sidebar';
import { User } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: 'home' | 'chat' | 'who' | 'voting' | 'upg' | 'impostor' | 'news' | 'hall_of_fame') => void;
  currentUser: User | null;
  users: User[];
  activeSection: 'home' | 'chat' | 'who' | 'voting' | 'upg' | 'impostor' | 'news' | 'hall_of_fame';
}

const MobileSidebar: React.FC<Props> = ({ isOpen, onClose, onNavigate, currentUser, users, activeSection }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div className={`absolute inset-0 bg-black/50`} onClick={onClose} />

      <aside
        className={`absolute left-0 top-0 h-full w-auto bg-discord-dark shadow-xl transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ transitionProperty: 'transform', transitionDuration: '220ms' }}
      >
        <Sidebar
          currentUser={currentUser}
          users={users}
          setCurrentUser={() => {}}
          activeSection={activeSection}
          onNavigate={(section) => {
            onNavigate(section);
            onClose();
          }}
        />
      </aside>
    </div>
  );
};

export default MobileSidebar;
