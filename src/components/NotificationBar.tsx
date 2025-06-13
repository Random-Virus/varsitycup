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
      return <CheckCircle size={12} className="text-white" />;
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
      return <AlertTriangle size={12} className="text-white" />;
    } else {
      return <Info size={12} className="text-white" />;
    }
  };
  
  const getNotificationStyle = (message: string) => {
    if (message.toLowerCase().includes('congratulations') || message.toLowerCase().includes('success')) {
      return 'border-white/30 bg-white/10';
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
      return 'border-white/30 bg-white/10';
    } else {
      return 'border-white/30 bg-white/10';
    }
  };
  
  return (
    <div className="fixed bottom-3 right-3 z-50 max-w-sm w-full">
      {notifications.map((notification, index) => (
        <div 
          key={index}
          className={`modern-glass shadow-2xl mb-2 p-2 flex items-start animate-slideIn border rounded ${getNotificationStyle(notification)}`}
        >
          <div className="mr-2 flex-shrink-0 mt-0.5">
            {getNotificationIcon(notification)}
          </div>
          <div className="flex-grow text-white font-medium text-xs">{notification}</div>
          <button 
            onClick={() => dismissNotification(index)}
            className="ml-2 text-white/60 hover:text-white flex-shrink-0 transition-colors duration-200 p-1 hover:bg-white/10 rounded"
          >
            <X size={10} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;