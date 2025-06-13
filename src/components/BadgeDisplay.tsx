import React from 'react';
import { Badge } from '../types';
import { getRarityColor, getRarityTextColor } from '../data/badges';
import { useApp } from '../context/AppContext';

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
  const { showBadgeModal } = useApp();

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8'; /* Increased from w-6 h-6 by 40% */
      case 'medium':
        return 'w-11 h-11'; /* Increased from w-8 h-8 by 40% */
      case 'large':
        return 'w-17 h-17'; /* Increased from w-12 h-12 by 40% */
      default:
        return 'w-11 h-11'; /* Increased from w-8 h-8 by 40% */
    }
  };

  const getContainerClasses = () => {
    switch (size) {
      case 'small':
        return 'p-1';
      case 'medium':
        return 'p-3'; /* Increased from p-2 by 40% */
      case 'large':
        return 'p-4'; /* Increased from p-3 by 40% */
      default:
        return 'p-3'; /* Increased from p-2 by 40% */
    }
  };

  const handleBadgeClick = (badge: Badge) => {
    showBadgeModal(badge);
  };

  if (badges.length === 0) {
    return (
      <div className="text-white/60 text-sm italic"> {/* Increased from text-xs by 40% */}
        No badges earned yet
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3"> {/* Increased from gap-2 by 40% */}
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`modern-card ${getContainerClasses()} hover-lift transition-all duration-300 group relative cursor-pointer ${getRarityColor(badge.rarity)} hover:scale-110 active:scale-95`}
          title={showTooltip ? `Click to view ${badge.name}` : undefined}
          onClick={() => handleBadgeClick(badge)}
        >
          <img
            src={badge.icon}
            alt={badge.name}
            className={`${getSizeClasses()} object-contain group-hover:scale-110 transition-transform duration-300`}
          />
          
          {/* Rarity indicator dot */}
          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border border-black/20 ${ /* Increased from w-3 h-3 by 40% */
            badge.rarity === 'common' ? 'bg-white/80' :
            badge.rarity === 'rare' ? 'bg-blue-400' :
            badge.rarity === 'epic' ? 'bg-purple-400' :
            'bg-yellow-400'
          }`}></div>

          {/* Hover tooltip */}
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-1 bg-black/90 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50"> {/* Increased from mb-2 px-2 text-xs by 40% */}
              <div className="font-semibold">{badge.name}</div>
              <div className="text-white/80">{badge.description}</div>
              <div className={`text-sm ${getRarityTextColor(badge.rarity)} capitalize`}> {/* Increased from text-xs by 40% */}
                {badge.rarity} • Click to view
              </div>
            </div>
          )}

          {/* Rarity glow effect for higher tier badges */}
          {(badge.rarity === 'epic' || badge.rarity === 'legendary') && (
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded ${
              badge.rarity === 'epic' ? 'bg-purple-400' : 'bg-yellow-400'
            } blur-sm`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BadgeDisplay;