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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Modern grid background */}
      <div className="absolute inset-0 modern-grid"></div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="flex justify-center mb-12 animate-scaleIn">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative z-10 p-8 modern-card modern-glow">
              <img 
                src="/pic.png" 
                alt="Varsity Code Cup" 
                className="w-32 h-32 object-contain filter brightness-0 invert"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-8 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 modern-glass px-6 py-3 mb-6 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full modern-pulse"></div>
            <span className="text-white font-semibold text-sm tracking-wider">SOUTH AFRICA'S PREMIER CODING COMPETITION</span>
            <div className="w-2 h-2 bg-white rounded-full modern-pulse"></div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fadeIn font-display">
          <span className="modern-gradient-text">VARSITY</span>
          <br />
          <span className="modern-gradient-text">CODE CUP</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-white/80 max-w-4xl mx-auto leading-relaxed animate-fadeIn">
          Where the brightest minds in South African universities compete in algorithmic excellence. 
          Join the elite coding championship that defines the future of tech talent.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-20 animate-fadeIn">
          {currentUser ? (
            <Link 
              to="/dashboard" 
              className="modern-button px-8 py-4 flex items-center justify-center text-lg font-semibold hover-lift group"
            >
              <Terminal size={20} className="mr-2" />
              ENTER COMPETITION
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          ) : (
            <Link 
              to="/register" 
              className="modern-button px-8 py-4 flex items-center justify-center text-lg font-semibold hover-lift group"
            >
              <Users size={20} className="mr-2" />
              JOIN COMPETITION
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
          
          <Link 
            to="/leaderboard" 
            className="modern-button-secondary px-8 py-4 flex items-center justify-center text-lg font-semibold hover-lift group"
          >
            <Trophy size={20} className="mr-2" />
            VIEW RANKINGS
          </Link>
        </div>
        
        {/* Challenge Info */}
        <div className="modern-card max-w-6xl mx-auto mb-20 p-8 animate-scaleIn hover-lift modern-shimmer">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-white/10 rounded-lg mr-4">
              <Terminal className="text-white" size={40} />
            </div>
            <div>
              <h2 className="text-4xl font-bold modern-gradient-text mb-2 font-display">
                {challenge.title}
              </h2>
              <p className="text-white/60 font-semibold tracking-wider">LIVE COMPETITION EVENT</p>
            </div>
          </div>
          
          <p className="mb-10 text-white/80 text-lg leading-relaxed max-w-4xl mx-auto">
            {challenge.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="modern-card p-6 hover-lift border-l-4 border-green-400">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg mr-4">
                  <Calendar size={24} className="text-green-400" />
                </div>
                <div>
                  <p className="font-bold text-green-400 text-lg">COMPETITION START</p>
                  <p className="text-white/80 font-mono text-sm">{formatDate(challenge.startTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="modern-card p-6 hover-lift border-l-4 border-red-400">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-500/20 rounded-lg mr-4">
                  <Clock size={24} className="text-red-400" />
                </div>
                <div>
                  <p className="font-bold text-red-400 text-lg">COMPETITION END</p>
                  <p className="text-white/80 font-mono text-sm">{formatDate(challenge.endTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="modern-card p-6 hover-lift border-l-4 border-blue-400">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg mr-4">
                  <Code2 size={24} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-bold text-blue-400 text-lg">TOTAL PROBLEMS</p>
                  <p className="text-white/80 font-mono text-sm">{challenge.problems.length} CHALLENGES</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-5xl font-bold text-center modern-gradient-text mb-4 font-display">
          COMPETITION FEATURES
        </h2>
        <p className="text-center text-white/60 text-xl mb-16 max-w-3xl mx-auto">
          Experience the most advanced competitive programming platform
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="modern-card p-8 text-center group hover-lift">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-all duration-300">
                <University size={48} className="text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              UNIVERSITY COMPETITION
            </h3>
            <p className="text-white/70 leading-relaxed">
              Represent your institution in this prestigious inter-university coding championship with individual rankings and recognition.
            </p>
          </div>
          
          <div className="modern-card p-8 text-center group hover-lift">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-all duration-300">
                <Brain size={48} className="text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              ADVANCED ALGORITHMS
            </h3>
            <p className="text-white/70 leading-relaxed">
              Tackle sophisticated programming challenges that test your problem-solving skills, algorithmic thinking, and coding efficiency.
            </p>
          </div>
          
          <div className="modern-card p-8 text-center group hover-lift">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-yellow-500/20 rounded-lg group-hover:bg-yellow-500/30 transition-all duration-300">
                <Award size={48} className="text-yellow-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
              RECOGNITION & PRIZES
            </h3>
            <p className="text-white/70 leading-relaxed">
              Earn prestigious recognition, certificates, and prizes while gaining visibility from top technology companies and recruiters.
            </p>
          </div>
        </div>
      </div>
      
      {/* Tech Stack Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="modern-card p-12 hover-lift">
          <h3 className="text-3xl font-bold text-center modern-gradient-text mb-12 font-display">PLATFORM TECHNOLOGY</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono modern-glow">REACT</div>
              <div className="text-white/60 font-semibold tracking-wider">FRONTEND</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono modern-glow">FIREBASE</div>
              <div className="text-white/60 font-semibold tracking-wider">BACKEND</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono modern-glow">TYPESCRIPT</div>
              <div className="text-white/60 font-semibold tracking-wider">LANGUAGE</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono modern-glow">VITE</div>
              <div className="text-white/60 font-semibold tracking-wider">BUILD TOOL</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="modern-card p-12 hover-lift">
          <h3 className="text-3xl font-bold text-center modern-gradient-text mb-12 font-display">COMPETITION STATISTICS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono modern-glow-strong">24+</div>
              <div className="text-white/60 font-semibold tracking-wider">UNIVERSITIES</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono modern-glow-strong">1000+</div>
              <div className="text-white/60 font-semibold tracking-wider">PARTICIPANTS</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono modern-glow-strong">4</div>
              <div className="text-white/60 font-semibold tracking-wider">CHALLENGES</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300 font-mono modern-glow-strong">3H</div>
              <div className="text-white/60 font-semibold tracking-wider">DURATION</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;