import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NotificationBar: React.FC = () => {
  const { notifications, dismissNotification } = useApp();
  
  if (notifications.length === 0) {
    return null;
  }
  
  const getNotificationIcon = (message: string) => {
    if (message.toLowerCase().includes('congratulations') || message.toLowerCase().includes('success')) {
      return <CheckCircle size={18} className="text-white" />;
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
      return <AlertTriangle size={18} className="text-white" />;
    } else {
      return <Info size={18} className="text-white" />;
    }
  };
  
  const getNotificationStyle = (message: string) => {
    if (message.toLowerCase().includes('congratulations') || message.toLowerCase().includes('success')) {
      return 'border-white/50 bg-white/10 neon-glow';
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
      return 'border-white/50 bg-white/10 neon-glow';
    } else {
      return 'border-white/50 bg-white/10 neon-glow';
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full">
      {notifications.map((notification, index) => (
        <div 
          key={index}
          className={`glass-card shadow-2xl mb-4 p-4 flex items-start animate-slideIn border ${getNotificationStyle(notification)} terminal`}
        >
          <div className="pt-4">
            <div className="mr-3 flex-shrink-0 mt-0.5">
              {getNotificationIcon(notification)}
            </div>
            <div className="flex-grow text-white font-bold font-display tracking-wider">{notification.toUpperCase()}</div>
            <button 
              onClick={() => dismissNotification(index)}
              className="ml-3 text-white/60 hover:text-white flex-shrink-0 transition-colors duration-200 p-1 hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;