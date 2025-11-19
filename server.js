import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://tu-dominio.com'] 
      : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Verificar si existe el build
const distPath = join(__dirname, 'dist');
const hasBuild = existsSync(distPath);

if (hasBuild) {
  app.use(express.static(distPath));
  console.log('📦 Sirviendo build de producción desde /dist');
} else {
  console.log('⚠️  No se encontró /dist - Ejecuta "npm run build" o usa "npm run dev" para desarrollo');
}

// Estado del servidor
const connectedUsers = new Map();
const channelMessages = new Map();
const userChannels = new Map();

// Inicializar canales
['general', 'random', 'ayuda', 'anuncios'].forEach(channel => {
  channelMessages.set(channel, []);
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log(`✅ Usuario conectado: ${socket.id}`);

  socket.on('user:join', (userData) => {
    const user = {
      ...userData,
      socketId: socket.id,
      connectedAt: new Date()
    };
    
    connectedUsers.set(socket.id, user);
    io.emit('users:update', Array.from(connectedUsers.values()));
    console.log(`👤 Usuario registrado: ${user.username} (${socket.id})`);
  });

  socket.on('channel:join', ({ channelId, userId }) => {
    const previousChannel = userChannels.get(userId);
    
    if (previousChannel) {
      socket.leave(previousChannel);
    }
    
    socket.join(channelId);
    userChannels.set(userId, channelId);
    
    const history = channelMessages.get(channelId) || [];
    socket.emit('channel:history', {
      channelId,
      messages: history
    });
    
    console.log(`📢 Usuario ${userId} se unió al canal: ${channelId}`);
  });

  socket.on('message:send', (messageData) => {
    const { channelId, content, userId, username, avatar, timestamp } = messageData;
    
    const message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      channelId,
      content,
      userId,
      username,
      avatar,
      timestamp: timestamp || new Date().toISOString(),
      attachments: messageData.attachments || []
    };
    
    if (!channelMessages.has(channelId)) {
      channelMessages.set(channelId, []);
    }
    channelMessages.get(channelId).push(message);
    
    if (channelMessages.get(channelId).length > 100) {
      channelMessages.get(channelId).shift();
    }
    
    io.to(channelId).emit('message:received', message);
    console.log(`💬 [${channelId}] ${username}: ${content.substring(0, 50)}`);
  });

  socket.on('typing:start', ({ channelId, userId, username }) => {
    socket.to(channelId).emit('typing:user', { userId, username, isTyping: true });
  });

  socket.on('typing:stop', ({ channelId, userId }) => {
    socket.to(channelId).emit('typing:user', { userId, isTyping: false });
  });

  socket.on('voice:join', ({ channelName, userId }) => {
    socket.join(`voice-${channelName}`);
    io.emit('voice:update', { userId, channelName, action: 'join' });
    console.log(`🎤 ${userId} se unió a voz: ${channelName}`);
  });

  socket.on('voice:leave', ({ channelName, userId }) => {
    socket.leave(`voice-${channelName}`);
    io.emit('voice:update', { userId, channelName: null, action: 'leave' });
    console.log(`🔇 ${userId} salió de voz: ${channelName}`);
  });

  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    
    if (user) {
      connectedUsers.delete(socket.id);
      userChannels.delete(user.id);
      io.emit('users:update', Array.from(connectedUsers.values()));
      io.emit('user:disconnect', { userId: user.id });
      console.log(`❌ Usuario desconectado: ${user.username} (${socket.id})`);
    }
  });
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    connectedUsers: connectedUsers.size,
    channels: Array.from(channelMessages.keys()),
    uptime: process.uptime(),
    hasBuild
  });
});

app.get('/api/channels/:channelId/messages', (req, res) => {
  const { channelId } = req.params;
  const messages = channelMessages.get(channelId) || [];
  res.json({ channelId, messages });
});

// Servir React app SOLO si existe el build
if (hasBuild) {
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.json({
      message: 'Servidor WebSocket funcionando',
      note: 'Ejecuta "npm run build" para generar el frontend, o usa "npm run dev" en otra terminal',
      socketUrl: `http://localhost:${PORT}`,
      health: '/api/health'
    });
  });
}

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 UPG Community Hub Server          ║
║  📡 Server: http://localhost:${PORT}     ║
║  🔌 Socket.IO: Ready                  ║
║  📦 Build: ${hasBuild ? 'Found' : 'Not found'}                   ║
╚════════════════════════════════════════╝
  `);
  
  if (!hasBuild) {
    console.log('\n💡 Para desarrollo:\n');
    console.log('   Terminal 1: npm run dev    (Frontend - Puerto 5173)');
    console.log('   Terminal 2: npm run server (Backend - Puerto 3000)\n');
    console.log('💡 Para producción:\n');
    console.log('   npm run build && npm run server\n');
  }
});

export default httpServer;
