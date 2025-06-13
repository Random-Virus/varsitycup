import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, Trophy, Users, LogOut, Terminal, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { currentUser, logoutParticipant } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutParticipant();
    navigate('/');
  };

  return (
    <nav className="bg-vscode-sidebar border-b border-vscode sticky top-0 z-50 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 opacity-30 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                <div className="relative z-10 p-3 bg-black/50 border border-white/10 rounded-lg backdrop-blur-sm">
                  <img 
                    src="/pic.png" 
                    alt="Varsity Code Cup" 
                    className="w-8 h-8 object-contain filter brightness-0 invert"
                  />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold modern-gradient-text">
                  VARSITY CODE CUP
                </span>
                <div className="text-xs text-white/60 font-semibold tracking-wider">2024 CHAMPIONSHIP</div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-2">
              {/* Only show Home tab if user is not logged in */}
              {!currentUser && (
                <Link 
                  to="/" 
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                    location.pathname === '/' 
                      ? 'text-white bg-white/10 border border-white/20 modern-glow' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Code2 size={16} />
                  <span>HOME</span>
                </Link>
              )}
              
              <Link 
                to="/leaderboard" 
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                  location.pathname === '/leaderboard' 
                    ? 'text-white bg-white/10 border border-white/20 modern-glow' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Trophy size={16} />
                <span>LEADERBOARD</span>
              </Link>
              
              {currentUser ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                      location.pathname === '/dashboard' 
                        ? 'text-white bg-white/10 border border-white/20 modern-glow' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Code2 size={16} />
                    <span>DASHBOARD</span>
                  </Link>
                  
                  <Link 
                    to="/profile" 
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                      location.pathname === '/profile' 
                        ? 'text-white bg-white/10 border border-white/20 modern-glow' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <User size={16} />
                    <span>PROFILE</span>
                  </Link>
                </>
              ) : (
                <Link 
                  to="/register" 
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg ${
                    location.pathname === '/register' 
                      ? 'text-white bg-white/10 border border-white/20 modern-glow' 
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
                <div className="text-white font-semibold text-sm">
                  {currentUser.name}
                </div>
                <div className="text-white/60 text-xs">
                  {currentUser.university}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm modern-button hover-lift font-semibold transition-all duration-300"
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