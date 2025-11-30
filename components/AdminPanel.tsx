import React, { useState, memo, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { X, Trash2, MessageSquare, Shield, AlertTriangle, Zap, Palette, VolumeX, Activity, Server, Cpu, Globe, Wifi } from 'lucide-react';
import { Socket } from 'socket.io-client';
import { User } from '../types';
import { useUsers } from '../context/UserContext';
import { getBackendUrl } from '../utils/config';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  socket: Socket | null;
}

const SystemStatus = ({ socket }: { socket: Socket | null }) => {
    const [mcStatus, setMcStatus] = useState<any>(null);
    const [loadingMc, setLoadingMc] = useState(true);
    const [backendLatency, setBackendLatency] = useState<number | null>(null);
    const [systemStats, setSystemStats] = useState<{ cpu: number, memory: { percent: number } } | null>(null);

    useEffect(() => {
        // Fetch MC Status
        fetch('https://api.mcsrvstat.us/2/mc.unaspartidillas.online')
            .then(res => res.json())
            .then(data => {
                setMcStatus(data);
                setLoadingMc(false);
            })
            .catch(() => setLoadingMc(false));

        // Measure Latency
        const start = Date.now();
        fetch(`${getBackendUrl()}/api/health`) // Assuming health endpoint or just root
            .then(() => setBackendLatency(Date.now() - start))
            .catch(() => setBackendLatency(-1));

        // Real System Stats
        const fetchStats = () => {
            fetch(`${getBackendUrl()}/api/system-stats`)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setSystemStats(data);
                    }
                })
                .catch(console.error);
        };

        fetchStats();
        const interval = setInterval(fetchStats, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Minecraft Server */}
                <div className="bg-discord-dark p-4 rounded-lg border border-discord-border">
                    <div className="flex items-center gap-2 mb-3 text-discord-text-header font-bold">
                        <Server className="text-green-400" size={20} />
                        <h3>Servidor Minecraft</h3>
                    </div>
                    {loadingMc ? (
                        <div className="animate-pulse h-20 bg-discord-surface rounded"></div>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-discord-text-muted">Estado</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${mcStatus?.online ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {mcStatus?.online ? 'ONLINE' : 'OFFLINE'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-discord-text-muted">IP</span>
                                <span className="text-discord-text-normal font-mono text-sm">mc.unaspartidillas.online</span>
                            </div>
                            {mcStatus?.online && (
                                <>
                                    <div className="flex justify-between items-center">
                                        <span className="text-discord-text-muted">Jugadores</span>
                                        <span className="text-discord-text-normal">{mcStatus.players.online} / {mcStatus.players.max}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-discord-text-muted">Versión</span>
                                        <span className="text-discord-text-normal text-xs">1.20.4 - 1.21.10</span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Web Server */}
                <div className="bg-discord-dark p-4 rounded-lg border border-discord-border">
                    <div className="flex items-center gap-2 mb-3 text-discord-text-header font-bold">
                        <Globe className="text-blue-400" size={20} />
                        <h3>Servidor Web & Socket</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-discord-text-muted">Socket.IO</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${socket?.connected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                {socket?.connected ? 'CONECTADO' : 'DESCONECTADO'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-discord-text-muted">ID de Sesión</span>
                            <span className="text-discord-text-normal font-mono text-xs truncate max-w-[150px]">{socket?.id || '-'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-discord-text-muted">Latencia API</span>
                            <span className={`font-mono text-sm ${!backendLatency || backendLatency > 500 ? 'text-red-400' : 'text-green-400'}`}>
                                {backendLatency ? `${backendLatency}ms` : 'Calculando...'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-discord-text-muted">Transporte</span>
                            <span className="text-discord-text-normal text-xs uppercase">{socket?.io?.engine?.transport?.name || 'Unknown'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Real Metrics */}
            <div className="bg-discord-dark p-4 rounded-lg border border-discord-border">
                <div className="flex items-center gap-2 mb-4 text-discord-text-header font-bold">
                    <Activity className="text-purple-400" size={20} />
                    <h3>Métricas del Servidor (Real)</h3>
                </div>
                {systemStats ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="text-center">
                            <div className="text-discord-text-muted text-xs uppercase font-bold mb-2">Uso de CPU</div>
                            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-discord-surface" />
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-purple-500 transition-all duration-500" strokeDasharray={`${systemStats.cpu * 2.51} 251`} />
                                </svg>
                                <span className="absolute text-xl font-bold text-white">{systemStats.cpu}%</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-discord-text-muted text-xs uppercase font-bold mb-2">Memoria RAM</div>
                            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-discord-surface" />
                                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-blue-500 transition-all duration-500" strokeDasharray={`${systemStats.memory.percent * 2.51} 251`} />
                                </svg>
                                <span className="absolute text-xl font-bold text-white">{systemStats.memory.percent}%</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 text-discord-text-muted animate-pulse">
                        Conectando con el servidor...
                    </div>
                )}
            </div>
        </div>
    );
};

const AdminPanel: React.FC<AdminPanelProps> = memo(({ isOpen, onClose, currentUser, socket }) => {
  const { users } = useUsers();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const [activeForm, setActiveForm] = useState<null | {
    action: 'silence-user' | 'change-color' | 'global-message' | 'troll-mode' | 'trigger-effect' | 'system-status';
    values: Record<string, string>;
  }>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  // Filter out bots and current user from selectable users
  const selectableUsers = useMemo(() => {
    return users.filter(u => !u.isBot && u.id !== currentUser?.id);
  }, [users, currentUser]);

  if (!isOpen) return null;

  if (!socket) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="discord-card max-w-md w-full p-8 border-red-600 flex flex-col items-center">
          <Shield className="w-10 h-10 text-red-600 mb-4" />
          <h2 className="text-xl font-bold text-red-600 mb-2">Error de conexión</h2>
          <p className="text-base text-discord-text-normal mb-4 text-center">
            No se ha detectado conexión con el servidor.
          </p>
          <button onClick={onClose} className="discord-button danger">
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  const handleAction = async (action: string, requiresConfirm = true) => {
    if (requiresConfirm && confirmAction !== action) {
      setConfirmAction(action);
      setTimeout(() => setConfirmAction(null), 5000);
      return;
    }

    setIsLoading(true);
    setConfirmAction(null);

    try {
      const emitWithAck = (event: string, payload: any) =>
        new Promise<any>(resolve => {
          try {
            socket?.emit(event, payload, (res: any) => resolve(res));
            setTimeout(() => resolve(null), 2000);
          } catch (e) {
            resolve({ ok: false, error: 'emit_error' });
          }
        });

      let res: any = null;

      switch (action) {
        case 'clear-messages': {
          if (currentUser)
            res = await emitWithAck('admin:clear-all-messages', { adminId: currentUser.id });
          break;
        }
        case 'silence-user': {
          const uid = formValues.userId || '';
          if (uid && currentUser)
            res = await emitWithAck('admin:silence-user', { userId: uid, adminId: currentUser.id });
          setActiveForm(null);
          break;
        }
        case 'change-color': {
          const uid = formValues.userId || '';
          const color = formValues.color || '';
          if (uid && color && currentUser)
            res = await emitWithAck('admin:change-color', {
              userId: uid,
              color,
              adminId: currentUser.id,
            });
          setActiveForm(null);
          break;
        }
        case 'global-message': {
          const msg = formValues.message || '';
          if (msg && currentUser) {
            const payload: any = { content: msg, adminId: currentUser.id };
            if (formValues.sendAsBot === 'true' || formValues.sendAsBot === true) {
              payload.sendAsBot = true;
              if (formValues.channelId) payload.channelId = formValues.channelId;
            }
            res = await emitWithAck('admin:global-message', payload);
          }
          setActiveForm(null);
          break;
        }
        case 'troll-mode': {
          const uid = formValues.userId || '';
          if (uid && currentUser) {
            let mode = formValues.mode || null;
            if (mode === 'clear' || mode === '') mode = null;
            res = await emitWithAck('admin:troll-mode', {
              userId: uid,
              mode,
              adminId: currentUser.id,
            });
          }
          setActiveForm(null);
          break;
        }
        case 'trigger-effect': {
          const uid = formValues.userId || '';
          const effect = formValues.effect || '';
          if (uid && effect && currentUser) {
            res = await emitWithAck('admin:trigger-effect', {
              userId: uid,
              effect,
              adminId: currentUser.id,
            });
          }
          setActiveForm(null);
          break;
        }
      }

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

  const openForm = (action: 'silence-user' | 'change-color' | 'global-message' | 'troll-mode' | 'trigger-effect' | 'system-status') => {
    setFormValues({});
    setActiveForm({ action, values: {} });
  };

  const UserSelect = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full discord-input"
    >
      <option value="">-- Seleccionar Usuario --</option>
      {selectableUsers.map(u => (
        <option key={u.id} value={u.id}>
          {u.username} {u.status === 'offline' ? '(Offline)' : ''}
        </option>
      ))}
    </select>
  );

  const renderForm = () => {
    if (!activeForm) return null;
    const { action } = activeForm;

    if (action === 'system-status') {
        return (
            <div className="discord-panel animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-discord-text-header flex items-center gap-2">
                        <Activity size={20} />
                        Estado del Sistema
                    </h3>
                    <button onClick={() => setActiveForm(null)} className="discord-button secondary text-xs py-1 px-2">
                        Volver
                    </button>
                </div>
                <SystemStatus socket={socket} />
            </div>
        );
    }

    return (
      <div className="discord-panel animate-fadeIn">
        <h3 className="text-lg font-semibold mb-4 text-discord-text-header flex items-center gap-2">
          {action === 'change-color' && <Palette size={20} />}
          {action === 'global-message' && <MessageSquare size={20} />}
          {action === 'silence-user' && <VolumeX size={20} />}
          {action === 'troll-mode' && <Zap size={20} />}
          {action === 'trigger-effect' && <Zap size={20} />}
          
          {action === 'change-color' ? 'Cambiar Color' :
           action === 'global-message' ? 'Mensaje Global' :
           action === 'silence-user' ? 'Silenciar Usuario' :
           action === 'troll-mode' ? 'Modo Troll' :
           'Efecto Gracioso'}
        </h3>
        
        <div className="space-y-4">
          {(action === 'silence-user' || action === 'change-color' || action === 'troll-mode' || action === 'trigger-effect') && (
            <div>
              <label className="text-sm text-discord-text-muted mb-1 block">Usuario Objetivo</label>
              <UserSelect 
                value={formValues.userId || ''} 
                onChange={val => setFormValues(v => ({ ...v, userId: val }))} 
              />
            </div>
          )}

          {action === 'change-color' && (
            <div>
              <label className="text-sm text-discord-text-muted mb-1 block">Color HEX</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formValues.color || '#ffffff'}
                  onChange={e => setFormValues(v => ({ ...v, color: e.target.value }))}
                  className="h-10 w-14 bg-transparent cursor-pointer"
                />
                <input
                  value={formValues.color || ''}
                  onChange={e => setFormValues(v => ({ ...v, color: e.target.value }))}
                  className="flex-1 discord-input"
                  placeholder="#RRGGBB"
                />
              </div>
            </div>
          )}

          {action === 'global-message' && (
            <div>
              <label className="text-sm text-discord-text-muted mb-1 block">Mensaje</label>
              <textarea
                value={formValues.message || ''}
                onChange={e => setFormValues(v => ({ ...v, message: e.target.value }))}
                className="w-full discord-input"
                rows={3}
                placeholder="Escribe tu mensaje aquí..."
              />
              <div className="flex items-center gap-3 mt-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formValues.sendAsBot === 'true'}
                    onChange={e => setFormValues(v => ({ ...v, sendAsBot: e.target.checked ? 'true' : 'false' }))}
                    className="rounded bg-discord-dark border-gray-600"
                  />
                  <span className="text-discord-text-normal">Enviar como Bot</span>
                </label>
              </div>
            </div>
          )}

          {action === 'troll-mode' && (
            <div>
              <label className="text-sm text-discord-text-muted mb-1 block">Tipo de Troll</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'uwu', label: 'UwUify', desc: 'Convierte todo a UwU' },
                  { id: 'meow', label: 'Meowify', desc: 'Agrega maullidos' },
                  { id: 'kawaii', label: 'Kawaii', desc: 'Exceso de ternura' },
                  { id: '', label: 'Desactivar', desc: 'Volver a la normalidad', danger: true }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setFormValues(v => ({ ...v, mode: opt.id }))}
                    className={`p-2 rounded border text-left transition-all ${
                      formValues.mode === opt.id 
                        ? 'bg-discord-blurple border-discord-blurple text-white' 
                        : opt.danger 
                          ? 'border-red-500/50 hover:bg-red-500/10 text-red-400'
                          : 'border-discord-hover hover:bg-discord-hover text-discord-text-normal'
                    }`}
                  >
                    <div className="font-bold text-sm">{opt.label}</div>
                    <div className="text-xs opacity-70">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {action === 'trigger-effect' && (
            <div>
              <label className="text-sm text-discord-text-muted mb-1 block">Efecto</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'rotate', label: 'Rotar Pantalla', desc: 'Gira la pantalla 180°' },
                  { id: 'confetti', label: 'Confeti', desc: 'Explosión de alegría' },
                  { id: 'jumpscare', label: 'Susto (Suave)', desc: 'Imagen rápida' },
                  { id: 'fart', label: 'Sonido Gracioso', desc: 'Sonido de pedo' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setFormValues(v => ({ ...v, effect: opt.id }))}
                    className={`p-2 rounded border text-left transition-all ${
                      formValues.effect === opt.id 
                        ? 'bg-discord-blurple border-discord-blurple text-white' 
                        : 'border-discord-hover hover:bg-discord-hover text-discord-text-normal'
                    }`}
                  >
                    <div className="font-bold text-sm">{opt.label}</div>
                    <div className="text-xs opacity-70">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 justify-end pt-4 border-t border-discord-border mt-2">
            <button onClick={() => setActiveForm(null)} className="discord-button secondary">
              Cancelar
            </button>
            <button onClick={() => handleAction(action, false)} className="discord-button">
              Aplicar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="discord-card max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-discord-blurple p-4 flex items-center justify-between shrink-0">
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {activeForm ? (
            renderForm()
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ActionButton
                icon={<MessageSquare size={24} />}
                title="Limpiar Chat"
                description="Borrar todos los mensajes"
                onClick={() => handleAction('clear-messages')}
                isConfirming={confirmAction === 'clear-messages'}
                isLoading={isLoading}
                variant="danger"
              />

              <ActionButton
                icon={<VolumeX size={24} />}
                title="Silenciar"
                description="Mutear a un usuario"
                onClick={() => openForm('silence-user')}
                isConfirming={false}
                isLoading={isLoading}
                variant="warning"
              />

              <ActionButton
                icon={<Palette size={24} />}
                title="Cambiar Color"
                description="Personalizar nombre"
                onClick={() => openForm('change-color')}
                isConfirming={false}
                isLoading={isLoading}
                variant="info"
              />

              <ActionButton
                icon={<MessageSquare size={24} />}
                title="Anuncio Global"
                description="Enviar mensaje a todos"
                onClick={() => openForm('global-message')}
                isConfirming={false}
                isLoading={isLoading}
                variant="success"
              />

              <ActionButton
                icon={<Zap size={24} />}
                title="Modo Troll"
                description="Modificar chat del usuario"
                onClick={() => openForm('troll-mode')}
                isConfirming={false}
                isLoading={isLoading}
                variant="warning"
              />

              <ActionButton
                icon={<Zap size={24} />}
                title="Efecto Gracioso"
                description="Rotar pantalla, sonidos..."
                onClick={() => openForm('trigger-effect')}
                isConfirming={false}
                isLoading={isLoading}
                variant="warning"
              />

              <ActionButton
                icon={<Activity size={24} />}
                title="Estado Sistema"
                description="Ver métricas y servidores"
                onClick={() => openForm('system-status')}
                isConfirming={false}
                isLoading={isLoading}
                variant="info"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-discord-dark p-3 border-t border-discord-border shrink-0">
          <p className="text-xs text-discord-text-muted text-center">
            Admin: {currentUser?.username}
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
      danger: 'bg-red-500/10 border-red-500/50 hover:bg-red-500/20 text-red-400',
      warning: 'bg-yellow-500/10 border-yellow-500/50 hover:bg-yellow-500/20 text-yellow-400',
      info: 'bg-blue-500/10 border-blue-500/50 hover:bg-blue-500/20 text-blue-400',
      success: 'bg-green-500/10 border-green-500/50 hover:bg-green-500/20 text-green-400',
    };

    return (
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`p-4 rounded-lg border transition-all flex flex-col items-center text-center gap-2 ${
          isConfirming
            ? 'bg-red-600 border-red-500 text-white animate-pulse'
            : variantStyles[variant]
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
      >
        <div className={isConfirming ? 'text-white' : ''}>{icon}</div>
        <div>
          <h4 className="font-bold text-lg">
            {isConfirming ? '¿Confirmar?' : title}
          </h4>
          <p className="text-xs opacity-80">
            {isConfirming ? 'Clic para ejecutar' : description}
          </p>
        </div>
      </button>
    );
  }
);

ActionButton.displayName = 'ActionButton';
AdminPanel.displayName = 'AdminPanel';

export default AdminPanel;
