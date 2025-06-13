import React from 'react';
import { Trophy, Medal, Award, User, University, Target, BarChart3, Code2, Crown, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LeaderboardPage: React.FC = () => {
  const { participants, currentUser } = useApp();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Award className="text-orange-500" size={20} />;
      default:
        return <div className="w-5 h-5 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 font-bold text-xs">{rank}</div>;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-amber-50';
      case 2:
        return 'border-l-4 border-gray-400 bg-gradient-to-r from-gray-50 to-slate-50';
      case 3:
        return 'border-l-4 border-orange-500 bg-gradient-to-r from-orange-50 to-red-50';
      default:
        return 'border-l-4 border-transparent hover:border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
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
            <div className="vscode-card p-4 mb-4 bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="text-blue-600 font-bold mb-3 flex items-center">
                <Star className="mr-2" size={16} />
                Statistics
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Participants:</span>
                  <span className="text-slate-900 font-semibold">{participants.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Problems Solved:</span>
                  <span className="text-green-600 font-semibold">{participants.reduce((sum, p) => sum + p.solvedProblems, 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Highest Score:</span>
                  <span className="text-yellow-600 font-semibold">{participants.length > 0 ? Math.max(...participants.map(p => p.score)) : 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200 p-6">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Global Rankings
            </h1>
            <p className="text-slate-600 font-medium">
              Elite coders competing for digital supremacy
            </p>
          </div>

          {/* Top 3 Podium */}
          {participants.length >= 3 && (
            <div className="bg-white/50 backdrop-blur-sm border-b border-slate-200 p-8">
              <div className="flex justify-center items-end space-x-8 max-w-4xl mx-auto">
                {/* Second Place */}
                <div className="vscode-card p-6 text-center hover-lift border-l-4 border-gray-400 bg-gradient-to-br from-gray-50 to-slate-50">
                  <div className="flex justify-center mb-4">
                    <Medal className="text-gray-400" size={40} />
                  </div>
                  <h3 className="font-bold text-gray-600 mb-1">{participants[1].name}</h3>
                  <p className="text-slate-500 text-sm mb-2">{participants[1].university}</p>
                  <p className="text-xl font-bold text-gray-600">{participants[1].score}</p>
                  <p className="text-slate-500 text-sm">points</p>
                </div>

                {/* First Place */}
                <div className="vscode-card p-8 text-center transform scale-110 hover-lift border-l-4 border-yellow-500 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-xl">
                  <div className="flex justify-center mb-4">
                    <Crown className="text-yellow-500" size={48} />
                  </div>
                  <h3 className="font-bold text-yellow-600 text-lg mb-1">{participants[0].name}</h3>
                  <p className="text-slate-600 mb-2">{participants[0].university}</p>
                  <p className="text-2xl font-bold text-yellow-600">{participants[0].score}</p>
                  <p className="text-slate-600">points</p>
                </div>

                {/* Third Place */}
                <div className="vscode-card p-6 text-center hover-lift border-l-4 border-orange-500 bg-gradient-to-br from-orange-50 to-red-50">
                  <div className="flex justify-center mb-4">
                    <Award className="text-orange-500" size={40} />
                  </div>
                  <h3 className="font-bold text-orange-600 mb-1">{participants[2].name}</h3>
                  <p className="text-slate-500 text-sm mb-2">{participants[2].university}</p>
                  <p className="text-xl font-bold text-orange-600">{participants[2].score}</p>
                  <p className="text-slate-500 text-sm">points</p>
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
          <div className="flex-1 bg-white/30 backdrop-blur-sm overflow-y-auto">
            <div className="p-6">
              <div className="vscode-card overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-blue-600">
                    Complete Rankings
                  </h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left py-4 px-6 font-bold text-slate-700">Rank</th>
                        <th className="text-left py-4 px-6 font-bold text-slate-700">Participant</th>
                        <th className="text-left py-4 px-6 font-bold text-slate-700">Institution</th>
                        <th className="text-left py-4 px-6 font-bold text-slate-700">Score</th>
                        <th className="text-left py-4 px-6 font-bold text-slate-700">Solved</th>
                        <th className="text-left py-4 px-6 font-bold text-slate-700">Penalty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((participant, index) => {
                        const rank = index + 1;
                        const isCurrentUser = currentUser?.id === participant.id;
                        
                        return (
                          <tr 
                            key={participant.id} 
                            className={`border-b border-slate-100 transition-all duration-200 hover:bg-blue-50/50 ${
                              isCurrentUser ? 'bg-blue-100/50 ring-2 ring-blue-200' : ''
                            } ${getRankClass(rank)}`}
                          >
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                {getRankIcon(rank)}
                                <span className="font-mono text-slate-700 font-semibold">#{rank}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center">
                                  <User className="text-blue-600" size={18} />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900">
                                    {participant.name}
                                    {isCurrentUser && (
                                      <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full font-bold">
                                        YOU
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-slate-500 text-sm">ID: {participant.studentNumber}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2">
                                <University className="text-slate-400" size={16} />
                                <span className="text-slate-700 text-sm font-medium">{participant.university}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2">
                                <Target className="text-blue-600" size={16} />
                                <span className="text-lg font-bold text-blue-600 font-mono">
                                  {participant.score}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-green-600 font-bold font-mono text-lg">
                                {participant.solvedProblems}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-red-600 font-mono font-semibold">
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
                    <Trophy className="text-slate-400 mx-auto mb-4" size={48} />
                    <p className="text-slate-500 font-medium">No participants yet. Be the first to register!</p>
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