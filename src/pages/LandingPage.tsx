import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Trophy, Users, ArrowRight, Calendar, University, Award, Terminal, Cpu, Star, Clock, Zap, Brain, Target, Globe, Shield, Layers } from 'lucide-react';
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
    <div className="min-h-screen bg-vscode-dark relative overflow-hidden">
      {/* Futuristic grid background */}
      <div className="absolute inset-0 matrix-bg"></div>
      
      {/* Scanline effect */}
      <div className="absolute inset-0 scanlines"></div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="flex justify-center mb-12 animate-scaleIn">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/10 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative z-10 p-8 bg-black border border-white/20 backdrop-blur-sm">
              <img 
                src="/pic.png" 
                alt="Varsity Code Cup" 
                className="w-32 h-32 object-contain filter brightness-0 invert"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-8 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 glass-card px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-white animate-pulse"></div>
            <span className="text-white font-bold font-display text-sm tracking-wider">SOUTH AFRICA'S PREMIER CODING COMPETITION</span>
            <div className="w-2 h-2 bg-white animate-pulse"></div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fadeIn font-display">
          <span className="gradient-text">VARSITY</span>
          <br />
          <span className="gradient-text">CODE CUP</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-white max-w-4xl mx-auto leading-relaxed animate-fadeIn">
          WHERE THE BRIGHTEST MINDS IN SOUTH AFRICAN UNIVERSITIES COMPETE IN ALGORITHMIC EXCELLENCE. 
          JOIN THE ELITE CODING CHAMPIONSHIP THAT DEFINES THE FUTURE OF TECH TALENT.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-20 animate-fadeIn">
          {currentUser ? (
            <Link 
              to="/dashboard" 
              className="vscode-button px-8 py-4 flex items-center justify-center text-lg font-bold hover-lift group"
            >
              <Terminal size={20} className="mr-2" />
              ENTER COMPETITION
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          ) : (
            <Link 
              to="/register" 
              className="vscode-button px-8 py-4 flex items-center justify-center text-lg font-bold hover-lift group"
            >
              <Users size={20} className="mr-2" />
              JOIN COMPETITION
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
          
          <Link 
            to="/leaderboard" 
            className="vscode-button-secondary px-8 py-4 flex items-center justify-center text-lg font-bold hover-lift group"
          >
            <Trophy size={20} className="mr-2" />
            VIEW RANKINGS
          </Link>
        </div>
        
        {/* Challenge Info */}
        <div className="vscode-card max-w-6xl mx-auto mb-20 p-8 animate-scaleIn hover-lift holographic terminal">
          <div className="pt-8">
            <div className="flex items-center justify-center mb-8">
              <div className="p-4 bg-white/10 mr-4">
                <Terminal className="text-white" size={40} />
              </div>
              <div>
                <h2 className="text-4xl font-bold gradient-text mb-2 font-display">
                  {challenge.title}
                </h2>
                <p className="text-white/60 font-bold font-display tracking-wider">LIVE COMPETITION EVENT</p>
              </div>
            </div>
            
            <p className="mb-10 text-white text-lg leading-relaxed max-w-4xl mx-auto">
              {challenge.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="vscode-card p-6 hover-lift border-l-4 border-white">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white/10 mr-4">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg font-display">COMPETITION START</p>
                    <p className="text-white/80 font-mono">{formatDate(challenge.startTime)}</p>
                  </div>
                </div>
              </div>
              
              <div className="vscode-card p-6 hover-lift border-l-4 border-white">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white/10 mr-4">
                    <Clock size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg font-display">COMPETITION END</p>
                    <p className="text-white/80 font-mono">{formatDate(challenge.endTime)}</p>
                  </div>
                </div>
              </div>
              
              <div className="vscode-card p-6 hover-lift border-l-4 border-white">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white/10 mr-4">
                    <Code2 size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg font-display">TOTAL PROBLEMS</p>
                    <p className="text-white/80 font-mono">{challenge.problems.length} CHALLENGES</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-5xl font-bold text-center gradient-text mb-4 font-display">
          COMPETITION FEATURES
        </h2>
        <p className="text-center text-white/60 text-xl mb-16 max-w-3xl mx-auto font-display tracking-wide">
          EXPERIENCE THE MOST ADVANCED COMPETITIVE PROGRAMMING PLATFORM
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="vscode-card p-8 text-center group hover-lift terminal">
            <div className="pt-8">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <University size={48} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white font-display">
                UNIVERSITY COMPETITION
              </h3>
              <p className="text-white/80 leading-relaxed">
                REPRESENT YOUR INSTITUTION IN THIS PRESTIGIOUS INTER-UNIVERSITY CODING CHAMPIONSHIP WITH INDIVIDUAL RANKINGS AND RECOGNITION.
              </p>
            </div>
          </div>
          
          <div className="vscode-card p-8 text-center group hover-lift terminal">
            <div className="pt-8">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <Brain size={48} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white font-display">
                ADVANCED ALGORITHMS
              </h3>
              <p className="text-white/80 leading-relaxed">
                TACKLE SOPHISTICATED PROGRAMMING CHALLENGES THAT TEST YOUR PROBLEM-SOLVING SKILLS, ALGORITHMIC THINKING, AND CODING EFFICIENCY.
              </p>
            </div>
          </div>
          
          <div className="vscode-card p-8 text-center group hover-lift terminal">
            <div className="pt-8">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <Award size={48} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white font-display">
                RECOGNITION & PRIZES
              </h3>
              <p className="text-white/80 leading-relaxed">
                EARN PRESTIGIOUS RECOGNITION, CERTIFICATES, AND PRIZES WHILE GAINING VISIBILITY FROM TOP TECHNOLOGY COMPANIES AND RECRUITERS.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tech Stack Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="vscode-card p-12 hover-lift terminal data-grid">
          <div className="pt-8">
            <h3 className="text-3xl font-bold text-center gradient-text mb-12 font-display">PLATFORM TECHNOLOGY</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono">REACT</div>
                <div className="text-white/60 font-bold font-display tracking-wider">FRONTEND</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono">FIREBASE</div>
                <div className="text-white/60 font-bold font-display tracking-wider">BACKEND</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono">TYPESCRIPT</div>
                <div className="text-white/60 font-bold font-display tracking-wider">LANGUAGE</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono">VITE</div>
                <div className="text-white/60 font-bold font-display tracking-wider">BUILD TOOL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="vscode-card p-12 hover-lift terminal">
          <div className="pt-8">
            <h3 className="text-3xl font-bold text-center gradient-text mb-12 font-display">COMPETITION STATISTICS</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono neon-glow">24+</div>
                <div className="text-white/60 font-bold font-display tracking-wider">UNIVERSITIES</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono neon-glow">1000+</div>
                <div className="text-white/60 font-bold font-display tracking-wider">PARTICIPANTS</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono neon-glow">4</div>
                <div className="text-white/60 font-bold font-display tracking-wider">CHALLENGES</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono neon-glow">3H</div>
                <div className="text-white/60 font-bold font-display tracking-wider">DURATION</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;