import React, { useState } from 'react';
import { Poll } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Voting: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: 'p1',
      title: '¿Qué juego jugamos este fin de semana?',
      description: 'El ganador será el main event del sábado noche.',
      options: [
        { id: 'o1', text: 'Minecraft Hardcore', votes: 45 },
        { id: 'o2', text: 'Among Us', votes: 20 },
        { id: 'o3', text: 'Valorant Custom', votes: 85 },
        { id: 'o4', text: 'Gartic Phone', votes: 15 },
      ],
      createdAt: new Date(),
      author: 'AdminZero'
    },
    {
      id: 'p2',
      title: 'Mejor horario para torneos',
      description: 'Queremos saber qué hora les viene mejor a todos.',
      options: [
        { id: 'o1', text: 'Sábados 18:00 EST', votes: 120 },
        { id: 'o2', text: 'Domingos 16:00 EST', votes: 95 },
      ],
      createdAt: new Date(),
      author: 'ModLuna',
      userHasVoted: true
    }
  ]);

  const handleVote = (pollId: string, optionId: string) => {
      setPolls(prev => prev.map(poll => {
          if (poll.id !== pollId || poll.userHasVoted) return poll;
          
          return {
              ...poll,
              userHasVoted: true,
              options: poll.options.map(opt => 
                  opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
              )
          };
      }));
  };

  const COLORS = ['#5865F2', '#23a559', '#da373c', '#f0b232'];

  return (
    <div className="flex-1 bg-discord-chat overflow-y-auto custom-scrollbar p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <span className="mr-3 text-discord-green">📊</span>
            Votaciones Activas
        </h1>
        <p className="text-discord-text-muted mb-8">
            Decide el futuro de UPG. Tu voz cuenta.
        </p>

        <div className="space-y-8">
            {polls.map(poll => {
                const totalVotes = poll.options.reduce((acc, curr) => acc + curr.votes, 0);

                return (
                    <div key={poll.id} className="bg-[#2b2d31] rounded-lg p-6 border border-gray-800 shadow-lg">
                        <div className="flex items-center mb-4">
                             <img src={`https://ui-avatars.com/api/?name=${poll.author}&background=random`} alt="Avatar" className="w-8 h-8 rounded-full mr-3" />
                             <div>
                                 <h3 className="text-lg font-bold text-white">{poll.title}</h3>
                                 <p className="text-sm text-discord-text-muted">{poll.description}</p>
                             </div>
                             <div className="ml-auto text-xs text-discord-text-muted font-mono">
                                {totalVotes} votos
                             </div>
                        </div>

                        {!poll.userHasVoted ? (
                            <div className="grid gap-3">
                                {poll.options.map(option => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleVote(poll.id, option.id)}
                                        className="w-full text-left px-4 py-3 bg-[#1e1f22] hover:bg-discord-blurple hover:text-white text-discord-text-normal rounded transition-colors font-medium group"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{option.text}</span>
                                            <span className="opacity-0 group-hover:opacity-100 text-xs">Votar</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4">
                                <div className="h-48 w-full mb-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={poll.options} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#404249" horizontal={false} />
                                            <XAxis type="number" hide />
                                            <YAxis type="category" dataKey="text" width={100} tick={{fill: '#dbdee1', fontSize: 12}} />
                                            <Tooltip 
                                                contentStyle={{backgroundColor: '#1e1f22', border: 'none', borderRadius: '4px'}} 
                                                itemStyle={{color: '#dbdee1'}}
                                                cursor={{fill: '#3f4147'}}
                                            />
                                            <Bar dataKey="votes" radius={[0, 4, 4, 0]}>
                                                {poll.options.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="text-center text-green-400 text-sm font-bold bg-green-400/10 py-2 rounded border border-green-400/20">
                                    ¡Gracias por tu voto!
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default Voting;