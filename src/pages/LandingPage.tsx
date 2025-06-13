import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Trophy, Users, ArrowRight, Calendar, University, Award, Zap, Terminal, Cpu, Star, Clock, Sparkles, Rocket, Shield, Brain, Target, Globe } from 'lucide-react';
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
      {/* Animated background grid */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-2 h-2 bg-vscode-blue rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-vscode-green rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-vscode-purple rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-vscode-yellow rounded-full animate-pulse delay-3000"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="flex justify-center mb-12 animate-scaleIn">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-vscode-blue via-vscode-purple to-vscode-green rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
            <div className="relative z-10 p-8 bg-gradient-to-br from-vscode-blue/20 via-vscode-purple/20 to-vscode-green/20 rounded-full backdrop-blur-sm border border-white/10">
              <Cpu className="w-32 h-32 text-vscode-blue" />
            </div>
          </div>
        </div>
        
        <div className="mb-8 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 glass-card px-6 py-3 mb-6 rounded-full">
            <Sparkles size={16} className="text-vscode-blue animate-pulse" />
            <span className="text-vscode-blue font-semibold">South Africa's Premier Coding Competition</span>
            <Sparkles size={16} className="text-vscode-green animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fadeIn font-display">
          <span className="gradient-text">VARSITY</span>
          <br />
          <span className="gradient-text">CODE CUP</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-vscode-foreground max-w-4xl mx-auto leading-relaxed animate-fadeIn">
          Where the brightest minds in South African universities compete in algorithmic excellence. 
          Join the elite coding championship that defines the future of tech talent.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-20 animate-fadeIn">
          {currentUser ? (
            <Link 
              to="/dashboard" 
              className="vscode-button px-8 py-4 flex items-center justify-center text-lg font-semibold hover-lift group"
            >
              <Rocket size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Enter Competition
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          ) : (
            <Link 
              to="/register" 
              className="vscode-button px-8 py-4 flex items-center justify-center text-lg font-semibold hover-lift group"
            >
              <Users size={20} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Join Competition
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
          
          <Link 
            to="/leaderboard" 
            className="vscode-button-secondary px-8 py-4 flex items-center justify-center text-lg font-semibold hover-lift group"
          >
            <Trophy size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
            View Rankings
          </Link>
        </div>
        
        {/* Challenge Info */}
        <div className="vscode-card max-w-6xl mx-auto mb-20 p-8 animate-scaleIn hover-lift holographic">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-gradient-to-br from-vscode-blue/20 to-vscode-purple/20 rounded-2xl mr-4 neon-blue">
              <Terminal className="text-vscode-blue" size={40} />
            </div>
            <div>
              <h2 className="text-4xl font-bold gradient-text mb-2 font-display">
                {challenge.title}
              </h2>
              <p className="text-vscode-comment font-medium">Live Competition Event</p>
            </div>
          </div>
          
          <p className="mb-10 text-vscode-foreground text-lg leading-relaxed max-w-4xl mx-auto">
            {challenge.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="vscode-card p-6 hover-lift border-l-4 border-vscode-green neon-green">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-vscode-green/20 rounded-xl mr-4">
                  <Calendar size={24} className="text-vscode-green" />
                </div>
                <div>
                  <p className="font-semibold text-vscode-green text-lg">Competition Start</p>
                  <p className="text-vscode-foreground font-mono">{formatDate(challenge.startTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="vscode-card p-6 hover-lift border-l-4 border-vscode-red neon-red">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-vscode-red/20 rounded-xl mr-4">
                  <Clock size={24} className="text-vscode-red" />
                </div>
                <div>
                  <p className="font-semibold text-vscode-red text-lg">Competition End</p>
                  <p className="text-vscode-foreground font-mono">{formatDate(challenge.endTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="vscode-card p-6 hover-lift border-l-4 border-vscode-blue neon-blue">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-vscode-blue/20 rounded-xl mr-4">
                  <Code2 size={24} className="text-vscode-blue" />
                </div>
                <div>
                  <p className="font-semibold text-vscode-blue text-lg">Total Problems</p>
                  <p className="text-vscode-foreground font-mono">{challenge.problems.length} Challenges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-5xl font-bold text-center gradient-text mb-4 font-display">
          Competition Features
        </h2>
        <p className="text-center text-vscode-comment text-xl mb-16 max-w-3xl mx-auto">
          Experience the most advanced competitive programming platform designed for South African universities
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="vscode-card p-8 text-center group hover-lift">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gradient-to-br from-vscode-blue/20 to-vscode-purple/20 rounded-2xl group-hover:scale-110 transition-all duration-300 neon-blue">
                <University size={48} className="text-vscode-blue" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-vscode-blue font-display">
              University Competition
            </h3>
            <p className="text-vscode-foreground leading-relaxed">
              Represent your institution in this prestigious inter-university coding championship with individual rankings and recognition.
            </p>
          </div>
          
          <div className="vscode-card p-8 text-center group hover-lift">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gradient-to-br from-vscode-green/20 to-vscode-blue/20 rounded-2xl group-hover:scale-110 transition-all duration-300 neon-green">
                <Brain size={48} className="text-vscode-green" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-vscode-green font-display">
              Advanced Algorithms
            </h3>
            <p className="text-vscode-foreground leading-relaxed">
              Tackle sophisticated programming challenges that test your problem-solving skills, algorithmic thinking, and coding efficiency.
            </p>
          </div>
          
          <div className="vscode-card p-8 text-center group hover-lift">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gradient-to-br from-vscode-yellow/20 to-vscode-orange/20 rounded-2xl group-hover:scale-110 transition-all duration-300">
                <Award size={48} className="text-vscode-yellow" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-vscode-yellow font-display">
              Recognition & Prizes
            </h3>
            <p className="text-vscode-foreground leading-relaxed">
              Earn prestigious recognition, certificates, and prizes while gaining visibility from top technology companies and recruiters.
            </p>
          </div>
        </div>
      </div>
      
      {/* Tech Stack Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="vscode-card p-12 hover-lift terminal">
          <div className="pt-8">
            <h3 className="text-3xl font-bold text-center gradient-text mb-12 font-display">Platform Technology</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-5xl font-bold text-vscode-blue mb-3 group-hover:scale-110 transition-transform duration-300 font-mono">React</div>
                <div className="text-vscode-comment font-medium">Frontend</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-vscode-green mb-3 group-hover:scale-110 transition-transform duration-300 font-mono">Firebase</div>
                <div className="text-vscode-comment font-medium">Backend</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-vscode-purple mb-3 group-hover:scale-110 transition-transform duration-300 font-mono">TypeScript</div>
                <div className="text-vscode-comment font-medium">Language</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-vscode-yellow mb-3 group-hover:scale-110 transition-transform duration-300 font-mono">Vite</div>
                <div className="text-vscode-comment font-medium">Build Tool</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="vscode-card p-12 hover-lift code-editor">
          <div className="pt-8">
            <h3 className="text-3xl font-bold text-center gradient-text mb-12 font-display">Competition Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-5xl font-bold text-vscode-blue mb-3 group-hover:scale-110 transition-transform duration-300 font-mono glow-blue">24+</div>
                <div className="text-vscode-comment font-semibold">Universities</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-vscode-green mb-3 group-hover:scale-110 transition-transform duration-300 font-mono glow-green">1000+</div>
                <div className="text-vscode-comment font-semibold">Participants</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-vscode-yellow mb-3 group-hover:scale-110 transition-transform duration-300 font-mono">4</div>
                <div className="text-vscode-comment font-semibold">Challenges</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-vscode-red mb-3 group-hover:scale-110 transition-transform duration-300 font-mono glow-red">3H</div>
                <div className="text-vscode-comment font-semibold">Duration</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;