import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const DailyNutritionSummary = ({ nutrition }) => {
  const { calories, protein, carbs, fats, targets } = nutrition;

  const nutritionItems = [
    {
      label: 'Calories',
      current: calories,
      target: targets.calories,
      unit: 'kcal',
      color: 'from-primary-400 to-primary-600',
      icon: 'Flame'
    },
    {
      label: 'Protein',
      current: protein,
      target: targets.protein,
      unit: 'g',
      color: 'from-secondary-400 to-secondary-600',
      icon: 'Beef'
    },
    {
      label: 'Carbs',
      current: carbs,
      target: targets.carbs,
      unit: 'g',
      color: 'from-accent-400 to-accent-600',
      icon: 'Wheat'
    },
    {
      label: 'Fats',
      current: fats,
      target: targets.fats,
      unit: 'g',
      color: 'from-green-400 to-green-600',
      icon: 'Droplet'
    }
  ];

  const getPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getRemainingCalories = () => {
    const remaining = targets.calories - calories;
    return remaining > 0 ? remaining : 0;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Today's Nutrition</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Remaining</p>
          <p className="text-lg font-bold text-gray-900">{getRemainingCalories()} cal</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {nutritionItems.map((item, index) => {
          const percentage = getPercentage(item.current, item.target);
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ApperIcon name={item.icon} size={16} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {item.current}/{item.target} {item.unit}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyNutritionSummary;