import React, { useState, useEffect } from 'react';
import Modal from './Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialName: string;
  initialColor: string;
  onSave: (name: string, color: string) => void;
  onLinkDiscord?: () => void;
  onUnlinkDiscord?: () => void;
  isGuest?: boolean;
}

const ServerSettings: React.FC<Props> = ({
  isOpen,
  onClose,
  initialName,
  initialColor,
  onSave,
  onLinkDiscord,
  onUnlinkDiscord,
  isGuest,
}) => {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setColor(initialColor);
    }
  }, [isOpen, initialName, initialColor]);

  const handleSave = () => {
    onSave(name.trim() || initialName, color);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar perfil" size="md">
      <div className="space-y-4">
        <label className="block">
          <div className="text-sm text-discord-text-muted mb-1">Nombre de usuario</div>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-discord-dark border border-gray-800 rounded p-2 text-white"
            placeholder="Nombre de usuario"
          />
        </label>

        <label className="block">
          <div className="text-sm text-discord-text-muted mb-1">Color del nombre</div>
          <div className="flex items-center gap-3">
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-12 h-10 p-0 border-0" />
            <div className="text-sm text-discord-text-muted">Color actual: <span style={{color}} className="font-medium">{color}</span></div>
          </div>
        </label>

        <div className="pt-2 border-t border-gray-800" />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Discord</div>
              <div className="text-xs text-discord-text-muted">Vincula o desvincula tu cuenta de Discord para integración</div>
            </div>
            <div>
              {isGuest ? (
                <button onClick={onLinkDiscord} className="bg-discord-blurple text-white px-3 py-1 rounded">Vincular</button>
              ) : (
                <button onClick={onUnlinkDiscord} className="bg-red-600 text-white px-3 py-1 rounded">Desvincular</button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4">
          <button onClick={onClose} className="px-3 py-1 rounded border border-gray-700 text-sm">Cancelar</button>
          <button onClick={handleSave} className="px-3 py-1 rounded bg-discord-blurple text-white text-sm">Guardar</button>
        </div>
      </div>
    </Modal>
  );
};

export default ServerSettings;
