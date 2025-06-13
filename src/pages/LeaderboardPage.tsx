import React from 'react';
import { Trophy, Medal, Award, User, University, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LeaderboardPage: React.FC = () => {
  const { participants, currentUser } = useApp();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-400" size={24} />;
      case 2:
        return <Medal className="text-gray-300" size={24} />;
      case 3:
        return <Award className="text-orange-400" size={24} />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center bg-purple-400/20 rounded-full text-purple-400 font-bold text-sm">{rank}</div>;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-yellow-400/50 bg-yellow-400/5';
      case 2:
        return 'border-gray-300/50 bg-gray-300/5';
      case 3:
        return 'border-orange-400/50 bg-orange-400/5';
      default:
        return 'border-purple-400/30 bg-purple-400/5';
    }
  };

  return (
    <div className="min-h-screen bg-pattern relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Global Rankings
          </h1>
          <p className="text-xl text-gray-300">
            Elite coders competing for digital supremacy
          </p>
        </div>

        {/* Top 3 Podium */}
        {participants.length >= 3 && (
          <div className="flex justify-center items-end mb-12 space-x-8">
            {/* Second Place */}
            <div className="glass-card p-6 rounded-lg border-gray-300/50 bg-gray-300/5 text-center hover-lift">
              <div className="flex justify-center mb-4">
                <Medal className="text-gray-300 animate-pulse" size={48} />
              </div>
              <h3 className="font-bold text-gray-300 text-lg mb-2">{participants[1].name}</h3>
              <p className="text-gray-400 text-sm mb-2">{participants[1].university}</p>
              <p className="text-2xl font-bold text-gray-300">{participants[1].score}</p>
              <p className="text-gray-400 text-sm">points</p>
            </div>

            {/* First Place */}
            <div className="neon-card p-8 rounded-lg text-center transform scale-110 hover-lift animate-glow">
              <div className="flex justify-center mb-4">
                <Trophy className="text-yellow-400 animate-pulse" size={64} />
              </div>
              <h3 className="font-bold text-yellow-400 text-xl mb-2">{participants[0].name}</h3>
              <p className="text-gray-400 mb-2">{participants[0].university}</p>
              <p className="text-3xl font-bold text-gradient">{participants[0].score}</p>
              <p className="text-gray-400">points</p>
            </div>

            {/* Third Place */}
            <div className="glass-card p-6 rounded-lg border-orange-400/50 bg-orange-400/5 text-center hover-lift">
              <div className="flex justify-center mb-4">
                <Award className="text-orange-400 animate-pulse" size={48} />
              </div>
              <h3 className="font-bold text-orange-400 text-lg mb-2">{participants[2].name}</h3>
              <p className="text-gray-400 text-sm mb-2">{participants[2].university}</p>
              <p className="text-2xl font-bold text-orange-400">{participants[2].score}</p>
              <p className="text-gray-400 text-sm">points</p>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="neon-card rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 border-b border-purple-400/30">
            <h2 className="text-2xl font-bold text-gradient text-center">
              Complete Rankings
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/50">
                <tr>
                  <th className="text-left py-4 px-6 font-bold text-gradient-purple">Rank</th>
                  <th className="text-left py-4 px-6 font-bold text-gradient-purple">Participant</th>
                  <th className="text-left py-4 px-6 font-bold text-gradient-purple">Institution</th>
                  <th className="text-left py-4 px-6 font-bold text-gradient-purple">Score</th>
                  <th className="text-left py-4 px-6 font-bold text-gradient-purple">Solved</th>
                  <th className="text-left py-4 px-6 font-bold text-gradient-purple">Penalty</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant, index) => {
                  const rank = index + 1;
                  const isCurrentUser = currentUser?.id === participant.id;
                  
                  return (
                    <tr 
                      key={participant.id} 
                      className={`border-b border-gray-600/30 transition-all duration-300 hover:bg-purple-400/5 ${
                        isCurrentUser ? 'bg-purple-400/10 border-purple-400/50' : ''
                      } ${getRankClass(rank)}`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          {getRankIcon(rank)}
                          <span className="font-bold text-white">#{rank}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full flex items-center justify-center">
                            <User className="text-gradient-purple" size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-white">
                              {participant.name}
                              {isCurrentUser && (
                                <span className="ml-2 px-2 py-1 bg-purple-400/20 text-purple-400 text-xs rounded-full">
                                  YOU
                                </span>
                              )}
                            </p>
                            <p className="text-gray-400 text-sm">ID: {participant.studentNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <University className="text-gray-400" size={16} />
                          <span className="text-gray-300">{participant.university}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Target className="text-gradient-purple" size={16} />
                          <span className="text-2xl font-bold text-gradient-purple">
                            {participant.score}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-green-400 font-bold text-lg">
                          {participant.solvedProblems}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-red-400 font-bold">
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
              <Trophy className="text-gray-600 mx-auto mb-4" size={64} />
              <p className="text-gray-400 text-lg">No participants yet. Be the first to register!</p>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="neon-card p-6 rounded-lg text-center hover-lift">
            <div className="text-3xl font-bold text-gradient-purple mb-2">
              {participants.length}
            </div>
            <div className="text-gray-400">Total Participants</div>
          </div>
          
          <div className="glass-card p-6 rounded-lg text-center hover-lift border border-green-500/30">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {participants.reduce((sum, p) => sum + p.solvedProblems, 0)}
            </div>
            <div className="text-gray-400">Problems Solved</div>
          </div>
          
          <div className="glass-card p-6 rounded-lg text-center hover-lift border border-yellow-500/30">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {participants.length > 0 ? Math.max(...participants.map(p => p.score)) : 0}
            </div>
            <div className="text-gray-400">Highest Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;