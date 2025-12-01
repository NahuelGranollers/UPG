import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import ServerBrowser from './ServerBrowser';
import CreateServerModal from './CreateServerModal';
import ImpostorGame from './ImpostorGame';

interface GameServersProps {
  gameType: 'impostor';
  currentUser: any;
  onJoinServer: (roomId: string, password?: string) => void;
}

const GameServers: React.FC<GameServersProps> = ({ gameType, currentUser, onJoinServer }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joiningServer, setJoiningServer] = useState<{
    roomId: string;
    password?: string;
    botCount?: number;
  } | null>(null);
  const { socket } = useSocket();

  const handleCreateServer = async (serverData: {
    name: string;
    password?: string;
    botCount?: number;
  }) => {
    if (!socket || !currentUser) return;

    try {
      // Generate a unique room ID
      const roomId = `${gameType}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

      const createData: any = {
        roomId,
        userId: currentUser.id,
        username: currentUser.username,
        name: serverData.name,
      };

      if (serverData.password) {
        createData.password = serverData.password;
      }

      socket.emit(`${gameType}:create-room`, createData, (response: any) => {
        if (response && response.ok) {
          setShowCreateModal(false);
          // The server will automatically join the room, so we don't need to call onJoinServer here
        } else {
          alert(`Error creando servidor: ${response?.error || 'Error desconocido'}`);
        }
      });
    } catch (error) {
      console.error('Error creating server:', error);
      alert('Error creando servidor');
    }
  };

  const handleJoinServer = (roomId: string, password?: string) => {
    setJoiningServer({ roomId, password });
  };

  const handleBackToBrowser = () => {
    setJoiningServer(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {joiningServer ? (
        <ImpostorGame
          autoJoinRoomId={joiningServer.roomId}
          autoJoinPassword={joiningServer.password}
          onClose={handleBackToBrowser}
        />
      ) : (
        <div className="p-4">
          <div className="max-w-6xl mx-auto">
            <ServerBrowser
              gameType={gameType}
              onJoinServer={handleJoinServer}
              onCreateServer={() => setShowCreateModal(true)}
            />

            {showCreateModal && (
              <CreateServerModal
                gameType={gameType}
                onCreate={handleCreateServer}
                onCancel={() => setShowCreateModal(false)}
                onJoinServer={(gameType, roomId, password) => handleJoinServer(roomId, password)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameServers;