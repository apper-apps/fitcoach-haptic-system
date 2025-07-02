import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import WorkoutPlan from '@/components/molecules/WorkoutPlan';
import ExerciseLibrary from '@/components/molecules/ExerciseLibrary';
import WorkoutTimer from '@/components/molecules/WorkoutTimer';
import { workoutService } from '@/services/api/workoutService';

const Workouts = () => {
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [exerciseLibrary, setExerciseLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [showLibrary, setShowLibrary] = useState(false);

  const loadWorkouts = async () => {
    try {
      setLoading(true);
      setError('');
      const [workout, exercises] = await Promise.all([
        workoutService.getTodayWorkout(),
        workoutService.getExerciseLibrary()
      ]);
      setTodayWorkout(workout);
      setExerciseLibrary(exercises);
    } catch (err) {
      setError('Failed to load workouts. Please try again.');
      console.error('Workouts load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  const handleStartWorkout = () => {
    setActiveWorkout(todayWorkout);
    toast.success("Workout started! Let's do this! 💪");
  };

  const handleCompleteWorkout = async () => {
    try {
      await workoutService.completeWorkout(todayWorkout.Id);
      setTodayWorkout(prev => ({ ...prev, completed: true }));
      setActiveWorkout(null);
      toast.success("Workout completed! Great job! 🎉");
    } catch (err) {
      toast.error("Failed to save workout completion");
      console.error('Complete workout error:', err);
    }
  };

  const handleExerciseComplete = (exerciseId) => {
    setTodayWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(exercise => 
        exercise.Id === exerciseId 
          ? { ...exercise, completed: true }
          : exercise
      )
    }));
  };

  if (loading) {
    return <Loading type="list" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadWorkouts} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Today's Workout */}
        {todayWorkout ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Today's Workout</h2>
              <button
                onClick={() => setShowLibrary(!showLibrary)}
                className="text-primary-500 font-medium hover:text-primary-600 transition-colors"
              >
                Browse Exercises
              </button>
            </div>

            <WorkoutPlan
              workout={todayWorkout}
              onStart={handleStartWorkout}
              onExerciseComplete={handleExerciseComplete}
            />
          </div>
        ) : (
          <Empty
            icon="Dumbbell"
            title="No workout planned"
            description="Your AI coach will generate a personalized workout based on your goals and fitness level."
            actionLabel="Generate Workout"
            onAction={() => toast.info("Workout generation coming soon!")}
          />
        )}

        {/* Exercise Library */}
        {showLibrary && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Exercise Library</h2>
            <ExerciseLibrary exercises={exerciseLibrary} />
          </div>
        )}

        {/* Active Workout Timer */}
        {activeWorkout && (
          <WorkoutTimer
            workout={activeWorkout}
            onComplete={handleCompleteWorkout}
            onStop={() => setActiveWorkout(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Workouts;