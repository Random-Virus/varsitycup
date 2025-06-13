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
      <div className="min-h-screen bg-vscode-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-vscode-red mb-4">ACCESS DENIED</h1>
          <p className="text-vscode-comment">Authentication required to access dashboard</p>
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
        return <CheckCircle className="text-vscode-green" size={16} />;
      case 'Wrong Answer':
      case 'Runtime Error':
      case 'Compilation Error':
        return <XCircle className="text-vscode-red" size={16} />;
      default:
        return <AlertCircle className="text-vscode-yellow" size={16} />;
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
    <div className="min-h-screen bg-vscode-dark">
      {/* VS Code-style layout */}
      <div className="flex h-screen">
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
            Problems Explorer
          </div>
          <div className="p-4">
            {challenge.problems.map((problem) => (
              <div
                key={problem.id}
                onClick={() => setSelectedProblem(problem)}
                className={`sidebar-item rounded cursor-pointer mb-2 p-3 ${
                  selectedProblem.id === problem.id ? 'active' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-sm">{problem.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    problem.difficulty === 'Easy' ? 'difficulty-easy' :
                    problem.difficulty === 'Medium' ? 'difficulty-medium' :
                    'difficulty-hard'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-vscode-comment text-xs">{problem.points} points</p>
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
                <h1 className="text-2xl font-bold text-vscode-blue">
                  Dashboard
                </h1>
                <p className="text-vscode-comment">
                  Welcome back, <span className="text-vscode-foreground font-medium">{currentUser.name}</span>
                </p>
              </div>
              <Timer timeRemaining={timeRemaining} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="vscode-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-vscode-comment text-sm">Score</p>
                    <p className="text-xl font-bold text-vscode-blue">{currentUser.score}</p>
                  </div>
                  <Trophy className="text-vscode-blue" size={24} />
                </div>
              </div>
              
              <div className="vscode-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-vscode-comment text-sm">Solved</p>
                    <p className="text-xl font-bold text-vscode-green">{currentUser.solvedProblems}</p>
                  </div>
                  <CheckCircle className="text-vscode-green" size={24} />
                </div>
              </div>
              
              <div className="vscode-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-vscode-comment text-sm">Penalty</p>
                    <p className="text-xl font-bold text-vscode-red">{currentUser.penaltyTime}m</p>
                  </div>
                  <Clock className="text-vscode-red" size={24} />
                </div>
              </div>
              
              <div className="vscode-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-vscode-comment text-sm">Submissions</p>
                    <p className="text-xl font-bold text-vscode-yellow">{submissions.length}</p>
                  </div>
                  <Send className="text-vscode-yellow" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Editor Tabs */}
          <div className="editor-tabs">
            <div className="editor-tab active">
              <span>{selectedProblem.title}</span>
            </div>
            <div className="editor-tab">
              <span>Solution.{language}</span>
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex">
            {/* Problem Description */}
            <div className="w-1/2 bg-vscode-editor border-r border-vscode p-6 overflow-y-auto">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-vscode-foreground">{selectedProblem.title}</h2>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                      selectedProblem.difficulty === 'Easy' ? 'difficulty-easy' :
                      selectedProblem.difficulty === 'Medium' ? 'difficulty-medium' :
                      'difficulty-hard'
                    }`}>
                      {selectedProblem.difficulty}
                    </span>
                    <span className="text-vscode-blue font-bold">{selectedProblem.points} pts</span>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-vscode-foreground leading-relaxed mb-6">
                    {selectedProblem.description}
                  </p>
                  
                  <h3 className="text-lg font-semibold text-vscode-blue mb-3">Examples:</h3>
                  {selectedProblem.examples.map((example, index) => (
                    <div key={index} className="mb-4 p-4 bg-vscode-panel rounded border border-vscode">
                      <p className="text-vscode-foreground mb-2">
                        <strong className="text-vscode-blue">Input:</strong> <code className="syntax-string">{example.input}</code>
                      </p>
                      <p className="text-vscode-foreground mb-2">
                        <strong className="text-vscode-blue">Output:</strong> <code className="syntax-string">{example.output}</code>
                      </p>
                      {example.explanation && (
                        <p className="text-vscode-comment text-sm">
                          <strong>Explanation:</strong> {example.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                  
                  <h3 className="text-lg font-semibold text-vscode-blue mb-3">Constraints:</h3>
                  <ul className="list-disc list-inside text-vscode-foreground space-y-1">
                    {selectedProblem.constraints.map((constraint, index) => (
                      <li key={index}><code className="syntax-comment">{constraint}</code></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="w-1/2 bg-vscode-editor flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-vscode">
                <h3 className="text-lg font-semibold text-vscode-blue">Code Editor</h3>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="vscode-select"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
              
              <div className="flex-1 p-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="vscode-textarea w-full h-full p-4 rounded"
                  placeholder="// Write your solution here..."
                />
              </div>
              
              <div className="p-4 border-t border-vscode">
                <div className="flex justify-between items-center">
                  <div className="text-vscode-comment text-sm">
                    Time: {selectedProblem.timeLimit}ms | Memory: {selectedProblem.memoryLimit}MB
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!code.trim() || isSubmitting}
                    className={`vscode-button flex items-center ${
                      !code.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Play size={16} className="mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="status-bar">
            <div className="flex items-center space-x-4">
              <div className="status-bar-item">
                <span>Ln 1, Col 1</span>
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
                <span>Problems: {challenge.problems.length}</span>
              </div>
              <div className="status-bar-item">
                <span>Solved: {currentUser.solvedProblems}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Submissions Panel */}
      {submissions.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-vscode-panel border-t border-vscode max-h-48 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-vscode-blue mb-3">Recent Submissions</h3>
            <div className="space-y-2">
              {submissions.slice(0, 5).map((submission) => {
                const problem = challenge.problems.find(p => p.id === submission.problemId);
                return (
                  <div key={submission.id} className="flex items-center justify-between p-2 bg-vscode-editor rounded">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(submission.status)}
                      <span className="text-vscode-foreground text-sm">{problem?.title}</span>
                      <span className="text-vscode-comment text-sm">{submission.language}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(submission.status)}`}>
                        {submission.status}
                      </span>
                      <span className="text-vscode-comment text-sm">
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