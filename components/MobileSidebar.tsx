import React from 'react';
import Sidebar from './Sidebar';
import { User } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: 'home' | 'chat' | 'who' | 'voting' | 'upg' | 'impostor' | 'news' | 'hall_of_fame') => void;
  currentUser: User | null;
  activeSection: 'home' | 'chat' | 'who' | 'voting' | 'upg' | 'impostor' | 'news' | 'hall_of_fame';
  onOpenAdmin?: () => void;
  onEditProfile?: () => void;
}

const MobileSidebar: React.FC<Props> = ({ isOpen, onClose, onNavigate, currentUser, activeSection, onOpenAdmin, onEditProfile }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
    >
      <div className={`absolute inset-0 bg-black/50`} onClick={onClose} />

      <aside
        className={`absolute left-0 top-0 h-full w-auto shadow-xl transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ transitionProperty: 'transform', transitionDuration: '220ms' }}
      >
        <Sidebar
          currentUser={currentUser}
          setCurrentUser={() => {}}
          activeSection={activeSection}
          onNavigate={(section) => {
            onNavigate(section);
            onClose();
          }}
          onOpenAdmin={() => {
            if (onOpenAdmin) onOpenAdmin();
            onClose();
          }}
          onEditProfile={() => {
            if (onEditProfile) onEditProfile();
            onClose();
          }}
        />
      </aside>
    </div>
  );
};

export default MobileSidebar;
