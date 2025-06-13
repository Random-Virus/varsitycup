import React from 'react';
import { Trophy, Medal, Award, User, University, Target, BarChart3, Code2, Crown, Star, Zap, Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LeaderboardPage: React.FC = () => {
  const { participants, currentUser } = useApp();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-white" size={20} />;
      case 2:
        return <Medal className="text-white" size={20} />;
      case 3:
        return <Award className="text-white" size={20} />;
      default:
        return <div className="w-5 h-5 flex items-center justify-center bg-white/20 text-white font-bold text-xs font-display">{rank}</div>;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-l-4 border-white neon-glow bg-white/5';
      case 2:
        return 'border-l-4 border-white/70 bg-white/3';
      case 3:
        return 'border-l-4 border-white/50 bg-white/2';
      default:
        return 'border-l-4 border-transparent hover:border-white/30 hover:bg-white/5';
    }
  };

  return (
    <div className="min-h-screen bg-vscode-dark">
      {/* Futuristic background */}
      <div className="absolute inset-0 matrix-bg"></div>
      <div className="absolute inset-0 scanlines"></div>

      {/* VS Code-style layout */}
      <div className="flex h-screen relative z-10">
        {/* Activity Bar */}
        <div className="activity-bar">
          <div className="activity-bar-item">
            <Code2 size={24} />
          </div>
          <div className="activity-bar-item active">
            <BarChart3 size={24} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            LEADERBOARD
          </div>
          <div className="p-4">
            <div className="vscode-card p-4 mb-4 neon-glow terminal">
              <div className="pt-4">
                <h3 className="text-white font-bold mb-3 flex items-center font-display tracking-wider">
                  <Star className="mr-2" size={16} />
                  STATISTICS
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 font-display tracking-wider">TOTAL PARTICIPANTS:</span>
                    <span className="text-white font-bold font-mono">{participants.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 font-display tracking-wider">PROBLEMS SOLVED:</span>
                    <span className="text-white font-bold font-mono">{participants.reduce((sum, p) => sum + p.solvedProblems, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 font-display tracking-wider">HIGHEST SCORE:</span>
                    <span className="text-white font-bold font-mono">{participants.length > 0 ? Math.max(...participants.map(p => p.score)) : 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-vscode-panel border-b border-vscode p-6">
            <h1 className="text-3xl font-bold gradient-text mb-2 font-display">
              GLOBAL RANKINGS
            </h1>
            <p className="text-white/60 font-bold font-display tracking-wider">
              ELITE CODERS COMPETING FOR DIGITAL SUPREMACY
            </p>
          </div>

          {/* Top 3 Podium */}
          {participants.length >= 3 && (
            <div className="bg-vscode-editor/50 border-b border-vscode p-8">
              <div className="flex justify-center items-end space-x-8 max-w-4xl mx-auto">
                {/* Second Place */}
                <div className="vscode-card p-6 text-center hover-lift border-l-4 border-white/70 terminal">
                  <div className="pt-4">
                    <div className="flex justify-center mb-4">
                      <Medal className="text-white" size={40} />
                    </div>
                    <h3 className="font-bold text-white mb-1 font-display tracking-wider">{participants[1].name.toUpperCase()}</h3>
                    <p className="text-white/60 text-sm mb-2 font-display tracking-wider">{participants[1].university.toUpperCase()}</p>
                    <p className="text-xl font-bold text-white font-mono">{participants[1].score}</p>
                    <p className="text-white/60 text-sm font-display tracking-wider">POINTS</p>
                  </div>
                </div>

                {/* First Place */}
                <div className="vscode-card p-8 text-center transform scale-110 hover-lift border-l-4 border-white shadow-2xl neon-glow holographic terminal">
                  <div className="pt-4">
                    <div className="flex justify-center mb-4">
                      <Crown className="text-white" size={48} />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-1 font-display tracking-wider">{participants[0].name.toUpperCase()}</h3>
                    <p className="text-white/60 mb-2 font-display tracking-wider">{participants[0].university.toUpperCase()}</p>
                    <p className="text-2xl font-bold text-white font-mono neon-glow">{participants[0].score}</p>
                    <p className="text-white/60 font-display tracking-wider">POINTS</p>
                  </div>
                </div>

                {/* Third Place */}
                <div className="vscode-card p-6 text-center hover-lift border-l-4 border-white/50 terminal">
                  <div className="pt-4">
                    <div className="flex justify-center mb-4">
                      <Award className="text-white" size={40} />
                    </div>
                    <h3 className="font-bold text-white mb-1 font-display tracking-wider">{participants[2].name.toUpperCase()}</h3>
                    <p className="text-white/60 text-sm mb-2 font-display tracking-wider">{participants[2].university.toUpperCase()}</p>
                    <p className="text-xl font-bold text-white font-mono">{participants[2].score}</p>
                    <p className="text-white/60 text-sm font-display tracking-wider">POINTS</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Editor Tabs */}
          <div className="editor-tabs">
            <div className="editor-tab active">
              <span className="font-display tracking-wider">RANKINGS.JSON</span>
            </div>
          </div>

          {/* Full Leaderboard */}
          <div className="flex-1 bg-vscode-editor overflow-y-auto">
            <div className="p-6">
              <div className="vscode-card overflow-hidden shadow-2xl terminal">
                <div className="bg-vscode-panel p-4 border-b border-vscode pt-8">
                  <h2 className="text-xl font-bold text-white font-display tracking-wider">
                    COMPLETE RANKINGS
                  </h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-vscode-panel border-b border-vscode">
                      <tr>
                        <th className="text-left py-4 px-6 font-bold text-white font-display tracking-wider">RANK</th>
                        <th className="text-left py-4 px-6 font-bold text-white font-display tracking-wider">PARTICIPANT</th>
                        <th className="text-left py-4 px-6 font-bold text-white font-display tracking-wider">INSTITUTION</th>
                        <th className="text-left py-4 px-6 font-bold text-white font-display tracking-wider">SCORE</th>
                        <th className="text-left py-4 px-6 font-bold text-white font-display tracking-wider">SOLVED</th>
                        <th className="text-left py-4 px-6 font-bold text-white font-display tracking-wider">PENALTY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((participant, index) => {
                        const rank = index + 1;
                        const isCurrentUser = currentUser?.id === participant.id;
                        
                        return (
                          <tr 
                            key={participant.id} 
                            className={`border-b border-vscode transition-all duration-200 hover:bg-white/5 ${
                              isCurrentUser ? 'bg-white/10 neon-glow' : ''
                            } ${getRankClass(rank)}`}
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                {getRankIcon(rank)}
                                <span className="font-mono text-white font-bold">#{rank}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/10 flex items-center justify-center">
                                  <User className="text-white" size={18} />
                                </div>
                                <div>
                                  <p className="font-bold text-white font-display tracking-wider">
                                    {participant.name.toUpperCase()}
                                    {isCurrentUser && (
                                      <span className="ml-2 px-2 py-1 bg-white/20 text-white text-xs font-bold neon-glow font-display tracking-wider">
                                        YOU
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-white/60 text-sm font-mono">ID: {participant.studentNumber}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2">
                                <University className="text-white/60" size={16} />
                                <span className="text-white text-sm font-bold font-display tracking-wider">{participant.university.toUpperCase()}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2">
                                <Target className="text-white" size={16} />
                                <span className="text-lg font-bold text-white font-mono neon-glow">
                                  {participant.score}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-white font-bold font-mono text-lg neon-glow">
                                {participant.solvedProblems}
                              </span>
                            </td>
                            <td className="py-4 px-6">
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
                  <div className="text-center py-12">
                    <Trophy className="text-white/60 mx-auto mb-4" size={48} />
                    <p className="text-white/60 font-bold font-display tracking-wider">NO PARTICIPANTS YET. BE THE FIRST TO REGISTER!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="status-bar">
            <div className="flex items-center space-x-4">
              <div className="status-bar-item">
                <span>PARTICIPANTS: {participants.length}</span>
              </div>
              <div className="status-bar-item">
                <span>JSON</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="status-bar-item">
                <span>LAST UPDATED: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;