import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { UserProvider } from './context/UserContext';
import ErrorBoundary from './components/ErrorBoundary';

// Componentes principales
import HomeScreen from './components/HomeScreen';
import Impostor from './components/Impostor';
import WhoWeAre from './components/WhoWeAre';
import Voting from './components/Voting';
import UPGNews from './components/UPGNews';
import HallOfFame from './components/HallOfFame';
import Layout from './components/Layout';
import ChatPage from './components/ChatPage';
import UsernamePrompt from './components/UsernamePrompt';

function Home() {
  const navigate = useNavigate();
  const { currentUser, isLoading, loginWithDiscord, loginAsGuest } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-discord-bg text-white">
        Cargando...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <UsernamePrompt
        onSubmit={loginAsGuest}
        onLoginWithDiscord={loginWithDiscord}
      />
    );
  }

  const handleJoinServer = (gameType: string, roomId: string, password?: string) => {
    navigate('/impostor', { state: { autoJoinRoomId: roomId, autoJoinPassword: password } });
  };

  const handleCreateServer = (gameType: string) => {
    navigate('/impostor', { state: { createServer: true, gameType } });
  };

  return (
    <HomeScreen
      onGoToChat={() => navigate('/chat')}
      onGoToWhoWeAre={() => navigate('/quienes-somos')}
      onJoinServer={handleJoinServer}
      onCreateServer={handleCreateServer}
      onOpenSidebar={() => {
        // Sidebar control is handled by Layout currently.
        console.log("Open sidebar requested");
      }}
    />
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <SocketProvider>
            <UserProvider>
              <Routes>
                <Route path="/" element={
                  <Layout activeSection="home">
                    <Home />
                  </Layout>
                } />
                <Route path="/chat" element={
                  <Layout activeSection="chat">
                    <ChatPage />
                  </Layout>
                } />
                <Route path="/impostor" element={
                  <Layout activeSection="impostor">
                    <Impostor />
                  </Layout>
                } />
                <Route path="/quienes-somos" element={
                  <Layout activeSection="who">
                    <WhoWeAre />
                  </Layout>
                } />
                <Route path="/votaciones" element={
                  <Layout activeSection="voting">
                    <Voting />
                  </Layout>
                } />
                <Route path="/noticias" element={
                  <Layout activeSection="news">
                    <UPGNews />
                  </Layout>
                } />
                <Route path="/salon-fama" element={
                  <Layout activeSection="hall_of_fame">
                    <HallOfFame />
                  </Layout>
                } />
              </Routes>
              <Toaster position="top-right" theme="dark" richColors />
            </UserProvider>
          </SocketProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
