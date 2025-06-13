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
      return <CheckCircle size={18} className="text-green-600" />;
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
      return <AlertTriangle size={18} className="text-red-600" />;
    } else {
      return <Info size={18} className="text-blue-600" />;
    }
  };
  
  const getNotificationStyle = (message: string) => {
    if (message.toLowerCase().includes('congratulations') || message.toLowerCase().includes('success')) {
      return 'border-green-200 bg-green-50';
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
      return 'border-red-200 bg-red-50';
    } else {
      return 'border-blue-200 bg-blue-50';
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full">
      {notifications.map((notification, index) => (
        <div 
          key={index}
          className={`glass-card rounded-lg shadow-lg mb-4 p-4 flex items-start animate-slideIn border ${getNotificationStyle(notification)}`}
        >
          <div className="mr-3 flex-shrink-0 mt-0.5">
            {getNotificationIcon(notification)}
          </div>
          <div className="flex-grow text-black font-medium">{notification}</div>
          <button 
            onClick={() => dismissNotification(index)}
            className="ml-3 text-gray-500 hover:text-black flex-shrink-0 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-lg"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;