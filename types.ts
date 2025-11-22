export enum ChannelType {
  TEXT = 'TEXT',
  INFO = 'INFO',
  VOICE = 'VOICE'
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  isBot?: boolean;
  color?: string;
  role?: UserRole;
  online?: boolean; // Estado de conexión (true = conectado, false = registrado pero desconectado)
  lastSeen?: string; // ISO timestamp de última conexión
  socketId?: string; // ID de socket actual (solo si está online)
  isGuest?: boolean; // Indica si es un usuario invitado (no autenticado con Discord)
}

export interface Message {
  id: string;
  userId: string;
  username?: string;
  avatar?: string;
  content: string;
  timestamp: Date | string;
  channelId: string;
  attachments?: string[];
}

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  userHasVoted?: boolean;
  createdAt: Date;
  author: string;
}

export interface ChannelData {
  id: string;
  name: string;
  description?: string;
}

export enum AppView {
  CHAT = 'CHAT',
  WHO_WE_ARE = 'WHO_WE_ARE',
  VOTING = 'VOTING'
}