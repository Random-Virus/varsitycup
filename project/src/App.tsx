import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import NotificationBar from './components/NotificationBar';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProblemPage from './pages/ProblemPage';

// Custom component to conditionally render Navbar
const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/problem/:problemId" element={<ProblemPage />} />
        </Routes>
      </div>
      <NotificationBar />
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <AppContent />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;