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
      <div className="container mx-auto px-4"> {/* Increased from px-3 by 40% */}
        <div className="flex justify-between items-center py-3"> {/* Increased from py-2 by 40% */}
          <div className="flex items-center space-x-6"> {/* Increased from space-x-4 by 40% */}
            <Link to="/" className="flex items-center space-x-3 group"> {/* Increased from space-x-2 by 40% */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 opacity-30 group-hover:opacity-50 transition-opacity duration-300 rounded"></div>
                <div className="relative z-10 p-1 bg-black/50 border border-white/10 rounded backdrop-blur-sm"> {/* Reduced from p-3 to p-1 (80% reduction) */}
                  <img 
                    src="/pic.png" 
                    alt="Varsity Code Cup" 
                    className="w-3 h-3 object-contain" /* Reduced from w-13 h-13 to w-3 h-3 (80% reduction) */
                  />
                </div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              {/* Only show Home tab if user is not logged in */}
              {!currentUser && (
                <Link 
                  to="/" 
                  className={`flex items-center space-x-1 px-3 py-1 text-sm font-semibold transition-all duration-300 rounded ${ /* Increased from px-2 and text-xs by 40% */
                    location.pathname === '/' 
                      ? 'text-white bg-white/10 border border-white/20 modern-glow' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Code2 size={17} /> {/* Increased from size={12} by 40% */}
                  <span>HOME</span>
                </Link>
              )}
              
              <Link 
                to="/leaderboard" 
                className={`flex items-center space-x-1 px-3 py-1 text-sm font-semibold transition-all duration-300 rounded ${ /* Increased from px-2 and text-xs by 40% */
                  location.pathname === '/leaderboard' 
                    ? 'text-white bg-white/10 border border-white/20 modern-glow' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Trophy size={17} /> {/* Increased from size={12} by 40% */}
                <span>LEADERBOARD</span>
              </Link>
              
              {currentUser ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`flex items-center space-x-1 px-3 py-1 text-sm font-semibold transition-all duration-300 rounded ${ /* Increased from px-2 and text-xs by 40% */
                      location.pathname === '/dashboard' 
                        ? 'text-white bg-white/10 border border-white/20 modern-glow' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Code2 size={17} /> {/* Increased from size={12} by 40% */}
                    <span>DASHBOARD</span>
                  </Link>
                  
                  <Link 
                    to="/profile" 
                    className={`flex items-center space-x-1 px-3 py-1 text-sm font-semibold transition-all duration-300 rounded ${ /* Increased from px-2 and text-xs by 40% */
                      location.pathname === '/profile' 
                        ? 'text-white bg-white/10 border border-white/20 modern-glow' 
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <User size={17} /> {/* Increased from size={12} by 40% */}
                    <span>PROFILE</span>
                  </Link>
                </>
              ) : (
                <Link 
                  to="/register" 
                  className={`flex items-center space-x-1 px-3 py-1 text-sm font-semibold transition-all duration-300 rounded ${ /* Increased from px-2 and text-xs by 40% */
                    location.pathname === '/register' 
                      ? 'text-white bg-white/10 border border-white/20 modern-glow' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Users size={17} /> {/* Increased from size={12} by 40% */}
                  <span>REGISTER</span>
                </Link>
              )}
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center space-x-3"> {/* Increased from space-x-2 by 40% */}
              <div className="text-right hidden sm:block">
                <div className="text-white font-semibold text-sm"> {/* Increased from text-xs by 40% */}
                  {currentUser.name}
                </div>
                <div className="text-white/60 text-sm"> {/* Increased from text-xs by 40% */}
                  {currentUser.university}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-1 text-sm modern-button hover-lift font-semibold transition-all duration-300" /* Increased from px-2 and text-xs by 40% */
              >
                <LogOut size={14} /> {/* Increased from size={10} by 40% */}
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