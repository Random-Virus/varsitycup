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
    <nav className="bg-vscode-panel border-b border-vscode sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img 
                  src="/pic.png" 
                  alt="Varsity Code Cup" 
                  className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-110"
                />
              </div>
              <div>
                <span className="text-lg font-semibold text-vscode-blue">
                  Varsity Code Cup
                </span>
                <div className="text-xs text-vscode-comment">2024 Championship</div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  location.pathname === '/' 
                    ? 'text-white bg-vscode-tab-active border-b-2 border-vscode-blue' 
                    : 'text-vscode-foreground hover:text-white hover:bg-vscode-tab'
                }`}
              >
                <Home size={16} />
                <span>Home</span>
              </Link>
              
              <Link 
                to="/leaderboard" 
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  location.pathname === '/leaderboard' 
                    ? 'text-white bg-vscode-tab-active border-b-2 border-vscode-blue' 
                    : 'text-vscode-foreground hover:text-white hover:bg-vscode-tab'
                }`}
              >
                <Trophy size={16} />
                <span>Leaderboard</span>
              </Link>
              
              {currentUser ? (
                <Link 
                  to="/dashboard" 
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    location.pathname === '/dashboard' 
                      ? 'text-white bg-vscode-tab-active border-b-2 border-vscode-blue' 
                      : 'text-vscode-foreground hover:text-white hover:bg-vscode-tab'
                  }`}
                >
                  <Code2 size={16} />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link 
                  to="/register" 
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    location.pathname === '/register' 
                      ? 'text-white bg-vscode-tab-active border-b-2 border-vscode-blue' 
                      : 'text-vscode-foreground hover:text-white hover:bg-vscode-tab'
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
                <div className="text-vscode-blue font-medium text-sm">
                  {currentUser.name}
                </div>
                <div className="text-vscode-comment text-xs">
                  {currentUser.university}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-1 text-sm bg-vscode-red hover:bg-red-600 text-white rounded transition-colors duration-200"
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