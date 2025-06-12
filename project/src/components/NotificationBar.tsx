import React from 'react';
import { X, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NotificationBar: React.FC = () => {
  const { notifications, dismissNotification } = useApp();
  
  if (notifications.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-full">
      {notifications.map((notification, index) => (
        <div 
          key={index}
          className="bg-black text-white rounded-lg shadow-lg mb-2 p-4 flex items-start animate-slideIn"
        >
          <Bell size={18} className="mr-2 flex-shrink-0 mt-0.5 text-red-500" />
          <div className="flex-grow">{notification}</div>
          <button 
            onClick={() => dismissNotification(index)}
            className="ml-2 text-white hover:text-gray-300 flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;