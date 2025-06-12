import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Timer from '../components/Timer';

const LeaderboardPage: React.FC = () => {
  const { participants, timeRemaining, loading } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: 'score' | 'solvedProblems' | 'penaltyTime';
    direction: 'ascending' | 'descending';
  }>({
    key: 'score',
    direction: 'descending',
  });
  
  // Sort participants based on current sort configuration
  const sortedParticipants = [...participants].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    
    // If scores are equal, sort by penalty time (lower is better)
    if (sortConfig.key === 'score' && a.score === b.score) {
      return a.penaltyTime > b.penaltyTime ? 1 : -1;
    }
    
    return 0;
  });
  
  // Filter participants based on search term
  const filteredParticipants = sortedParticipants.filter(
    (participant) =>
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.university.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Request for sorting
  const requestSort = (key: 'score' | 'solvedProblems' | 'penaltyTime') => {
    let direction: 'ascending' | 'descending' = 'descending';
    
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    
    setSortConfig({ key, direction });
  };
  
  // Get sort icon
  const getSortIcon = (key: 'score' | 'solvedProblems' | 'penaltyTime') => {
    if (sortConfig.key !== key) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' ? (
      <ArrowUp size={16} className="ml-1" />
    ) : (
      <ArrowDown size={16} className="ml-1" />
    );
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-black p-6 text-white flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                <Trophy className="mr-2 text-red-500" /> Live Leaderboard
              </h1>
              <p className="text-gray-300">Real-time rankings of all participants</p>
            </div>
            
            <Timer timeRemaining={timeRemaining} />
          </div>
          
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search participants or universities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('score')}
                  >
                    <div className="flex items-center">
                      Score
                      {getSortIcon('score')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('solvedProblems')}
                  >
                    <div className="flex items-center">
                      Problems Solved
                      {getSortIcon('solvedProblems')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('penaltyTime')}
                  >
                    <div className="flex items-center">
                      Penalty Time
                      {getSortIcon('penaltyTime')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredParticipants.map((participant, index) => (
                  <tr key={participant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {index < 3 ? (
                        <div className="flex items-center">
                          <Medal 
                            size={20} 
                            className={
                              index === 0 
                                ? 'text-yellow-500' 
                                : index === 1 
                                ? 'text-gray-400' 
                                : 'text-amber-700'
                            } 
                          />
                          <span className="ml-1 font-medium">{index + 1}</span>
                        </div>
                      ) : (
                        <span className="font-medium">{index + 1}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {participant.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {participant.university}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-black">
                      {participant.score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {participant.solvedProblems}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {participant.penaltyTime} min
                    </td>
                  </tr>
                ))}
                
                {filteredParticipants.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No participants found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;