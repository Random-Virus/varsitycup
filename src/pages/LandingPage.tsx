import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Trophy, Users, ArrowRight, Calendar, University, Award, Zap, Terminal, Cpu, Star, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

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
    <div className="min-h-screen bg-pattern relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center text-white relative z-10">
        <div className="flex justify-center mb-12 animate-scaleIn">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <img 
              src="/pic.png"
              alt="Varsity Code Cup Logo" 
              className="w-48 h-48 object-contain relative z-10 drop-shadow-2xl"
            />
          </div>
        </div>
        
        <div className="mb-8 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 glass-card rounded-full px-6 py-3 mb-6">
            <Star size={16} className="text-yellow-400" />
            <span className="text-blue-400 font-semibold">South Africa's Premier Coding Competition</span>
            <Star size={16} className="text-yellow-400" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8 text-shadow animate-fadeIn">
          <span className="text-gradient">VARSITY</span>
          <br />
          <span className="text-gradient-green">CODE CUP</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fadeIn">
          Where the brightest minds in South African universities compete in algorithmic excellence. 
          Join the elite coding championship that defines the future of tech talent.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-20 animate-fadeIn">
          {currentUser ? (
            <Link 
              to="/dashboard" 
              className="btn-primary px-8 py-4 rounded-2xl flex items-center justify-center text-lg font-bold"
            >
              <Zap size={20} className="mr-2" />
              Enter Competition
              <ArrowRight size={20} className="ml-2" />
            </Link>
          ) : (
            <Link 
              to="/register" 
              className="btn-primary px-8 py-4 rounded-2xl flex items-center justify-center text-lg font-bold"
            >
              <Users size={20} className="mr-2" />
              Join Competition
              <ArrowRight size={20} className="ml-2" />
            </Link>
          )}
          
          <Link 
            to="/leaderboard" 
            className="btn-secondary px-8 py-4 rounded-2xl flex items-center justify-center text-lg font-bold"
          >
            <Trophy size={20} className="mr-2" />
            View Rankings
          </Link>
        </div>
        
        {/* Challenge Info */}
        <div className="glass-card rounded-3xl max-w-6xl mx-auto mb-20 p-8 animate-scaleIn">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-blue-500/20 rounded-2xl mr-4">
              <Cpu className="text-blue-400" size={40} />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gradient mb-2">
                {challenge.title}
              </h2>
              <p className="text-gray-400">Live Competition Event</p>
            </div>
          </div>
          
          <p className="mb-10 text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
            {challenge.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card-dark rounded-2xl p-6 hover-lift">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl mr-4">
                  <Calendar size={24} className="text-green-400" />
                </div>
                <div>
                  <p className="font-bold text-green-400 text-lg">Competition Start</p>
                  <p className="text-gray-300">{formatDate(challenge.startTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card-dark rounded-2xl p-6 hover-lift">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-500/20 rounded-xl mr-4">
                  <Clock size={24} className="text-red-400" />
                </div>
                <div>
                  <p className="font-bold text-red-400 text-lg">Competition End</p>
                  <p className="text-gray-300">{formatDate(challenge.endTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-card-dark rounded-2xl p-6 hover-lift">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl mr-4">
                  <Code2 size={24} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-bold text-blue-400 text-lg">Total Problems</p>
                  <p className="text-gray-300">{challenge.problems.length} Challenges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-5xl font-bold text-center text-gradient mb-4">
          Competition Features
        </h2>
        <p className="text-center text-gray-400 text-xl mb-16 max-w-3xl mx-auto">
          Experience the most advanced competitive programming platform designed for South African universities
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card rounded-3xl p-8 text-center group hover-lift">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-blue-500/20 rounded-2xl group-hover:bg-blue-500/30 transition-all duration-300">
                <University size={48} className="text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              University Competition
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Represent your institution in this prestigious inter-university coding championship with individual rankings and recognition.
            </p>
          </div>
          
          <div className="glass-card rounded-3xl p-8 text-center group hover-lift">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-green-500/20 rounded-2xl group-hover:bg-green-500/30 transition-all duration-300">
                <Code2 size={48} className="text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-green-400">
              Advanced Algorithms
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Tackle sophisticated programming challenges that test your problem-solving skills, algorithmic thinking, and coding efficiency.
            </p>
          </div>
          
          <div className="glass-card rounded-3xl p-8 text-center group hover-lift">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-yellow-500/20 rounded-2xl group-hover:bg-yellow-500/30 transition-all duration-300">
                <Award size={48} className="text-yellow-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">
              Recognition & Prizes
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Earn prestigious recognition, certificates, and prizes while gaining visibility from top technology companies and recruiters.
            </p>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="glass-card rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-center text-gradient mb-12">Competition Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-black text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">24+</div>
              <div className="text-gray-400 font-medium">Universities</div>
            </div>
            <div className="group">
              <div className="text-5xl font-black text-green-400 mb-3 group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-gray-400 font-medium">Participants</div>
            </div>
            <div className="group">
              <div className="text-5xl font-black text-yellow-400 mb-3 group-hover:scale-110 transition-transform duration-300">4</div>
              <div className="text-gray-400 font-medium">Challenges</div>
            </div>
            <div className="group">
              <div className="text-5xl font-black text-red-400 mb-3 group-hover:scale-110 transition-transform duration-300">3H</div>
              <div className="text-gray-400 font-medium">Duration</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;