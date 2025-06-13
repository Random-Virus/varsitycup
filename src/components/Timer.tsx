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
      return 'text-vscode-red';
    } else if (timeRemaining <= 1000 * 60 * 30) { // Less than 30 minutes
      return 'text-vscode-orange';
    } else {
      return 'text-vscode-green';
    }
  };
  
  const getBgColor = () => {
    if (timeRemaining <= 1000 * 60 * 10) {
      return 'bg-red-900/20 border-vscode-red';
    } else if (timeRemaining <= 1000 * 60 * 30) {
      return 'bg-orange-900/20 border-orange-500';
    } else {
      return 'bg-green-900/20 border-vscode-green';
    }
  };
  
  return (
    <div className={`vscode-card px-4 py-2 border ${getBgColor()}`}>
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <Clock size={16} className={`${getTimerColor()}`} />
          {timeRemaining <= 1000 * 60 * 10 && (
            <AlertTriangle size={16} className={`${getTimerColor()} ml-1 animate-pulse`} />
          )}
        </div>
        <div className={`font-mono text-lg font-semibold ${getTimerColor()}`}>
          {hours}:{minutes}:{seconds}
        </div>
      </div>
    </div>
  );
};

export default Timer;