import React from 'react';
import { Trophy, Medal, Award, User, University, Target, BarChart3, Code2, Crown, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LeaderboardPage: React.FC = () => {
  const { participants, currentUser } = useApp();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-white" size={16} />;
      case 2:
        return <Medal className="text-white" size={16} />;
      case 3:
        return <Award className="text-white" size={16} />;
      default:
        return <div className="w-4 h-4 flex items-center justify-center bg-white/20 text-white font-bold text-xs font-display">{rank}</div>;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-l-2 border-white neon-glow bg-white/5';
      case 2:
        return 'border-l-2 border-white/70 bg-white/3';
      case 3:
        return 'border-l-2 border-white/50 bg-white/2';
      default:
        return 'border-l-2 border-transparent hover:border-white/30 hover:bg-white/5';
    }
  };

  return (
    <div className="min-h-screen bg-vscode-dark">
      {/* Futuristic background */}
      <div className="absolute inset-0 matrix-bg"></div>
      <div className="absolute inset-0 scanlines"></div>

      {/* Compact VS Code-style layout */}
      <div className="flex h-screen relative z-10">
        {/* Compact Activity Bar */}
        <div className="bg-black/95 w-8 border-r border-white/10">
          <div className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white cursor-pointer">
            <Code2 size={16} />
          </div>
          <div className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white cursor-pointer border-l-2 border-white">
            <BarChart3 size={16} />
          </div>
        </div>

        {/* Compact Sidebar */}
        <div className="bg-black/95 border-r border-white/10 w-48">
          <div className="p-2 text-xs font-bold text-white/80 bg-black/90 border-b border-white/10 font-display tracking-wider">
            LEADERBOARD
          </div>
          <div className="p-2">
            <div className="vscode-card p-2 mb-2 neon-glow terminal">
              <div className="pt-2">
                <h3 className="text-white font-bold mb-2 flex items-center font-display tracking-wider text-xs">
                  <Star className="mr-1" size={12} />
                  STATS
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 font-display tracking-wider">PARTICIPANTS:</span>
                    <span className="text-white font-bold font-mono">{participants.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 font-display tracking-wider">SOLVED:</span>
                    <span className="text-white font-bold font-mono">{participants.reduce((sum, p) => sum + p.solvedProblems, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 font-display tracking-wider">TOP SCORE:</span>
                    <span className="text-white font-bold font-mono">{participants.length > 0 ? Math.max(...participants.map(p => p.score)) : 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Compact Header */}
          <div className="bg-black/90 border-b border-white/10 p-3">
            <h1 className="text-xl font-bold gradient-text font-display">
              GLOBAL RANKINGS
            </h1>
            <p className="text-white/60 font-bold font-display tracking-wider text-xs">
              ELITE CODERS COMPETING FOR DIGITAL SUPREMACY
            </p>
          </div>

          {/* Compact Top 3 Podium */}
          {participants.length >= 3 && (
            <div className="bg-black/50 border-b border-white/10 p-4">
              <div className="flex justify-center items-end space-x-4 max-w-3xl mx-auto">
                {/* Second Place */}
                <div className="vscode-card p-3 text-center hover-lift border-l-2 border-white/70 terminal">
                  <div className="pt-2">
                    <div className="flex justify-center mb-2">
                      <Medal className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-white text-xs font-display tracking-wider">{participants[1].name.toUpperCase()}</h3>
                    <p className="text-white/60 text-xs font-display tracking-wider">{participants[1].university.split(' ')[0].toUpperCase()}</p>
                    <p className="text-lg font-bold text-white font-mono">{participants[1].score}</p>
                    <p className="text-white/60 text-xs font-display tracking-wider">PTS</p>
                  </div>
                </div>

                {/* First Place */}
                <div className="vscode-card p-4 text-center transform scale-105 hover-lift border-l-2 border-white shadow-xl neon-glow holographic terminal">
                  <div className="pt-2">
                    <div className="flex justify-center mb-2">
                      <Crown className="text-white" size={32} />
                    </div>
                    <h3 className="font-bold text-white text-sm font-display tracking-wider">{participants[0].name.toUpperCase()}</h3>
                    <p className="text-white/60 text-xs font-display tracking-wider">{participants[0].university.split(' ')[0].toUpperCase()}</p>
                    <p className="text-xl font-bold text-white font-mono neon-glow">{participants[0].score}</p>
                    <p className="text-white/60 text-xs font-display tracking-wider">PTS</p>
                  </div>
                </div>

                {/* Third Place */}
                <div className="vscode-card p-3 text-center hover-lift border-l-2 border-white/50 terminal">
                  <div className="pt-2">
                    <div className="flex justify-center mb-2">
                      <Award className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-white text-xs font-display tracking-wider">{participants[2].name.toUpperCase()}</h3>
                    <p className="text-white/60 text-xs font-display tracking-wider">{participants[2].university.split(' ')[0].toUpperCase()}</p>
                    <p className="text-lg font-bold text-white font-mono">{participants[2].score}</p>
                    <p className="text-white/60 text-xs font-display tracking-wider">PTS</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compact Editor Tabs */}
          <div className="bg-black/90 border-b border-white/10 flex px-2">
            <div className="px-3 py-2 bg-black text-white text-xs font-display tracking-wider border-b-2 border-white">
              RANKINGS.JSON
            </div>
          </div>

          {/* Compact Full Leaderboard */}
          <div className="flex-1 bg-black overflow-y-auto">
            <div className="p-3">
              <div className="vscode-card overflow-hidden shadow-xl terminal">
                <div className="bg-black/90 p-2 border-b border-white/10 pt-4">
                  <h2 className="text-sm font-bold text-white font-display tracking-wider">
                    COMPLETE RANKINGS
                  </h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-black/90 border-b border-white/10">
                      <tr>
                        <th className="text-left py-2 px-3 font-bold text-white font-display tracking-wider">RANK</th>
                        <th className="text-left py-2 px-3 font-bold text-white font-display tracking-wider">PARTICIPANT</th>
                        <th className="text-left py-2 px-3 font-bold text-white font-display tracking-wider">INSTITUTION</th>
                        <th className="text-left py-2 px-3 font-bold text-white font-display tracking-wider">SCORE</th>
                        <th className="text-left py-2 px-3 font-bold text-white font-display tracking-wider">SOLVED</th>
                        <th className="text-left py-2 px-3 font-bold text-white font-display tracking-wider">PENALTY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((participant, index) => {
                        const rank = index + 1;
                        const isCurrentUser = currentUser?.id === participant.id;
                        
                        return (
                          <tr 
                            key={participant.id} 
                            className={`border-b border-white/10 transition-all duration-200 hover:bg-white/5 ${
                              isCurrentUser ? 'bg-white/10 neon-glow' : ''
                            } ${getRankClass(rank)}`}
                          >
                            <td className="py-2 px-3">
                              <div className="flex items-center space-x-2">
                                {getRankIcon(rank)}
                                <span className="font-mono text-white font-bold">#{rank}</span>
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-white/10 flex items-center justify-center">
                                  <User className="text-white" size={12} />
                                </div>
                                <div>
                                  <p className="font-bold text-white font-display tracking-wider">
                                    {participant.name.toUpperCase()}
                                    {isCurrentUser && (
                                      <span className="ml-1 px-1 py-0.5 bg-white/20 text-white text-xs font-bold neon-glow font-display tracking-wider">
                                        YOU
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-white/60 text-xs font-mono">ID: {participant.studentNumber}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center space-x-1">
                                <University className="text-white/60" size={12} />
                                <span className="text-white font-bold font-display tracking-wider">{participant.university.split(' ')[0].toUpperCase()}</span>
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <div className="flex items-center space-x-1">
                                <Target className="text-white" size={12} />
                                <span className="text-sm font-bold text-white font-mono neon-glow">
                                  {participant.score}
                                </span>
                              </div>
                            </td>
                            <td className="py-2 px-3">
                              <span className="text-white font-bold font-mono neon-glow">
                                {participant.solvedProblems}
                              </span>
                            </td>
                            <td className="py-2 px-3">
                              <span className="text-white font-mono font-bold">
                                {participant.penaltyTime}M
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                {participants.length === 0 && (
                  <div className="text-center py-8">
                    <Trophy className="text-white/60 mx-auto mb-2" size={32} />
                    <p className="text-white/60 font-bold font-display tracking-wider text-xs">NO PARTICIPANTS YET</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Compact Status Bar */}
          <div className="bg-white text-black h-6 text-xs flex items-center px-3 justify-between font-display tracking-wider">
            <div className="flex items-center space-x-3">
              <span>PARTICIPANTS: {participants.length}</span>
              <span>JSON</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>UPDATED: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;