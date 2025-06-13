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
      <div className="container mx-auto px-3 py-10 text-center relative z-10">
        <div className="flex justify-center mb-6 animate-scaleIn">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative z-10 p-4 modern-card modern-glow">
              <img 
                src="/pic.png" 
                alt="Varsity Code Cup" 
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-4 animate-fadeIn">
          <div className="inline-flex items-center space-x-1 modern-glass px-3 py-1 mb-3 rounded-full">
            <div className="w-1 h-1 bg-white rounded-full modern-pulse"></div>
            <span className="text-white font-semibold text-xs tracking-wider">SOUTH AFRICA'S PREMIER CODING COMPETITION</span>
            <div className="w-1 h-1 bg-white rounded-full modern-pulse"></div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeIn font-display">
          <span className="modern-gradient-text">VARSITY</span>
          <br />
          <span className="modern-gradient-text">CODE CUP</span>
        </h1>
        
        <p className="text-sm md:text-base mb-6 text-white/80 max-w-2xl mx-auto leading-relaxed animate-fadeIn">
          Where the brightest minds in South African universities compete in algorithmic excellence. 
          Join the elite coding championship that defines the future of tech talent.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-3 mb-10 animate-fadeIn">
          {currentUser ? (
            <Link 
              to="/dashboard" 
              className="modern-button px-4 py-2 flex items-center justify-center text-sm font-semibold hover-lift group"
            >
              <Terminal size={14} className="mr-1" />
              ENTER COMPETITION
              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          ) : (
            <Link 
              to="/register" 
              className="modern-button px-4 py-2 flex items-center justify-center text-sm font-semibold hover-lift group"
            >
              <Users size={14} className="mr-1" />
              JOIN COMPETITION
              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
          
          <Link 
            to="/leaderboard" 
            className="modern-button-secondary px-4 py-2 flex items-center justify-center text-sm font-semibold hover-lift group"
          >
            <Trophy size={14} className="mr-1" />
            VIEW RANKINGS
          </Link>
        </div>
        
        {/* Challenge Info */}
        <div className="modern-card max-w-3xl mx-auto mb-10 p-4 animate-scaleIn hover-lift modern-shimmer">
          <div className="flex items-center justify-center mb-4">
            <div className="p-2 bg-white/10 rounded mr-2">
              <Terminal className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold modern-gradient-text mb-1 font-display">
                {challenge.title}
              </h2>
              <p className="text-white/60 font-semibold tracking-wider text-xs">LIVE COMPETITION EVENT</p>
            </div>
          </div>
          
          <p className="mb-5 text-white/80 text-sm leading-relaxed max-w-2xl mx-auto">
            {challenge.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="modern-card p-3 hover-lift border-l-2 border-white">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-white/20 rounded mr-2">
                  <Calendar size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">COMPETITION START</p>
                  <p className="text-white/80 font-mono text-xs">{formatDate(challenge.startTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="modern-card p-3 hover-lift border-l-2 border-white">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-white/20 rounded mr-2">
                  <Clock size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">COMPETITION END</p>
                  <p className="text-white/80 font-mono text-xs">{formatDate(challenge.endTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="modern-card p-3 hover-lift border-l-2 border-white">
              <div className="flex items-center mb-2">
                <div className="p-2 bg-white/20 rounded mr-2">
                  <Code2 size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">TOTAL PROBLEMS</p>
                  <p className="text-white/80 font-mono text-xs">{challenge.problems.length} CHALLENGES</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-3 py-10 relative z-10">
        <h2 className="text-2xl font-bold text-center modern-gradient-text mb-2 font-display">
          COMPETITION FEATURES
        </h2>
        <p className="text-center text-white/60 text-sm mb-8 max-w-xl mx-auto">
          Experience the most advanced competitive programming platform
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="modern-card p-4 text-center group hover-lift">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/20 rounded group-hover:bg-white/30 transition-all duration-300">
                <University size={24} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">
              UNIVERSITY COMPETITION
            </h3>
            <p className="text-white/70 leading-relaxed text-sm">
              Represent your institution in this prestigious inter-university coding championship with individual rankings and recognition.
            </p>
          </div>
          
          <div className="modern-card p-4 text-center group hover-lift">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/20 rounded group-hover:bg-white/30 transition-all duration-300">
                <Brain size={24} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">
              ADVANCED ALGORITHMS
            </h3>
            <p className="text-white/70 leading-relaxed text-sm">
              Tackle sophisticated programming challenges that test your problem-solving skills, algorithmic thinking, and coding efficiency.
            </p>
          </div>
          
          <div className="modern-card p-4 text-center group hover-lift">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/20 rounded group-hover:bg-white/30 transition-all duration-300">
                <Award size={24} className="text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">
              RECOGNITION & PRIZES
            </h3>
            <p className="text-white/70 leading-relaxed text-sm">
              Earn prestigious recognition, certificates, and prizes while gaining visibility from top technology companies and recruiters.
            </p>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-3 py-10 relative z-10">
        <div className="modern-card p-6 hover-lift">
          <h3 className="text-xl font-bold text-center modern-gradient-text mb-6 font-display">COMPETITION STATISTICS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="group">
              <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300 font-mono modern-glow-strong">24+</div>
              <div className="text-white/60 font-semibold tracking-wider text-xs">UNIVERSITIES</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300 font-mono modern-glow-strong">1000+</div>
              <div className="text-white/60 font-semibold tracking-wider text-xs">PARTICIPANTS</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300 font-mono modern-glow-strong">4</div>
              <div className="text-white/60 font-semibold tracking-wider text-xs">CHALLENGES</div>
            </div>
            <div className="group">
              <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300 font-mono modern-glow-strong">3H</div>
              <div className="text-white/60 font-semibold tracking-wider text-xs">DURATION</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;