import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const MealCard = ({ meal, onComplete }) => {
  const { Id, name, calories, protein, carbs, fats, completed, time, foods } = meal;

  return (
    <div className={`bg-white rounded-2xl p-4 border transition-all duration-200 ${
      completed 
        ? 'border-success-200 bg-success-50' 
        : 'border-gray-100 hover:border-primary-200 hover:shadow-md'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {time}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <span>{calories} cal</span>
            <span>{protein}g protein</span>
            <span>{carbs}g carbs</span>
            <span>{fats}g fat</span>
          </div>

          <div className="space-y-1">
            {foods.map((food, index) => (
              <p key={index} className="text-sm text-gray-700">
                • {food.name} ({food.amount})
              </p>
            ))}
          </div>
        </div>

        <button
          onClick={() => onComplete(Id)}
          disabled={completed}
          className={`p-2 rounded-xl transition-all ${
            completed
              ? 'bg-success-100 text-success-600'
              : 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600'
          }`}
        >
          <ApperIcon name={completed ? "Check" : "Plus"} size={18} />
        </button>
      </div>

      {completed && (
        <div className="flex items-center space-x-2 text-success-600 text-sm">
          <ApperIcon name="CheckCircle" size={16} />
          <span>Logged at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      )}
    </div>
  );
};

export default MealCard;