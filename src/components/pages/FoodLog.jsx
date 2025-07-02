import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import FoodLogEntry from '@/components/molecules/FoodLogEntry';
import PhotoCapture from '@/components/molecules/PhotoCapture';
import DailyNutritionSummary from '@/components/molecules/DailyNutritionSummary';
import { foodLogService } from '@/services/api/foodLogService';

const FoodLog = () => {
  const [foodLogs, setFoodLogs] = useState([]);
  const [todayNutrition, setTodayNutrition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);

  const loadFoodLogs = async () => {
    try {
      setLoading(true);
      setError('');
      const [logs, nutrition] = await Promise.all([
        foodLogService.getTodayLogs(),
        foodLogService.getTodayNutrition()
      ]);
      setFoodLogs(logs);
      setTodayNutrition(nutrition);
    } catch (err) {
      setError('Failed to load food logs. Please try again.');
      console.error('Food logs load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoodLogs();
  }, []);

  const handlePhotoCapture = async (photo) => {
    try {
      const newLog = await foodLogService.createFromPhoto(photo);
      setFoodLogs(prev => [newLog, ...prev]);
      setShowPhotoCapture(false);
      toast.success("Food logged successfully! 📸");
      // Refresh nutrition data
      const updatedNutrition = await foodLogService.getTodayNutrition();
      setTodayNutrition(updatedNutrition);
    } catch (err) {
      toast.error("Failed to log food. Please try again.");
      console.error('Photo capture error:', err);
    }
  };

  const handleDeleteLog = async (logId) => {
    try {
      await foodLogService.delete(logId);
      setFoodLogs(prev => prev.filter(log => log.Id !== logId));
      toast.success("Food log deleted");
      // Refresh nutrition data
      const updatedNutrition = await foodLogService.getTodayNutrition();
      setTodayNutrition(updatedNutrition);
    } catch (err) {
      toast.error("Failed to delete log");
      console.error('Delete log error:', err);
    }
  };

  if (loading) {
    return <Loading type="list" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadFoodLogs} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Daily Nutrition Summary */}
        {todayNutrition && (
          <DailyNutritionSummary nutrition={todayNutrition} />
        )}

        {/* Photo Capture Button */}
        <button
          onClick={() => setShowPhotoCapture(true)}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span className="text-2xl">📸</span>
          <span>Log Food with Photo</span>
        </button>

        {/* Food Logs List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Today's Meals</h2>
            <span className="text-sm text-gray-500">{foodLogs.length} logged</span>
          </div>

          {foodLogs.length === 0 ? (
            <Empty
              icon="Camera"
              title="No meals logged today"
              description="Start by taking a photo of your meal or manually adding items."
              actionLabel="Add First Meal"
              onAction={() => setShowPhotoCapture(true)}
            />
          ) : (
            <div className="space-y-3">
              {foodLogs.map((log) => (
                <FoodLogEntry
                  key={log.Id}
                  log={log}
                  onDelete={() => handleDeleteLog(log.Id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Photo Capture Modal */}
      {showPhotoCapture && (
        <PhotoCapture
          onCapture={handlePhotoCapture}
          onClose={() => setShowPhotoCapture(false)}
        />
      )}
    </div>
  );
};

export default FoodLog;