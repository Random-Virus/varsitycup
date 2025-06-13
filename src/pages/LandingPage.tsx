import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Trophy, Users, ArrowRight, Calendar, University, Award, Zap, Terminal, Cpu, Star, Clock, Sparkles, Rocket, Shield } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="flex justify-center mb-12 animate-scaleIn">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <img 
              src="/pic.png"
              alt="Varsity Code Cup Logo" 
              className="w-48 h-48 object-contain relative z-10 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        
        <div className="mb-8 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 px-6 py-3 rounded-full mb-6 shadow-lg">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-blue-600 font-semibold">South Africa's Premier Coding Competition</span>
            <Sparkles size={16} className="text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fadeIn">
          <span className="gradient-text">VARSITY</span>
          <br />
          <span className="gradient-text">CODE CUP</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-slate-700 max-w-4xl mx-auto leading-relaxed animate-fadeIn">
          Where the brightest minds in South African universities compete in algorithmic excellence. 
          Join the elite coding championship that defines the future of tech talent.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-20 animate-fadeIn">
          {currentUser ? (
            <Link 
              to="/dashboard" 
              className="btn-primary px-8 py-4 flex items-center justify-center text-lg font-semibold hover-lift group"
            >
              <Rocket size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Enter Competition
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          ) : (
            <Link 
              to="/register" 
              className="btn-primary px-8 py-4 flex items-center justify-center text-lg font-semibold hover-lift group"
            >
              <Users size={20} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Join Competition
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
          
          <Link 
            to="/leaderboard" 
            className="btn-secondary px-8 py-4 flex items-center justify-center text-lg font-semibold hover-lift group"
          >
            <Trophy size={20} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
            View Rankings
          </Link>
        </div>
        
        {/* Challenge Info */}
        <div className="vscode-card max-w-6xl mx-auto mb-20 p-8 animate-scaleIn hover-lift">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl mr-4">
              <Cpu className="text-blue-600" size={40} />
            </div>
            <div>
              <h2 className="text-4xl font-bold gradient-text mb-2">
                {challenge.title}
              </h2>
              <p className="text-slate-600 font-medium">Live Competition Event</p>
            </div>
          </div>
          
          <p className="mb-10 text-slate-700 text-lg leading-relaxed max-w-4xl mx-auto">
            {challenge.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="vscode-card p-6 hover-lift border-l-4 border-green-500 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl mr-4">
                  <Calendar size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-600 text-lg">Competition Start</p>
                  <p className="text-slate-700 font-medium">{formatDate(challenge.startTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="vscode-card p-6 hover-lift border-l-4 border-red-500 bg-gradient-to-br from-red-50/50 to-rose-50/50">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-500/20 rounded-xl mr-4">
                  <Clock size={24} className="text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-red-600 text-lg">Competition End</p>
                  <p className="text-slate-700 font-medium">{formatDate(challenge.endTime)}</p>
                </div>
              </div>
            </div>
            
            <div className="vscode-card p-6 hover-lift border-l-4 border-blue-500 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl mr-4">
                  <Code2 size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-blue-600 text-lg">Total Problems</p>
                  <p className="text-slate-700 font-medium">{challenge.problems.length} Challenges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <h2 className="text-5xl font-bold text-center gradient-text mb-4">
          Competition Features
        </h2>
        <p className="text-center text-slate-600 text-xl mb-16 max-w-3xl mx-auto">
          Experience the most advanced competitive programming platform designed for South African universities
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="vscode-card p-8 text-center group hover-lift bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl group-hover:scale-110 transition-all duration-300">
                <University size={48} className="text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              University Competition
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Represent your institution in this prestigious inter-university coding championship with individual rankings and recognition.
            </p>
          </div>
          
          <div className="vscode-card p-8 text-center group hover-lift bg-gradient-to-br from-green-50/50 to-emerald-50/50">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl group-hover:scale-110 transition-all duration-300">
                <Code2 size={48} className="text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-green-600">
              Advanced Algorithms
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Tackle sophisticated programming challenges that test your problem-solving skills, algorithmic thinking, and coding efficiency.
            </p>
          </div>
          
          <div className="vscode-card p-8 text-center group hover-lift bg-gradient-to-br from-yellow-50/50 to-orange-50/50">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl group-hover:scale-110 transition-all duration-300">
                <Award size={48} className="text-yellow-600" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-yellow-600">
              Recognition & Prizes
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Earn prestigious recognition, certificates, and prizes while gaining visibility from top technology companies and recruiters.
            </p>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="vscode-card p-12 hover-lift bg-gradient-to-br from-slate-50/50 to-blue-50/50">
          <h3 className="text-3xl font-bold text-center gradient-text mb-12">Competition Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">24+</div>
              <div className="text-slate-600 font-semibold">Universities</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-green-600 mb-3 group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-slate-600 font-semibold">Participants</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-yellow-600 mb-3 group-hover:scale-110 transition-transform duration-300">4</div>
              <div className="text-slate-600 font-semibold">Challenges</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold text-red-600 mb-3 group-hover:scale-110 transition-transform duration-300">3H</div>
              <div className="text-slate-600 font-semibold">Duration</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;