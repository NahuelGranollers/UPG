import React, { useState, memo } from 'react';
import { toast } from 'sonner';
import { X, Trash2, MessageSquare, Shield, AlertTriangle } from 'lucide-react';
import { Socket } from 'socket.io-client';
import { User } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  socket: Socket | null;
}

const AdminPanel: React.FC<AdminPanelProps> = memo(({ isOpen, onClose, currentUser, socket }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const [activeForm, setActiveForm] = useState<
    | null
    | { action: 'silence-user' | 'change-color' | 'global-message' | 'troll-mode'; values: Record<string, string> }
    >(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  // Mostrar advertencia si el socket no está disponible
  if (!socket) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-discord-sidebar rounded-lg shadow-2xl max-w-md w-full p-8 border border-red-600 flex flex-col items-center">
          <Shield className="w-10 h-10 text-red-600 mb-4" />
          <h2 className="text-xl font-bold text-red-600 mb-2">Error de conexión</h2>
          <p className="text-base text-white mb-4 text-center">
            No se ha detectado conexión con el servidor.
            <br />
            Verifica tu conexión y recarga la página.
          </p>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  const handleAction = async (action: string, requiresConfirm = true) => {
    if (requiresConfirm && confirmAction !== action) {
      setConfirmAction(action);
      setTimeout(() => setConfirmAction(null), 5000); // Reset after 5 seconds
      return;
    }

    setIsLoading(true);
    setConfirmAction(null);

    try {
      const emitWithAck = (event: string, payload: any) =>
        new Promise<any>(resolve => {
          try {
            socket?.emit(event, payload, (res: any) => resolve(res));
            // If server doesn't call the ack, resolve after 2s
            setTimeout(() => resolve(null), 2000);
          } catch (e) {
            resolve({ ok: false, error: 'emit_error' });
          }
        });

      let res: any = null;

      switch (action) {
        case 'clear-users': {
          if (currentUser) res = await emitWithAck('admin:clear-users', { adminId: currentUser.id });
          break;
        }
        case 'clear-messages': {
          if (currentUser) res = await emitWithAck('admin:clear-all-messages', { adminId: currentUser.id });
          break;
        }
        case 'silence-user': {
          const uid = formValues.userId || '';
          if (uid && currentUser) res = await emitWithAck('admin:silence-user', { userId: uid, adminId: currentUser.id });
          setActiveForm(null);
          break;
        }
        case 'change-color': {
          const uid = formValues.userId || '';
          const color = formValues.color || '';
          if (uid && color && currentUser)
            res = await emitWithAck('admin:change-color', { userId: uid, color, adminId: currentUser.id });
          setActiveForm(null);
          break;
        }
        case 'global-message': {
          const msg = formValues.message || '';
          if (msg && currentUser) res = await emitWithAck('admin:global-message', { content: msg, adminId: currentUser.id });
          setActiveForm(null);
          break;
        }
        case 'troll-mode': {
          const uid = formValues.userId || '';
          if (uid && currentUser) res = await emitWithAck('admin:troll-mode', { userId: uid, adminId: currentUser.id });
          setActiveForm(null);
          break;
        }
      }

      // Show feedback according to ack or default
      if (res && res.ok === false) {
        toast.error(res.error || 'Error ejecutando la acción');
      } else {
        toast.success('Acción enviada con éxito');
      }
    } catch (err) {
      toast.error('Error ejecutando la acción');
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const openForm = (action: 'silence-user' | 'change-color' | 'global-message' | 'troll-mode') => {
    setFormValues({});
    setActiveForm({ action, values: {} });
  };

  const renderForm = () => {
    if (!activeForm) return null;
    const { action } = activeForm;
    return (
      <div className="bg-discord-dark p-4 rounded border border-gray-800">
        <h3 className="text-lg font-semibold mb-2">{action === 'change-color' ? 'Cambiar color' : action === 'global-message' ? 'Enviar mensaje global' : action === 'silence-user' ? 'Silenciar usuario' : 'Modo troll'}</h3>
        <div className="space-y-2">
          {(action === 'silence-user' || action === 'change-color' || action === 'troll-mode') && (
            <div>
              <label className="text-sm text-discord-text-muted">ID del usuario</label>
              <input value={formValues.userId || ''} onChange={e => setFormValues(v => ({ ...v, userId: e.target.value }))} className="w-full bg-discord-dark border border-gray-800 rounded p-2 text-white" placeholder="user-1234" />
            </div>
          )}
          {action === 'change-color' && (
            <div>
              <label className="text-sm text-discord-text-muted">Color HEX</label>
              <input value={formValues.color || '#'+Math.floor(Math.random()*16777215).toString(16)} onChange={e => setFormValues(v => ({ ...v, color: e.target.value }))} className="w-32 bg-discord-dark border border-gray-800 rounded p-2 text-white" />
            </div>
          )}
          {action === 'global-message' && (
            <div>
              <label className="text-sm text-discord-text-muted">Mensaje</label>
              <textarea value={formValues.message || ''} onChange={e => setFormValues(v => ({ ...v, message: e.target.value }))} className="w-full bg-discord-dark border border-gray-800 rounded p-2 text-white" rows={3} />
            </div>
          )}

          <div className="flex gap-2 justify-end pt-2">
            <button onClick={() => setActiveForm(null)} className="px-3 py-1 rounded border border-gray-700">Cancelar</button>
            <button onClick={() => handleAction(action, false)} className="px-3 py-1 rounded bg-discord-blurple text-white">Enviar</button>
          </div>
        </div>
      </div>
    );
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

            <ActionButton
              icon={<Shield size={18} />}
              title="Silenciar Usuario"
              description="Impide que un usuario seleccionado pueda enviar mensajes."
              onClick={() => openForm('silence-user')}
              isConfirming={false}
              isLoading={isLoading}
              variant="warning"
            />

            <ActionButton
              icon={<AlertTriangle size={18} />}
              title="Cambiar Color de Usuario"
              description="Permite cambiar el color de nombre de un usuario."
              onClick={() => openForm('change-color')}
              isConfirming={false}
              isLoading={isLoading}
              variant="info"
            />

            <ActionButton
              icon={<MessageSquare size={18} />}
              title="Enviar Mensaje Global"
              description="Envía un mensaje a todos los canales y usuarios."
              onClick={() => openForm('global-message')}
              isConfirming={false}
              isLoading={isLoading}
              variant="success"
            />

            <ActionButton
              icon={<AlertTriangle size={18} />}
              title="Activar Modo Troll"
              description="Activa efectos visuales y de chat para trolear a un usuario."
              onClick={() => openForm('troll-mode')}
              isConfirming={false}
              isLoading={isLoading}
              variant="warning"
            />
          </div>
          {/* Inline form for actions that require input */}
          {renderForm()}
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

const ActionButton: React.FC<ActionButtonProps> = memo(
  ({ icon, title, description, onClick, isConfirming, isLoading, variant }) => {
    const variantStyles = {
      danger: 'bg-red-600 hover:bg-red-700 border-red-500',
      warning: 'bg-orange-600 hover:bg-orange-700 border-orange-500',
      info: 'bg-blue-600 hover:bg-blue-700 border-blue-500',
      success: 'bg-green-600 hover:bg-green-700 border-green-500',
    };

    return (
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`w-full p-4 rounded-lg border-2 transition-all ${
          isConfirming ? 'bg-yellow-600 border-yellow-500 animate-pulse' : variantStyles[variant]
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
                : description}
            </p>
          </div>
        </div>
      </button>
    );
  }
);

ActionButton.displayName = 'ActionButton';
AdminPanel.displayName = 'AdminPanel';

export default AdminPanel;
