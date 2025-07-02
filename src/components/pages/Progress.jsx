import React, { useState, useEffect } from 'react';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import WeightChart from '@/components/molecules/WeightChart';
import ProgressStats from '@/components/molecules/ProgressStats';
import PhotoProgress from '@/components/molecules/PhotoProgress';
import AchievementBadges from '@/components/molecules/AchievementBadges';
import { progressService } from '@/services/api/progressService';

const Progress = () => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

  const loadProgress = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await progressService.getProgressData(selectedTimeframe);
      setProgressData(data);
    } catch (err) {
      setError('Failed to load progress data. Please try again.');
      console.error('Progress load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgress();
  }, [selectedTimeframe]);

  const timeframeOptions = [
    { value: '1W', label: '1 Week' },
    { value: '1M', label: '1 Month' },
    { value: '3M', label: '3 Months' },
    { value: '6M', label: '6 Months' },
    { value: '1Y', label: '1 Year' },
  ];

  if (loading) {
    return <Loading type="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadProgress} />;
  }

  if (!progressData) {
    return <Error message="No progress data available" onRetry={loadProgress} />;
  }

  const { weightData, stats, photos, achievements } = progressData;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Timeframe Selector */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {timeframeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedTimeframe(option.value)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
                selectedTimeframe === option.value
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Progress Stats */}
        <ProgressStats stats={stats} />

        {/* Weight Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Weight Progress</h2>
          <WeightChart data={weightData} timeframe={selectedTimeframe} />
        </div>

        {/* Achievement Badges */}
        <AchievementBadges achievements={achievements} />

        {/* Progress Photos */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Progress Photos</h2>
          <PhotoProgress photos={photos} />
        </div>
      </div>
    </div>
  );
};

export default Progress;