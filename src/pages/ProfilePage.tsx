import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, University, Mail, Hash, Trophy, Target, Clock, Calendar, ArrowLeft, Award, Code2, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProfilePage: React.FC = () => {
  const { participantId } = useParams();
  const navigate = useNavigate();
  const { currentUser, participants, challenge, submissions } = useApp();

  // Determine which participant to show
  const profileParticipant = participantId 
    ? participants.find(p => p.id === participantId) 
    : currentUser;

  const isOwnProfile = !participantId || participantId === currentUser?.id;

  if (!profileParticipant) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center modern-grid">
        <div className="text-center modern-card p-8">
          <User className="mx-auto mb-4 text-white" size={48} />
          <h1 className="text-2xl font-bold text-white mb-2">PROFILE NOT FOUND</h1>
          <p className="text-white/60 mb-4">The requested profile could not be found.</p>
          <button
            onClick={() => navigate('/leaderboard')}
            className="modern-button px-6 py-2"
          >
            Back to Leaderboard
          </button>
        </div>
      </div>
    );
  }

  // Get participant's rank
  const participantRank = participants.findIndex(p => p.id === profileParticipant.id) + 1;

  // Get participant's submissions if viewing own profile
  const participantSubmissions = isOwnProfile ? submissions : [];

  // Calculate additional stats
  const acceptedSubmissions = participantSubmissions.filter(s => s.status === 'Accepted').length;
  const totalSubmissions = participantSubmissions.length;
  const successRate = totalSubmissions > 0 ? Math.round((acceptedSubmissions / totalSubmissions) * 100) : 0;

  return (
    <div className="min-h-screen bg-black modern-grid">
      <div className="container mx-auto px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate(-1)}
              className="modern-button-secondary px-4 py-2 mr-4 flex items-center space-x-2"
            >
              <ArrowLeft size={16} />
              <span>BACK</span>
            </button>
            <h1 className="text-3xl font-bold modern-gradient-text">
              {isOwnProfile ? 'MY PROFILE' : 'PARTICIPANT PROFILE'}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="modern-card p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-white" size={48} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{profileParticipant.name}</h2>
                <p className="text-white/60">{profileParticipant.university}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-400" size={20} />
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white">{profileParticipant.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Hash className="text-green-400" size={20} />
                  <div>
                    <p className="text-white/60 text-sm">Student Number</p>
                    <p className="text-white font-mono">{profileParticipant.studentNumber}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <University className="text-purple-400" size={20} />
                  <div>
                    <p className="text-white/60 text-sm">Institution</p>
                    <p className="text-white">{profileParticipant.university}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="text-yellow-400" size={20} />
                  <div>
                    <p className="text-white/60 text-sm">Joined</p>
                    <p className="text-white">{new Date(profileParticipant.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rank Card */}
            <div className="modern-card p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Trophy className="mr-2" size={20} />
                Current Ranking
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">#{participantRank}</div>
                <p className="text-white/60">out of {participants.length} participants</p>
              </div>
            </div>
          </div>

          {/* Stats and Performance */}
          <div className="lg:col-span-2">
            {/* Performance Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="modern-card p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{profileParticipant.score}</div>
                <p className="text-white/60 text-sm">Total Score</p>
              </div>
              
              <div className="modern-card p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">{profileParticipant.solvedProblems}</div>
                <p className="text-white/60 text-sm">Problems Solved</p>
              </div>
              
              <div className="modern-card p-4 text-center">
                <div className="text-2xl font-bold text-red-400 mb-1">{profileParticipant.penaltyTime}m</div>
                <p className="text-white/60 text-sm">Penalty Time</p>
              </div>
              
              {isOwnProfile && (
                <div className="modern-card p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{successRate}%</div>
                  <p className="text-white/60 text-sm">Success Rate</p>
                </div>
              )}
            </div>

            {/* Problem Progress */}
            <div className="modern-card p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Code2 className="mr-2" size={20} />
                Problem Progress
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenge.problems.map((problem) => {
                  const solved = isOwnProfile 
                    ? participantSubmissions.some(s => s.problemId === problem.id && s.status === 'Accepted')
                    : false; // Can't see other users' detailed progress
                  
                  return (
                    <div key={problem.id} className={`p-4 rounded-lg border transition-all duration-300 ${
                      solved 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-white/5 border-white/10'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white">{problem.title}</h4>
                        {solved && <Award className="text-green-400" size={16} />}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {problem.difficulty}
                        </span>
                        <span className="text-white/60 text-sm">{problem.points} pts</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Submissions (only for own profile) */}
            {isOwnProfile && participantSubmissions.length > 0 && (
              <div className="modern-card p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Zap className="mr-2" size={20} />
                  Recent Submissions
                </h3>
                <div className="space-y-3">
                  {participantSubmissions.slice(0, 10).map((submission) => {
                    const problem = challenge.problems.find(p => p.id === submission.problemId);
                    const getStatusClass = (status: string) => {
                      switch (status) {
                        case 'Accepted':
                          return 'bg-green-500/20 text-green-400 border-green-500/30';
                        case 'Wrong Answer':
                        case 'Runtime Error':
                        case 'Compilation Error':
                          return 'bg-red-500/20 text-red-400 border-red-500/30';
                        default:
                          return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
                      }
                    };

                    return (
                      <div key={submission.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center space-x-3">
                          <span className="text-white font-medium">{problem?.title}</span>
                          <span className="text-white/60 text-sm">{submission.language}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${getStatusClass(submission.status)}`}>
                            {submission.status}
                          </span>
                          <span className="text-white/60 text-sm">
                            {new Date(submission.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Message for other users' profiles */}
            {!isOwnProfile && (
              <div className="modern-card p-6 text-center">
                <User className="mx-auto mb-4 text-white/40" size={48} />
                <h3 className="text-lg font-bold text-white mb-2">Limited Profile View</h3>
                <p className="text-white/60">
                  Detailed submission history and progress are only visible on your own profile.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;