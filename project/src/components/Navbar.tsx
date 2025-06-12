import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Trophy, Users, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { currentUser } = useApp();
  const location = useLocation();

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center py-4">
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 hover:text-red-500 transition ${
                location.pathname === '/' ? 'text-red-500' : ''
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/leaderboard" 
              className={`flex items-center space-x-1 hover:text-red-500 transition ${
                location.pathname === '/leaderboard' ? 'text-red-500' : ''
              }`}
            >
              <Trophy size={18} />
              <span>Leaderboard</span>
            </Link>
            
            {currentUser ? (
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-1 hover:text-red-500 transition ${
                  location.pathname === '/dashboard' ? 'text-red-500' : ''
                }`}
              >
                <Code2 size={18} />
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link 
                to="/register" 
                className={`flex items-center space-x-1 hover:text-red-500 transition ${
                  location.pathname === '/register' ? 'text-red-500' : ''
                }`}
              >
                <Users size={18} />
                <span>Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;