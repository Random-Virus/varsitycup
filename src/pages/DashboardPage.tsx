import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Trophy, User, Send, CheckCircle, XCircle, AlertCircle, Play, Terminal, Zap, Target, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Timer from '../components/Timer';

const DashboardPage: React.FC = () => {
  const { currentUser, challenge, submissions, timeRemaining } = useApp();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center modern-grid">
        <div className="text-center modern-card p-4">
          <Terminal className="mx-auto mb-2 text-white" size={24} />
          <h1 className="text-lg font-bold text-white mb-1">ACCESS DENIED</h1>
          <p className="text-white/60 text-sm">Authentication required to access dashboard</p>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="text-white" size={12} />;
      case 'Wrong Answer':
      case 'Runtime Error':
      case 'Compilation Error':
        return <XCircle className="text-white" size={12} />;
      default:
        return <AlertCircle className="text-white" size={12} />;
    }
  };

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

  // Check if problem is solved
  const isProblemSolved = (problemId: string) => {
    return submissions.some(s => s.problemId === problemId && s.status === 'Accepted');
  };

  return (
    <div className="min-h-screen bg-black modern-grid">
      <div className="container mx-auto px-3 py-3">
        {/* Header Section */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-lg font-bold modern-gradient-text mb-1">
                CODING DASHBOARD
              </h1>
              <p className="text-white/60 text-xs">
                Welcome back, <span className="text-white font-semibold">{currentUser.name}</span>
              </p>
            </div>
            <Timer timeRemaining={timeRemaining} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
            <div className="modern-card p-3 hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs font-medium mb-1">Total Score</p>
                  <p className="text-lg font-bold text-white">{currentUser.score}</p>
                </div>
                <div className="p-2 bg-white/10 rounded">
                  <Trophy className="text-white" size={16} />
                </div>
              </div>
            </div>
            
            <div className="modern-card p-3 hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs font-medium mb-1">Problems Solved</p>
                  <p className="text-lg font-bold text-white">{currentUser.solvedProblems}</p>
                </div>
                <div className="p-2 bg-white/10 rounded">
                  <CheckCircle className="text-white" size={16} />
                </div>
              </div>
            </div>
            
            <div className="modern-card p-3 hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs font-medium mb-1">Submissions</p>
                  <p className="text-lg font-bold text-white">{submissions.length}</p>
                </div>
                <div className="p-2 bg-white/10 rounded">
                  <Send className="text-white" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center">
            <Code2 className="mr-2" size={16} />
            Programming Challenges
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {challenge.problems.map((problem) => {
              const solved = isProblemSolved(problem.id);
              const problemSubmissions = submissions.filter(s => s.problemId === problem.id);
              const attempts = problemSubmissions.length;
              
              return (
                <Link
                  key={problem.id}
                  to={`/code/${problem.id}`}
                  className={`modern-card p-4 hover-lift transition-all duration-300 group border ${
                    solved 
                      ? 'border-white/30 bg-white/10 modern-glow' 
                      : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-white text-sm group-hover:text-white transition-colors duration-300">
                        {problem.title}
                      </h3>
                      {solved && <CheckCircle className="text-white" size={14} />}
                    </div>
                    <ArrowRight className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" size={14} />
                  </div>
                  
                  <p className="text-white/70 text-xs mb-3 line-clamp-2">
                    {problem.description.substring(0, 100)}...
                  </p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold bg-white/20 text-white border border-white/30`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-white font-bold text-sm">{problem.points} pts</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Target className="text-white/60" size={10} />
                        <span className="text-white/60">{problem.memoryLimit}MB</span>
                      </div>
                    </div>
                    
                    {attempts > 0 && (
                      <div className="flex items-center space-x-1">
                        <Send className="text-white/60" size={10} />
                        <span className="text-white/60">{attempts} attempt{attempts !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                  
                  {solved && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <div className="flex items-center space-x-1">
                        <Award className="text-white" size={10} />
                        <span className="text-white text-xs font-semibold">SOLVED</span>
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Submissions */}
        {submissions.length > 0 && (
          <div className="modern-card p-3">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center">
              <Zap className="mr-1" size={14} />
              Recent Submissions
            </h3>
            <div className="space-y-2">
              {submissions.slice(0, 5).map((submission) => {
                const problem = challenge.problems.find(p => p.id === submission.problemId);
                return (
                  <div key={submission.id} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(submission.status)}
                      <Link 
                        to={`/code/${submission.problemId}`}
                        className="text-white hover:text-white/80 font-medium text-xs transition-colors duration-300"
                      >
                        {problem?.title}
                      </Link>
                      <span className="text-white/60 text-xs">{submission.language}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusClass(submission.status)}`}>
                        {submission.status}
                      </span>
                      <span className="text-white/60 text-xs">
                        {new Date(submission.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;