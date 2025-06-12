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
    <nav className="bg-black border-b border-cyan-500/30 shadow-lg relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Zap className="text-cyan-400 animate-pulse" size={24} />
              <span className="font-orbitron text-xl font-bold text-cyan-400 text-glow-cyan">
                VCC
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 font-rajdhani font-medium ${
                  location.pathname === '/' 
                    ? 'text-cyan-400 bg-cyan-400/10 box-glow' 
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                }`}
              >
                <Home size={18} />
                <span>HOME</span>
              </Link>
              
              <Link 
                to="/leaderboard" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 font-rajdhani font-medium ${
                  location.pathname === '/leaderboard' 
                    ? 'text-cyan-400 bg-cyan-400/10 box-glow' 
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                }`}
              >
                <Trophy size={18} />
                <span>LEADERBOARD</span>
              </Link>
              
              {currentUser ? (
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 font-rajdhani font-medium ${
                    location.pathname === '/dashboard' 
                      ? 'text-cyan-400 bg-cyan-400/10 box-glow' 
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                  }`}
                >
                  <Code2 size={18} />
                  <span>DASHBOARD</span>
                </Link>
              ) : (
                <Link 
                  to="/register" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 font-rajdhani font-medium ${
                    location.pathname === '/register' 
                      ? 'text-cyan-400 bg-cyan-400/10 box-glow' 
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                  }`}
                >
                  <Users size={18} />
                  <span>ACCESS</span>
                </Link>
              )}
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-cyan-400 font-orbitron font-bold text-sm">
                  {currentUser.name.toUpperCase()}
                </div>
                <div className="text-gray-400 text-xs font-rajdhani">
                  {currentUser.university}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 font-rajdhani font-medium"
              >
                <LogOut size={16} />
                <span>LOGOUT</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;