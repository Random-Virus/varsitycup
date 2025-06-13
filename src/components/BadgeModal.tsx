import React from 'react';
import { X, Star, Calendar, Award, Download } from 'lucide-react';
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

  // Download badge as image
  const downloadBadge = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 560; /* Increased from 400 by 40% */
    canvas.height = 560; /* Increased from 400 by 40% */

    // Create gradient background based on rarity
    const gradient = ctx.createRadialGradient(280, 280, 0, 280, 280, 280); /* Increased from 200 by 40% */
    switch (selectedBadge.rarity) {
      case 'rare':
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
        break;
      case 'epic':
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
        break;
      case 'legendary':
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
        break;
      default:
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 560, 560); /* Increased from 400 by 40% */

    // Add border
    ctx.strokeStyle = selectedBadge.rarity === 'rare' ? '#3b82f6' :
                     selectedBadge.rarity === 'epic' ? '#a855f7' :
                     selectedBadge.rarity === 'legendary' ? '#fbbf24' : '#ffffff';
    ctx.lineWidth = 6; /* Increased from 4 by 40% */
    ctx.strokeRect(28, 28, 504, 504); /* Increased from 20, 20, 360, 360 by 40% */

    // Load and draw the badge icon
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Draw badge icon
      ctx.drawImage(img, 140, 112, 280, 280); /* Increased from 100, 80, 200, 200 by 40% */

      // Add text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 45px Arial'; /* Increased from 32px by 40% */
      ctx.textAlign = 'center';
      ctx.fillText(selectedBadge.name, 280, 448); /* Increased from 200, 320 by 40% */

      ctx.font = '25px Arial'; /* Increased from 18px by 40% */
      ctx.fillStyle = '#cccccc';
      ctx.fillText(selectedBadge.description, 280, 490); /* Increased from 200, 350 by 40% */

      ctx.font = '22px Arial'; /* Increased from 16px by 40% */
      ctx.fillStyle = selectedBadge.rarity === 'rare' ? '#3b82f6' :
                     selectedBadge.rarity === 'epic' ? '#a855f7' :
                     selectedBadge.rarity === 'legendary' ? '#fbbf24' : '#ffffff';
      ctx.fillText(selectedBadge.rarity.toUpperCase(), 280, 525); /* Increased from 200, 375 by 40% */

      // Download the image
      const link = document.createElement('a');
      link.download = `${selectedBadge.name.replace(/\s+/g, '_')}_Badge.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    img.src = selectedBadge.icon;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-6" /* Increased from p-4 by 40% */
      onClick={handleBackdropClick}
    >
      <div className="modern-card max-w-2xl w-full p-11 animate-scaleIn relative"> {/* Increased from max-w-lg p-8 by 40% */}
        {/* Close Button */}
        <button
          onClick={closeBadgeModal}
          className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors duration-200 p-3 hover:bg-white/10 rounded-full" /* Increased from top-4 right-4 p-2 by 40% */
        >
          <X size={28} /> {/* Increased from size={20} by 40% */}
        </button>

        {/* Badge Display */}
        <div className="text-center">
          {/* Large Badge Icon */}
          <div className={`inline-block p-11 rounded-3xl border-6 ${getRarityColor(selectedBadge.rarity)} modern-glow-strong mb-8 relative overflow-hidden`}> {/* Increased from p-8 rounded-2xl border-4 mb-6 by 40% */}
            {/* Rarity glow effect */}
            <div className={`absolute inset-0 opacity-20 ${
              selectedBadge.rarity === 'rare' ? 'bg-blue-400' :
              selectedBadge.rarity === 'epic' ? 'bg-purple-400' :
              selectedBadge.rarity === 'legendary' ? 'bg-yellow-400' : 'bg-white'
            } blur-xl`}></div>
            
            <img
              src={selectedBadge.icon}
              alt={selectedBadge.name}
              className="w-45 h-45 object-contain mx-auto relative z-10" /* Increased from w-32 h-32 by 40% */
            />
          </div>
          
          {/* Badge Info */}
          <h2 className="text-4xl font-bold text-white mb-4 modern-gradient-text"> {/* Increased from text-3xl mb-3 by 40% */}
            {selectedBadge.name}
          </h2>
          
          <p className="text-white/80 text-xl mb-8 leading-relaxed max-w-lg mx-auto"> {/* Increased from text-lg mb-6 max-w-md by 40% */}
            {selectedBadge.description}
          </p>
          
          {/* Badge Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> {/* Increased from gap-4 mb-6 by 40% */}
            <div className="modern-card p-6 bg-white/5"> {/* Increased from p-4 by 40% */}
              <div className="flex items-center justify-center mb-3"> {/* Increased from mb-2 by 40% */}
                <Star className={`${getRarityTextColor(selectedBadge.rarity)}`} size={28} /> {/* Increased from size={20} by 40% */}
              </div>
              <div className="text-white/60 text-base mb-1">Rarity</div> {/* Increased from text-sm by 40% */}
              <div className={`font-bold text-xl capitalize ${getRarityTextColor(selectedBadge.rarity)}`}> {/* Increased from text-lg by 40% */}
                {selectedBadge.rarity}
              </div>
            </div>
            
            <div className="modern-card p-6 bg-white/5"> {/* Increased from p-4 by 40% */}
              <div className="flex items-center justify-center mb-3"> {/* Increased from mb-2 by 40% */}
                <Award className="text-white" size={28} /> {/* Increased from size={20} by 40% */}
              </div>
              <div className="text-white/60 text-base mb-1">Category</div> {/* Increased from text-sm by 40% */}
              <div className="text-white font-bold text-xl capitalize"> {/* Increased from text-lg by 40% */}
                {selectedBadge.category}
              </div>
            </div>
            
            <div className="modern-card p-6 bg-white/5"> {/* Increased from p-4 by 40% */}
              <div className="flex items-center justify-center mb-3"> {/* Increased from mb-2 by 40% */}
                <Calendar className="text-white" size={28} /> {/* Increased from size={20} by 40% */}
              </div>
              <div className="text-white/60 text-base mb-1">Earned</div> {/* Increased from text-sm by 40% */}
              <div className="text-white font-bold text-xl"> {/* Increased from text-lg by 40% */}
                {new Date(selectedBadge.earnedAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Achievement Message */}
          <div className="modern-card p-6 bg-white/5 border-l-6 border-white mb-8"> {/* Increased from p-4 border-l-4 mb-6 by 40% */}
            <h3 className="text-white font-bold mb-3">🏆 Achievement Unlocked!</h3> {/* Increased from mb-2 by 40% */}
            <p className="text-white/80 text-base"> {/* Increased from text-sm by 40% */}
              You've earned the <span className={`font-bold ${getRarityTextColor(selectedBadge.rarity)}`}>{selectedBadge.name}</span> badge 
              in the Varsity Code Cup 2024 competition. This achievement represents your dedication and skill in competitive programming.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center"> {/* Increased from gap-3 by 40% */}
            <button
              onClick={downloadBadge}
              className="modern-button-secondary px-8 py-4 text-base font-semibold hover-lift flex items-center justify-center" /* Increased from px-6 py-3 text-sm by 40% */
            >
              <Download size={22} className="mr-3" /> {/* Increased from size={16} mr-2 by 40% */}
              Download Badge
            </button>
            
            <button
              onClick={closeBadgeModal}
              className="modern-button px-8 py-4 text-base font-semibold hover-lift" /* Increased from px-6 py-3 text-sm by 40% */
            >
              Awesome!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeModal;