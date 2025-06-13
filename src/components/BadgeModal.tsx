import React from 'react';
import { X, Star, Calendar, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getRarityColor, getRarityTextColor } from '../data/badges';

const BadgeModal: React.FC = () => {
  const { selectedBadge, isBadgeModalOpen, closeBadgeModal } = useApp();

  if (!isBadgeModalOpen || !selectedBadge) return null;

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeBadgeModal();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="modern-card max-w-lg w-full p-8 animate-scaleIn relative">
        {/* Close Button */}
        <button
          onClick={closeBadgeModal}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
        >
          <X size={20} />
        </button>

        {/* Badge Display */}
        <div className="text-center">
          {/* Large Badge Icon */}
          <div className={`inline-block p-8 rounded-2xl border-4 ${getRarityColor(selectedBadge.rarity)} modern-glow-strong mb-6 relative overflow-hidden`}>
            {/* Rarity glow effect */}
            <div className={`absolute inset-0 opacity-20 ${
              selectedBadge.rarity === 'rare' ? 'bg-blue-400' :
              selectedBadge.rarity === 'epic' ? 'bg-purple-400' :
              selectedBadge.rarity === 'legendary' ? 'bg-yellow-400' : 'bg-white'
            } blur-xl`}></div>
            
            <img
              src={selectedBadge.icon}
              alt={selectedBadge.name}
              className="w-32 h-32 object-contain filter brightness-0 invert mx-auto relative z-10"
            />
          </div>
          
          {/* Badge Info */}
          <h2 className="text-3xl font-bold text-white mb-3 modern-gradient-text">
            {selectedBadge.name}
          </h2>
          
          <p className="text-white/80 text-lg mb-6 leading-relaxed max-w-md mx-auto">
            {selectedBadge.description}
          </p>
          
          {/* Badge Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="modern-card p-4 bg-white/5">
              <div className="flex items-center justify-center mb-2">
                <Star className={`${getRarityTextColor(selectedBadge.rarity)}`} size={20} />
              </div>
              <div className="text-white/60 text-sm mb-1">Rarity</div>
              <div className={`font-bold text-lg capitalize ${getRarityTextColor(selectedBadge.rarity)}`}>
                {selectedBadge.rarity}
              </div>
            </div>
            
            <div className="modern-card p-4 bg-white/5">
              <div className="flex items-center justify-center mb-2">
                <Award className="text-white" size={20} />
              </div>
              <div className="text-white/60 text-sm mb-1">Category</div>
              <div className="text-white font-bold text-lg capitalize">
                {selectedBadge.category}
              </div>
            </div>
            
            <div className="modern-card p-4 bg-white/5">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="text-white" size={20} />
              </div>
              <div className="text-white/60 text-sm mb-1">Earned</div>
              <div className="text-white font-bold text-lg">
                {new Date(selectedBadge.earnedAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Achievement Message */}
          <div className="modern-card p-4 bg-white/5 border-l-4 border-white">
            <h3 className="text-white font-bold mb-2">🏆 Achievement Unlocked!</h3>
            <p className="text-white/80 text-sm">
              You've earned the <span className={`font-bold ${getRarityTextColor(selectedBadge.rarity)}`}>{selectedBadge.name}</span> badge 
              in the Varsity Code Cup 2024 competition. This achievement represents your dedication and skill in competitive programming.
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={closeBadgeModal}
            className="modern-button mt-6 px-8 py-3 text-lg font-semibold hover-lift"
          >
            Awesome!
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeModal;