import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Award, User, University, Target, Crown, Star, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BadgeDisplay from '../components/BadgeDisplay';

const LeaderboardPage: React.FC = () => {
  const { participants, currentUser } = useApp();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-white" size={14} />;
      case 2:
        return <Medal className="text-white" size={14} />;
      case 3:
        return <Award className="text-white" size={14} />;
      default:
        return <div className="w-3 h-3 flex items-center justify-center bg-white/10 rounded-full text-white font-bold text-xs">{rank}</div>;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'border-l-2 border-white bg-white/5 modern-glow-strong';
      case 2:
        return 'border-l-2 border-white bg-white/5';
      case 3:
        return 'border-l-2 border-white bg-white/5';
      default:
        return 'border-l-2 border-transparent hover:border-white/30 hover:bg-white/5';
    }
  };

  // Helper function to mask student number for privacy
  const maskStudentNumber = (studentNumber: string, isCurrentUser: boolean) => {
    if (isCurrentUser) return studentNumber;
    return '*'.repeat(studentNumber.length - 2) + studentNumber.slice(-2);
  };

  return (
    <div className="min-h-screen bg-black modern-grid">
      <div className="container mx-auto px-3 py-3">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold modern-gradient-text mb-1">
            GLOBAL RANKINGS
          </h1>
          <p className="text-white/60 text-sm">
            Elite coders competing for digital supremacy
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="modern-card p-3 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs font-medium mb-1">Total Participants</p>
                <p className="text-lg font-bold text-white">{participants.length}</p>
              </div>
              <div className="p-2 bg-white/10 rounded">
                <User className="text-white" size={16} />
              </div>
            </div>
          </div>
          
          <div className="modern-card p-3 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs font-medium mb-1">Problems Solved</p>
                <p className="text-lg font-bold text-white">{participants.reduce((sum, p) => sum + p.solvedProblems, 0)}</p>
              </div>
              <div className="p-2 bg-white/10 rounded">
                <Target className="text-white" size={16} />
              </div>
            </div>
          </div>
          
          <div className="modern-card p-3 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-xs font-medium mb-1">Badges Earned</p>
                <p className="text-lg font-bold text-white">{participants.reduce((sum, p) => sum + (p.badges?.length || 0), 0)}</p>
              </div>
              <div className="p-2 bg-white/10 rounded">
                <Star className="text-white" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        {participants.length >= 3 && (
          <div className="modern-card p-4 mb-4">
            <h2 className="text-lg font-bold text-white mb-3 text-center">Top Performers</h2>
            <div className="flex justify-center items-end space-x-4 max-w-2xl mx-auto">
              {/* Second Place */}
              <Link 
                to={`/profile/${participants[1].id}`}
                className="modern-card p-3 text-center hover-lift border-l-2 border-white transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-center mb-2">
                  <Medal className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{participants[1].name}</h3>
                <p className="text-white/60 text-xs mb-1">{participants[1].university}</p>
                <p className="text-lg font-bold text-white">{participants[1].score}</p>
                <p className="text-white/60 text-xs mb-2">points</p>
                <BadgeDisplay badges={participants[1].badges || []} size="small" showTooltip={false} />
              </Link>

              {/* First Place */}
              <Link 
                to={`/profile/${participants[0].id}`}
                className="modern-card p-4 text-center transform scale-110 hover-lift border-l-2 border-white modern-glow-strong modern-shimmer transition-all duration-300 hover:scale-115"
              >
                <div className="flex justify-center mb-2">
                  <Crown className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-white text-base mb-1">{participants[0].name}</h3>
                <p className="text-white/60 text-xs mb-1">{participants[0].university}</p>
                <p className="text-xl font-bold text-white">{participants[0].score}</p>
                <p className="text-white/60 text-xs mb-2">points</p>
                <BadgeDisplay badges={participants[0].badges || []} size="small" showTooltip={false} />
              </Link>

              {/* Third Place */}
              <Link 
                to={`/profile/${participants[2].id}`}
                className="modern-card p-3 text-center hover-lift border-l-2 border-white transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-center mb-2">
                  <Award className="text-white" size={20} />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{participants[2].name}</h3>
                <p className="text-white/60 text-xs mb-1">{participants[2].university}</p>
                <p className="text-lg font-bold text-white">{participants[2].score}</p>
                <p className="text-white/60 text-xs mb-2">points</p>
                <BadgeDisplay badges={participants[2].badges || []} size="small" showTooltip={false} />
              </Link>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="modern-card p-3">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center">
            <Trophy className="mr-1" size={16} />
            Complete Rankings
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th className="text-left py-2 px-2 font-semibold text-white text-xs">Rank</th>
                  <th className="text-left py-2 px-2 font-semibold text-white text-xs">Participant</th>
                  <th className="text-left py-2 px-2 font-semibold text-white text-xs">Institution</th>
                  <th className="text-left py-2 px-2 font-semibold text-white text-xs">Score</th>
                  <th className="text-left py-2 px-2 font-semibold text-white text-xs">Solved</th>
                  <th className="text-left py-2 px-2 font-semibold text-white text-xs">Badges</th>
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
                        isCurrentUser ? 'bg-white/10 border-white/30' : ''
                      } ${getRankClass(rank)}`}
                    >
                      <td className="py-2 px-2">
                        <div className="flex items-center space-x-2">
                          {getRankIcon(rank)}
                          <span className="font-mono text-white font-semibold text-xs">#{rank}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <Link 
                          to={`/profile/${participant.id}`}
                          className="flex items-center space-x-2 hover:text-white transition-colors duration-300 group"
                        >
                          <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                            <User className="text-white" size={10} />
                          </div>
                          <div>
                            <p className="font-semibold text-white group-hover:text-white transition-colors duration-300 text-xs">
                              {participant.name}
                              {isCurrentUser && (
                                <span className="ml-1 px-1 py-0.5 bg-white/20 text-white text-xs rounded-full border border-white/30">
                                  YOU
                                </span>
                              )}
                            </p>
                            <p className="text-white/60 text-xs">ID: {maskStudentNumber(participant.studentNumber, isCurrentUser)}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="py-2 px-2">
                        <div className="flex items-center space-x-1">
                          <University className="text-white/60" size={10} />
                          <span className="text-white text-xs">{participant.university}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <div className="flex items-center space-x-1">
                          <Target className="text-white" size={10} />
                          <span className="text-sm font-bold text-white font-mono">
                            {participant.score}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <span className="text-white font-bold font-mono text-sm">
                          {participant.solvedProblems}
                        </span>
                      </td>
                      <td className="py-2 px-2">
                        <div className="flex items-center space-x-1">
                          <BadgeDisplay 
                            badges={(participant.badges || []).slice(0, 3)} 
                            size="small" 
                            showTooltip={false}
                          />
                          {(participant.badges?.length || 0) > 3 && (
                            <span className="text-white/60 text-xs">
                              +{(participant.badges?.length || 0) - 3}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {participants.length === 0 && (
            <div className="text-center py-6">
              <Trophy className="text-white/40 mx-auto mb-2" size={24} />
              <p className="text-white/60 text-sm">No participants yet. Be the first to register!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;