import React, { useState } from 'react';
import { User } from 'lucide-react';

interface UsernamePromptProps {
  onSubmit: (username: string) => void;
  onLoginWithDiscord: () => void;
}

const UsernamePrompt: React.FC<UsernamePromptProps> = ({ onSubmit, onLoginWithDiscord }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#313338] p-4">
      <div className="w-full max-w-md rounded-lg bg-[#2b2d31] p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Bienvenido a UPG</h1>
          <p className="mt-2 text-gray-400">Elige un nombre para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-300">
              Nombre de usuario
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                id="username"
                className="block w-full rounded-md border-none bg-[#1e1f22] py-2.5 pl-10 pr-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#5865F2]"
                placeholder="Ej. Player1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={20}
                required
                autoFocus
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#5865F2] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4752C4] focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 focus:ring-offset-[#2b2d31]"
          >
            Entrar como Invitado
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#2b2d31] px-2 text-gray-400">O continúa con</span>
          </div>
        </div>

        <button
          onClick={onLoginWithDiscord}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[#5865F2] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4752C4]"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 26.15 26.15 0 0 0-3.338 6.897 26.26 26.26 0 0 0-3.34-6.897.072.072 0 0 0-.078-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          Discord
        </button>
      </div>
    </div>
  );
};

export default UsernamePrompt;
