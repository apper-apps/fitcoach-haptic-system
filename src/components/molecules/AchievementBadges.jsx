import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const AchievementBadges = ({ achievements }) => {
  const getBadgeColor = (category) => {
    switch (category) {
      case 'streak': return 'from-accent-400 to-accent-600';
      case 'weight': return 'from-success-400 to-success-600';
      case 'workout': return 'from-primary-400 to-primary-600';
      case 'milestone': return 'from-secondary-400 to-secondary-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getBadgeIcon = (category) => {
    switch (category) {
      case 'streak': return 'Flame';
      case 'weight': return 'Scale';
      case 'workout': return 'Dumbbell';
      case 'milestone': return 'Trophy';
      default: return 'Award';
    }
  };

  const earned = achievements.filter(a => a.earned);
  const unearned = achievements.filter(a => !a.earned);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
        <span className="text-sm text-gray-500">{earned.length}/{achievements.length}</span>
      </div>

      {/* Earned Badges */}
      {earned.length > 0 && (
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-gray-700">Earned</h3>
          <div className="grid grid-cols-3 gap-3">
            {earned.map((achievement) => (
              <div
                key={achievement.Id}
                className="text-center p-3 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getBadgeColor(achievement.category)} flex items-center justify-center mx-auto mb-2`}>
                  <ApperIcon name={getBadgeIcon(achievement.category)} size={20} className="text-white" />
                </div>
                <p className="text-xs font-medium text-gray-900">{achievement.name}</p>
                <p className="text-xs text-gray-600 mt-1">{achievement.earnedDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Towards Next Badges */}
      {unearned.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700">In Progress</h3>
          <div className="space-y-3">
            {unearned.slice(0, 3).map((achievement) => (
              <div key={achievement.Id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <ApperIcon name={getBadgeIcon(achievement.category)} size={18} className="text-gray-500" />
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{achievement.name}</p>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full bg-gradient-to-r ${getBadgeColor(achievement.category)}`}
                        style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {achievements.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Trophy" size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-600">Keep going to unlock achievements!</p>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;