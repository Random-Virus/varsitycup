import React from 'react';
import { X, Download, Star, Calendar, Award } from 'lucide-react';
import { Badge } from '../types';
import { getRarityColor, getRarityTextColor } from '../data/badges';

interface BadgeModalProps {
  badge: Badge | null;
  isOpen: boolean;
  onClose: () => void;
}

const BadgeModal: React.FC<BadgeModalProps> = ({ badge, isOpen, onClose }) => {
  if (!isOpen || !badge) return null;

  const handleDownload = () => {
    // Create a canvas to generate the badge image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;
    
    // Create gradient background based on rarity
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
    
    switch (badge.rarity) {
      case 'common':
        gradient.addColorStop(0, '#ffffff20');
        gradient.addColorStop(1, '#00000080');
        break;
      case 'rare':
        gradient.addColorStop(0, '#3b82f640');
        gradient.addColorStop(1, '#1e40af80');
        break;
      case 'epic':
        gradient.addColorStop(0, '#a855f740');
        gradient.addColorStop(1, '#7c3aed80');
        break;
      case 'legendary':
        gradient.addColorStop(0, '#eab30840');
        gradient.addColorStop(1, '#d97706a0');
        break;
      default:
        gradient.addColorStop(0, '#ffffff20');
        gradient.addColorStop(1, '#00000080');
    }
    
    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
    
    // Draw border
    ctx.strokeStyle = badge.rarity === 'common' ? '#ffffff60' : 
                     badge.rarity === 'rare' ? '#3b82f6' :
                     badge.rarity === 'epic' ? '#a855f7' : '#eab308';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 380, 380);
    
    // Draw inner circle
    ctx.beginPath();
    ctx.arc(200, 200, 150, 0, 2 * Math.PI);
    ctx.fillStyle = '#00000060';
    ctx.fill();
    ctx.strokeStyle = '#ffffff40';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add text
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    
    // Badge name
    ctx.font = 'bold 24px Inter';
    ctx.fillText(badge.name, 200, 180);
    
    // Badge description
    ctx.font = '16px Inter';
    ctx.fillStyle = '#ffffffa0';
    const words = badge.description.split(' ');
    let line = '';
    let y = 210;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > 280 && n > 0) {
        ctx.fillText(line, 200, y);
        line = words[n] + ' ';
        y += 20;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 200, y);
    
    // Rarity
    ctx.font = 'bold 18px Inter';
    ctx.fillStyle = badge.rarity === 'common' ? '#ffffff' : 
                   badge.rarity === 'rare' ? '#3b82f6' :
                   badge.rarity === 'epic' ? '#a855f7' : '#eab308';
    ctx.fillText(badge.rarity.toUpperCase(), 200, y + 40);
    
    // Date earned
    ctx.font = '14px Inter';
    ctx.fillStyle = '#ffffff80';
    const earnedDate = new Date(badge.earnedAt).toLocaleDateString();
    ctx.fillText(`Earned: ${earnedDate}`, 200, y + 65);
    
    // Add Varsity Code Cup branding
    ctx.font = 'bold 12px Inter';
    ctx.fillStyle = '#ffffff60';
    ctx.fillText('VARSITY CODE CUP 2024', 200, 370);
    
    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${badge.name.replace(/\s+/g, '_')}_Badge.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="modern-card max-w-md w-full p-6 animate-scaleIn">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <Award className="text-white" size={20} />
            <h2 className="text-lg font-bold text-white">Badge Details</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors duration-200 p-1 hover:bg-white/10 rounded"
          >
            <X size={16} />
          </button>
        </div>

        {/* Badge Display */}
        <div className="text-center mb-6">
          <div className={`inline-block p-6 rounded-lg border-2 ${getRarityColor(badge.rarity)} modern-glow mb-4`}>
            <img
              src={badge.icon}
              alt={badge.name}
              className="w-24 h-24 object-contain filter brightness-0 invert mx-auto"
            />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{badge.name}</h3>
          <p className="text-white/80 text-sm mb-3 leading-relaxed">{badge.description}</p>
          
          <div className="flex justify-center items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <Star className="text-white/60" size={12} />
              <span className={`font-semibold ${getRarityTextColor(badge.rarity)} capitalize`}>
                {badge.rarity}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Calendar className="text-white/60" size={12} />
              <span className="text-white/60">
                {new Date(badge.earnedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Badge Stats */}
        <div className="modern-card p-3 mb-4 bg-white/5">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-white/60 text-xs mb-1">Category</div>
              <div className="text-white font-semibold text-sm capitalize">{badge.category}</div>
            </div>
            <div>
              <div className="text-white/60 text-xs mb-1">Rarity</div>
              <div className={`font-semibold text-sm capitalize ${getRarityTextColor(badge.rarity)}`}>
                {badge.rarity}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleDownload}
            className="modern-button flex-1 py-2 flex items-center justify-center text-sm font-semibold hover-lift"
          >
            <Download size={14} className="mr-1" />
            Download Badge
          </button>
          
          <button
            onClick={onClose}
            className="modern-button-secondary px-4 py-2 text-sm font-semibold hover-lift"
          >
            Close
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 pt-3 border-t border-white/10">
          <p className="text-white/40 text-xs">
            🏆 Varsity Code Cup 2024 Achievement
          </p>
        </div>
      </div>
    </div>
  );
};

export default BadgeModal;