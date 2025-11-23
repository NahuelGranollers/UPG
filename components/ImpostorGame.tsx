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

  useEffect(() => {
    if (!socket) return;

    const onRoomState = (data: any) => {
      setPlayers(data.players || []);
      setIsHost(data.hostId === currentUser?.id);
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
      setStatusMessage('Votación iniciada');
    };

    const onVotingUpdate = (d: any) => {
      setVoteCounts(d.counts || {});
    };

    const onVotingResult = (d: any) => {
      setVoting(false);
      setVotingResult(d);
      if (d.eliminated) {
        // Show different behaviour depending if eliminated was the impostor
        if (d.wasImpostor) {
          setStatusMessage(`El jugador ${d.eliminated} era el impostor — ronda terminada`);
          // 'impostor:reveal' will also be emitted by server, client will receive it and show overlay
        } else {
          setStatusMessage(`El jugador ${d.eliminated} era INOCENTE — la ronda continúa`);
          // Temporarily show an innocent reveal overlay
          setRevealedPlayer({ id: d.eliminated, wasImpostor: false, word: null });
          setTimeout(() => setRevealedPlayer(null), 4500);
        }
      } else {
        setStatusMessage('Empate — nadie ha sido eliminado');
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
      setCardRevealed(false);
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
      else setStatusMessage(res?.error === 'dead_cannot_vote' ? 'Los muertos no pueden votar' : res?.error || 'Error votando');
    });
  };

  const handleEndVoting = () => {
    if (!socket) return;
    socket.emit('impostor:end-voting', { roomId, hostId: currentUser?.id || '' }, (res: any) => {
      if (res && res.ok) setStatusMessage('Votación cerrada');
      else setStatusMessage(res?.error || 'Error cerrando votación');
    });
  };

  const handleRevealAll = () => {
    if (!socket) return;
    socket.emit('impostor:reveal-all', { roomId, hostId: currentUser?.id || '' }, (res: any) => {
      if (res && res.ok) setStatusMessage('Todas las cartas reveladas');
      else setStatusMessage(res?.error || 'Error al revelar todas las cartas');
    });
  };

  const handleRestart = () => {
    if (!socket) return;
    socket.emit('impostor:restart', { roomId, hostId: currentUser?.id || '' }, (res: any) => {
      if (res && res.ok) setStatusMessage('Ronda reiniciada, espera al host para iniciar otra');
      else setStatusMessage(res?.error || 'No se pudo reiniciar');
    });
  };

  const handleAddWord = (word: string) => {
    if (!socket || !word.trim()) return;
    socket.emit('impostor:add-word', { roomId, userId: currentUser?.id || '', word: word.trim() }, (res: any) => {
      if (!res || !res.ok) {
        setStatusMessage(res?.error || 'Error agregando palabra');
      }
    });
  };

  const currentPlayer = players.find(p => p.id === currentUser?.id);
  const isCurrentPlayerAlive = !currentPlayer?.revealedInnocent;

  return (
    <div className="flex flex-col min-h-screen w-full impostor-theme">
      <div className="max-w-5xl mx-auto w-full py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold">Impostor — Sala</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => { if (joined) handleLeave(); if (onClose) onClose(); }} className="glass-btn">{joined ? 'Salir' : 'Cerrar'}</button>
          </div>
        </div>

        <div className="impostor-grid">
          <div className="panel-glass lg liquid-glass bg-transparent">
            {!joined && (
              <div className="space-y-3">
                <input id="impostor-roomid" className="w-full p-3 rounded glass-input border border-gray-700" placeholder="ID de sala" value={roomId} onChange={e => setRoomId(e.target.value)} />
                <input id="impostor-username" className="w-full p-3 rounded glass-input border border-gray-700" placeholder="Tu nombre" value={username} onChange={e => setUsername(e.target.value)} />
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

                <div className="panel-glass lg liquid-glass bg-transparent p-3 rounded max-h-[320px] overflow-auto" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-sm text-gray-400 mb-2">Jugadores:</div>
                  <ul className="text-sm space-y-2">
                    {players.map(p => (
                      <li key={p.id} className="flex items-center justify-between overflow-hidden">
                          <span className="text-white" title={p.username}>{p.username}</span>
                          <span className="text-xs text-gray-400">{p.id === currentUser?.id ? 'Tú' : ''}</span>
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
                    <div className="bg-white/5 border border-green-600 text-white p-4 rounded-lg shadow-lg backdrop-blur">
                      <div className="text-sm uppercase text-green-300 font-semibold">Revelación</div>
                      <div className="text-lg font-bold mt-1">{players.find(p => p.id === revealedPlayer.id)?.username || revealedPlayer.id}</div>
                      <div className="text-sm text-gray-300 mt-1">Era inocente — la ronda continúa</div>
                    </div>
                  </div>
                )}
                {/* Reveal overlay */}
                {/* Reveal overlay (full screen, with confetti) */}
                {showReveal && revealInfo && (
                  <div className="impostor-reveal-overlay">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                    <div className={`impostor-reveal-panel liquid-glass relative z-60 border border-gray-700`} style={{ position: 'relative' }}>
                      <div className="text-sm text-gray-400 mb-2">REVELACIÓN</div>
                      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
                        <div className="w-28 h-28 rounded-full avatar-accent flex items-center justify-center text-5xl font-extrabold shadow-lg">{(players.find(p => p.id === revealInfo.impostorId)?.username || (revealInfo.impostorId || '?!')).charAt(0).toUpperCase()}</div>
                        <div className="text-left">
                          <div className="text-lg text-red-300 uppercase font-extrabold">Impostor</div>
                          <div className="text-3xl font-bold mt-1">{players.find(p => p.id === revealInfo.impostorId)?.username || revealInfo.impostorId}</div>
                          <div className="text-sm text-contrast mt-2">Palabra: <span className="font-semibold">{revealInfo.word}</span></div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-center gap-3">
                        <button onClick={() => { setRevealPhase('exit'); setTimeout(() => { setShowReveal(false); setRevealInfo(null); setRevealPhase('hidden'); }, 300); }} className="px-4 py-2 rounded btn-lock-accent">Cerrar</button>
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
                    <div className="flex items-center justify-center p-6">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border-4 border-t-transparent border-white animate-spin mb-3" />
                        <div className="text-sm text-contrast">Asignando carta...</div>
                      </div>
                    </div>
                  )}

                  {!spinning && (
                    <>
                      {/* Assignment card with flip animation */}
                      <div className={`impostor-card mb-4 ${cardRevealed ? 'flipped' : ''}`} style={{ maxWidth: 520 }}>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => setCardRevealed(r => !r)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCardRevealed(r => !r); } }}
                          className="impostor-card-inner"
                          aria-pressed={cardRevealed}
                        >
                          <div className="impostor-card-face impostor-card-front liquid-glass p-4 rounded-lg border border-gray-800" style={{ position: 'relative', cursor: 'pointer' }}>
                            <div className="text-sm text-contrast mb-2">Tu carta</div>
                            <div className="text-xl font-semibold text-contrast">Haz click o presiona Enter para voltear</div>
                          </div>
                          <div className="impostor-card-face impostor-card-back liquid-glass p-4 rounded-lg border border-gray-800" style={{ position: 'relative', cursor: 'pointer' }}>
                            {assigned ? (
                              <div className="text-center w-full">
                                <div className="text-sm text-gray-400 mb-2">Tu carta</div>
                                <div className="text-2xl font-bold">{assigned.role === 'impostor' ? 'IMPOSTOR' : assigned.word}</div>
                                <div className="text-sm text-gray-600 mt-2">{statusMessage}</div>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-400">Aún no hay ronda — espera al host para iniciar</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Voting area */}
                      <div className="panel-glass lg liquid-glass mt-4 p-3 rounded" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-contrast">Votación</div>
                          <div className="text-xs text-gray-400">{voting ? 'Activa' : 'Inactiva'}</div>
                        </div>

                        {voting ? (
                          <div className="space-y-2">
                            {players.map(p => {
                              const isDead = p.revealedInnocent;
                              const isCurrentUser = p.id === currentUser?.id;
                              const canVote = !myVote && !isCurrentPlayerAlive && !isDead;
                              return (
                                <div key={p.id} className={`flex items-center justify-between overflow-hidden ${isDead ? 'opacity-50' : ''}`}>
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full ${isDead ? 'bg-gray-500' : 'bg-gray-700'} text-white flex items-center justify-center text-sm`}>{p.username.charAt(0).toUpperCase()}</div>
                                    <div className={`text-white ${isDead ? 'text-gray-500 line-through' : ''}`} title={p.username}>{p.username}{isDead ? ' (Muerto)' : ''}</div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="text-sm text-gray-600">{voteCounts[p.id] || 0}</div>
                                    {!isDead && (
                                      <button disabled={!canVote} onClick={() => handleCastVote(p.id)} className={`glass-btn ${canVote ? 'primary' : ''}`} aria-pressed={!!myVote}>{myVote === p.id ? 'Votado' : 'Votar'}</button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">No hay votación en curso.</div>
                        )}

                        {votingResult && (
                          <div className="mt-3 text-sm text-contrast">
                            Resultado: {votingResult.eliminated ? `Eliminado ${votingResult.eliminated}` : 'Empate'}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3 mt-3">
                        {isHost && !assigned && <button onClick={handleStart} className="glass-btn primary flex-1">Iniciar ronda</button>}
                        {isHost && assigned && <button onClick={handleRevealAll} className="glass-btn flex-1" style={{ background: 'linear-gradient(180deg,#ff8c00,#ff4500)', color: 'white' }}>Revelar todas las cartas</button>}
                        {isHost && <button onClick={handleStartVoting} className="glass-btn">Iniciar votación</button>}
                        {isHost && voting && <button onClick={handleEndVoting} className="glass-btn" style={{ background: '#ff6b6b', color: 'white' }}>Terminar votación</button>}
                        {isHost && <button onClick={handleRestart} className="glass-btn">Reiniciar ronda</button>}
                        <button onClick={handleLeave} className="glass-btn flex-1">Abandonar</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {statusMessage && <div className="mt-4 text-sm text-contrast">{statusMessage}</div>}
          </div>

          {/* Right column: Turn order */}
          <aside className="bg-[#071017] p-4 rounded-lg border border-gray-800 overflow-hidden">
            <div className="text-sm text-white mb-2">Orden de turnos</div>
            {turnOrder.length === 0 ? (
              <div className="text-sm text-gray-300">Aún no hay orden de turnos</div>
            ) : (
              <ol className="list-decimal list-inside text-sm space-y-2">
                {turnOrder.map((id, idx) => {
                  const p = players.find(x => x.id === id);
                  const name = p ? p.username : id;
                  const active = id === currentTurn;
                  const revealed = revealInfo && revealInfo.impostorId === id;
                  const innocentRevealed = p && (p as any).revealedInnocent;
                  return (
                    <li key={id} className={`turn-item flex items-center justify-between px-2 py-1 rounded overflow-hidden ${active ? 'active bg-discord-blurple text-white' : innocentRevealed ? 'innocent text-gray-100' : 'text-white'}`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs ${active ? 'bg-white text-black' : revealed ? 'bg-red-600 text-white ring-2 ring-red-400' : innocentRevealed ? 'bg-green-600 text-white ring-2 ring-green-400' : 'bg-gray-700 text-gray-200'}`}>{name.charAt(0).toUpperCase()}</div>
                        <div className="text-white" title={name}>{name}</div>
                      </div>
                      <div className="text-xs text-gray-400">{idx + 1}</div>
                    </li>
                  );
                })}
              </ol>
            )}

            {revealedRoles && (
              <div className="mt-4">
                <div className="text-sm text-white mb-2">Cartas reveladas</div>
                <ul className="text-sm space-y-2">
                  {revealedRoles.map((player: any, index: number) => (
                    <li key={index} className="flex items-center justify-between px-2 py-1 rounded bg-gray-800 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${!player.wasInnocent ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>{player.name.charAt(0).toUpperCase()}</div>
                        <div className="text-gray-200" title={player.name}>{player.name}</div>
                      </div>
                      <div className={`text-xs font-semibold ${!player.wasInnocent ? 'text-red-400' : 'text-blue-400'}`}>{player.wasInnocent ? 'INOCENTE' : 'IMPOSTOR'}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>

      {joined && (
        <div className="fixed bottom-4 right-4 bg-black/50 p-4 rounded-lg border border-gray-700 max-w-xs">
          <div className="text-sm text-white mb-2">Agregar palabra</div>
          <input
            type="text"
            placeholder="Nueva palabra"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
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
    </div>
  );
}
