import React from 'react';
import { Clock } from 'lucide-react';

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
      return 'text-red-500';
    } else {
      return 'text-white';
    }
  };
  
  return (
    <div className="flex items-center space-x-2 font-mono">
      <Clock size={20} className={getTimerColor()} />
      <div className={`text-lg font-bold ${getTimerColor()}`}>
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
};

export default Timer;