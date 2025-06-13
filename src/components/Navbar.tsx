import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Trophy, Users, Home, LogOut, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { currentUser, logoutParticipant } = useApp();
  const location = useLocation();

  const handleLogout = () => {
    logoutParticipant();
  };

  return (
    <nav className="glass-card border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src="/pic.png" 
                  alt="Varsity Code Cup" 
                  className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-gradient">
                  Varsity Code Cup
                </span>
                <div className="text-xs text-gray-400 font-medium">2024 Championship</div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-2">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                  location.pathname === '/' 
                    ? 'neon-card text-purple-300 shadow-lg' 
                    : 'text-gray-300 hover:text-purple-300 hover:bg-white/5'
                }`}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              
              <Link 
                to="/leaderboard" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                  location.pathname === '/leaderboard' 
                    ? 'neon-card text-purple-300 shadow-lg' 
                    : 'text-gray-300 hover:text-purple-300 hover:bg-white/5'
                }`}
              >
                <Trophy size={18} />
                <span>Leaderboard</span>
              </Link>
              
              {currentUser ? (
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                    location.pathname === '/dashboard' 
                      ? 'neon-card text-purple-300 shadow-lg' 
                      : 'text-gray-300 hover:text-purple-300 hover:bg-white/5'
                  }`}
                >
                  <Code2 size={18} />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link 
                  to="/register" 
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                    location.pathname === '/register' 
                      ? 'neon-card text-purple-300 shadow-lg' 
                      : 'text-gray-300 hover:text-purple-300 hover:bg-white/5'
                  }`}
                >
                  <Users size={18} />
                  <span>Register</span>
                </Link>
              )}
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <div className="text-gradient-purple font-bold text-sm">
                  {currentUser.name}
                </div>
                <div className="text-gray-400 text-xs">
                  {currentUser.university}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300 font-medium hover-lift"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;