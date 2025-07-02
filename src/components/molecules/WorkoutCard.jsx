import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const WorkoutCard = ({ workout, onComplete }) => {
  const { Id, name, duration, exercises, caloriesBurned, completed, difficulty } = workout;

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-amber-600 bg-amber-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 border transition-all duration-200 ${
      completed 
        ? 'border-success-200 bg-success-50' 
        : 'border-gray-100 hover:border-primary-200 hover:shadow-md'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Clock" size={14} />
              <span>{duration} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Flame" size={14} />
              <span>{caloriesBurned} cal</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Activity" size={14} />
              <span>{exercises.length} exercises</span>
            </div>
          </div>

          <div className="space-y-2">
            {exercises.slice(0, 3).map((exercise, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">{exercise.name}</span>
                <span className="text-gray-500">{exercise.sets}x{exercise.reps}</span>
              </div>
            ))}
            {exercises.length > 3 && (
              <p className="text-sm text-gray-500">+{exercises.length - 3} more exercises</p>
            )}
          </div>
        </div>
      </div>

      {!completed ? (
        <button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <ApperIcon name="Play" size={18} />
          <span>Start Workout</span>
        </button>
      ) : (
        <div className="flex items-center justify-center space-x-2 text-success-600 py-3">
          <ApperIcon name="CheckCircle" size={20} />
          <span className="font-semibold">Workout Completed!</span>
        </div>
      )}
    </div>
  );
};

export default WorkoutCard;