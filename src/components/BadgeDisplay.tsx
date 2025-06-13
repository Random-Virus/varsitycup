import React from 'react';
import { Badge } from '../types';
import { getRarityColor, getRarityTextColor } from '../data/badges';

interface BadgeDisplayProps {
  badges: Badge[];
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  badges, 
  size = 'medium', 
  showTooltip = true 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-6 h-6';
      case 'medium':
        return 'w-8 h-8';
      case 'large':
        return 'w-12 h-12';
      default:
        return 'w-8 h-8';
    }
  };

  const getContainerClasses = () => {
    switch (size) {
      case 'small':
        return 'p-1';
      case 'medium':
        return 'p-2';
      case 'large':
        return 'p-3';
      default:
        return 'p-2';
    }
  };

  if (badges.length === 0) {
    return (
      <div className="text-white/60 text-xs italic">
        No badges earned yet
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`modern-card ${getContainerClasses()} hover-lift transition-all duration-300 group relative ${getRarityColor(badge.rarity)}`}
          title={showTooltip ? `${badge.name}: ${badge.description}` : undefined}
        >
          <img
            src={badge.icon}
            alt={badge.name}
            className={`${getSizeClasses()} object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300`}
          />
          
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
              <div className="font-semibold">{badge.name}</div>
              <div className="text-white/80">{badge.description}</div>
              <div className={`text-xs ${getRarityTextColor(badge.rarity)} capitalize`}>
                {badge.rarity}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BadgeDisplay;