import React from 'react';
import { Trophy, Medal, Award, User, University, Target, Crown, Star, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LeaderboardPage: React.FC = () => {
  const { participants, currentUser } = useApp();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-400" size={20} />;
      case 2:
        return <Medal className="text-gray-300" size={20} />;
      case 3:
        return <Award className="text-orange-400" size={20} />;
      default:
        return <div className="w-5 h-5 flex items-center justify-center bg-white/10 rounded-full text-white font-bold text-xs">{rank}</div>;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-l-4 border-yellow-400 bg-yellow-400/5 modern-glow-strong';
      case 2:
        return 'border-l-4 border-gray-300 bg-gray-300/5';
      case 3:
        return 'border-l-4 border-orange-400 bg-orange-400/5';
      default:
        return 'border-l-4 border-transparent hover:border-white/30 hover:bg-white/5';
    }
  };

  return (
    <div className="min-h-screen bg-black modern-grid">
      <div className="container mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold modern-gradient-text mb-2">
            GLOBAL RANKINGS
          </h1>
          <p className="text-white/60 text-lg">
            Elite coders competing for digital supremacy
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="modern-card p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm font-medium mb-1">Total Participants</p>
                <p className="text-2xl font-bold text-white">{participants.length}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <User className="text-blue-400" size={24} />
              </div>
            </div>
          </div>
          
          <div className="modern-card p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm font-medium mb-1">Problems Solved</p>
                <p className="text-2xl font-bold text-white">{participants.reduce((sum, p) => sum + p.solvedProblems, 0)}</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Target className="text-green-400" size={24} />
              </div>
            </div>
          </div>
          
          <div className="modern-card p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm font-medium mb-1">Highest Score</p>
                <p className="text-2xl font-bold text-white">{participants.length > 0 ? Math.max(...participants.map(p => p.score)) : 0}</p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Star className="text-yellow-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        {participants.length >= 3 && (
          <div className="modern-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Top Performers</h2>
            <div className="flex justify-center items-end space-x-8 max-w-4xl mx-auto">
              {/* Second Place */}
              <div className="modern-card p-6 text-center hover-lift border-l-4 border-gray-300">
                <div className="flex justify-center mb-4">
                  <Medal className="text-gray-300" size={40} />
                </div>
                <h3 className="font-bold text-gray-300 text-lg mb-1">{participants[1].name}</h3>
                <p className="text-white/60 text-sm mb-2">{participants[1].university}</p>
                <p className="text-2xl font-bold text-gray-300">{participants[1].score}</p>
                <p className="text-white/60 text-sm">points</p>
              </div>

              {/* First Place */}
              <div className="modern-card p-8 text-center transform scale-110 hover-lift border-l-4 border-yellow-400 modern-glow-strong modern-shimmer">
                <div className="flex justify-center mb-4">
                  <Crown className="text-yellow-400" size={48} />
                </div>
                <h3 className="font-bold text-yellow-400 text-xl mb-1">{participants[0].name}</h3>
                <p className="text-white/60 mb-2">{participants[0].university}</p>
                <p className="text-3xl font-bold text-yellow-400">{participants[0].score}</p>
                <p className="text-white/60">points</p>
              </div>

              {/* Third Place */}
              <div className="modern-card p-6 text-center hover-lift border-l-4 border-orange-400">
                <div className="flex justify-center mb-4">
                  <Award className="text-orange-400" size={40} />
                </div>
                <h3 className="font-bold text-orange-400 text-lg mb-1">{participants[2].name}</h3>
                <p className="text-white/60 text-sm mb-2">{participants[2].university}</p>
                <p className="text-2xl font-bold text-orange-400">{participants[2].score}</p>
                <p className="text-white/60 text-sm">points</p>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="modern-card p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Trophy className="mr-2" size={24} />
            Complete Rankings
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold text-white">Rank</th>
                  <th className="text-left py-4 px-4 font-semibold text-white">Participant</th>
                  <th className="text-left py-4 px-4 font-semibold text-white">Institution</th>
                  <th className="text-left py-4 px-4 font-semibold text-white">Score</th>
                  <th className="text-left py-4 px-4 font-semibold text-white">Solved</th>
                  <th className="text-left py-4 px-4 font-semibold text-white">Penalty</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant, index) => {
                  const rank = index + 1;
                  const isCurrentUser = currentUser?.id === participant.id;
                  
                  return (
                    <tr 
                      key={participant.id} 
                      className={`border-b border-white/10 transition-all duration-300 hover:bg-white/5 ${
                        isCurrentUser ? 'bg-blue-500/10 border-blue-500/30' : ''
                      } ${getRankClass(rank)}`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          {getRankIcon(rank)}
                          <span className="font-mono text-white font-semibold">#{rank}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                            <User className="text-white" size={16} />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {participant.name}
                              {isCurrentUser && (
                                <span className="ml-2 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                                  YOU
                                </span>
                              )}
                            </p>
                            <p className="text-white/60 text-sm">ID: {participant.studentNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <University className="text-white/60" size={16} />
                          <span className="text-white text-sm">{participant.university}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Target className="text-blue-400" size={16} />
                          <span className="text-xl font-bold text-blue-400 font-mono">
                            {participant.score}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-green-400 font-bold font-mono text-lg">
                          {participant.solvedProblems}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-red-400 font-mono">
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
              <Trophy className="text-white/40 mx-auto mb-4" size={48} />
              <p className="text-white/60">No participants yet. Be the first to register!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;