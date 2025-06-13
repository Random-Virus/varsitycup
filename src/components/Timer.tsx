import React from 'react';
import { Clock, Zap } from 'lucide-react';

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
      return 'text-red-400';
    } else if (timeRemaining <= 1000 * 60 * 30) { // Less than 30 minutes
      return 'text-yellow-400';
    } else {
      return 'text-purple-400';
    }
  };
  
  const getBgColor = () => {
    if (timeRemaining <= 1000 * 60 * 10) {
      return 'bg-red-500/20 border-red-500/30';
    } else if (timeRemaining <= 1000 * 60 * 30) {
      return 'bg-yellow-500/20 border-yellow-500/30';
    } else {
      return 'neon-card';
    }
  };
  
  return (
    <div className={`glass-card rounded-2xl px-6 py-4 border ${getBgColor()}`}>
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <Clock size={20} className={`${getTimerColor()}`} />
          <Zap size={20} className={`${getTimerColor()} ml-1 ${timeRemaining <= 1000 * 60 * 10 ? 'animate-pulse' : ''}`} />
        </div>
        <div className={`font-mono text-xl font-bold ${getTimerColor()}`}>
          {hours}:{minutes}:{seconds}
        </div>
      </div>
    </div>
  );
};

export default Timer;