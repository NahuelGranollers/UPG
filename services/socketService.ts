import { getSocketUrl } from '../utils/config';
import { io } from 'socket.io-client';

// Servicio para manejar Socket.IO
// Declarar tipos para Socket.IO desde el CDN
// declare const io: any;

interface SocketMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Date | string;
  channelId: string;
  username?: string;
  avatar?: string;
}

class SocketService {
  private socket: any = null;
  private serverUrl: string;
  private isConnected: boolean = false;
  private messageCallbacks: Map<string, Set<(msg: SocketMessage) => void>> = new Map();
  private connectionCallbacks: Set<(connected: boolean) => void> = new Set();

  constructor(serverUrl?: string) {
    this.serverUrl = serverUrl || getSocketUrl();
    console.log('[SOCKET CLIENT] Inicializando SocketService con URL:', this.serverUrl);
  }

  connect(): void {
    // if (typeof io === 'undefined') {
    //   console.warn('[SOCKET CLIENT] Socket.IO no está disponible. Asegúrate de que el script esté cargado.');
    //   return;
    // }

    if (this.socket?.connected) {
      console.log('[SOCKET CLIENT] Ya conectado, ignorando nueva conexión');
      return;
    }

    console.log('[SOCKET CLIENT] Iniciando conexión a:', this.serverUrl);

    const isSecure = this.serverUrl.startsWith('https');

    try {
      this.socket = io(this.serverUrl, {
        transports: ['websocket', 'polling'],
        secure: isSecure,
        withCredentials: true,
        path: '/socket.io/',
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      this.socket.on('connect', () => {
        console.log('[SOCKET CLIENT] ✅ Conectado exitosamente. SID:', this.socket.id);
        this.isConnected = true;
        this.connectionCallbacks.forEach(cb => cb(true));
      });

      this.socket.on('disconnect', (reason: string) => {
        console.log('[SOCKET CLIENT] ❌ Desconectado. Razón:', reason);
        this.isConnected = false;
        this.connectionCallbacks.forEach(cb => cb(false));
      });

      this.socket.on('connect_error', (error: any) => {
        console.error('[SOCKET CLIENT] ❌ Error de conexión:', error.message, 'Código:', error.code, 'Tipo:', error.type);
        this.isConnected = false;
        this.connectionCallbacks.forEach(cb => cb(false));
      });

      this.socket.on('reconnect', (attemptNumber: number) => {
        console.log('[SOCKET CLIENT] 🔄 Reconectado después de', attemptNumber, 'intentos');
      });

      this.socket.on('reconnect_attempt', (attemptNumber: number) => {
        console.log('[SOCKET CLIENT] 🔄 Intento de reconexión #', attemptNumber);
      });

      this.socket.on('reconnect_error', (error: any) => {
        console.error('[SOCKET CLIENT] ❌ Error en reconexión:', error.message);
      });

      this.socket.on('reconnect_failed', () => {
        console.error('[SOCKET CLIENT] ❌ Falló la reconexión después de todos los intentos');
      });

      // Escuchar mensajes
      this.socket.on('message:received', (msg: SocketMessage) => {
        console.log('[SOCKET CLIENT] 📨 Mensaje recibido:', { channelId: msg.channelId, userId: msg.userId, content: msg.content.substring(0, 50) + '...' });

        // Convertir timestamp a Date si es string
        const message: SocketMessage = {
          ...msg,
          timestamp: typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp,
        };

        // Notificar a todos los callbacks del canal
        const callbacks = this.messageCallbacks.get(msg.channelId);
        if (callbacks) {
          callbacks.forEach(cb => cb(message));
        }

        // También notificar a callbacks globales (sin canal específico)
        const globalCallbacks = this.messageCallbacks.get('*');
        if (globalCallbacks) {
          globalCallbacks.forEach(cb => cb(message));
        }
      });
    } catch (error) {
      console.error('Error inicializando Socket.IO:', error);
    }
  }

  disconnect(): void {
    if (this.socket) {
      console.log('[SOCKET CLIENT] 🔌 Desconectando socket manualmente');
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    } else {
      console.log('[SOCKET CLIENT] No hay socket para desconectar');
    }
  }

  sendMessage(
    channelId: string,
    content: string,
    userId: string,
    username?: string,
    avatar?: string
  ): void {
    if (!this.isConnected || !this.socket) {
      console.warn('[SOCKET CLIENT] No se puede enviar mensaje: Socket no conectado');
      return;
    }

    const message: SocketMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2)}`,
      userId,
      content,
      timestamp: new Date(),
      channelId,
      username,
      avatar,
    };

    console.log('[SOCKET CLIENT] 📤 Enviando mensaje:', { channelId, userId, content: content.substring(0, 50) + '...' });
    this.socket.emit('message:send', message);
  }

  subscribeToMessages(channelId: string, callback: (msg: SocketMessage) => void): () => void {
    console.log('[SOCKET CLIENT] 📡 Suscribiendo a mensajes del canal:', channelId);

    if (!this.messageCallbacks.has(channelId)) {
      this.messageCallbacks.set(channelId, new Set());
    }

    this.messageCallbacks.get(channelId)!.add(callback);

    // Retornar función para desuscribirse
    return () => {
      const callbacks = this.messageCallbacks.get(channelId);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          this.messageCallbacks.delete(channelId);
        }
      }
    };
  }

  onConnectionChange(callback: (connected: boolean) => void): () => void {
    console.log('[SOCKET CLIENT] 👂 Agregando callback de cambio de conexión. Estado actual:', this.isConnected);
    this.connectionCallbacks.add(callback);
    // Llamar inmediatamente con el estado actual
    callback(this.isConnected);

    // Retornar función para desuscribirse
    return () => {
      this.connectionCallbacks.delete(callback);
    };
  }

  getConnectionStatus(): boolean {
    const status = this.isConnected;
    console.log('[SOCKET CLIENT] 📊 Estado de conexión consultado:', status);
    return status;
  }
}

// Instancia singleton
let socketServiceInstance: SocketService | null = null;

export const getSocketService = (serverUrl?: string): SocketService => {
  if (!socketServiceInstance) {
    console.log('[SOCKET CLIENT] 🆕 Creando nueva instancia de SocketService');
    socketServiceInstance = new SocketService(serverUrl);
  } else {
    console.log('[SOCKET CLIENT] ♻️ Reutilizando instancia existente de SocketService');
  }
  return socketServiceInstance;
};

export const initSocket = (serverUrl?: string): SocketService => {
  console.log('[SOCKET CLIENT] 🚀 Inicializando socket con URL:', serverUrl || 'default');
  const service = getSocketService(serverUrl);
  service.connect();
  return service;
};
