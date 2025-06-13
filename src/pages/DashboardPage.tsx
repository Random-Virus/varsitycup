import React, { useState } from 'react';
import { Code2, Clock, Trophy, User, Send, CheckCircle, XCircle, AlertCircle, Play, Terminal, Zap, Target, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Timer from '../components/Timer';

const DashboardPage: React.FC = () => {
  const { currentUser, challenge, submissions, submitSolution, timeRemaining } = useApp();
  const [selectedProblem, setSelectedProblem] = useState(challenge.problems[0]);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center modern-grid">
        <div className="text-center modern-card p-8">
          <Terminal className="mx-auto mb-4 text-white" size={48} />
          <h1 className="text-2xl font-bold text-white mb-2">ACCESS DENIED</h1>
          <p className="text-white/60">Authentication required to access dashboard</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!code.trim()) return;
    
    setIsSubmitting(true);
    try {
      await submitSolution(selectedProblem.id, code, language);
      setCode('');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="text-green-400" size={16} />;
      case 'Wrong Answer':
      case 'Runtime Error':
      case 'Compilation Error':
        return <XCircle className="text-red-400" size={16} />;
      default:
        return <AlertCircle className="text-yellow-400" size={16} />;
    }
  };

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
    <div className="min-h-screen bg-black modern-grid">
      <div className="container mx-auto px-6 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold modern-gradient-text mb-2">
                CODING DASHBOARD
              </h1>
              <p className="text-white/60">
                Welcome back, <span className="text-white font-semibold">{currentUser.name}</span>
              </p>
            </div>
            <Timer timeRemaining={timeRemaining} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="modern-card p-6 hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-medium mb-1">Total Score</p>
                  <p className="text-2xl font-bold text-white">{currentUser.score}</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Trophy className="text-blue-400" size={24} />
                </div>
              </div>
            </div>
            
            <div className="modern-card p-6 hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-medium mb-1">Problems Solved</p>
                  <p className="text-2xl font-bold text-white">{currentUser.solvedProblems}</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <CheckCircle className="text-green-400" size={24} />
                </div>
              </div>
            </div>
            
            <div className="modern-card p-6 hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-medium mb-1">Penalty Time</p>
                  <p className="text-2xl font-bold text-white">{currentUser.penaltyTime}m</p>
                </div>
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Clock className="text-red-400" size={24} />
                </div>
              </div>
            </div>
            
            <div className="modern-card p-6 hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-medium mb-1">Submissions</p>
                  <p className="text-2xl font-bold text-white">{submissions.length}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Send className="text-purple-400" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problems List */}
          <div className="modern-card p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Code2 className="mr-2" size={20} />
              Problems
            </h2>
            <div className="space-y-3">
              {challenge.problems.map((problem) => (
                <div
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border ${
                    selectedProblem.id === problem.id 
                      ? 'bg-white/10 border-white/30 modern-glow' 
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{problem.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold modern-badge ${
                      problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">{problem.points} points</p>
                </div>
              ))}
            </div>
          </div>

          {/* Problem Details Only */}
          <div className="lg:col-span-2">
            <div className="modern-card p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">{selectedProblem.title}</h2>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                    selectedProblem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    selectedProblem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {selectedProblem.difficulty}
                  </span>
                  <span className="text-blue-400 font-bold text-lg">{selectedProblem.points} pts</span>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-white/80 leading-relaxed mb-6">
                  {selectedProblem.description}
                </p>
                
                <h3 className="text-lg font-semibold text-white mb-3">Examples:</h3>
                {selectedProblem.examples.map((example, index) => (
                  <div key={index} className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white mb-2">
                      <strong className="text-blue-400">Input:</strong> <code className="bg-black/50 px-2 py-1 rounded">{example.input}</code>
                    </p>
                    <p className="text-white mb-2">
                      <strong className="text-green-400">Output:</strong> <code className="bg-black/50 px-2 py-1 rounded">{example.output}</code>
                    </p>
                    {example.explanation && (
                      <p className="text-white/60 text-sm">
                        <strong>Explanation:</strong> {example.explanation}
                      </p>
                    )}
                  </div>
                ))}
                
                <h3 className="text-lg font-semibold text-white mb-3">Constraints:</h3>
                <ul className="list-disc list-inside text-white/80 space-y-1">
                  {selectedProblem.constraints.map((constraint, index) => (
                    <li key={index}><code className="bg-black/50 px-2 py-1 rounded text-sm">{constraint}</code></li>
                  ))}
                </ul>
              </div>

              {/* Problem Metadata */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="text-blue-400" size={16} />
                    <span className="text-white/60">Time Limit:</span>
                    <span className="text-white font-mono">{selectedProblem.timeLimit}ms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="text-green-400" size={16} />
                    <span className="text-white/60">Memory Limit:</span>
                    <span className="text-white font-mono">{selectedProblem.memoryLimit}MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        {submissions.length > 0 && (
          <div className="mt-6">
            <div className="modern-card p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Zap className="mr-2" size={20} />
                Recent Submissions
              </h3>
              <div className="space-y-3">
                {submissions.slice(0, 5).map((submission) => {
                  const problem = challenge.problems.find(p => p.id === submission.problemId);
                  return (
                    <div key={submission.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(submission.status)}
                        <span className="text-white font-medium">{problem?.title}</span>
                        <span className="text-white/60 text-sm">{submission.language}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${getStatusClass(submission.status)}`}>
                          {submission.status}
                        </span>
                        <span className="text-white/60 text-sm">
                          {new Date(submission.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;