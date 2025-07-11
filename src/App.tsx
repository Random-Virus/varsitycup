import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import NotificationBar from './components/NotificationBar';
import BadgeModal from './components/BadgeModal';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import CodeSpacePage from './pages/CodeSpacePage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:participantId" element={<ProfilePage />} />
            <Route path="/code/:problemId" element={<CodeSpacePage />} />
          </Routes>
          <NotificationBar />
          <BadgeModal />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;