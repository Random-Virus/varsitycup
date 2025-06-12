import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Trophy, Users, ArrowRight, Calendar, University, Award, Zap, Terminal, Cpu } from 'lucide-react';
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-matrix animate-matrix opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-black to-red-900/20"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
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
      <div className="container mx-auto px-4 py-20 text-center text-white relative z-10">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl animate-pulse-slow"></div>
            <img 
              src={logo}
              alt="Varsity Code Cup Logo" 
              className="w-40 h-40 object-cover rounded-full border-2 border-cyan-400/50 relative z-10"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="inline-flex items-center space-x-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full px-4 py-2 mb-4">
            <Terminal size={16} className="text-cyan-400" />
            <span className="text-cyan-400 font-rajdhani font-medium">CRAFYER SOFTWARES</span>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-orbitron font-black mb-6 text-glow-cyan animate-glow">
          VARSITY
          <br />
          <span className="text-red-400 text-glow-red">CODE CUP</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-gray-300 font-rajdhani font-light max-w-3xl mx-auto">
          Where South Africa's Elite Coders Compete in the Ultimate Digital Arena
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
          {currentUser ? (
            <Link 
              to="/dashboard" 
              className="cyber-button px-8 py-4 rounded-lg flex items-center justify-center font-orbitron font-bold text-lg"
            >
              <Zap size={20} className="mr-2" />
              ENTER ARENA
              <ArrowRight size={20} className="ml-2" />
            </Link>
          ) : (
            <Link 
              to="/register" 
              className="cyber-button px-8 py-4 rounded-lg flex items-center justify-center font-orbitron font-bold text-lg"
            >
              <Users size={20} className="mr-2" />
              INITIALIZE
              <ArrowRight size={20} className="ml-2" />
            </Link>
          )}
          
          <Link 
            to="/leaderboard" 
            className="px-8 py-4 rounded-lg border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 flex items-center justify-center font-orbitron font-bold text-lg hover:box-glow"
          >
            <Trophy size={20} className="mr-2" />
            RANKINGS
          </Link>
        </div>
        
        {/* Challenge Info */}
        <div className="cyber-card p-8 rounded-xl max-w-4xl mx-auto mb-16">
          <div className="flex items-center justify-center mb-6">
            <Cpu className="text-cyan-400 mr-3" size={32} />
            <h2 className="text-3xl font-orbitron font-bold text-cyan-400 text-glow-cyan">
              {challenge.title.toUpperCase()}
            </h2>
          </div>
          
          <p className="mb-8 text-gray-300 font-rajdhani text-lg leading-relaxed">
            {challenge.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <Calendar size={24} className="mr-3 text-green-400" />
                <div>
                  <p className="font-orbitron font-bold text-green-400">INITIALIZATION</p>
                  <p className="text-gray-300 font-rajdhani">{formatDate(challenge.startTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <Calendar size={24} className="mr-3 text-red-400" />
                <div>
                  <p className="font-orbitron font-bold text-red-400">TERMINATION</p>
                  <p className="text-gray-300 font-rajdhani">{formatDate(challenge.endTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="glass-effect p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <Code2 size={24} className="mr-3 text-cyan-400" />
                <div>
                  <p className="font-orbitron font-bold text-cyan-400">CHALLENGES</p>
                  <p className="text-gray-300 font-rajdhani">{challenge.problems.length} Algorithms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-4xl font-orbitron font-bold text-center text-cyan-400 mb-16 text-glow-cyan">
          SYSTEM FEATURES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="cyber-card p-8 rounded-xl text-center group">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-cyan-400/10 rounded-full border border-cyan-400/30 group-hover:bg-cyan-400/20 transition-all duration-300">
                <University size={48} className="text-cyan-400" />
              </div>
            </div>
            <h3 className="text-xl font-orbitron font-bold mb-4 text-cyan-400">
              INDIVIDUAL PROTOCOL
            </h3>
            <p className="text-gray-300 font-rajdhani leading-relaxed">
              Execute solo missions and represent your academic institution in this elite coding tournament.
            </p>
          </div>
          
          <div className="cyber-card p-8 rounded-xl text-center group">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-400/10 rounded-full border border-red-400/30 group-hover:bg-red-400/20 transition-all duration-300">
                <Code2 size={48} className="text-red-400" />
              </div>
            </div>
            <h3 className="text-xl font-orbitron font-bold mb-4 text-red-400">
              NEURAL ALGORITHMS
            </h3>
            <p className="text-gray-300 font-rajdhani leading-relaxed">
              Solve complex computational challenges that test your programming prowess and logical thinking.
            </p>
          </div>
          
          <div className="cyber-card p-8 rounded-xl text-center group">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-yellow-400/10 rounded-full border border-yellow-400/30 group-hover:bg-yellow-400/20 transition-all duration-300">
                <Award size={48} className="text-yellow-400" />
              </div>
            </div>
            <h3 className="text-xl font-orbitron font-bold mb-4 text-yellow-400">
              DIGITAL REWARDS
            </h3>
            <p className="text-gray-300 font-rajdhani leading-relaxed">
              Earn recognition and prizes while gaining visibility from leading technology corporations.
            </p>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="cyber-card p-8 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-orbitron font-black text-cyan-400 mb-2">24+</div>
              <div className="text-gray-400 font-rajdhani">Universities</div>
            </div>
            <div>
              <div className="text-4xl font-orbitron font-black text-red-400 mb-2">1000+</div>
              <div className="text-gray-400 font-rajdhani">Participants</div>
            </div>
            <div>
              <div className="text-4xl font-orbitron font-black text-yellow-400 mb-2">4</div>
              <div className="text-gray-400 font-rajdhani">Challenges</div>
            </div>
            <div>
              <div className="text-4xl font-orbitron font-black text-green-400 mb-2">3H</div>
              <div className="text-gray-400 font-rajdhani">Duration</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;