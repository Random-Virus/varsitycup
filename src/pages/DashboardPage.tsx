import React, { useState } from 'react';
import { Code2, Clock, Trophy, User, Send, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
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
          <h1 className="text-2xl font-orbitron font-bold text-red-400 mb-4">ACCESS DENIED</h1>
          <p className="text-gray-400 font-rajdhani">Authentication required to access dashboard</p>
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-orbitron font-bold text-cyan-400 text-glow-cyan mb-2">
              MISSION CONTROL
            </h1>
            <p className="text-gray-300 font-rajdhani text-lg">
              Welcome back, <span className="text-cyan-400 font-bold">{currentUser.name}</span>
            </p>
          </div>
          <Timer timeRemaining={timeRemaining} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="cyber-card p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 font-rajdhani text-sm">SCORE</p>
                <p className="text-2xl font-orbitron font-bold text-cyan-400">{currentUser.score}</p>
              </div>
              <Trophy className="text-cyan-400" size={32} />
            </div>
          </div>
          
          <div className="cyber-card p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 font-rajdhani text-sm">SOLVED</p>
                <p className="text-2xl font-orbitron font-bold text-green-400">{currentUser.solvedProblems}</p>
              </div>
              <CheckCircle className="text-green-400" size={32} />
            </div>
          </div>
          
          <div className="cyber-card p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 font-rajdhani text-sm">PENALTY</p>
                <p className="text-2xl font-orbitron font-bold text-red-400">{currentUser.penaltyTime}m</p>
              </div>
              <Clock className="text-red-400" size={32} />
            </div>
          </div>
          
          <div className="cyber-card p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 font-rajdhani text-sm">SUBMISSIONS</p>
                <p className="text-2xl font-orbitron font-bold text-yellow-400">{submissions.length}</p>
              </div>
              <Send className="text-yellow-400" size={32} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Problem List */}
          <div className="cyber-card p-6 rounded-lg">
            <h2 className="text-xl font-orbitron font-bold text-cyan-400 mb-4">CHALLENGES</h2>
            <div className="space-y-3">
              {challenge.problems.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => setSelectedProblem(problem)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                    selectedProblem.id === problem.id
                      ? 'border-cyan-400/50 bg-cyan-400/10'
                      : 'border-gray-600/30 hover:border-cyan-400/30 hover:bg-cyan-400/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-orbitron font-bold text-white">{problem.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-rajdhani font-bold ${
                      problem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 font-rajdhani text-sm">{problem.points} points</p>
                </button>
              ))}
            </div>
          </div>

          {/* Problem Details & Code Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Problem Description */}
            <div className="cyber-card p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-orbitron font-bold text-cyan-400">{selectedProblem.title}</h2>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-rajdhani font-bold ${
                    selectedProblem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    selectedProblem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {selectedProblem.difficulty}
                  </span>
                  <span className="text-cyan-400 font-orbitron font-bold">{selectedProblem.points} pts</span>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-300 font-rajdhani leading-relaxed mb-6">
                  {selectedProblem.description}
                </p>
                
                <h3 className="text-lg font-orbitron font-bold text-cyan-400 mb-3">Examples:</h3>
                {selectedProblem.examples.map((example, index) => (
                  <div key={index} className="mb-4 p-4 bg-black/50 rounded-lg border border-cyan-400/20">
                    <p className="text-gray-300 font-rajdhani mb-2">
                      <strong className="text-cyan-400">Input:</strong> {example.input}
                    </p>
                    <p className="text-gray-300 font-rajdhani mb-2">
                      <strong className="text-cyan-400">Output:</strong> {example.output}
                    </p>
                    {example.explanation && (
                      <p className="text-gray-400 font-rajdhani text-sm">
                        <strong>Explanation:</strong> {example.explanation}
                      </p>
                    )}
                  </div>
                ))}
                
                <h3 className="text-lg font-orbitron font-bold text-cyan-400 mb-3">Constraints:</h3>
                <ul className="list-disc list-inside text-gray-300 font-rajdhani space-y-1">
                  {selectedProblem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Code Editor */}
            <div className="cyber-card p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-orbitron font-bold text-cyan-400">CODE EDITOR</h3>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="cyber-input px-3 py-2 rounded font-rajdhani"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 cyber-input p-4 rounded-lg font-mono text-sm resize-none"
                placeholder="// Write your solution here..."
              />
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-gray-400 font-rajdhani text-sm">
                  Time Limit: {selectedProblem.timeLimit}ms | Memory Limit: {selectedProblem.memoryLimit}MB
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!code.trim() || isSubmitting}
                  className={`cyber-button px-6 py-3 rounded-lg font-orbitron font-bold flex items-center ${
                    !code.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Send size={16} className="mr-2" />
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        {submissions.length > 0 && (
          <div className="mt-8">
            <div className="cyber-card p-6 rounded-lg">
              <h2 className="text-xl font-orbitron font-bold text-cyan-400 mb-4">RECENT SUBMISSIONS</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cyan-400/30">
                      <th className="text-left py-3 px-4 font-orbitron font-bold text-cyan-400">PROBLEM</th>
                      <th className="text-left py-3 px-4 font-orbitron font-bold text-cyan-400">LANGUAGE</th>
                      <th className="text-left py-3 px-4 font-orbitron font-bold text-cyan-400">STATUS</th>
                      <th className="text-left py-3 px-4 font-orbitron font-bold text-cyan-400">TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.slice(0, 10).map((submission) => {
                      const problem = challenge.problems.find(p => p.id === submission.problemId);
                      return (
                        <tr key={submission.id} className="border-b border-gray-600/30">
                          <td className="py-3 px-4 font-rajdhani text-white">{problem?.title}</td>
                          <td className="py-3 px-4 font-rajdhani text-gray-300">{submission.language}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(submission.status)}
                              <span className={`px-2 py-1 rounded text-xs font-rajdhani font-bold ${getStatusClass(submission.status)}`}>
                                {submission.status}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-rajdhani text-gray-400">
                            {new Date(submission.timestamp).toLocaleTimeString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;