export enum ChannelType {
  TEXT = 'TEXT',
  INFO = 'INFO',
  VOICE = 'VOICE'
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  isBot?: boolean;
  color?: string;
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
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

export enum AppView {
  CHAT = 'CHAT',
  WHO_WE_ARE = 'WHO_WE_ARE',
  VOTING = 'VOTING'
}