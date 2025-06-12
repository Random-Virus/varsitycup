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
      return <CheckCircle size={18} className="text-green-400" />;
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
      return <AlertTriangle size={18} className="text-red-400" />;
    } else {
      return <Info size={18} className="text-cyan-400" />;
    }
  };
  
  const getNotificationStyle = (message: string) => {
    if (message.toLowerCase().includes('congratulations') || message.toLowerCase().includes('success')) {
      return 'border-green-400/50 bg-green-400/10';
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
      return 'border-red-400/50 bg-red-400/10';
    } else {
      return 'border-cyan-400/50 bg-cyan-400/10';
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-full">
      {notifications.map((notification, index) => (
        <div 
          key={index}
          className={`cyber-card rounded-lg shadow-lg mb-3 p-4 flex items-start animate-slideIn border ${getNotificationStyle(notification)}`}
        >
          <div className="mr-3 flex-shrink-0 mt-0.5">
            {getNotificationIcon(notification)}
          </div>
          <div className="flex-grow text-white font-rajdhani">{notification}</div>
          <button 
            onClick={() => dismissNotification(index)}
            className="ml-3 text-gray-400 hover:text-white flex-shrink-0 transition-colors duration-200"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;