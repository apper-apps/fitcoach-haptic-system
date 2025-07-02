import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const WorkoutPlan = ({ workout, onStart, onExerciseComplete }) => {
  const { name, duration, exercises, caloriesBurned, completed, difficulty } = workout;

  const completedExercises = exercises.filter(ex => ex.completed).length;
  const progressPercentage = (completedExercises / exercises.length) * 100;

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-amber-600 bg-amber-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h2 className="text-xl font-bold text-gray-900">{name}</h2>
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

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="text-gray-900 font-medium">
                {completedExercises}/{exercises.length} completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-3 mb-6">
        {exercises.map((exercise, index) => (
          <div
            key={exercise.Id}
            className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
              exercise.completed
                ? 'border-success-200 bg-success-50'
                : 'border-gray-200 hover:border-primary-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onExerciseComplete(exercise.Id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  exercise.completed
                    ? 'border-success-500 bg-success-500 text-white'
                    : 'border-gray-300 hover:border-primary-500'
                }`}
              >
                {exercise.completed && <ApperIcon name="Check" size={12} />}
              </button>
              
              <div>
                <p className="font-medium text-gray-900">{exercise.name}</p>
                <p className="text-sm text-gray-600">
                  {exercise.sets} sets × {exercise.reps} reps
                  {exercise.weight && ` × ${exercise.weight}kg`}
                  {exercise.duration && ` for ${exercise.duration}s`}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-600">{exercise.targetMuscles}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Start/Complete Button */}
      {!completed ? (
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <ApperIcon name="Play" size={18} />
          <span>{completedExercises > 0 ? 'Continue Workout' : 'Start Workout'}</span>
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

export default WorkoutPlan;