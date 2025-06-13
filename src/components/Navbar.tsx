import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Trophy, Users, Home, LogOut, Terminal, Cpu } from 'lucide-react';
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
                <div className="absolute inset-0 bg-gradient-to-r from-vscode-blue to-vscode-purple rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative z-10 p-2 bg-gradient-to-br from-vscode-blue/20 to-vscode-purple/20 rounded-lg">
                  <Cpu className="w-8 h-8 text-vscode-blue" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold font-display gradient-text">
                  Varsity Code Cup
                </span>
                <div className="text-xs text-vscode-comment font-medium">2024 Championship</div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === '/' 
                    ? 'text-vscode-blue bg-vscode-blue/10 border border-vscode-blue/30 neon-blue' 
                    : 'text-vscode-comment hover:text-vscode-foreground hover:bg-vscode-blue/5'
                }`}
              >
                <Home size={16} />
                <span>Home</span>
              </Link>
              
              <Link 
                to="/leaderboard" 
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === '/leaderboard' 
                    ? 'text-vscode-blue bg-vscode-blue/10 border border-vscode-blue/30 neon-blue' 
                    : 'text-vscode-comment hover:text-vscode-foreground hover:bg-vscode-blue/5'
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
                      ? 'text-vscode-blue bg-vscode-blue/10 border border-vscode-blue/30 neon-blue' 
                      : 'text-vscode-comment hover:text-vscode-foreground hover:bg-vscode-blue/5'
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
                      ? 'text-vscode-blue bg-vscode-blue/10 border border-vscode-blue/30 neon-blue' 
                      : 'text-vscode-comment hover:text-vscode-foreground hover:bg-vscode-blue/5'
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
                <div className="text-vscode-blue font-semibold text-sm">
                  {currentUser.name}
                </div>
                <div className="text-vscode-comment text-xs">
                  {currentUser.university}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-vscode-red to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-red-500/25 glow-red"
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