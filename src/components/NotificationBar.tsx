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
      return <CheckCircle size={18} className="text-vscode-green" />;
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
      return <AlertTriangle size={18} className="text-vscode-red" />;
    } else {
      return <Info size={18} className="text-vscode-blue" />;
    }
  };
  
  const getNotificationStyle = (message: string) => {
    if (message.toLowerCase().includes('congratulations') || message.toLowerCase().includes('success')) {
      return 'border-vscode-green/50 bg-vscode-green/10 neon-green';
    } else if (message.toLowerCase().includes('error') || message.toLowerCase().includes('failed')) {
      return 'border-vscode-red/50 bg-vscode-red/10 neon-red';
    } else {
      return 'border-vscode-blue/50 bg-vscode-blue/10 neon-blue';
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full">
      {notifications.map((notification, index) => (
        <div 
          key={index}
          className={`glass-card rounded-lg shadow-2xl mb-4 p-4 flex items-start animate-slideIn border ${getNotificationStyle(notification)} terminal`}
        >
          <div className="mr-3 flex-shrink-0 mt-0.5">
            {getNotificationIcon(notification)}
          </div>
          <div className="flex-grow text-vscode-foreground font-medium">{notification}</div>
          <button 
            onClick={() => dismissNotification(index)}
            className="ml-3 text-vscode-comment hover:text-vscode-foreground flex-shrink-0 transition-colors duration-200 p-1 hover:bg-vscode-blue/10 rounded-lg"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;