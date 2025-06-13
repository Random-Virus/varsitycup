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
          <h1 className="text-xl font-bold text-white mb-2 font-display tracking-wider">ACCESS DENIED</h1>
          <p className="text-white/60 font-display tracking-wider text-sm">AUTHENTICATION REQUIRED</p>
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

      {/* Compact VS Code-style layout */}
      <div className="flex h-screen relative z-10">
        {/* Compact Activity Bar */}
        <div className="bg-black/95 w-8 border-r border-white/10">
          <div className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white cursor-pointer border-l-2 border-white">
            <Code2 size={16} />
          </div>
          <div className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white cursor-pointer">
            <Trophy size={16} />
          </div>
        </div>

        {/* Compact Sidebar */}
        <div className="bg-black/95 border-r border-white/10 w-48">
          <div className="p-2 text-xs font-bold text-white/80 bg-black/90 border-b border-white/10 font-display tracking-wider">
            PROBLEMS
          </div>
          <div className="p-2">
            {challenge.problems.map((problem) => (
              <div
                key={problem.id}
                onClick={() => setSelectedProblem(problem)}
                className={`cursor-pointer mb-1 p-2 text-xs transition-all duration-200 ${
                  selectedProblem.id === problem.id 
                    ? 'bg-white/10 text-white border-l-2 border-white' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold font-display tracking-wider">{problem.title.toUpperCase()}</h3>
                  <span className={`px-1 py-0.5 text-xs font-bold ${
                    problem.difficulty === 'Easy' ? 'difficulty-easy' :
                    problem.difficulty === 'Medium' ? 'difficulty-medium' :
                    'difficulty-hard'
                  }`}>
                    {problem.difficulty.charAt(0)}
                  </span>
                </div>
                <p className="text-white/60 text-xs font-display tracking-wider">{problem.points}PTS</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Compact Header */}
          <div className="bg-black/90 border-b border-white/10 p-3">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h1 className="text-lg font-bold text-white font-display tracking-wider">DASHBOARD</h1>
                <p className="text-white/60 text-xs font-display tracking-wider">
                  {currentUser.name.toUpperCase()}
                </p>
              </div>
              <div className="scale-75">
                <Timer timeRemaining={timeRemaining} />
              </div>
            </div>

            {/* Compact Stats */}
            <div className="grid grid-cols-4 gap-2">
              <div className="vscode-card p-2 terminal">
                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-xs font-display tracking-wider">SCORE</p>
                      <p className="text-sm font-bold text-white font-mono">{currentUser.score}</p>
                    </div>
                    <Trophy className="text-white" size={16} />
                  </div>
                </div>
              </div>
              
              <div className="vscode-card p-2 terminal">
                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-xs font-display tracking-wider">SOLVED</p>
                      <p className="text-sm font-bold text-white font-mono">{currentUser.solvedProblems}</p>
                    </div>
                    <CheckCircle className="text-white" size={16} />
                  </div>
                </div>
              </div>
              
              <div className="vscode-card p-2 terminal">
                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-xs font-display tracking-wider">PENALTY</p>
                      <p className="text-sm font-bold text-white font-mono">{currentUser.penaltyTime}M</p>
                    </div>
                    <Clock className="text-white" size={16} />
                  </div>
                </div>
              </div>
              
              <div className="vscode-card p-2 terminal">
                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-xs font-display tracking-wider">SUBS</p>
                      <p className="text-sm font-bold text-white font-mono">{submissions.length}</p>
                    </div>
                    <Send className="text-white" size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Editor Tabs */}
          <div className="bg-black/90 border-b border-white/10 flex px-2">
            <div className="px-3 py-2 bg-black text-white text-xs font-display tracking-wider border-b-2 border-white">
              {selectedProblem.title.toUpperCase()}
            </div>
            <div className="px-3 py-2 text-white/60 text-xs font-display tracking-wider">
              SOLUTION.{language.toUpperCase()}
            </div>
          </div>

          {/* Compact Main Editor Area */}
          <div className="flex-1 flex">
            {/* Compact Problem Description */}
            <div className="w-1/2 bg-black border-r border-white/10 p-3 overflow-y-auto text-sm">
              <div className="mb-3">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-white font-display tracking-wider">{selectedProblem.title.toUpperCase()}</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-bold ${
                      selectedProblem.difficulty === 'Easy' ? 'difficulty-easy' :
                      selectedProblem.difficulty === 'Medium' ? 'difficulty-medium' :
                      'difficulty-hard'
                    }`}>
                      {selectedProblem.difficulty.toUpperCase()}
                    </span>
                    <span className="text-white font-bold font-mono text-xs">{selectedProblem.points}PTS</span>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-white leading-relaxed mb-3 text-sm">
                    {selectedProblem.description}
                  </p>
                  
                  <h3 className="text-sm font-bold text-white mb-2 font-display tracking-wider">EXAMPLES:</h3>
                  {selectedProblem.examples.slice(0, 2).map((example, index) => (
                    <div key={index} className="mb-2 p-2 bg-white/5 border border-white/10">
                      <p className="text-white mb-1 text-xs">
                        <strong className="text-white font-display tracking-wider">IN:</strong> <code>{example.input}</code>
                      </p>
                      <p className="text-white mb-1 text-xs">
                        <strong className="text-white font-display tracking-wider">OUT:</strong> <code>{example.output}</code>
                      </p>
                    </div>
                  ))}
                  
                  <h3 className="text-sm font-bold text-white mb-2 font-display tracking-wider">CONSTRAINTS:</h3>
                  <ul className="list-disc list-inside text-white space-y-1 text-xs">
                    {selectedProblem.constraints.slice(0, 3).map((constraint, index) => (
                      <li key={index}><code>{constraint}</code></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Compact Code Editor */}
            <div className="w-1/2 bg-black flex flex-col">
              <div className="flex justify-between items-center p-2 border-b border-white/10">
                <h3 className="text-sm font-bold text-white font-display tracking-wider">EDITOR</h3>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="vscode-select text-xs"
                >
                  <option value="javascript">JS</option>
                  <option value="python">PY</option>
                  <option value="java">JAVA</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
              
              <div className="flex-1 p-2">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="vscode-textarea w-full h-full p-2 text-sm"
                  placeholder="// WRITE YOUR SOLUTION HERE..."
                />
              </div>
              
              <div className="p-2 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <div className="text-white/60 text-xs font-display tracking-wider">
                    {selectedProblem.timeLimit}MS | {selectedProblem.memoryLimit}MB
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!code.trim() || isSubmitting}
                    className={`vscode-button flex items-center text-xs px-3 py-1 ${
                      !code.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Play size={12} className="mr-1" />
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Status Bar */}
          <div className="bg-white text-black h-6 text-xs flex items-center px-3 justify-between font-display tracking-wider">
            <div className="flex items-center space-x-3">
              <span>LN 1, COL 1</span>
              <span>{language.toUpperCase()}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>PROBLEMS: {challenge.problems.length}</span>
              <span>SOLVED: {currentUser.solvedProblems}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Recent Submissions */}
      {submissions.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-white/10 max-h-32 overflow-y-auto">
          <div className="p-2">
            <h3 className="text-sm font-bold text-white mb-2 font-display tracking-wider">RECENT SUBMISSIONS</h3>
            <div className="space-y-1">
              {submissions.slice(0, 3).map((submission) => {
                const problem = challenge.problems.find(p => p.id === submission.problemId);
                return (
                  <div key={submission.id} className="flex items-center justify-between p-1 bg-white/5 border border-white/10 text-xs">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(submission.status)}
                      <span className="text-white font-display tracking-wider">{problem?.title.toUpperCase()}</span>
                      <span className="text-white/60 font-display tracking-wider">{submission.language.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-1 py-0.5 text-xs font-bold ${getStatusClass(submission.status)}`}>
                        {submission.status.toUpperCase()}
                      </span>
                      <span className="text-white/60 font-mono">
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