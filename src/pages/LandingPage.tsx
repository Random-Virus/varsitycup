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
    <div className="min-h-screen bg-vscode-dark relative overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center text-vscode-foreground relative z-10">
        <div className="flex justify-center mb-12 animate-scaleIn">
          <div className="relative">
            <img 
              src="/pic.png"
              alt="Varsity Code Cup Logo" 
              className="w-48 h-48 object-contain relative z-10 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        
        <div className="mb-8 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 vscode-card px-6 py-3 mb-6">
            <Star size={16} className="text-vscode-yellow" />
            <span className="text-vscode-blue font-medium">South Africa's Premier Coding Competition</span>
            <Star size={16} className="text-vscode-yellow" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fadeIn">
          <span className="text-vscode-blue">VARSITY</span>
          <br />
          <span className="text-vscode-green">CODE CUP</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-vscode-foreground max-w-4xl mx-auto leading-relaxed animate-fadeIn">
          Where the brightest minds in South African universities compete in algorithmic excellence. 
          Join the elite coding championship that defines the future of tech talent.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-20 animate-fadeIn">
          {currentUser ? (
            <Link 
              to="/dashboard" 
              className="vscode-button px-8 py-4 flex items-center justify-center text-lg font-medium hover-lift"
            >
              <Terminal size={20} className="mr-2" />
              Enter Competition
              <ArrowRight size={20} className="ml-2" />
            </Link>
          ) : (
            <Link 
              to="/register" 
              className="vscode-button px-8 py-4 flex items-center justify-center text-lg font-medium hover-lift"
            >
              <Users size={20} className="mr-2" />
              Join Competition
              <ArrowRight size={20} className="ml-2" />
            </Link>
          )}
          
          <Link 
            to="/leaderboard" 
            className="vscode-button-secondary px-8 py-4 flex items-center justify-center text-lg font-medium hover-lift"
          >
            <Trophy size={20} className="mr-2" />
            View Rankings
          </Link>
        </div>
        
        {/* Challenge Info */}
        <div className="vscode-card max-w-6xl mx-auto mb-20 p-8 animate-scaleIn hover-lift">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-vscode-blue/20 rounded mr-4">
              <Cpu className="text-vscode-blue" size={40} />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-vscode-blue mb-2">
                {challenge.title}
              </h2>
              <p className="text-vscode-comment">Live Competition Event</p>
            </div>
          </div>
          
          <p className="mb-10 text-vscode-foreground text-lg leading-relaxed max-w-4xl mx-auto">
            {challenge.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="vscode-card p-6 hover-lift border-l-4 border-vscode-green">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-vscode-green/20 rounded mr-4">
                  <Calendar size={24} className="text-vscode-green" />
                </div>
                <div>
                  <p className="font-semibold text-vscode-green text-lg">Competition Start</p>
                  <p className="text-vscode-foreground">{formatDate(challenge.startTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="vscode-card p-6 hover-lift border-l-4 border-vscode-red">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-vscode-red/20 rounded mr-4">
                  <Clock size={24} className="text-vscode-red" />
                </div>
                <div>
                  <p className="font-semibold text-vscode-red text-lg">Competition End</p>
                  <p className="text-vscode-foreground">{formatDate(challenge.endTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="vscode-card p-6 hover-lift border-l-4 border-vscode-blue">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-vscode-blue/20 rounded mr-4">
                  <Code2 size={24} className="text-vscode-blue" />
                </div>
                <div>
                  <p className="font-semibold text-vscode-blue text-lg">Total Problems</p>
                  <p className="text-vscode-foreground">{challenge.problems.length} Challenges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-5xl font-bold text-center text-vscode-blue mb-4">
          Competition Features
        </h2>
        <p className="text-center text-vscode-comment text-xl mb-16 max-w-3xl mx-auto">
          Experience the most advanced competitive programming platform designed for South African universities
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="vscode-card p-8 text-center group hover-lift">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-vscode-blue/20 rounded group-hover:scale-110 transition-all duration-300">
                <University size={48} className="text-vscode-blue" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-vscode-blue">
              University Competition
            </h3>
            <p className="text-vscode-foreground leading-relaxed">
              Represent your institution in this prestigious inter-university coding championship with individual rankings and recognition.
            </p>
          </div>
          
          <div className="vscode-card p-8 text-center group hover-lift">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-vscode-green/20 rounded group-hover:scale-110 transition-all duration-300">
                <Code2 size={48} className="text-vscode-green" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-vscode-green">
              Advanced Algorithms
            </h3>
            <p className="text-vscode-foreground leading-relaxed">
              Tackle sophisticated programming challenges that test your problem-solving skills, algorithmic thinking, and coding efficiency.
            </p>
          </div>
          
          <div className="vscode-card p-8 text-center group hover-lift">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-vscode-yellow/20 rounded group-hover:scale-110 transition-all duration-300">
                <Award size={48} className="text-vscode-yellow" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-vscode-yellow">
              Recognition & Prizes
            </h3>
            <p className="text-vscode-foreground leading-relaxed">
              Earn prestigious recognition, certificates, and prizes while gaining visibility from top technology companies and recruiters.
            </p>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="vscode-card p-12 hover-lift">
          <h3 className="text-3xl font-bold text-center text-vscode-blue mb-12">Competition Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold text-vscode-blue mb-3 group-hover:scale-110 transition-transform duration-300">24+</div>
              <div className="text-vscode-comment font-medium">Universities</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-vscode-green mb-3 group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-vscode-comment font-medium">Participants</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-vscode-yellow mb-3 group-hover:scale-110 transition-transform duration-300">4</div>
              <div className="text-vscode-comment font-medium">Challenges</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-vscode-red mb-3 group-hover:scale-110 transition-transform duration-300">3H</div>
              <div className="text-vscode-comment font-medium">Duration</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;