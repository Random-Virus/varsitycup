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
        <div className="text-center modern-card p-4">
          <Terminal className="mx-auto mb-2 text-white" size={24} />
          <h1 className="text-lg font-bold text-white mb-1">ACCESS DENIED</h1>
          <p className="text-white/60 text-sm">Authentication required to access dashboard</p>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
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
                  <p className="text-white/60 text-xs font-medium mb-1">Penalty Time</p>
                  <p className="text-lg font-bold text-white">{currentUser.penaltyTime}m</p>
                </div>
                <div className="p-2 bg-white/10 rounded">
                  <Clock className="text-white" size={16} />
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Problems List */}
          <div className="modern-card p-3">
            <h2 className="text-sm font-bold text-white mb-2 flex items-center">
              <Code2 className="mr-1" size={14} />
              Problems
            </h2>
            <div className="space-y-2">
              {challenge.problems.map((problem) => (
                <div
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem)}
                  className={`p-2 rounded cursor-pointer transition-all duration-300 border text-xs ${
                    selectedProblem.id === problem.id 
                      ? 'bg-white/10 border-white/30 modern-glow' 
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-white text-xs">{problem.title}</h3>
                    <span className={`px-1 py-0.5 rounded text-xs font-semibold modern-badge ${
                      problem.difficulty === 'Easy' ? 'bg-white/20 text-white' :
                      problem.difficulty === 'Medium' ? 'bg-white/20 text-white' :
                      'bg-white/20 text-white'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs">{problem.points} points</p>
                </div>
              ))}
            </div>
          </div>

          {/* Problem Details */}
          <div className="lg:col-span-2">
            <div className="modern-card p-3">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-bold text-white">{selectedProblem.title}</h2>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold bg-white/20 text-white border border-white/30`}>
                    {selectedProblem.difficulty}
                  </span>
                  <span className="text-white font-bold text-sm">{selectedProblem.points} pts</span>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-white/80 leading-relaxed mb-3 text-xs">
                  {selectedProblem.description}
                </p>
                
                <h3 className="text-sm font-semibold text-white mb-2">Examples:</h3>
                {selectedProblem.examples.map((example, index) => (
                  <div key={index} className="mb-2 p-2 bg-white/5 rounded border border-white/10">
                    <p className="text-white mb-1 text-xs">
                      <strong className="text-white">Input:</strong> <code className="bg-black/50 px-1 py-0.5 rounded text-xs">{example.input}</code>
                    </p>
                    <p className="text-white mb-1 text-xs">
                      <strong className="text-white">Output:</strong> <code className="bg-black/50 px-1 py-0.5 rounded text-xs">{example.output}</code>
                    </p>
                    {example.explanation && (
                      <p className="text-white/60 text-xs">
                        <strong>Explanation:</strong> {example.explanation}
                      </p>
                    )}
                  </div>
                ))}
                
                <h3 className="text-sm font-semibold text-white mb-2">Constraints:</h3>
                <ul className="list-disc list-inside text-white/80 space-y-1">
                  {selectedProblem.constraints.map((constraint, index) => (
                    <li key={index} className="text-xs"><code className="bg-black/50 px-1 py-0.5 rounded text-xs">{constraint}</code></li>
                  ))}
                </ul>
              </div>

              {/* Problem Metadata */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="text-white" size={12} />
                    <span className="text-white/60">Time Limit:</span>
                    <span className="text-white font-mono">{selectedProblem.timeLimit}ms</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="text-white" size={12} />
                    <span className="text-white/60">Memory Limit:</span>
                    <span className="text-white font-mono">{selectedProblem.memoryLimit}MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="modern-card p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white">Code Editor</h3>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="modern-select text-xs"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
            
            <div className="mb-2">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="modern-textarea w-full h-64 p-2 rounded text-xs"
                placeholder="// Write your solution here..."
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-white/60 text-xs">
                Time: {selectedProblem.timeLimit}ms | Memory: {selectedProblem.memoryLimit}MB
              </div>
              <button
                onClick={handleSubmit}
                disabled={!code.trim() || isSubmitting}
                className={`modern-button flex items-center text-xs ${
                  !code.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Play size={12} className="mr-1" />
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        {submissions.length > 0 && (
          <div className="mt-3">
            <div className="modern-card p-3">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center">
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
                        <span className="text-white font-medium text-xs">{problem?.title}</span>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;