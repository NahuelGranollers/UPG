import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

interface PlayerInfo {
  id: string;
  username: string;
}

export default function ImpostorGame({ onClose }: { onClose?: () => void }) {
  const { socket } = useSocket();
  const { currentUser } = useAuth();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [joined, setJoined] = useState(false);
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [isHost, setIsHost] = useState(false);
  const [assigned, setAssigned] = useState<{ role: 'impostor' | 'crewmate'; word: string | null } | null>(null);
  const [pendingAssigned, setPendingAssigned] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [voting, setVoting] = useState(false);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [votingResult, setVotingResult] = useState<any>(null);
  const [spinning, setSpinning] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    const onRoomState = (data: any) => {
      setPlayers(data.players || []);
      setIsHost(data.hostId === currentUser?.id);
      setJoined(true);
    };

    const onAssign = (data: any) => {
      // data: { role, word }
      // show spinner animation then reveal
      setPendingAssigned(data);
      setSpinning(true);
      setTimeout(() => {
        setAssigned(data);
        setStatusMessage(data.role === 'impostor' ? 'Eres el IMPOSTOR' : `Palabra: ${data.word}`);
        setSpinning(false);
      }, 1400);
    };

    const onTurn = (d: any) => {
      setCurrentTurn(d.currentTurn || null);
    };

    const onVotingStart = (d: any) => {
      setVoting(true);
      setMyVote(null);
      setVoteCounts({});
      setVotingResult(null);
      setStatusMessage('Votación iniciada');
    };

    const onVotingUpdate = (d: any) => {
      setVoteCounts(d.counts || {});
    };

    const onVotingResult = (d: any) => {
      setVoting(false);
      setVotingResult(d);
      if (d.eliminated) setStatusMessage(`Jugador eliminado: ${d.eliminated}`);
      else setStatusMessage('Empate — nadie ha sido eliminado');
    };

    const onStarted = (d: any) => {
      setStatusMessage('Ronda iniciada');
    };

    const onReveal = (d: any) => {
      setStatusMessage(`Impostor: ${d.impostorId} — palabra: ${d.word}`);
    };

    socket.on('impostor:room-state', onRoomState);
    socket.on('impostor:assign', onAssign);
    socket.on('impostor:started', onStarted);
    socket.on('impostor:reveal', onReveal);
    socket.on('impostor:turn', onTurn);
    socket.on('impostor:voting-start', onVotingStart);
    socket.on('impostor:voting-update', onVotingUpdate);
    socket.on('impostor:voting-result', onVotingResult);
    socket.on('impostor:restarted', () => {
      setAssigned(null);
      setPendingAssigned(null);
      setVoting(false);
      setMyVote(null);
      setVoteCounts({});
      setVotingResult(null);
      setStatusMessage('Ronda reiniciada');
    });

    return () => {
      socket.off('impostor:room-state', onRoomState);
      socket.off('impostor:assign', onAssign);
      socket.off('impostor:started', onStarted);
      socket.off('impostor:reveal', onReveal);
      socket.off('impostor:turn', onTurn);
      socket.off('impostor:voting-start', onVotingStart);
      socket.off('impostor:voting-update', onVotingUpdate);
      socket.off('impostor:voting-result', onVotingResult);
      socket.off('impostor:restarted');
    };
  }, [socket, currentUser]);

  const handleCreate = () => {
    if (!socket) return;
    if (!roomId || !username) return setStatusMessage('Room y nombre requeridos');
    socket.emit('impostor:create-room', { roomId, userId: currentUser?.id || `guest-${Math.random().toString(36).slice(2,8)}`, username }, (res: any) => {
      if (res && res.ok) {
        setJoined(true);
        setStatusMessage('Sala creada. Esperando jugadores...');
      } else {
        setStatusMessage(res?.error || 'Error creando sala');
      }
    });
  };

  const handleJoin = () => {
    if (!socket) return;
    if (!roomId || !username) return setStatusMessage('Room y nombre requeridos');
    socket.emit('impostor:join-room', { roomId, userId: currentUser?.id || `guest-${Math.random().toString(36).slice(2,8)}`, username }, (res: any) => {
      if (res && res.ok) {
        setJoined(true);
        setStatusMessage('Te has unido a la sala');
      } else {
        setStatusMessage(res?.error || 'Error al unirse');
      }
    });
  };

  const handleLeave = () => {
    if (!socket) return;
    socket.emit('impostor:leave-room', { roomId, userId: currentUser?.id || '' }, (res: any) => {
      setJoined(false);
      setPlayers([]);
      setAssigned(null);
      setIsHost(false);
      setStatusMessage('Has salido de la sala');
    });
  };

  const handleStart = () => {
    if (!socket) return;
    socket.emit('impostor:start', { roomId, hostId: currentUser?.id || '' }, (res: any) => {
      if (res && res.ok) {
        setStatusMessage('Ronda iniciada — revisa tu carta');
      } else {
        setStatusMessage(res?.error || 'No se pudo iniciar');
      }
    });
  };

  const handleReveal = () => {
    if (!socket) return;
    socket.emit('impostor:reveal', { roomId, hostId: currentUser?.id || '' }, (res: any) => {
      if (res && res.ok) setStatusMessage('Impostor revelado');
      else setStatusMessage(res?.error || 'Error al revelar');
    });
  };

  const handleStartVoting = () => {
    if (!socket) return;
    socket.emit('impostor:start-voting', { roomId, hostId: currentUser?.id || '' }, (res: any) => {
      if (res && res.ok) setStatusMessage('Votación iniciada');
      else setStatusMessage(res?.error || 'No se pudo iniciar votación');
    });
  };

  const handleCastVote = (targetId: string) => {
    if (!socket) return;
    socket.emit('impostor:cast-vote', { roomId, voterId: currentUser?.id || '', votedId: targetId }, (res: any) => {
      if (res && res.ok) setMyVote(targetId);
      else setStatusMessage(res?.error || 'Error votando');
    });
  };

  const handleEndVoting = () => {
    if (!socket) return;
    socket.emit('impostor:end-voting', { roomId, hostId: currentUser?.id || '' }, (res: any) => {
      if (res && res.ok) setStatusMessage('Votación cerrada');
      else setStatusMessage(res?.error || 'Error cerrando votación');
    });
  };

  const handleRestart = () => {
    if (!socket) return;
    socket.emit('impostor:restart', { roomId, hostId: currentUser?.id || '' }, (res: any) => {
      if (res && res.ok) setStatusMessage('Ronda reiniciada, espera al host para iniciar otra');
      else setStatusMessage(res?.error || 'No se pudo reiniciar');
    });
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0b0d0f] text-white">
      <div className="max-w-5xl mx-auto w-full py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold">Impostor — Sala</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => { if (joined) handleLeave(); if (onClose) onClose(); }} className="text-xs px-3 py-2 rounded bg-gray-700">{joined ? 'Salir' : 'Cerrar'}</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#0f1316] p-4 rounded-lg border border-gray-800">
            {!joined && (
              <div className="space-y-3">
                <input className="w-full p-3 rounded bg-[#0b0f12] border border-gray-700" placeholder="ID de sala" value={roomId} onChange={e => setRoomId(e.target.value)} />
                <input className="w-full p-3 rounded bg-[#0b0f12] border border-gray-700" placeholder="Tu nombre" value={username} onChange={e => setUsername(e.target.value)} />
                <div className="flex gap-3">
                  <button onClick={handleCreate} className="flex-1 px-4 py-3 rounded bg-green-600 text-white">Crear sala</button>
                  <button onClick={handleJoin} className="flex-1 px-4 py-3 rounded bg-blue-600 text-white">Unirse</button>
                </div>
              </div>
            )}

            {joined && (
              <div className="space-y-4">
                <div className="text-sm text-gray-300">Sala: <strong>{roomId}</strong></div>
                <div className="text-sm text-gray-300">Host: {isHost ? 'Tú' : 'Otro'}</div>

                <div className="bg-[#071017] p-3 rounded max-h-[320px] overflow-auto border border-gray-800">
                  <div className="text-sm text-gray-400 mb-2">Jugadores:</div>
                  <ul className="text-sm space-y-2">
                    {players.map(p => (
                      <li key={p.id} className="flex items-center justify-between">
                        <span>{p.username}</span>
                        <span className="text-xs text-gray-400">{p.id === currentUser?.id ? 'Tú' : ''}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {spinning && (
                    <div className="flex items-center justify-center p-6">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border-4 border-t-transparent border-white animate-spin mb-3" />
                        <div className="text-sm text-gray-300">Asignando carta...</div>
                      </div>
                    </div>
                  )}

                  {!spinning && (
                    <>
                      {assigned ? (
                        <div className="p-4 rounded bg-[#051018] text-center border border-gray-800">
                          <div className="text-sm text-gray-400 mb-2">Tu carta</div>
                          <div className="text-2xl font-bold">{assigned.role === 'impostor' ? 'IMPOSTOR' : assigned.word}</div>
                          <div className="text-sm text-gray-400 mt-2">{statusMessage}</div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400">Aún no hay ronda — espera al host para iniciar</div>
                      )}

                      {/* Voting area */}
                      <div className="mt-4 bg-[#071018] p-3 rounded border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-gray-300">Votación</div>
                          <div className="text-xs text-gray-400">{voting ? 'Activa' : 'Inactiva'}</div>
                        </div>

                        {voting ? (
                          <div className="space-y-2">
                            {players.map(p => (
                              <div key={p.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm`}>{p.username.charAt(0).toUpperCase()}</div>
                                  <div>{p.username}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="text-sm text-gray-400">{voteCounts[p.id] || 0}</div>
                                  <button disabled={!!myVote} onClick={() => handleCastVote(p.id)} className={`px-2 py-1 rounded text-xs ${myVote ? 'bg-gray-600 text-gray-300' : 'bg-blue-600 text-white'}`}>{myVote === p.id ? 'Votado' : 'Votar'}</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">No hay votación en curso.</div>
                        )}

                        {votingResult && (
                          <div className="mt-3 text-sm text-gray-300">
                            Resultado: {votingResult.eliminated ? `Eliminado ${votingResult.eliminated}` : 'Empate'}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3 mt-3">
                        {isHost && !assigned && <button onClick={handleStart} className="flex-1 px-4 py-3 rounded bg-yellow-600 text-black">Iniciar ronda</button>}
                        {isHost && assigned && <button onClick={handleReveal} className="flex-1 px-4 py-3 rounded bg-red-600 text-white">Revelar impostor</button>}
                        {isHost && <button onClick={handleStartVoting} className="px-3 py-2 rounded bg-indigo-600 text-white">Iniciar votación</button>}
                        {isHost && voting && <button onClick={handleEndVoting} className="px-3 py-2 rounded bg-red-500 text-white">Terminar votación</button>}
                        {isHost && <button onClick={handleRestart} className="px-3 py-2 rounded bg-gray-600 text-white">Reiniciar ronda</button>}
                        <button onClick={handleLeave} className="flex-1 px-4 py-3 rounded bg-gray-700">Abandonar</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {statusMessage && <div className="mt-4 text-sm text-gray-300">{statusMessage}</div>}
          </div>

          <aside className="hidden md:block bg-[#071018] p-4 rounded-lg border border-gray-800">
            <h4 className="text-sm font-semibold mb-3">Reglas rápidas</h4>
            <ul className="text-sm space-y-2 text-gray-400">
              <li>- Todos reciben la misma palabra excepto 1 impostor.</li>
              <li>- El impostor no recibe la palabra.</li>
              <li>- Discusión abierta, luego el host puede revelar.</li>
              <li>- No hay eliminación automática todavía (opcional).</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
