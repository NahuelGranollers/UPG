import { io } from 'socket.io-client';

// Test SocketIO connection to production backend
const socket = io('https://api.unaspartidillas.online', {
  transports: ['polling'],
  secure: true,
  withCredentials: true,
  path: '/socket.io/',
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 3,
});

console.log('Testing SocketIO connection to production backend...');

socket.on('connect', () => {
  console.log('✅ SocketIO connected successfully!');
  console.log('Socket ID:', socket.id);

  // Test impostor:create-room event
  console.log('Testing impostor:create-room event...');
  socket.emit('impostor:create-room', {
    roomId: 'test-room-' + Date.now(),
    userId: 'test-user-' + Math.random().toString(36).slice(2, 8),
    username: 'TestUser'
  }, (response) => {
    console.log('Create room response:', response);
    socket.disconnect();
    process.exit(0);
  });

  // Set timeout in case no response
  setTimeout(() => {
    console.log('❌ No response to create-room event');
    socket.disconnect();
    process.exit(1);
  }, 5000);
});

socket.on('connect_error', (error) => {
  console.error('❌ SocketIO connection failed:', error.message);
  process.exit(1);
});

socket.on('disconnect', (reason) => {
  console.log('SocketIO disconnected:', reason);
});