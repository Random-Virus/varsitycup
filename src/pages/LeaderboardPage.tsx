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
        return <div className="w-6 h-6 flex items-center justify-center bg-cyan-400/20 rounded-full text-cyan-400 font-orbitron font-bold text-sm">{rank}</div>;
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
        return 'border-cyan-400/30 bg-cyan-400/5';
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-orbitron font-bold text-cyan-400 text-glow-cyan mb-4">
            GLOBAL RANKINGS
          </h1>
          <p className="text-xl text-gray-300 font-rajdhani">
            Elite coders competing for digital supremacy
          </p>
        </div>

        {/* Top 3 Podium */}
        {participants.length >= 3 && (
          <div className="flex justify-center items-end mb-12 space-x-8">
            {/* Second Place */}
            <div className="cyber-card p-6 rounded-lg border-gray-300/50 bg-gray-300/5 text-center">
              <div className="flex justify-center mb-4">
                <Medal className="text-gray-300" size={48} />
              </div>
              <h3 className="font-orbitron font-bold text-gray-300 text-lg mb-2">{participants[1].name}</h3>
              <p className="text-gray-400 font-rajdhani text-sm mb-2">{participants[1].university}</p>
              <p className="text-2xl font-orbitron font-bold text-gray-300">{participants[1].score}</p>
              <p className="text-gray-400 font-rajdhani text-sm">points</p>
            </div>

            {/* First Place */}
            <div className="cyber-card p-8 rounded-lg border-yellow-400/50 bg-yellow-400/5 text-center transform scale-110">
              <div className="flex justify-center mb-4">
                <Trophy className="text-yellow-400 animate-pulse" size={64} />
              </div>
              <h3 className="font-orbitron font-bold text-yellow-400 text-xl mb-2">{participants[0].name}</h3>
              <p className="text-gray-400 font-rajdhani mb-2">{participants[0].university}</p>
              <p className="text-3xl font-orbitron font-bold text-yellow-400 text-glow">{participants[0].score}</p>
              <p className="text-gray-400 font-rajdhani">points</p>
            </div>

            {/* Third Place */}
            <div className="cyber-card p-6 rounded-lg border-orange-400/50 bg-orange-400/5 text-center">
              <div className="flex justify-center mb-4">
                <Award className="text-orange-400" size={48} />
              </div>
              <h3 className="font-orbitron font-bold text-orange-400 text-lg mb-2">{participants[2].name}</h3>
              <p className="text-gray-400 font-rajdhani text-sm mb-2">{participants[2].university}</p>
              <p className="text-2xl font-orbitron font-bold text-orange-400">{participants[2].score}</p>
              <p className="text-gray-400 font-rajdhani text-sm">points</p>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="cyber-card rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-900/50 to-red-900/50 p-6 border-b border-cyan-400/30">
            <h2 className="text-2xl font-orbitron font-bold text-cyan-400 text-center">
              COMPLETE RANKINGS
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/50">
                <tr>
                  <th className="text-left py-4 px-6 font-orbitron font-bold text-cyan-400">RANK</th>
                  <th className="text-left py-4 px-6 font-orbitron font-bold text-cyan-400">PARTICIPANT</th>
                  <th className="text-left py-4 px-6 font-orbitron font-bold text-cyan-400">INSTITUTION</th>
                  <th className="text-left py-4 px-6 font-orbitron font-bold text-cyan-400">SCORE</th>
                  <th className="text-left py-4 px-6 font-orbitron font-bold text-cyan-400">SOLVED</th>
                  <th className="text-left py-4 px-6 font-orbitron font-bold text-cyan-400">PENALTY</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant, index) => {
                  const rank = index + 1;
                  const isCurrentUser = currentUser?.id === participant.id;
                  
                  return (
                    <tr 
                      key={participant.id} 
                      className={`border-b border-gray-600/30 transition-all duration-300 hover:bg-cyan-400/5 ${
                        isCurrentUser ? 'bg-cyan-400/10 border-cyan-400/50' : ''
                      } ${getRankClass(rank)}`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          {getRankIcon(rank)}
                          <span className="font-orbitron font-bold text-white">#{rank}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-cyan-400/20 rounded-full flex items-center justify-center">
                            <User className="text-cyan-400" size={20} />
                          </div>
                          <div>
                            <p className="font-orbitron font-bold text-white">
                              {participant.name}
                              {isCurrentUser && (
                                <span className="ml-2 px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-full font-rajdhani">
                                  YOU
                                </span>
                              )}
                            </p>
                            <p className="text-gray-400 font-rajdhani text-sm">ID: {participant.studentNumber}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <University className="text-gray-400" size={16} />
                          <span className="text-gray-300 font-rajdhani">{participant.university}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Target className="text-cyan-400" size={16} />
                          <span className="text-2xl font-orbitron font-bold text-cyan-400">
                            {participant.score}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-green-400 font-orbitron font-bold text-lg">
                          {participant.solvedProblems}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-red-400 font-orbitron font-bold">
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
              <p className="text-gray-400 font-rajdhani text-lg">No participants yet. Be the first to register!</p>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="cyber-card p-6 rounded-lg text-center">
            <div className="text-3xl font-orbitron font-bold text-cyan-400 mb-2">
              {participants.length}
            </div>
            <div className="text-gray-400 font-rajdhani">Total Participants</div>
          </div>
          
          <div className="cyber-card p-6 rounded-lg text-center">
            <div className="text-3xl font-orbitron font-bold text-green-400 mb-2">
              {participants.reduce((sum, p) => sum + p.solvedProblems, 0)}
            </div>
            <div className="text-gray-400 font-rajdhani">Problems Solved</div>
          </div>
          
          <div className="cyber-card p-6 rounded-lg text-center">
            <div className="text-3xl font-orbitron font-bold text-yellow-400 mb-2">
              {participants.length > 0 ? Math.max(...participants.map(p => p.score)) : 0}
            </div>
            <div className="text-gray-400 font-rajdhani">Highest Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;