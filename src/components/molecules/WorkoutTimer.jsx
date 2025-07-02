import React, { useState, useEffect } from 'react';
import ApperIcon from '@/components/ApperIcon';

const WorkoutTimer = ({ workout, onComplete, onStop }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);

  const currentExercise = workout.exercises[currentExerciseIndex];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        if (isResting) {
          setRestTime(prev => {
            if (prev <= 1) {
              setIsResting(false);
              return 0;
            }
            return prev - 1;
          });
        } else {
          setTimeElapsed(prev => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isResting]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setIsResting(true);
      setRestTime(60); // 60 second rest
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Workout complete
      setIsRunning(false);
      onComplete();
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestTime(0);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Workout Timer</h2>
          <button
            onClick={onStop}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-6">
          <div className="text-4xl font-black text-gray-900 mb-2">
            {isResting ? formatTime(restTime) : formatTime(timeElapsed)}
          </div>
          <p className="text-lg text-gray-600">
            {isResting ? 'Rest Time' : 'Exercise Time'}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Exercise {currentExerciseIndex + 1} of {workout.exercises.length}</span>
            <span>{Math.round(((currentExerciseIndex + 1) / workout.exercises.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300"
              style={{ width: `${((currentExerciseIndex + 1) / workout.exercises.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Exercise */}
        {currentExercise && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <h3 className="font-bold text-gray-900 mb-2">{currentExercise.name}</h3>
            <p className="text-gray-600 mb-2">
              {currentExercise.sets} sets × {currentExercise.reps} reps
              {currentExercise.weight && ` × ${currentExercise.weight}kg`}
            </p>
            <p className="text-sm text-gray-500">{currentExercise.targetMuscles}</p>
          </div>
        )}

        {/* Rest Timer */}
        {isResting && (
          <div className="bg-accent-50 rounded-2xl p-4 mb-6 text-center">
            <p className="text-accent-900 font-semibold mb-2">Take a break!</p>
            <p className="text-accent-700">Get ready for: {workout.exercises[currentExerciseIndex]?.name}</p>
          </div>
        )}

        {/* Control Buttons */}
        <div className="space-y-3">
          {isResting ? (
            <div className="flex space-x-3">
              <button
                onClick={handleSkipRest}
                className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Skip Rest
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={isRunning ? handlePause : handleStart}
                className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <ApperIcon name={isRunning ? "Pause" : "Play"} size={18} />
                <span>{isRunning ? 'Pause' : 'Start'}</span>
              </button>
              
              <button
                onClick={handleNextExercise}
                className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <ApperIcon name="SkipForward" size={18} />
                <span>Next</span>
              </button>
            </div>
          )}

          <button
            onClick={onStop}
            className="w-full py-3 border border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors"
          >
            Stop Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTimer;