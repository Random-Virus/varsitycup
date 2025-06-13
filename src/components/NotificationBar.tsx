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
      return <CheckCircle size={17} className="text-white" />; {/* Increased from size={12} by 40% */}
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
      return <AlertTriangle size={17} className="text-white" />; {/* Increased from size={12} by 40% */}
    } else {
      return <Info size={17} className="text-white" />; {/* Increased from size={12} by 40% */}
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
    <div className="fixed bottom-4 right-4 z-50 max-w-lg w-full"> {/* Increased from bottom-3 right-3 max-w-sm by 40% */}
      {notifications.map((notification, index) => (
        <div 
          key={index}
          className={`modern-glass shadow-2xl mb-3 p-3 flex items-start animate-slideIn border rounded ${getNotificationStyle(notification)}`} /* Increased from mb-2 p-2 by 40% */
        >
          <div className="mr-3 flex-shrink-0 mt-1"> {/* Increased from mr-2 mt-0.5 by 40% */}
            {getNotificationIcon(notification)}
          </div>
          <div className="flex-grow text-white font-medium text-sm">{notification}</div> {/* Increased from text-xs by 40% */}
          <button 
            onClick={() => dismissNotification(index)}
            className="ml-3 text-white/60 hover:text-white flex-shrink-0 transition-colors duration-200 p-1 hover:bg-white/10 rounded" /* Increased from ml-2 by 40% */
          >
            <X size={14} /> {/* Increased from size={10} by 40% */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;