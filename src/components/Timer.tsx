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
      return 'text-cyan-400';
    }
  };
  
  const getGlowClass = () => {
    if (timeRemaining <= 1000 * 60 * 10) {
      return 'text-glow-red';
    } else if (timeRemaining <= 1000 * 60 * 30) {
      return 'text-glow';
    } else {
      return 'text-glow-cyan';
    }
  };
  
  return (
    <div className="flex items-center space-x-3 bg-black/50 border border-cyan-400/30 rounded-lg px-4 py-2">
      <div className="flex items-center">
        <Zap size={20} className={`${getTimerColor()} animate-pulse`} />
        <Clock size={20} className={`${getTimerColor()} ml-1`} />
      </div>
      <div className={`font-orbitron text-xl font-bold ${getTimerColor()} ${getGlowClass()}`}>
        {hours}:{minutes}:{seconds}
      </div>
    </div>
  );
};

export default Timer;