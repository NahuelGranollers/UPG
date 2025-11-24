import React, { useState } from 'react';

interface CreateServerModalProps {
  gameType: 'impostor' | 'cs16';
  onCreate: (serverData: {
    name: string;
    password?: string;
    botCount?: number;
  }) => void;
  onCancel: () => void;
}

const CreateServerModal: React.FC<CreateServerModalProps> = ({ gameType, onCreate, onCancel }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [botCount, setBotCount] = useState(gameType === 'cs16' ? 2 : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const serverData: any = {
      name: name.trim(),
    };

    if (usePassword && password.trim()) {
      serverData.password = password.trim();
    }

    if (gameType === 'cs16') {
      serverData.botCount = Math.max(0, Math.min(8, botCount));
    }

    onCreate(serverData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-white mb-4">
          Crear Servidor {gameType === 'impostor' ? 'Impostor' : 'CS 1.6'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Servidor
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Mi servidor ${gameType === 'impostor' ? 'Impostor' : 'CS16'}`}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={50}
              required
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <input
                type="checkbox"
                checked={usePassword}
                onChange={(e) => setUsePassword(e.target.checked)}
                className="mr-2"
              />
              Servidor Privado (requiere contraseña)
            </label>
            {usePassword && (
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                maxLength={20}
              />
            )}
          </div>

          {gameType === 'cs16' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cantidad de Bots (0-8)
              </label>
              <input
                type="number"
                value={botCount}
                onChange={(e) => setBotCount(parseInt(e.target.value) || 0)}
                min={0}
                max={8}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Los bots ayudan a equilibrar el juego cuando hay pocos jugadores
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Crear Servidor
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServerModal;