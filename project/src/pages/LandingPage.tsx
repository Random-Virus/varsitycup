import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Trophy, Users, ArrowRight, Calendar, CaseSensitive as University, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logo from './pic.png';

const LandingPage: React.FC = () => {
  const { currentUser, challenge } = useApp();
  
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
  
  return (
   <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center text-white">
        <div className="flex justify-center mb-6">
          <img 
              src={logo}
              alt="Varsity Code Cup Logo" 
              className="w-40 h-40 object-cover"
            />
        </div>
        <p className="text-sm md:text-base mb-2 text-green-200">Crafyer Softwares</p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Varsity Code Cup</h1>
        <p className="text-xl md:text-2xl mb-8 text-green-200">Where South Africa's Brightest Coders Compete</p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
          {currentUser ? (
            <Link 
              to="/dashboard" 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full flex items-center justify-center transition duration-300"
            >
              Join Competition <ArrowRight size={20} className="ml-2" />
            </Link>
          ) : (
            <Link 
              to="/register" 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full flex items-center justify-center transition duration-300"
            >
              Register <Users size={20} className="ml-2" />
            </Link>
          )}
          
          <Link 
            to="/leaderboard" 
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full flex items-center justify-center transition duration-300"
          >
            View Leaderboard <Trophy size={20} className="ml-2" />
          </Link>
        </div>
        
        {/* Challenge Info */}
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">{challenge.title}</h2>
          <p className="mb-4">{challenge.description}</p>
          
          <div className="flex flex-col md:flex-row justify-between gap-4 text-left">
            <div className="flex items-start">
              <Calendar size={20} className="mr-2 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Starts</p>
                <p className="text-gray-300">{formatDate(challenge.startTime)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar size={20} className="mr-2 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Ends</p>
                <p className="text-gray-300">{formatDate(challenge.endTime)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Code2 size={20} className="mr-2 text-red-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Problems</p>
                <p className="text-gray-300">{challenge.problems.length} Challenges</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Competition Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl text-white">
            <div className="flex justify-center mb-4">
              <University size={40} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Individual Competition</h3>
            <p className="text-gray-300 text-center">
              Compete individually and represent your university in this prestigious coding competition.
            </p>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl text-white">
            <div className="flex justify-center mb-4">
              <Code2 size={40} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Real-world Problems</h3>
            <p className="text-gray-300 text-center">
              Tackle challenging algorithmic problems that test your coding skills and problem-solving abilities.
            </p>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 p-6 rounded-xl text-white">
            <div className="flex justify-center mb-4">
              <Award size={40} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Prizes & Recognition</h3>
            <p className="text-gray-300 text-center">
              Win exciting prizes and gain recognition from top tech companies looking to recruit talented developers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;