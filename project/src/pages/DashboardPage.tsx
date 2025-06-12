import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Clock, AlertTriangle, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Timer from '../components/Timer';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, challenge, timeRemaining, submissions, loading } = useApp();
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  
  // Redirect to register if not logged in
  if (!currentUser && !loading) {
    navigate('/register');
    return null;
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!currentUser) {
    return null;
  }
  
  // Get problem status for the current participant
  const getProblemStatus = (problemId: string) => {
    const problemSubmissions = submissions.filter(
      (submission) => submission.problemId === problemId
    );
    
    if (problemSubmissions.length === 0) {
      return 'Not Attempted';
    }
    
    const accepted = problemSubmissions.some(
      (submission) => submission.status === 'Accepted'
    );
    
    return accepted ? 'Solved' : 'Attempted';
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Solved':
        return 'text-green-600';
      case 'Attempted':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Solved':
        return <CheckCircle size={18} className="text-green-600" />;
      case 'Attempted':
        return <AlertTriangle size={18} className="text-orange-500" />;
      default:
        return null;
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Handle problem selection
  const handleProblemSelect = (problemId: string) => {
    setSelectedProblem(problemId);
    navigate(`/problem/${problemId}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-black p-6 text-white flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Code2 className="mr-2 text-red-500" /> Competition Dashboard
              </h1>
              <p className="text-gray-300">{challenge.title}</p>
            </div>
            
            <Timer timeRemaining={timeRemaining} />
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome, {currentUser.name}</h2>
                <p className="text-gray-600">{currentUser.university}</p>
                <p className="text-gray-500 text-sm">{currentUser.email}</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-6">
                <div>
                  <p className="text-sm text-gray-500">Score</p>
                  <p className="text-2xl font-bold text-black">{currentUser.score}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Problems Solved</p>
                  <p className="text-2xl font-bold text-green-600">{currentUser.solvedProblems}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Penalty Time</p>
                  <p className="text-2xl font-bold text-gray-700">{currentUser.penaltyTime} min</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-center">
              <Clock size={20} className="text-black mr-2" />
              <div>
                <p className="text-gray-800">
                  <span className="font-medium">Competition Period:</span>{' '}
                  {formatDate(challenge.startTime)} - {formatDate(challenge.endTime)}
                </p>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-4">Available Problems</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {challenge.problems.map((problem) => {
                const status = getProblemStatus(problem.id);
                
                return (
                  <div
                    key={problem.id}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer"
                    onClick={() => handleProblemSelect(problem.id)}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-800">{problem.title}</h4>
                        {getStatusIcon(status)}
                      </div>
                      
                      <div className="flex justify-between text-sm mb-2">
                        <span className={`font-medium ${
                          problem.difficulty === 'Easy' 
                            ? 'text-green-600' 
                            : problem.difficulty === 'Medium' 
                            ? 'text-orange-500' 
                            : 'text-red-600'
                        }`}>
                          {problem.difficulty}
                        </span>
                        <span className="text-black font-medium">{problem.points} points</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${getStatusColor(status)}`}>
                          {status}
                        </span>
                        <ExternalLink size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Submissions</h3>
            
            {submissions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Problem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Language
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.slice(0, 5).map((submission) => {
                      const problem = challenge.problems.find(p => p.id === submission.problemId);
                      
                      return (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {problem?.title || 'Unknown Problem'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {submission.language}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {new Date(submission.timestamp).toLocaleTimeString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No submissions yet. Start solving problems!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;