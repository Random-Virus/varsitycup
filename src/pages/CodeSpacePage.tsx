import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Target, Code2, Send, CheckCircle, XCircle, AlertCircle, Terminal, Zap, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Timer from '../components/Timer';

const CodeSpacePage: React.FC = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { currentUser, challenge, submissions, submitSolution, timeRemaining } = useApp();
  
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const problem = challenge.problems.find(p => p.id === problemId);
  const problemSubmissions = submissions.filter(s => s.problemId === problemId);
  const isSolved = problemSubmissions.some(s => s.status === 'Accepted');

  const getLanguageTemplate = (lang: string) => {
    switch (lang) {
      case 'javascript':
        return `// JavaScript Solution
function solve() {
    // Write your solution here
    
}

// Example usage:
// console.log(solve());`;
      case 'python':
        return `# Python Solution
def solve():
    # Write your solution here
    pass

# Example usage:
# print(solve())`;
      case 'java':
        return `// Java Solution
public class Solution {
    public static void main(String[] args) {
        // Write your solution here
        
    }
}`;
      case 'cpp':
        return `// C++ Solution
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Write your solution here
    
    return 0;
}`;
      default:
        return '// Write your solution here...';
    }
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    if (!code.trim()) {
      setCode(getLanguageTemplate(newLanguage));
    }
  };

  // Initialize code template if empty - moved before conditional returns
  React.useEffect(() => {
    if (!code.trim()) {
      setCode(getLanguageTemplate(language));
    }
  }, []);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center modern-grid">
        <div className="text-center modern-card p-4">
          <Terminal className="mx-auto mb-2 text-white" size={24} />
          <h1 className="text-lg font-bold text-white mb-1">ACCESS DENIED</h1>
          <p className="text-white/60 text-sm">Authentication required to access code space</p>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center modern-grid">
        <div className="text-center modern-card p-4">
          <Code2 className="mx-auto mb-2 text-white" size={24} />
          <h1 className="text-lg font-bold text-white mb-1">PROBLEM NOT FOUND</h1>
          <p className="text-white/60 text-sm mb-3">The requested problem could not be found.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="modern-button px-3 py-1 text-xs"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!code.trim()) return;
    
    setIsSubmitting(true);
    try {
      await submitSolution(problem.id, code, language);
      // Don't clear code after submission to allow for modifications
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
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="modern-button-secondary px-2 py-1 flex items-center space-x-1 text-xs"
            >
              <ArrowLeft size={10} />
              <span>DASHBOARD</span>
            </button>
            <div>
              <h1 className="text-lg font-bold modern-gradient-text">
                CODE SPACE
              </h1>
              <p className="text-white/60 text-xs">
                Solve • Test • Submit
              </p>
            </div>
          </div>
          <Timer timeRemaining={timeRemaining} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Problem Description */}
          <div className="modern-card p-3">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-lg font-bold text-white mb-1 flex items-center">
                  {problem.title}
                  {isSolved && <Award className="ml-2 text-white" size={16} />}
                </h2>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold bg-white/20 text-white border border-white/30`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-white font-bold text-sm">{problem.points} points</span>
                </div>
              </div>
            </div>
            
            <div className="prose max-w-none mb-4">
              <p className="text-white/80 leading-relaxed mb-3 text-xs">
                {problem.description}
              </p>
              
              <h3 className="text-sm font-semibold text-white mb-2">Examples:</h3>
              <div className="space-y-2 mb-3">
                {problem.examples.map((example, index) => (
                  <div key={index} className="p-2 bg-white/5 rounded border border-white/10">
                    <p className="text-white mb-1 text-xs">
                      <strong className="text-white">Input:</strong> 
                      <code className="bg-black/50 px-1 py-0.5 rounded text-xs ml-1">{example.input}</code>
                    </p>
                    <p className="text-white mb-1 text-xs">
                      <strong className="text-white">Output:</strong> 
                      <code className="bg-black/50 px-1 py-0.5 rounded text-xs ml-1">{example.output}</code>
                    </p>
                    {example.explanation && (
                      <p className="text-white/60 text-xs">
                        <strong>Explanation:</strong> {example.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              <h3 className="text-sm font-semibold text-white mb-2">Constraints:</h3>
              <ul className="list-disc list-inside text-white/80 space-y-1 mb-3">
                {problem.constraints.map((constraint, index) => (
                  <li key={index} className="text-xs">
                    <code className="bg-black/50 px-1 py-0.5 rounded text-xs">{constraint}</code>
                  </li>
                ))}
              </ul>
            </div>

            {/* Problem Metadata */}
            <div className="pt-3 border-t border-white/10">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-1">
                  <Clock className="text-white" size={12} />
                  <span className="text-white/60">Time Limit:</span>
                  <span className="text-white font-mono">{problem.timeLimit}ms</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="text-white" size={12} />
                  <span className="text-white/60">Memory Limit:</span>
                  <span className="text-white font-mono">{problem.memoryLimit}MB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="modern-card p-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-white flex items-center">
                <Terminal className="mr-1" size={14} />
                Code Editor
              </h3>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="modern-select text-xs"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
            
            <div className="mb-3">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="modern-textarea w-full h-80 p-3 rounded text-xs"
                placeholder="// Write your solution here..."
                spellCheck={false}
              />
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <div className="text-white/60 text-xs">
                Language: {language.toUpperCase()} | Time: {problem.timeLimit}ms | Memory: {problem.memoryLimit}MB
              </div>
              <button
                onClick={handleSubmit}
                disabled={!code.trim() || isSubmitting}
                className={`modern-button flex items-center text-xs ${
                  !code.trim() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Play size={12} className="mr-1" />
                {isSubmitting ? 'Submitting...' : 'Submit Solution'}
              </button>
            </div>

            {/* Submission History for this problem */}
            {problemSubmissions.length > 0 && (
              <div className="pt-3 border-t border-white/10">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center">
                  <Zap className="mr-1" size={12} />
                  Submission History ({problemSubmissions.length})
                </h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {problemSubmissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/10">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(submission.status)}
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
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation to other problems */}
        <div className="mt-4">
          <div className="modern-card p-3">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center">
              <Code2 className="mr-1" size={12} />
              Other Problems
            </h3>
            <div className="flex flex-wrap gap-2">
              {challenge.problems
                .filter(p => p.id !== problemId)
                .map((otherProblem) => {
                  const otherSolved = submissions.some(s => s.problemId === otherProblem.id && s.status === 'Accepted');
                  return (
                    <Link
                      key={otherProblem.id}
                      to={`/code/${otherProblem.id}`}
                      className={`px-2 py-1 rounded text-xs font-semibold transition-all duration-300 border ${
                        otherSolved 
                          ? 'bg-white/20 text-white border-white/30 hover:bg-white/25' 
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
                      }`}
                    >
                      {otherProblem.title}
                      {otherSolved && <CheckCircle className="inline ml-1" size={10} />}
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSpacePage;