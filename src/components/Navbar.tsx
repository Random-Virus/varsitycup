import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Trophy, Users, Home, LogOut, Terminal } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { currentUser, logoutParticipant } = useApp();
  const location = useLocation();

  const handleLogout = () => {
    logoutParticipant();
  };

  return (
    <nav className="bg-vscode-sidebar border-b border-vscode sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative z-10 p-2 bg-black border border-white/20">
                  <img 
                    src="/pic.png" 
                    alt="Varsity Code Cup" 
                    className="w-8 h-8 object-contain filter brightness-0 invert"
                  />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold font-display gradient-text">
                  VARSITY CODE CUP
                </span>
                <div className="text-xs text-white/60 font-bold font-display tracking-wider">2024 CHAMPIONSHIP</div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-bold transition-all duration-200 font-display tracking-wider ${
                  location.pathname === '/' 
                    ? 'text-white bg-white/10 border border-white/30' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Home size={16} />
                <span>HOME</span>
              </Link>
              
              <Link 
                to="/leaderboard" 
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-bold transition-all duration-200 font-display tracking-wider ${
                  location.pathname === '/leaderboard' 
                    ? 'text-white bg-white/10 border border-white/30' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Trophy size={16} />
                <span>LEADERBOARD</span>
              </Link>
              
              {currentUser ? (
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-bold transition-all duration-200 font-display tracking-wider ${
                    location.pathname === '/dashboard' 
                      ? 'text-white bg-white/10 border border-white/30' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Code2 size={16} />
                  <span>DASHBOARD</span>
                </Link>
              ) : (
                <Link 
                  to="/register" 
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-bold transition-all duration-200 font-display tracking-wider ${
                    location.pathname === '/register' 
                      ? 'text-white bg-white/10 border border-white/30' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Users size={16} />
                  <span>REGISTER</span>
                </Link>
              )}
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <div className="text-white font-bold text-sm font-display tracking-wider">
                  {currentUser.name.toUpperCase()}
                </div>
                <div className="text-white/60 text-xs font-display tracking-wider">
                  {currentUser.university.toUpperCase()}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm bg-white text-black hover:bg-black hover:text-white border border-white font-bold transition-all duration-200 font-display tracking-wider"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">LOGOUT</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;