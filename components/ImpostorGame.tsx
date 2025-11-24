import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

interface PlayerInfo {
  id: string;
  username: string;
  revealedInnocent?: boolean;
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
  const [totalVotes, setTotalVotes] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<string | null>(null);
  const [turnOrder, setTurnOrder] = useState<string[]>([]);
  const [revealInfo, setRevealInfo] = useState<{ impostorId: string | null; word?: string | null } | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const [revealPhase, setRevealPhase] = useState<'hidden' | 'enter' | 'visible' | 'exit'>('hidden');
  const [revealedPlayer, setRevealedPlayer] = useState<{ id: string; wasImpostor: boolean; word?: string | null } | null>(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [revealedRoles, setRevealedRoles] = useState<Record<string, 'impostor' | 'crewmate'> | null>(null);
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [theme, setTheme] = useState<'upg' | 'neon' | 'retro'>('upg');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    if (!socket) return;

    const onRoomState = (data: any) => {
      setPlayers(data.players || []);
      // Check if current user is host (either by userId or currentUser.id)
      const isUserHost = data.hostId === userId || (userId === '' && data.hostId === currentUser?.id);
      setIsHost(isUserHost);
      setJoined(true);
      setCustomWords(data.customWords || []);
    };

    const onAssign = (data: any) => {
      // data: { role, word }
      // show spinner animation then reveal
      setPendingAssigned(data);
      setSpinning(true);
      setTimeout(() => {
        setAssigned(data);
        setCardRevealed(true);
        setStatusMessage(data.role === 'impostor' ? 'Eres el IMPOSTOR' : `Palabra: ${data.word}`);
        setSpinning(false);
      }, 1400);
    };

    const onTurn = (d: any) => {
      setCurrentTurn(d.currentTurn || null);
    };

    const onTurnOrder = (d: any) => {
      setTurnOrder(d.turnOrder || []);
    };

    const onVotingStart = (d: any) => {
      setVoting(true);
      setMyVote(null);
      setVoteCounts({});
      setVotingResult(null);
      setTotalVotes(0);
      setStatusMessage('Votación iniciada');
      setNotifications(prev => [...prev, { id: Date.now(), type: 'warning', message: '¡Votación iniciada!', timestamp: new Date() }]);
      setTimeout(() => setNotifications(prev => prev.slice(1)), 5000);
    };

    const onVotingUpdate = (d: any) => {
      setVoteCounts(d.counts || {});
      setTotalVotes(d.totalVotes || 0);
    };

    const onVotingResult = (d: any) => {
      setVoting(false);
      setVotingResult(d);
      if (d.eliminated) {
        // Show different behaviour depending if eliminated was the impostor
        if (d.wasImpostor) {
          setStatusMessage(`El jugador ${d.eliminated} era el impostor — ronda terminada`);
          setNotifications(prev => [...prev, { id: Date.now(), type: 'success', message: `¡${d.eliminated} era el impostor! Ronda terminada.`, timestamp: new Date() }]);
        } else {
          setStatusMessage(`El jugador ${d.eliminated} era INOCENTE — la ronda continúa`);
          setNotifications(prev => [...prev, { id: Date.now(), type: 'error', message: `${d.eliminated} era inocente. La ronda continúa.`, timestamp: new Date() }]);
        }
        setTimeout(() => setNotifications(prev => prev.slice(1)), 5000);
        // 'impostor:reveal' will also be emitted by server, client will receive it and show overlay
      } else {
        setStatusMessage('Empate — nadie ha sido eliminado');
        setNotifications(prev => [...prev, { id: Date.now(), type: 'info', message: 'Empate — nadie eliminado.', timestamp: new Date() }]);
        setTimeout(() => setNotifications(prev => prev.slice(1)), 5000);
      }
    };

    const onStarted = (d: any) => {
      setStatusMessage('Ronda iniciada');
    };

    const onRevealAll = (d: any) => {
      setRevealedRoles(d.players);
      setStatusMessage('Todas las cartas reveladas');
    };

    const onPlayerLeft = (d: any) => {
      setStatusMessage(`${d.username} ha abandonado la sala`);
      setNotifications(prev => [...prev, { id: Date.now(), type: 'info', message: `${d.username} ha abandonado la sala`, timestamp: new Date() }]);
      setTimeout(() => setNotifications(prev => prev.slice(1)), 5000); // Auto remove after 5s
    };

    socket.on('impostor:room-state', onRoomState);
    socket.on('impostor:assign', onAssign);
    socket.on('impostor:started', onStarted);
    socket.on('impostor:reveal-all', onRevealAll);
    socket.on('impostor:player-left', onPlayerLeft);
    socket.on('impostor:turn', onTurn);
    socket.on('impostor:turn-order', onTurnOrder);
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
      setTotalVotes(0);
      setStatusMessage('Ronda reiniciada');
      setCardRevealed(false);
      setRevealedRoles(null);
    });

    return () => {
      socket.off('impostor:room-state', onRoomState);
      socket.off('impostor:assign', onAssign);
      socket.off('impostor:started', onStarted);
      socket.off('impostor:turn', onTurn);
      socket.off('impostor:turn-order', onTurnOrder);
      socket.off('impostor:voting-start', onVotingStart);
      socket.off('impostor:voting-update', onVotingUpdate);
      socket.off('impostor:voting-result', onVotingResult);
      socket.off('impostor:reveal-all');
      socket.off('impostor:player-left');
      socket.off('impostor:restarted');
    };
  }, [socket, currentUser]);

  const handleCreate = () => {
    if (!socket) return;
    if (!roomId || !username) return setStatusMessage('Room y nombre requeridos');
    const generatedUserId = userId || currentUser?.id || `guest-${Math.random().toString(36).slice(2,8)}`;
    setUserId(generatedUserId);
    socket.emit('impostor:create-room', { roomId, userId: generatedUserId, username }, (res: any) => {
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
    const generatedUserId = userId || currentUser?.id || `guest-${Math.random().toString(36).slice(2,8)}`;
    setUserId(generatedUserId);
    socket.emit('impostor:join-room', { roomId, userId: generatedUserId, username }, (res: any) => {
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
    socket.emit('impostor:leave-room', { roomId, userId }, (res: any) => {
      setJoined(false);
      setPlayers([]);
      setAssigned(null);
      setIsHost(false);
      setStatusMessage('Has salido de la sala');
      setCardRevealed(false);
      setUserId('');
    });
  };


  const handleStart = () => {
    if (!socket) return;
    socket.emit('impostor:start', { roomId, hostId: userId }, (res: any) => {
      if (res && res.ok) {
        setStatusMessage('Ronda iniciada — revisa tu carta');
      } else {
        setStatusMessage(res?.error || 'No se pudo iniciar');
      }
    });
  };

  const handleStartVoting = () => {
    if (!socket) return;
    socket.emit('impostor:start-voting', { roomId, hostId: userId }, (res: any) => {
      if (res && res.ok) setStatusMessage('Votación iniciada');
      else setStatusMessage(res?.error || 'No se pudo iniciar votación');
    });
  };

  const handleCastVote = (targetId: string) => {
    if (!socket) return;
    socket.emit('impostor:cast-vote', { roomId, voterId: userId, votedId: targetId }, (res: any) => {
      if (res && res.ok) setMyVote(targetId);
      else setStatusMessage(res?.error === 'dead_cannot_vote' ? 'Los muertos no pueden votar' : res?.error || 'Error votando');
    });
  };

  const handleEndVoting = () => {
    if (!socket) return;
    socket.emit('impostor:end-voting', { roomId, hostId: userId }, (res: any) => {
      if (res && res.ok) setStatusMessage('Votación cerrada');
      else setStatusMessage(res?.error || 'Error cerrando votación');
    });
  };

  const handleRevealAll = () => {
    if (!socket) return;
    socket.emit('impostor:reveal-all', { roomId, hostId: userId }, (res: any) => {
      if (res && res.ok) setStatusMessage('Todas las cartas reveladas');
      else setStatusMessage(res?.error || 'Error al revelar todas las cartas');
    });
  };

  const handleRestart = () => {
    if (!socket) return;
    socket.emit('impostor:restart', { roomId, hostId: userId }, (res: any) => {
      if (res && res.ok) setStatusMessage('Ronda reiniciada, espera al host para iniciar otra');
      else setStatusMessage(res?.error || 'No se pudo reiniciar');
    });
  };

  const handleAddWord = (word: string) => {
    if (!socket || !word.trim()) return;
    socket.emit('impostor:add-word', { roomId, userId, word: word.trim() }, (res: any) => {
      if (!res || !res.ok) {
        setStatusMessage(res?.error || 'Error agregando palabra');
      }
    });
  };

  const currentPlayer = players.find(p => p.id === userId);
  const isCurrentPlayerAlive = !currentPlayer?.revealedInnocent;

  // Calculate if all alive players have voted
  const alivePlayersCount = players.filter(p => !p.revealedInnocent).length;
  const allAliveVoted = totalVotes >= alivePlayersCount;

  return (
    <div className={`flex flex-col min-h-screen w-full bg-discord-chat`}>
      <div className="w-full py-4 px-2 sm:py-6 sm:px-4 lg:py-8 lg:px-6">
        <div className="impostor-header">
          <div className="impostor-header-top">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-discord-text-header">Impostor — Sala</h1>
            <div className="impostor-controls">
              <select value={theme} onChange={e => setTheme(e.target.value as any)} className="discord-input p-2 text-sm">
                <option value="upg">UPG</option>
                <option value="neon">Neon</option>
                <option value="retro">Retro</option>
              </select>
              <button onClick={() => { if (joined) handleLeave(); if (onClose) onClose(); }} className="discord-button secondary">Cerrar</button>
            </div>
          </div>
        </div>

        <div className="impostor-grid">
          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="impostor-notifications">
              {notifications.map((notif) => (
                <div key={notif.id} className="impostor-notification bg-blue-600 text-white p-3 rounded shadow-lg">
                  {notif.message}
                </div>
              ))}
            </div>
          )}

          <div className="panel-glass lg liquid-glass bg-[#071017]">
            {!joined && (
              <div className="space-y-4 sm:space-y-6">
                <input id="impostor-roomid" className="w-full discord-input" placeholder="ID de sala" value={roomId} onChange={e => setRoomId(e.target.value)} />
                <input id="impostor-username" className="w-full discord-input" placeholder="Tu nombre" value={username} onChange={e => setUsername(e.target.value)} />
                <div className="impostor-button-row">
                  <button onClick={handleCreate} className="flex-1 discord-button success">Crear sala</button>
                  <button onClick={handleJoin} className="flex-1 discord-button">Unirse</button>
                </div>
              </div>
            )}

            {joined && (
              <div className="space-y-6">
                <div className="text-lg text-discord-text-normal">Sala: <strong className="text-discord-text-header">{roomId}</strong></div>
                <div className="text-lg text-discord-text-normal">Host: <span className="text-discord-text-header">{isHost ? 'Tú' : 'Otro'}</span></div>

                <div className="discord-panel max-h-[400px] overflow-auto">
                  <div className="text-lg text-discord-text-normal mb-3 font-semibold">Jugadores:</div>
                  <ul className="impostor-player-list text-base space-y-3">
                    {players.map(p => (
                      <li key={p.id} className="flex items-center justify-between py-2">
                          <span className="text-discord-text-normal break-all font-semibold text-lg" style={{ textShadow: '0 0 3px rgba(0,0,0,0.8)' }} title={p.username}>{p.username}</span>
                          <span className="text-sm text-discord-text-muted">{p.id === userId ? 'Tú' : ''}</span>
                        </li>
                    ))}
                  </ul>
                </div>

                {/* Palabras personalizadas ocultas - funcionalidad sigue activa */}
                {/* {customWords.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm text-gray-400 mb-2">Palabras personalizadas ({customWords.length}):</div>
                    <div className="text-xs text-gray-300 break-words">{customWords.join(', ')}</div>
                  </div>
                )} */}

                {/* Turn order moved to right column on wide screens */}
                {/* (right column will show the turn order) */}
                {/* Innocent reveal overlay (temporary) */}
                {revealedPlayer && !revealedPlayer.wasImpostor && (
                  <div className={`fixed bottom-8 right-8 z-50`}>
                    <div className="bg-gray-800/90 border border-green-600 text-white p-4 rounded-lg shadow-lg backdrop-blur">
                      <div className="text-sm uppercase text-green-300 font-semibold">Revelación</div>
                      <div className="text-lg font-bold mt-1">{players.find(p => p.id === revealedPlayer.id)?.username || revealedPlayer.id}</div>
                      <div className="text-sm text-gray-300 mt-1">Era inocente — la ronda continúa</div>
                    </div>
                  </div>
                )}
                {/* Reveal overlay */}
                {showReveal && revealInfo && (
                  <div className="impostor-reveal-overlay">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                    <div className={`impostor-reveal-panel discord-glass relative z-60 border border-discord-hover`} style={{ position: 'relative' }}>
                      <div className="text-sm text-discord-text-muted mb-2">REVELACIÓN</div>
                      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
                        <div className="w-28 h-28 rounded-full avatar-accent flex items-center justify-center text-5xl font-extrabold shadow-lg">{(players.find(p => p.id === revealInfo.impostorId)?.username || (revealInfo.impostorId || '?!')).charAt(0).toUpperCase()}</div>
                        <div className="text-left">
                          <div className="text-lg text-red-300 uppercase font-extrabold">Impostor</div>
                          <div className="text-3xl font-bold mt-1">{players.find(p => p.id === revealInfo.impostorId)?.username || revealInfo.impostorId}</div>
                          <div className="text-sm text-discord-text-normal mt-2">Palabra: <span className="font-semibold">{revealInfo.word}</span></div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-center gap-3">
                        <button onClick={() => { setRevealPhase('exit'); setTimeout(() => { setShowReveal(false); setRevealInfo(null); setRevealPhase('hidden'); }, 300); }} className="discord-button secondary">Cerrar</button>
                      </div>
                      <div className="confetti" aria-hidden>
                        {Array.from({ length: 28 }).map((_, i) => {
                          const left = Math.random() * 100;
                          const delay = Math.random() * 400;
                          const bg = ['#FF6B6B','#FFB86B','#6BFFB8','#6BC8FF','#D56BFF','#FFD56B'][i % 6];
                          return <span key={i} style={{ left: `${left}%`, top: `${-10 - Math.random()*20}%`, background: bg, animationDelay: `${delay}ms` }} />;
                        })}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  {spinning && (
                    <div className="flex items-center justify-center p-8">
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full border-4 border-t-transparent border-discord-blurple animate-spin mb-4" />
                        <div className="text-lg text-discord-text-normal font-semibold">Asignando carta...</div>
                      </div>
                    </div>
                  )}

                  {!spinning && (
                    <>
                      {/* Assignment card with flip animation */}
                      <div className={`impostor-card mb-6 ${cardRevealed ? 'flipped' : ''}`} style={{ maxWidth: 600 }}>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => setCardRevealed(r => !r)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCardRevealed(r => !r); } }}
                          className="impostor-card-inner"
                          aria-pressed={cardRevealed}
                        >
                          <div className="impostor-card-face impostor-card-front discord-glass p-6 rounded-lg" style={{ position: 'relative', cursor: 'pointer' }}>
                            <div className="text-lg text-discord-text-normal mb-3 font-semibold">Tu carta</div>
                            <div className="text-xl font-semibold text-discord-text-normal">Haz click o presiona Enter para voltear</div>
                          </div>
                          <div className="impostor-card-face impostor-card-back discord-glass p-6 rounded-lg" style={{ position: 'relative', cursor: 'pointer' }}>
                            {assigned ? (
                              <div className="text-center w-full">
                                <div className="text-lg text-discord-text-normal mb-3 font-semibold">Tu carta</div>
                                <div className="text-3xl font-bold text-yellow-400">{assigned.role === 'impostor' ? 'IMPOSTOR' : assigned.word}</div>
                                <div className="text-base text-discord-text-muted mt-3">{statusMessage}</div>
                              </div>
                            ) : (
                              <div className="text-center w-full">
                                <div className="text-lg text-discord-text-normal font-semibold mb-3">Aún no hay ronda</div>
                                <div className="text-base text-discord-text-muted">{isHost ? 'Haz click en "Iniciar ronda" para comenzar' : 'Espera al host para iniciar'}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Voting area */}
                      <div className="discord-panel mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-lg text-discord-text-normal font-semibold">Votación</div>
                          <div className="text-base text-discord-text-muted">
                            {voting ? `Votos: ${totalVotes}/${alivePlayersCount}` : 'Inactiva'}
                          </div>
                        </div>

                        {voting ? (
                          <div className="space-y-3">
                            {players.map(p => {
                              const isDead = p.revealedInnocent;
                              const isCurrentUser = p.id === userId;
                              const canVote = !myVote && isCurrentPlayerAlive && !isDead;
                              return (
                                <div key={p.id} className={`impostor-voting-item ${isDead ? 'opacity-50' : ''}`}>
                                  <div className="impostor-voting-info flex items-center gap-3 flex-1 min-w-0">
                                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-lg font-semibold flex-shrink-0 ${isDead ? 'bg-gray-500' : 'bg-discord-sidebar'} text-discord-text-normal`}>{p.username.charAt(0).toUpperCase()}</div>
                                    <div className={`text-discord-text-normal break-all font-semibold text-sm sm:text-lg flex-1 min-w-0 ${isDead ? 'text-discord-text-muted line-through' : ''}`} style={{ textShadow: '0 0 3px rgba(0,0,0,0.8)' }} title={p.username}>{p.username}{isDead ? ' (Muerto)' : ''}</div>
                                  </div>
                                  <div className="impostor-voting-actions flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                    <div className="text-sm sm:text-lg text-discord-text-muted font-semibold">{voteCounts[p.id] || 0}</div>
                                    {!isDead && (
                                      <button disabled={!canVote} onClick={() => handleCastVote(p.id)} className={`discord-button ${canVote ? '' : 'opacity-50 cursor-not-allowed'}`}>{myVote === p.id ? 'Votado' : 'Votar'}</button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-lg text-discord-text-muted font-semibold">No hay votación en curso.</div>
                        )}

                        {votingResult && (
                          <div className="mt-4 text-lg text-discord-text-normal font-semibold">
                            Resultado: {votingResult.eliminated ? `Eliminado ${votingResult.eliminated}` : 'Empate'}
                          </div>
                        )}
                      </div>

                      <div className="impostor-button-grid mt-6">
                        {isHost && !assigned && <button onClick={handleStart} className="discord-button success">Iniciar ronda</button>}
                        {isHost && assigned && <button onClick={handleRevealAll} className="discord-button" style={{ background: 'linear-gradient(180deg,#ff8c00,#ff4500)', color: 'white' }}>Revelar todas las cartas</button>}
                        {isHost && <button onClick={handleStartVoting} className="discord-button">Iniciar votación</button>}
                        {isHost && voting && <button onClick={handleEndVoting} disabled={!allAliveVoted} className={`discord-button danger ${allAliveVoted ? '' : 'opacity-50 cursor-not-allowed'}`}>Terminar votación ({totalVotes}/{alivePlayersCount})</button>}
                        {isHost && <button onClick={handleRestart} className="discord-button secondary">Reiniciar ronda</button>}
                        <button onClick={handleLeave} className="discord-button secondary">Abandonar</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {statusMessage && <div className="mt-4 text-lg text-discord-text-normal font-semibold">{statusMessage}</div>}
          </div>

          <aside className="bg-discord-sidebar p-6 rounded-lg border border-discord-hover overflow-hidden">
            <div className="text-lg text-discord-text-normal mb-4 font-semibold">Orden de turnos</div>
            {turnOrder.length === 0 ? (
              <div className="text-lg text-discord-text-muted font-semibold">Aún no hay orden de turnos</div>
            ) : (
              <ol className="list-decimal list-inside text-base space-y-3">
                {turnOrder.map((id, idx) => {
                  const p = players.find(x => x.id === id);
                  const name = p ? p.username : id;
                  const active = id === currentTurn;
                  const revealed = revealInfo && revealInfo.impostorId === id;
                  const innocentRevealed = p && (p as any).revealedInnocent;
                  return (
                    <li key={id} className={`turn-item flex items-center justify-between px-3 py-2 rounded overflow-hidden ${active ? 'bg-blue-600 text-white border border-blue-400' : innocentRevealed ? 'bg-green-900 text-white border border-green-500' : 'bg-discord-surface text-discord-text-normal border border-discord-hover'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${active ? 'bg-yellow-400 text-black font-bold ring-2 ring-yellow-300' : revealed ? 'bg-red-600 text-white ring-2 ring-red-400' : innocentRevealed ? 'bg-green-600 text-white ring-2 ring-green-400' : 'bg-discord-chat text-discord-text-normal'}`}>{name.charAt(0).toUpperCase()}</div>
                        <div className="text-discord-text-normal break-all font-semibold text-lg" style={{ textShadow: '0 0 3px rgba(0,0,0,0.8)' }} title={name}>{name}</div>
                      </div>
                      <div className="text-base text-discord-text-muted font-semibold">{idx + 1}</div>
                    </li>
                  );
                })}
              </ol>
            )}

            {revealedRoles && (
              <div className="mt-6">
                <div className="text-lg text-discord-text-normal mb-3 font-semibold">Cartas reveladas</div>
                <ul className="text-base space-y-3">
                  {revealedRoles.map((player: any, index: number) => (
                    <li key={index} className="flex items-center justify-between px-3 py-2 rounded bg-discord-surface border border-discord-hover overflow-hidden">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${!player.wasInnocent ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>{player.name.charAt(0).toUpperCase()}</div>
                        <div className="text-discord-text-normal break-all font-semibold text-lg" style={{ textShadow: '0 0 3px rgba(0,0,0,0.8)' }} title={player.name}>{player.name}</div>
                      </div>
                      <div className={`text-base font-semibold ${!player.wasInnocent ? 'text-red-400' : 'text-blue-400'}`}>{player.wasInnocent ? 'INOCENTE' : 'IMPOSTOR'}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {joined && (
              <div className="mt-6">
                <div className="text-sm sm:text-lg text-discord-text-normal mb-2 sm:mb-3 font-semibold">Agregar palabra</div>
                <input
                  type="text"
                  placeholder="Nueva palabra"
                  className="w-full discord-input text-sm sm:text-lg"
                  autoComplete="off"
                  spellCheck="false"
                  data-form-type="other"
                  aria-autocomplete="none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddWord(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
