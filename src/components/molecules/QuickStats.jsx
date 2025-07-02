import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const QuickStats = ({ data }) => {
  const { weeklyAverage, lastWeekChange, totalWorkouts, averageCalories } = data;

  const stats = [
    {
      label: 'Weekly Avg',
      value: `${weeklyAverage}kg`,
      change: lastWeekChange,
      icon: 'Scale',
      color: lastWeekChange < 0 ? 'text-success-600' : 'text-amber-600'
    },
    {
      label: 'Workouts',
      value: totalWorkouts,
      subtext: 'this week',
      icon: 'Dumbbell',
      color: 'text-primary-600'
    },
    {
      label: 'Avg Calories',
      value: `${averageCalories}`,
      subtext: 'daily',
      icon: 'Flame',
      color: 'text-accent-600'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl p-3 border border-gray-100">
          <div className="flex items-center space-x-2 mb-2">
            <ApperIcon name={stat.icon} size={16} className={stat.color} />
            <span className="text-xs text-gray-600">{stat.label}</span>
          </div>
          
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{stat.value}</p>
            {stat.change !== undefined && (
              <div className={`flex items-center justify-center space-x-1 text-xs ${stat.color}`}>
                <ApperIcon 
                  name={stat.change < 0 ? "TrendingDown" : "TrendingUp"} 
                  size={12} 
                />
                <span>{Math.abs(stat.change)}kg</span>
              </div>
            )}
            {stat.subtext && (
              <p className="text-xs text-gray-500">{stat.subtext}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;