import React from 'react';
import { Home, Plus, Compass, Download } from 'lucide-react';
import SafeImage from './SafeImage';

const Sidebar: React.FC = () => {
  return (
    <div className="w-[72px] bg-discord-dark flex flex-col items-center py-3 space-y-2 overflow-y-auto shrink-0">
      {/* Direct Messages / Home */}
      <div className="group relative">
        <div className="absolute left-0 bg-white rounded-r w-1 h-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-4 origin-left group-hover:scale-100" />
        <button className="w-12 h-12 bg-discord-chat text-discord-text-normal hover:bg-discord-blurple hover:text-white rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center">
          <Home size={28} />
        </button>
      </div>

      <div className="w-8 h-[2px] bg-discord-chat rounded-lg mx-auto" />

      {/* UPG Server (Active) */}
      <div className="group relative">
        <div className="absolute left-0 bg-white rounded-r-md w-1 h-10 top-1/2 -translate-y-1/2 -ml-1" />
        <button className="w-12 h-12 bg-discord-chat text-discord-green hover:bg-discord-yellow hover:text-white rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center">
           <SafeImage 
             src="/upg.png" 
             alt="UPG" 
             className="object-cover w-full h-full"
             fallbackSrc="https://ui-avatars.com/api/?name=UPG&background=ffcc17&color=ffcc17&size=128"
           />
        </button>
      </div>
      
      <div className="w-8 h-[2px] bg-discord-chat rounded-lg mx-auto" />

      <button className="w-12 h-12 bg-discord-chat text-discord-green hover:bg-discord-green hover:text-white rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center">
        <Plus size={24} />
      </button>

      <button className="w-12 h-12 bg-discord-chat text-discord-green hover:bg-discord-green hover:text-white rounded-[24px] hover:rounded-[16px] transition-all duration-200 flex items-center justify-center">
        <Compass size={24} />
      </button>
    </div>
  );
};

export default Sidebar;