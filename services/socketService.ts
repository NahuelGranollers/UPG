// Servicio para manejar Socket.IO
// Declarar tipos para Socket.IO desde el CDN
declare const io: any;

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
    this.serverUrl = serverUrl || (import.meta.env.VITE_SOCKET_URL as string) || 'https://api.unaspartidillas.online';
  }

  connect(): void {
    if (typeof io === 'undefined') {
      console.warn('Socket.IO no está disponible. Asegúrate de que el script esté cargado.');
      return;
    }

    if (this.socket?.connected) {
      return;
    }

    try {
      this.socket = io(this.serverUrl, {
        transports: ['websocket', 'polling'],
        secure: true,
        withCredentials: true,
        path: '/socket.io/',
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      this.socket.on('connect', () => {
        // connected
        this.isConnected = true;
        this.connectionCallbacks.forEach(cb => cb(true));
      });

      this.socket.on('disconnect', () => {
        // disconnected
        this.isConnected = false;
        this.connectionCallbacks.forEach(cb => cb(false));
      });

      this.socket.on('connect_error', (error: any) => {
        console.error('Error de conexión Socket.IO:', error);
        this.isConnected = false;
        this.connectionCallbacks.forEach(cb => cb(false));
      });

      // Escuchar mensajes
      this.socket.on('mensaje', (msg: SocketMessage) => {
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
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
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
      console.warn('Socket.IO no está conectado. No se puede enviar el mensaje.');
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

    this.socket.emit('mensaje', message);
  }

  subscribeToMessages(channelId: string, callback: (msg: SocketMessage) => void): () => void {
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
    this.connectionCallbacks.add(callback);
    // Llamar inmediatamente con el estado actual
    callback(this.isConnected);

    // Retornar función para desuscribirse
    return () => {
      this.connectionCallbacks.delete(callback);
    };
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

// Instancia singleton
let socketServiceInstance: SocketService | null = null;

export const getSocketService = (serverUrl?: string): SocketService => {
  if (!socketServiceInstance) {
    socketServiceInstance = new SocketService(serverUrl);
  }
  return socketServiceInstance;
};

export const initSocket = (serverUrl?: string): SocketService => {
  const service = getSocketService(serverUrl);
  service.connect();
  return service;
};
