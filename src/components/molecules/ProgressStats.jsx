import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const ProgressStats = ({ stats }) => {
  const { weightLoss, streakDays, workoutsCompleted, avgCalories, goal } = stats;

  const progressItems = [
    {
      label: 'Weight Lost',
      value: `${Math.abs(weightLoss)}kg`,
      subtext: `${((Math.abs(weightLoss) / goal.totalWeightLoss) * 100).toFixed(1)}% of goal`,
      icon: 'TrendingDown',
      color: 'text-success-600 bg-success-100'
    },
    {
      label: 'Current Streak',
      value: `${streakDays}`,
      subtext: 'days consistent',
      icon: 'Flame',
      color: 'text-accent-600 bg-accent-100'
    },
    {
      label: 'Workouts',
      value: workoutsCompleted,
      subtext: 'completed',
      icon: 'Dumbbell',
      color: 'text-primary-600 bg-primary-100'
    },
    {
      label: 'Avg Calories',
      value: avgCalories,
      subtext: 'per day',
      icon: 'Activity',
      color: 'text-secondary-600 bg-secondary-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {progressItems.map((item, index) => (
        <div key={index} className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
              <ApperIcon name={item.icon} size={20} />
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{item.value}</p>
            <p className="text-sm font-medium text-gray-700 mb-1">{item.label}</p>
            <p className="text-xs text-gray-500">{item.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressStats;