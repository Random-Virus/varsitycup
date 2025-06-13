import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, University, Hash, Trophy, Target, Calendar, ArrowLeft, Award, Code2, Zap, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BadgeDisplay from '../components/BadgeDisplay';

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
        <div className="text-center modern-card p-4">
          <User className="mx-auto mb-2 text-white" size={24} />
          <h1 className="text-lg font-bold text-white mb-1">PROFILE NOT FOUND</h1>
          <p className="text-white/60 mb-2 text-sm">The requested profile could not be found.</p>
          <button
            onClick={() => navigate('/leaderboard')}
            className="modern-button px-3 py-1 text-xs"
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

  // Helper function to mask sensitive information
  const maskEmail = (email: string) => {
    if (isOwnProfile) return email;
    const [username, domain] = email.split('@');
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1);
    return `${maskedUsername}@${domain}`;
  };

  const maskStudentNumber = (studentNumber: string) => {
    if (isOwnProfile) return studentNumber;
    return '*'.repeat(studentNumber.length - 2) + studentNumber.slice(-2);
  };

  return (
    <div className="min-h-screen bg-black modern-grid">
      <div className="container mx-auto px-3 py-3">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center mb-2">
            <button
              onClick={() => navigate(-1)}
              className="modern-button-secondary px-2 py-1 mr-2 flex items-center space-x-1 text-xs"
            >
              <ArrowLeft size={10} />
              <span>BACK</span>
            </button>
            <h1 className="text-xl font-bold modern-gradient-text">
              {isOwnProfile ? 'MY PROFILE' : 'PARTICIPANT PROFILE'}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="modern-card p-3 mb-3">
              <div className="text-center mb-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <User className="text-white" size={24} />
                </div>
                <h2 className="text-lg font-bold text-white mb-1">{profileParticipant.name}</h2>
                <p className="text-white/60 text-xs">{profileParticipant.university}</p>
              </div>

              <div className="space-y-2">
                {/* Only show student number for own profile or with masking */}
                <div className="flex items-center space-x-2">
                  <Hash className="text-white" size={12} />
                  <div>
                    <p className="text-white/60 text-xs">Student ID</p>
                    <p className="text-white font-mono text-xs">{maskStudentNumber(profileParticipant.studentNumber)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <University className="text-white" size={12} />
                  <div>
                    <p className="text-white/60 text-xs">Institution</p>
                    <p className="text-white text-xs">{profileParticipant.university}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="text-white" size={12} />
                  <div>
                    <p className="text-white/60 text-xs">Joined</p>
                    <p className="text-white text-xs">{new Date(profileParticipant.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rank Card */}
            <div className="modern-card p-3 mb-3">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                <Trophy className="mr-1" size={12} />
                Current Ranking
              </h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">#{participantRank}</div>
                <p className="text-white/60 text-xs">out of {participants.length} participants</p>
              </div>
            </div>

            {/* Badges Section */}
            <div className="modern-card p-3">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                <Star className="mr-1" size={12} />
                Achievements ({profileParticipant.badges?.length || 0})
              </h3>
              <BadgeDisplay 
                badges={profileParticipant.badges || []} 
                size="medium" 
                showTooltip={true}
              />
            </div>
          </div>

          {/* Stats and Performance */}
          <div className="lg:col-span-2">
            {/* Performance Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
              <div className="modern-card p-2 text-center">
                <div className="text-lg font-bold text-white mb-1">{profileParticipant.score}</div>
                <p className="text-white/60 text-xs">Total Score</p>
              </div>
              
              <div className="modern-card p-2 text-center">
                <div className="text-lg font-bold text-white mb-1">{profileParticipant.solvedProblems}</div>
                <p className="text-white/60 text-xs">Problems Solved</p>
              </div>
              
              <div className="modern-card p-2 text-center">
                <div className="text-lg font-bold text-white mb-1">{profileParticipant.badges?.length || 0}</div>
                <p className="text-white/60 text-xs">Badges Earned</p>
              </div>
            </div>

            {/* Problem Progress */}
            <div className="modern-card p-3 mb-3">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                <Code2 className="mr-1" size={12} />
                Problem Progress
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {challenge.problems.map((problem) => {
                  const solved = isOwnProfile 
                    ? participantSubmissions.some(s => s.problemId === problem.id && s.status === 'Accepted')
                    : false; // Can't see other users' detailed progress
                  
                  return (
                    <div key={problem.id} className={`p-2 rounded border transition-all duration-300 ${
                      solved 
                        ? 'bg-white/10 border-white/30' 
                        : 'bg-white/5 border-white/10'
                    }`}>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-white text-xs">{problem.title}</h4>
                        {solved && <Award className="text-white" size={10} />}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="px-1 py-0.5 rounded text-xs font-semibold bg-white/20 text-white">
                          {problem.difficulty}
                        </span>
                        <span className="text-white/60 text-xs">{problem.points} pts</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Submissions (only for own profile) */}
            {isOwnProfile && participantSubmissions.length > 0 && (
              <div className="modern-card p-3">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                  <Zap className="mr-1" size={12} />
                  Recent Submissions
                </h3>
                <div className="space-y-2">
                  {participantSubmissions.slice(0, 10).map((submission) => {
                    const problem = challenge.problems.find(p => p.id === submission.problemId);
                    const getStatusClass = (status: string) => {
                      switch (status) {
                        case 'Accepted':
                          return 'bg-white/20 text-white border-white/30';
                        case 'Wrong Answer':
                        case 'Runtime Error':
                        case 'Compilation Error':
                          return 'bg-white/10 text-white border-white/20';
                        default:
                          return 'bg-white/10 text-white border-white/20';
                      }
                    };

                    return (
                      <div key={submission.id} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium text-xs">{problem?.title}</span>
                          <span className="text-white/60 text-xs">{submission.language}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusClass(submission.status)}`}>
                            {submission.status}
                          </span>
                          <span className="text-white/60 text-xs">
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
              <div className="modern-card p-3 text-center">
                <User className="mx-auto mb-2 text-white/40" size={24} />
                <h3 className="text-sm font-bold text-white mb-1">Limited Profile View</h3>
                <p className="text-white/60 text-xs">
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