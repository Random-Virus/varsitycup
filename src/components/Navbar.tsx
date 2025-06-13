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
    <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <img 
                  src="/pic.png" 
                  alt="Varsity Code Cup" 
                  className="w-10 h-10 object-contain relative z-10 transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">
                  Varsity Code Cup
                </span>
                <div className="text-xs text-slate-500 font-medium">2024 Championship</div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === '/' 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Home size={16} />
                <span>Home</span>
              </Link>
              
              <Link 
                to="/leaderboard" 
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === '/leaderboard' 
                    ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Trophy size={16} />
                <span>Leaderboard</span>
              </Link>
              
              {currentUser ? (
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === '/dashboard' 
                      ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Code2 size={16} />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link 
                  to="/register" 
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === '/register' 
                      ? 'text-blue-600 bg-blue-50 border border-blue-200' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Users size={16} />
                  <span>Register</span>
                </Link>
              )}
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <div className="text-blue-600 font-semibold text-sm">
                  {currentUser.name}
                </div>
                <div className="text-slate-500 text-xs">
                  {currentUser.university}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              >
                <LogOut size={14} />
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