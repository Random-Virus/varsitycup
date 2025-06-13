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
  
  const getTimerColor = () => {
    return 'text-white';
  };
  
  const getBgColor = () => {
    if (timeRemaining <= 1000 * 60 * 10) {
      return 'bg-black border-white neon-glow';
    } else if (timeRemaining <= 1000 * 60 * 30) {
      return 'bg-black border-white/50';
    } else {
      return 'bg-black border-white/30';
    }
  };
  
  return (
    <div className={`vscode-card px-3 py-2 border ${getBgColor()} terminal`}>
      <div className="flex items-center space-x-2 pt-2">
        <div className="flex items-center">
          <Clock size={14} className={`${getTimerColor()}`} />
          {timeRemaining <= 1000 * 60 * 10 && (
            <AlertTriangle size={12} className={`${getTimerColor()} ml-1 animate-pulse`} />
          )}
        </div>
        <div className={`font-mono text-sm font-bold ${getTimerColor()} font-display tracking-wider`}>
          {hours}:{minutes}:{seconds}
        </div>
      </div>
    </div>
  );
};

export default Timer;