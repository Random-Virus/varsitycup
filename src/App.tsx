import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import NotificationBar from './components/NotificationBar';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-vscode-dark text-vscode-foreground matrix-bg">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
          <NotificationBar />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;