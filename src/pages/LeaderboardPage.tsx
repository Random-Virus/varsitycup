import React from 'react';
import { Trophy, Medal, Award, User, University, Target, BarChart3 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LeaderboardPage: React.FC = () => {
  const { participants, currentUser } = useApp();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-vscode-yellow" size={20} />;
      case 2:
        return <Medal className="text-gray-300" size={20} />;
      case 3:
        return <Award className="text-vscode-orange" size={20} />;
      default:
        return <div className="w-5 h-5 flex items-center justify-center bg-vscode-blue/20 rounded text-vscode-blue font-bold text-xs">{rank}</div>;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-l-4 border-vscode-yellow bg-yellow-900/10';
      case 2:
        return 'border-l-4 border-gray-300 bg-gray-900/10';
      case 3:
        return 'border-l-4 border-vscode-orange bg-orange-900/10';
      default:
        return 'border-l-4 border-transparent';
    }
  };

  return (
    <div className="min-h-screen bg-vscode-dark">
      {/* VS Code-style layout */}
      <div className="flex h-screen">
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
            <div className="vscode-card p-3 mb-4">
              <h3 className="text-vscode-blue font-semibold mb-2">Statistics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-vscode-comment">Total Participants:</span>
                  <span className="text-vscode-foreground">{participants.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vscode-comment">Problems Solved:</span>
                  <span className="text-vscode-green">{participants.reduce((sum, p) => sum + p.solvedProblems, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vscode-comment">Highest Score:</span>
                  <span className="text-vscode-yellow">{participants.length > 0 ? Math.max(...participants.map(p => p.score)) : 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-vscode-panel border-b border-vscode p-6">
            <h1 className="text-3xl font-bold text-vscode-blue mb-2">
              Global Rankings
            </h1>
            <p className="text-vscode-comment">
              Elite coders competing for digital supremacy
            </p>
          </div>

          {/* Top 3 Podium */}
          {participants.length >= 3 && (
            <div className="bg-vscode-editor border-b border-vscode p-8">
              <div className="flex justify-center items-end space-x-8 max-w-4xl mx-auto">
                {/* Second Place */}
                <div className="vscode-card p-6 text-center hover-lift border-l-4 border-gray-300">
                  <div className="flex justify-center mb-4">
                    <Medal className="text-gray-300" size={40} />
                  </div>
                  <h3 className="font-semibold text-gray-300 mb-1">{participants[1].name}</h3>
                  <p className="text-vscode-comment text-sm mb-2">{participants[1].university}</p>
                  <p className="text-xl font-bold text-gray-300">{participants[1].score}</p>
                  <p className="text-vscode-comment text-sm">points</p>
                </div>

                {/* First Place */}
                <div className="vscode-card p-8 text-center transform scale-110 hover-lift border-l-4 border-vscode-yellow">
                  <div className="flex justify-center mb-4">
                    <Trophy className="text-vscode-yellow" size={48} />
                  </div>
                  <h3 className="font-bold text-vscode-yellow text-lg mb-1">{participants[0].name}</h3>
                  <p className="text-vscode-comment mb-2">{participants[0].university}</p>
                  <p className="text-2xl font-bold text-vscode-yellow">{participants[0].score}</p>
                  <p className="text-vscode-comment">points</p>
                </div>

                {/* Third Place */}
                <div className="vscode-card p-6 text-center hover-lift border-l-4 border-vscode-orange">
                  <div className="flex justify-center mb-4">
                    <Award className="text-vscode-orange" size={40} />
                  </div>
                  <h3 className="font-semibold text-vscode-orange mb-1">{participants[2].name}</h3>
                  <p className="text-vscode-comment text-sm mb-2">{participants[2].university}</p>
                  <p className="text-xl font-bold text-vscode-orange">{participants[2].score}</p>
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
              <div className="vscode-card overflow-hidden">
                <div className="bg-vscode-panel p-4 border-b border-vscode">
                  <h2 className="text-xl font-semibold text-vscode-blue">
                    Complete Rankings
                  </h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-vscode-panel border-b border-vscode">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-vscode-blue">Rank</th>
                        <th className="text-left py-3 px-4 font-semibold text-vscode-blue">Participant</th>
                        <th className="text-left py-3 px-4 font-semibold text-vscode-blue">Institution</th>
                        <th className="text-left py-3 px-4 font-semibold text-vscode-blue">Score</th>
                        <th className="text-left py-3 px-4 font-semibold text-vscode-blue">Solved</th>
                        <th className="text-left py-3 px-4 font-semibold text-vscode-blue">Penalty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((participant, index) => {
                        const rank = index + 1;
                        const isCurrentUser = currentUser?.id === participant.id;
                        
                        return (
                          <tr 
                            key={participant.id} 
                            className={`border-b border-vscode transition-all duration-200 hover:bg-vscode-panel/50 ${
                              isCurrentUser ? 'bg-vscode-blue/10' : ''
                            } ${getRankClass(rank)}`}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                {getRankIcon(rank)}
                                <span className="font-mono text-vscode-foreground">#{rank}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-vscode-blue/20 rounded flex items-center justify-center">
                                  <User className="text-vscode-blue" size={16} />
                                </div>
                                <div>
                                  <p className="font-medium text-vscode-foreground">
                                    {participant.name}
                                    {isCurrentUser && (
                                      <span className="ml-2 px-2 py-1 bg-vscode-blue/20 text-vscode-blue text-xs rounded">
                                        YOU
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-vscode-comment text-sm">ID: {participant.studentNumber}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <University className="text-vscode-comment" size={14} />
                                <span className="text-vscode-foreground text-sm">{participant.university}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <Target className="text-vscode-blue" size={14} />
                                <span className="text-lg font-bold text-vscode-blue font-mono">
                                  {participant.score}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-vscode-green font-bold font-mono">
                                {participant.solvedProblems}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-vscode-red font-mono">
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
                    <p className="text-vscode-comment">No participants yet. Be the first to register!</p>
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