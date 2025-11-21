import React, { useState, memo } from 'react';
import { X, Trash2, MessageSquare, Shield, AlertTriangle } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  socket: any;
}

const AdminPanel: React.FC<AdminPanelProps> = memo(({ isOpen, onClose, currentUser, socket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAction = async (action: string, requiresConfirm = true) => {
    if (requiresConfirm && confirmAction !== action) {
      setConfirmAction(action);
      setTimeout(() => setConfirmAction(null), 5000); // Reset after 5 seconds
      return;
    }

    setIsLoading(true);
    setConfirmAction(null);

    try {
      switch (action) {
        case 'clear-users':
          if (currentUser) socket.emit('admin:clear-users', { adminId: currentUser.id });
          break;
        case 'clear-messages':
          if (currentUser) socket.emit('admin:clear-all-messages', { adminId: currentUser.id });
          break;
      }
    } catch (error) {
      console.error('Error ejecutando acción:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-discord-sidebar rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn border border-gray-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Panel de Administración</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded p-1 transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-900/30 border-l-4 border-yellow-500 p-3 m-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <p className="text-sm text-yellow-200">
              <strong>Advertencia:</strong> Estas acciones son irreversibles. Usa con precaución.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] custom-scrollbar space-y-4">
          {/* Admin Actions */}
          <div className="space-y-4">
            <ActionButton
              icon={<MessageSquare size={18} />}
              title="Limpiar Todos los Mensajes"
              description="Borra el historial completo de mensajes de todos los canales"
              onClick={() => handleAction('clear-messages')}
              isConfirming={confirmAction === 'clear-messages'}
              isLoading={isLoading}
              variant="danger"
            />

            <ActionButton
              icon={<Trash2 size={18} />}
              title="Reiniciar Usuarios y IPs"
              description="Elimina todos los usuarios registrados y limpia sus IPs. Todos deberán volver a crear su usuario"
              onClick={() => handleAction('clear-users')}
              isConfirming={confirmAction === 'clear-users'}
              isLoading={isLoading}
              variant="danger"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-discord-dark p-4 border-t border-gray-800">
          <p className="text-xs text-discord-text-muted text-center">
            Sesión de admin: {currentUser?.username || 'Unknown'} | IP Hash Verificada
          </p>
        </div>
      </div>
    </div>
  );
});

interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  isConfirming: boolean;
  isLoading: boolean;
  variant: 'danger' | 'warning' | 'info' | 'success';
}

const ActionButton: React.FC<ActionButtonProps> = memo(({ 
  icon, 
  title, 
  description, 
  onClick, 
  isConfirming, 
  isLoading, 
  variant 
}) => {
  const variantStyles = {
    danger: 'bg-red-600 hover:bg-red-700 border-red-500',
    warning: 'bg-orange-600 hover:bg-orange-700 border-orange-500',
    info: 'bg-blue-600 hover:bg-blue-700 border-blue-500',
    success: 'bg-green-600 hover:bg-green-700 border-green-500'
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`w-full p-4 rounded-lg border-2 transition-all ${
        isConfirming 
          ? 'bg-yellow-600 border-yellow-500 animate-pulse' 
          : variantStyles[variant]
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'} text-left`}
    >
      <div className="flex items-start gap-3">
        <div className="text-white mt-0.5">{icon}</div>
        <div className="flex-1">
          <h4 className="text-white font-semibold mb-1">
            {isConfirming ? '⚠️ Confirmar - Clic nuevamente' : title}
          </h4>
          <p className="text-sm text-gray-200 opacity-90">
            {isConfirming 
              ? 'Esta acción es irreversible. Haz clic de nuevo para confirmar.' 
              : description
            }
          </p>
        </div>
      </div>
    </button>
  );
});

ActionButton.displayName = 'ActionButton';
AdminPanel.displayName = 'AdminPanel';

export default AdminPanel;
