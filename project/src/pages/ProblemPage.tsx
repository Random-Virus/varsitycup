import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle, XCircle, Clock } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { useApp } from '../context/AppContext';
import Timer from '../components/Timer';

const ProblemPage: React.FC = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const { challenge, currentUser, submitSolution, timeRemaining, submissions, loading } = useApp();
  
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [lastSubmission, setLastSubmission] = useState<any>(null);
  
  // Find the current problem
  const problem = challenge.problems.find((p) => p.id === problemId);
  
  // Redirect if problem not found
  useEffect(() => {
    if (!problem) {
      navigate('/dashboard');
    }
    
    // Check if user is logged in
    if (!currentUser && !loading) {
      navigate('/register');
    }
  }, [problem, currentUser, navigate, loading]);
  
  // Get participant's submissions for this problem
  const problemSubmissions = submissions.filter(
    (submission) => submission.problemId === problemId
  );
  
  // Set initial code based on language
  useEffect(() => {
    switch (language) {
      case 'javascript':
        setCode(`function solution(input) {\n  // Your code here\n  \n  return output;\n}`);
        break;
      case 'python':
        setCode(`def solution(input):\n    # Your code here\n    \n    return output`);
        break;
      case 'java':
        setCode(`public class Solution {\n  public static Object solution(Object input) {\n    // Your code here\n    \n    return output;\n  }\n}`);
        break;
      default:
        setCode('// Your solution here');
    }
  }, [language]);
  
  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  
  // Handle code change
  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };
  
  // Handle submission
  const handleSubmit = async () => {
    if (!problem || !currentUser) return;
    
    setIsSubmitting(true);
    
    try {
      const submission = await submitSolution(problem.id, code, language);
      setLastSubmission(submission);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading problem...</p>
        </div>
      </div>
    );
  }
  
  if (!problem || !currentUser) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-black hover:text-gray-700 transition"
          >
            <ArrowLeft size={18} className="mr-1" /> Back to Dashboard
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problem Description */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
              <div className="bg-black p-4 text-white flex justify-between items-center">
                <h1 className="text-xl font-bold">Problem Details</h1>
                <Timer timeRemaining={timeRemaining} />
              </div>
              
              <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{problem.title}</h2>
                  <div className="flex mt-2 space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      problem.difficulty === 'Easy' 
                        ? 'bg-green-100 text-green-800' 
                        : problem.difficulty === 'Medium' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {problem.difficulty}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                      {problem.points} points
                    </span>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, '<br>') }} />
                  
                  <h3 className="font-bold mt-6 mb-2">Examples:</h3>
                  {problem.examples.map((example, index) => (
                    <div key={index} className="mb-4 bg-gray-50 p-3 rounded-md">
                      <div className="mb-2">
                        <strong>Input:</strong>
                        <pre className="bg-gray-100 p-2 rounded mt-1 text-sm overflow-x-auto">{example.input}</pre>
                      </div>
                      <div>
                        <strong>Output:</strong>
                        <pre className="bg-gray-100 p-2 rounded mt-1 text-sm overflow-x-auto">{example.output}</pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Code Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
              <div className="bg-gray-800 p-4 text-white flex justify-between items-center">
                <div className="flex items-center">
                  <h2 className="font-bold">Code Editor</h2>
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="ml-4 bg-gray-700 text-white border-none rounded px-2 py-1 text-sm"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                  </select>
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex items-center px-4 py-1 rounded ${
                    isSubmitting
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } transition`}
                >
                  {isSubmitting ? (
                    <>
                      <Clock size={16} className="mr-1 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-1" /> Submit
                    </>
                  )}
                </button>
              </div>
              
              <div style={{ height: 'calc(100vh - 300px)', minHeight: '400px' }}>
                <Editor
                  height="100%"
                  language={language}
                  value={code}
                  onChange={handleCodeChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    automaticLayout: true,
                  }}
                />
              </div>
              
              {/* Submission Results */}
              {lastSubmission && (
                <div className={`p-4 border-t ${
                  lastSubmission.status === 'Accepted' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <h3 className="font-bold text-lg mb-2 flex items-center">
                    {lastSubmission.status === 'Accepted' ? (
                      <>
                        <CheckCircle size={20} className="text-green-600 mr-2" />
                        <span className="text-green-800">Submission Accepted!</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={20} className="text-red-600 mr-2" />
                        <span className="text-red-800">Submission Failed</span>
                      </>
                    )}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
                    {lastSubmission.testResults.map((result: any, index: number) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-md ${
                          result.passed ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Test Case {index + 1}</span>
                          {result.passed ? (
                            <CheckCircle size={16} className="text-green-600" />
                          ) : (
                            <XCircle size={16} className="text-red-600" />
                          )}
                        </div>
                        {!result.passed && result.message && (
                          <p className="text-sm text-red-700 mt-1">{result.message}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Previous Submissions */}
              {problemSubmissions.length > 0 && !lastSubmission && (
                <div className="p-4 border-t bg-gray-50">
                  <h3 className="font-bold text-lg mb-2">Previous Submissions</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Language
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {problemSubmissions.slice(0, 3).map((submission) => (
                          <tr key={submission.id}>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                              {new Date(submission.timestamp).toLocaleTimeString()}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                              {submission.language}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                submission.status === 'Accepted'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {submission.status === 'Accepted' ? (
                                  <CheckCircle size={12} className="mr-1" />
                                ) : (
                                  <XCircle size={12} className="mr-1" />
                                )}
                                {submission.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;