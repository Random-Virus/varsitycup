import React from 'react';
import { Trophy, Medal, Award, User, University, Target, BarChart3, Code2, Crown, Star, Zap, Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LeaderboardPage: React.FC = () => {
  const { participants, currentUser } = useApp();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-vscode-yellow" size={20} />;
      case 2:
        return <Medal className="text-gray-300" size={20} />;
      case 3:
        return <Award className="text-vscode-orange" size={20} />;
      default:
        return <div className="w-5 h-5 flex items-center justify-center bg-vscode-blue/20 rounded-full text-vscode-blue font-bold text-xs">{rank}</div>;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-l-4 border-vscode-yellow neon-blue bg-gradient-to-r from-yellow-500/10 to-amber-500/10';
      case 2:
        return 'border-l-4 border-gray-300 bg-gradient-to-r from-gray-500/10 to-slate-500/10';
      case 3:
        return 'border-l-4 border-vscode-orange bg-gradient-to-r from-orange-500/10 to-red-500/10';
      default:
        return 'border-l-4 border-transparent hover:border-vscode-blue/30 hover:bg-vscode-blue/5';
    }
  };

  return (
    <div className="min-h-screen bg-vscode-dark">
      {/* Animated background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-vscode-blue rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-vscode-green rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-vscode-purple rounded-full animate-pulse delay-2000"></div>
      </div>

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
            Leaderboard
          </div>
          <div className="p-4">
            <div className="vscode-card p-4 mb-4 neon-blue">
              <h3 className="text-vscode-blue font-bold mb-3 flex items-center">
                <Star className="mr-2" size={16} />
                Statistics
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-vscode-comment">Total Participants:</span>
                  <span className="text-vscode-foreground font-semibold font-mono">{participants.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-vscode-comment">Problems Solved:</span>
                  <span className="text-vscode-green font-semibold font-mono">{participants.reduce((sum, p) => sum + p.solvedProblems, 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-vscode-comment">Highest Score:</span>
                  <span className="text-vscode-yellow font-semibold font-mono">{participants.length > 0 ? Math.max(...participants.map(p => p.score)) : 0}</span>
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
              Global Rankings
            </h1>
            <p className="text-vscode-comment font-medium">
              Elite coders competing for digital supremacy
            </p>
          </div>

          {/* Top 3 Podium */}
          {participants.length >= 3 && (
            <div className="bg-vscode-editor/50 border-b border-vscode p-8">
              <div className="flex justify-center items-end space-x-8 max-w-4xl mx-auto">
                {/* Second Place */}
                <div className="vscode-card p-6 text-center hover-lift border-l-4 border-gray-300">
                  <div className="flex justify-center mb-4">
                    <Medal className="text-gray-300" size={40} />
                  </div>
                  <h3 className="font-bold text-gray-300 mb-1">{participants[1].name}</h3>
                  <p className="text-vscode-comment text-sm mb-2">{participants[1].university}</p>
                  <p className="text-xl font-bold text-gray-300 font-mono">{participants[1].score}</p>
                  <p className="text-vscode-comment text-sm">points</p>
                </div>

                {/* First Place */}
                <div className="vscode-card p-8 text-center transform scale-110 hover-lift border-l-4 border-vscode-yellow shadow-2xl neon-blue holographic">
                  <div className="flex justify-center mb-4">
                    <Crown className="text-vscode-yellow" size={48} />
                  </div>
                  <h3 className="font-bold text-vscode-yellow text-lg mb-1 font-display">{participants[0].name}</h3>
                  <p className="text-vscode-comment mb-2">{participants[0].university}</p>
                  <p className="text-2xl font-bold text-vscode-yellow font-mono glow-blue">{participants[0].score}</p>
                  <p className="text-vscode-comment">points</p>
                </div>

                {/* Third Place */}
                <div className="vscode-card p-6 text-center hover-lift border-l-4 border-vscode-orange">
                  <div className="flex justify-center mb-4">
                    <Award className="text-vscode-orange" size={40} />
                  </div>
                  <h3 className="font-bold text-vscode-orange mb-1">{participants[2].name}</h3>
                  <p className="text-vscode-comment text-sm mb-2">{participants[2].university}</p>
                  <p className="text-xl font-bold text-vscode-orange font-mono">{participants[2].score}</p>
                  <p className="text-vscode-comment text-sm">points</p>
                </div>
              </div>
            </div>
          )}

          {/* Editor Tabs */}
          <div className="editor-tabs">
            <div className="editor-tab active">
              <span>Rankings.json</span>
            </div>
          </div>

          {/* Full Leaderboard */}
          <div className="flex-1 bg-vscode-editor overflow-y-auto">
            <div className="p-6">
              <div className="vscode-card overflow-hidden shadow-2xl terminal">
                <div className="bg-vscode-panel p-4 border-b border-vscode pt-8">
                  <h2 className="text-xl font-bold text-vscode-blue font-display">
                    Complete Rankings
                  </h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-vscode-panel border-b border-vscode">
                      <tr>
                        <th className="text-left py-4 px-6 font-bold text-vscode-blue">Rank</th>
                        <th className="text-left py-4 px-6 font-bold text-vscode-blue">Participant</th>
                        <th className="text-left py-4 px-6 font-bold text-vscode-blue">Institution</th>
                        <th className="text-left py-4 px-6 font-bold text-vscode-blue">Score</th>
                        <th className="text-left py-4 px-6 font-bold text-vscode-blue">Solved</th>
                        <th className="text-left py-4 px-6 font-bold text-vscode-blue">Penalty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((participant, index) => {
                        const rank = index + 1;
                        const isCurrentUser = currentUser?.id === participant.id;
                        
                        return (
                          <tr 
                            key={participant.id} 
                            className={`border-b border-vscode transition-all duration-200 hover:bg-vscode-blue/5 ${
                              isCurrentUser ? 'bg-vscode-blue/10 neon-blue' : ''
                            } ${getRankClass(rank)}`}
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                {getRankIcon(rank)}
                                <span className="font-mono text-vscode-foreground font-semibold">#{rank}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-vscode-blue/20 to-vscode-purple/20 rounded-full flex items-center justify-center neon-blue">
                                  <User className="text-vscode-blue" size={18} />
                                </div>
                                <div>
                                  <p className="font-semibold text-vscode-foreground">
                                    {participant.name}
                                    {isCurrentUser && (
                                      <span className="ml-2 px-2 py-1 bg-vscode-blue/20 text-vscode-blue text-xs rounded-full font-bold neon-blue">
                                        YOU
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-vscode-comment text-sm font-mono">ID: {participant.studentNumber}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2">
                                <University className="text-vscode-comment" size={16} />
                                <span className="text-vscode-foreground text-sm font-medium">{participant.university}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2">
                                <Target className="text-vscode-blue" size={16} />
                                <span className="text-lg font-bold text-vscode-blue font-mono glow-blue">
                                  {participant.score}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-vscode-green font-bold font-mono text-lg glow-green">
                                {participant.solvedProblems}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-vscode-red font-mono font-semibold glow-red">
                                {participant.penaltyTime}m
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
                    <Trophy className="text-vscode-comment mx-auto mb-4" size={48} />
                    <p className="text-vscode-comment font-medium">No participants yet. Be the first to register!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="status-bar">
            <div className="flex items-center space-x-4">
              <div className="status-bar-item">
                <span>Participants: {participants.length}</span>
              </div>
              <div className="status-bar-item">
                <span>JSON</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="status-bar-item">
                <span>Last Updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;