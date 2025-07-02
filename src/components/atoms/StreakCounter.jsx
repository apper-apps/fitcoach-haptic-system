import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const StreakCounter = ({ days }) => {
  const getStreakMessage = () => {
    if (days === 0) return "Start your journey today!";
    if (days === 1) return "Great start! Keep it up!";
    if (days < 7) return "Building momentum!";
    if (days < 30) return "You're on fire! 🔥";
    return "Incredible dedication! 💪";
  };

  const getFireIcons = () => {
    if (days < 3) return 1;
    if (days < 7) return 2;
    if (days < 14) return 3;
    if (days < 30) return 4;
    return 5;
  };

  return (
    <div className="bg-gradient-to-r from-accent-400 to-accent-600 rounded-2xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-3xl font-black">{days}</span>
            <div className="flex">
              {Array.from({ length: getFireIcons() }).map((_, i) => (
                <span key={i} className="text-xl">🔥</span>
              ))}
            </div>
          </div>
          <p className="text-white/90 font-medium">Day Streak</p>
          <p className="text-white/70 text-sm">{getStreakMessage()}</p>
        </div>
        
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
          <ApperIcon name="Zap" size={32} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;