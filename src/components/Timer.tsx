import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
}

const Timer: React.FC<TimerProps> = ({ timeRemaining }) => {
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
    };
  };
  
  const { hours, minutes, seconds } = formatTime(timeRemaining);
  
  // Determine color based on time remaining
  const getTimerColor = () => {
    if (timeRemaining <= 1000 * 60 * 10) { // Less than 10 minutes
      return 'text-red-600';
    } else if (timeRemaining <= 1000 * 60 * 30) { // Less than 30 minutes
      return 'text-orange-600';
    } else {
      return 'text-green-600';
    }
  };
  
  const getBgColor = () => {
    if (timeRemaining <= 1000 * 60 * 10) {
      return 'bg-gradient-to-r from-red-50 to-red-100 border-red-200';
    } else if (timeRemaining <= 1000 * 60 * 30) {
      return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
    } else {
      return 'bg-gradient-to-r from-green-50 to-green-100 border-green-200';
    }
  };
  
  return (
    <div className={`vscode-card px-6 py-3 border ${getBgColor()} shadow-sm`}>
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <Clock size={18} className={`${getTimerColor()}`} />
          {timeRemaining <= 1000 * 60 * 10 && (
            <AlertTriangle size={16} className={`${getTimerColor()} ml-2 animate-pulse`} />
          )}
        </div>
        <div className={`font-mono text-xl font-bold ${getTimerColor()}`}>
          {hours}:{minutes}:{seconds}
        </div>
      </div>
    </div>
  );
};

export default Timer;