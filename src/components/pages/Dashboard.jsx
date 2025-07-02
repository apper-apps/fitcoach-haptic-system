import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ProgressRing from '@/components/atoms/ProgressRing';
import MealCard from '@/components/molecules/MealCard';
import WorkoutCard from '@/components/molecules/WorkoutCard';
import StreakCounter from '@/components/atoms/StreakCounter';
import QuickStats from '@/components/molecules/QuickStats';
import { dashboardService } from '@/services/api/dashboardService';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const dashboardData = await dashboardService.getTodayData();
      setData(dashboardData);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Dashboard load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleMealComplete = (mealId) => {
    setData(prev => ({
      ...prev,
      meals: prev.meals.map(meal => 
        meal.Id === mealId ? { ...meal, completed: true } : meal
      )
    }));
    toast.success("Meal logged successfully! 🎉");
  };

  const handleWorkoutComplete = () => {
    setData(prev => ({
      ...prev,
      todayWorkout: { ...prev.todayWorkout, completed: true }
    }));
    toast.success("Great workout! Keep it up! 💪");
  };

  if (loading) {
    return <Loading type="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />;
  }

  if (!data) {
    return <Error message="No data available" onRetry={loadDashboardData} />;
  }

  const { dailyTargets, meals, todayWorkout, streak, weekProgress } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Streak Counter */}
        <StreakCounter days={streak} />

        {/* Daily Progress */}
        <div className="grid grid-cols-3 gap-4">
          <ProgressRing
            value={dailyTargets.calories.consumed}
            max={dailyTargets.calories.target}
            label="Calories"
            unit="kcal"
            color="from-primary-400 to-primary-600"
          />
          <ProgressRing
            value={dailyTargets.protein.consumed}
            max={dailyTargets.protein.target}
            label="Protein"
            unit="g"
            color="from-secondary-400 to-secondary-600"
          />
          <ProgressRing
            value={dailyTargets.exercise.completed}
            max={dailyTargets.exercise.target}
            label="Exercise"
            unit="min"
            color="from-accent-400 to-accent-600"
          />
        </div>

        {/* Quick Stats */}
        <QuickStats data={weekProgress} />

        {/* Today's Meals */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Today's Meals</h2>
          <div className="space-y-3">
            {meals.map((meal) => (
              <MealCard 
                key={meal.Id} 
                meal={meal} 
                onComplete={() => handleMealComplete(meal.Id)}
              />
            ))}
          </div>
        </div>

        {/* Today's Workout */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Today's Workout</h2>
          <WorkoutCard 
            workout={todayWorkout} 
            onComplete={handleWorkoutComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;