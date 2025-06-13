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
  
  const getBgColor = () => {
    if (timeRemaining <= 1000 * 60 * 10) {
      return 'bg-white/20 border-white/30 modern-glow';
    } else if (timeRemaining <= 1000 * 60 * 30) {
      return 'bg-white/15 border-white/25';
    } else {
      return 'bg-white/10 border-white/20';
    }
  };
  
  return (
    <div className={`modern-card px-2 py-1 border ${getBgColor()}`}>
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <Clock size={12} className="text-white" />
          {timeRemaining <= 1000 * 60 * 10 && (
            <AlertTriangle size={10} className="text-white ml-1 modern-pulse" />
          )}
        </div>
        <div className="font-mono text-sm font-bold text-white">
          {hours}:{minutes}:{seconds}
        </div>
      </div>
    </div>
  );
};

export default Timer;