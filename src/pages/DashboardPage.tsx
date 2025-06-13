import React, { useState } from 'react';
import { Code2, Clock, Trophy, User, Send, CheckCircle, XCircle, AlertCircle, Play } from 'lucide-react';
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4 font-display tracking-wider">ACCESS DENIED</h1>
          <p className="text-white/60 font-display tracking-wider">AUTHENTICATION REQUIRED TO ACCESS DASHBOARD</p>
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
        return <CheckCircle className="text-white" size={16} />;
      case 'Wrong Answer':
      case 'Runtime Error':
      case 'Compilation Error':
        return <XCircle className="text-white" size={16} />;
      default:
        return <AlertCircle className="text-white" size={16} />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'status-accepted';
      case 'Wrong Answer':
      case 'Runtime Error':
      case 'Compilation Error':
        return 'status-failed';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Futuristic background */}
      <div className="absolute inset-0 matrix-bg"></div>
      <div className="absolute inset-0 scanlines"></div>

      {/* VS Code-style layout */}
      <div className="flex h-screen relative z-10">
        {/* Activity Bar */}
        <div className="activity-bar">
          <div className="activity-bar-item active">
            <Code2 size={24} />
          </div>
          <div className="activity-bar-item">
            <Trophy size={24} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            PROBLEMS EXPLORER
          </div>
          <div className="p-4">
            {challenge.problems.map((problem) => (
              <div
                key={problem.id}
                onClick={() => setSelectedProblem(problem)}
                className={`sidebar-item cursor-pointer mb-2 p-3 ${
                  selectedProblem.id === problem.id ? 'active' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm font-display tracking-wider">{problem.title.toUpperCase()}</h3>
                  <span className={`px-2 py-1 text-xs font-bold ${
                    problem.difficulty === 'Easy' ? 'difficulty-easy' :
                    problem.difficulty === 'Medium' ? 'difficulty-medium' :
                    'difficulty-hard'
                  }`}>
                    {problem.difficulty.toUpperCase()}
                  </span>
                </div>
                <p className="text-white/60 text-xs font-display tracking-wider">{problem.points} POINTS</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header with stats */}
          <div className="bg-vscode-panel border-b border-vscode p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white font-display tracking-wider">
                  DASHBOARD
                </h1>
                <p className="text-white/60 font-display tracking-wider">
                  WELCOME BACK, <span className="text-white font-bold">{currentUser.name.toUpperCase()}</span>
                </p>
              </div>
              <Timer timeRemaining={timeRemaining} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="vscode-card p-4 terminal">
                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-display tracking-wider">SCORE</p>
                      <p className="text-xl font-bold text-white font-mono">{currentUser.score}</p>
                    </div>
                    <Trophy className="text-white" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="vscode-card p-4 terminal">
                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-display tracking-wider">SOLVED</p>
                      <p className="text-xl font-bold text-white font-mono">{currentUser.solvedProblems}</p>
                    </div>
                    <CheckCircle className="text-white" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="vscode-card p-4 terminal">
                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-display tracking-wider">PENALTY</p>
                      <p className="text-xl font-bold text-white font-mono">{currentUser.penaltyTime}M</p>
                    </div>
                    <Clock className="text-white" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="vscode-card p-4 terminal">
                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm font-display tracking-wider">SUBMISSIONS</p>
                      <p className="text-xl font-bold text-white font-mono">{submissions.length}</p>
                    </div>
                    <Send className="text-white" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Tabs */}
          <div className="editor-tabs">
            <div className="editor-tab active">
              <span className="font-display tracking-wider">{selectedProblem.title.toUpperCase()}</span>
            </div>
            <div className="editor-tab">
              <span className="font-display tracking-wider">SOLUTION.{language.toUpperCase()}</span>
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex">
            {/* Problem Description */}
            <div className="w-1/2 bg-black border-r border-white/10 p-6 overflow-y-auto">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white font-display tracking-wider">{selectedProblem.title.toUpperCase()}</h2>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 text-sm font-bold ${
                      selectedProblem.difficulty === 'Easy' ? 'difficulty-easy' :
                      selectedProblem.difficulty === 'Medium' ? 'difficulty-medium' :
                      'difficulty-hard'
                    }`}>
                      {selectedProblem.difficulty.toUpperCase()}
                    </span>
                    <span className="text-white font-bold font-mono">{selectedProblem.points} PTS</span>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-white leading-relaxed mb-6">
                    {selectedProblem.description}
                  </p>
                  
                  <h3 className="text-lg font-bold text-white mb-3 font-display tracking-wider">EXAMPLES:</h3>
                  {selectedProblem.examples.map((example, index) => (
                    <div key={index} className="mb-4 p-4 bg-white/5 border border-white/10">
                      <p className="text-white mb-2">
                        <strong className="text-white font-display tracking-wider">INPUT:</strong> <code className="syntax-string">{example.input}</code>
                      </p>
                      <p className="text-white mb-2">
                        <strong className="text-white font-display tracking-wider">OUTPUT:</strong> <code className="syntax-string">{example.output}</code>
                      </p>
                      {example.explanation && (
                        <p className="text-white/60 text-sm">
                          <strong className="font-display tracking-wider">EXPLANATION:</strong> {example.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                  
                  <h3 className="text-lg font-bold text-white mb-3 font-display tracking-wider">CONSTRAINTS:</h3>
                  <ul className="list-disc list-inside text-white space-y-1">
                    {selectedProblem.constraints.map((constraint, index) => (
                      <li key={index}><code className="syntax-comment">{constraint}</code></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="w-1/2 bg-black flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h3 className="text-lg font-bold text-white font-display tracking-wider">CODE EDITOR</h3>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="vscode-select"
                >
                  <option value="javascript">JAVASCRIPT</option>
                  <option value="python">PYTHON</option>
                  <option value="java">JAVA</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
              
              <div className="flex-1 p-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="vscode-textarea w-full h-full p-4"
                  placeholder="// WRITE YOUR SOLUTION HERE..."
                />
              </div>
              
              <div className="p-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <div className="text-white/60 text-sm font-display tracking-wider">
                    TIME: {selectedProblem.timeLimit}MS | MEMORY: {selectedProblem.memoryLimit}MB
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!code.trim() || isSubmitting}
                    className={`vscode-button flex items-center ${
                      !code.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Play size={16} className="mr-2" />
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="status-bar">
            <div className="flex items-center space-x-4">
              <div className="status-bar-item">
                <span>LN 1, COL 1</span>
              </div>
              <div className="status-bar-item">
                <span>UTF-8</span>
              </div>
              <div className="status-bar-item">
                <span>{language.toUpperCase()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="status-bar-item">
                <span>PROBLEMS: {challenge.problems.length}</span>
              </div>
              <div className="status-bar-item">
                <span>SOLVED: {currentUser.solvedProblems}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Submissions Panel */}
      {submissions.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-white/10 max-h-48 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-3 font-display tracking-wider">RECENT SUBMISSIONS</h3>
            <div className="space-y-2">
              {submissions.slice(0, 5).map((submission) => {
                const problem = challenge.problems.find(p => p.id === submission.problemId);
                return (
                  <div key={submission.id} className="flex items-center justify-between p-2 bg-white/5 border border-white/10">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(submission.status)}
                      <span className="text-white text-sm font-display tracking-wider">{problem?.title.toUpperCase()}</span>
                      <span className="text-white/60 text-sm font-display tracking-wider">{submission.language.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-bold ${getStatusClass(submission.status)}`}>
                        {submission.status.toUpperCase()}
                      </span>
                      <span className="text-white/60 text-sm font-mono">
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
  );
};

export default DashboardPage;