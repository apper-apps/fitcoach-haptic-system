import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const GoalSettings = ({ goals, onUpdate }) => {
  const [formData, setFormData] = useState({
    targetWeight: goals.targetWeight || '',
    targetDate: goals.targetDate || '',
    weeklyTarget: goals.weeklyTarget || '1',
    primaryGoal: goals.primaryGoal || '',
    activityLevel: goals.activityLevel || ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      targetWeight: goals.targetWeight || '',
      targetDate: goals.targetDate || '',
      weeklyTarget: goals.weeklyTarget || '1',
      primaryGoal: goals.primaryGoal || '',
      activityLevel: goals.activityLevel || ''
    });
    setIsEditing(false);
  };

  const formatGoalLabel = (goal) => {
    switch (goal) {
      case 'lose_weight': return 'Lose Weight';
      case 'maintain': return 'Maintain Weight';
      case 'build_muscle': return 'Build Muscle';
      default: return goal;
    }
  };

  const formatActivityLevel = (level) => {
    switch (level) {
      case 'sedentary': return 'Sedentary';
      case 'light': return 'Lightly Active';
      case 'moderate': return 'Moderately Active';
      case 'very': return 'Very Active';
      default: return level;
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Goals & Targets</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="text-primary-600 hover:text-primary-700 transition-colors flex items-center space-x-1"
          >
            <ApperIcon name="Edit" size={16} />
            <span>Edit</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Primary Goal</label>
            <p className="font-medium text-gray-900">{formatGoalLabel(goals.primaryGoal)}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Activity Level</label>
            <p className="font-medium text-gray-900">{formatActivityLevel(goals.activityLevel)}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Target Weight</label>
            <p className="font-medium text-gray-900">{goals.targetWeight} kg</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Target Date</label>
            <p className="font-medium text-gray-900">{goals.targetDate}</p>
          </div>
          <div className="col-span-2">
            <label className="text-sm text-gray-600">Weekly Target</label>
            <p className="font-medium text-gray-900">{goals.weeklyTarget} kg/week</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Edit Goals</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Goal
          </label>
          <div className="space-y-2">
            {[
              { value: 'lose_weight', label: 'Lose Weight', icon: 'TrendingDown' },
              { value: 'maintain', label: 'Maintain Weight', icon: 'Minus' },
              { value: 'build_muscle', label: 'Build Muscle', icon: 'TrendingUp' }
            ].map((goal) => (
              <button
                key={goal.value}
                onClick={() => handleInputChange('primaryGoal', goal.value)}
                className={`w-full p-3 border-2 rounded-xl flex items-center space-x-3 transition-all ${
                  formData.primaryGoal === goal.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ApperIcon name={goal.icon} size={20} className="text-primary-500" />
                <span className="font-medium">{goal.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Weight (kg)
            </label>
            <input
              type="number"
              value={formData.targetWeight}
              onChange={(e) => handleInputChange('targetWeight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Date
            </label>
            <input
              type="date"
              value={formData.targetDate}
              onChange={(e) => handleInputChange('targetDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weekly Weight Loss Target
          </label>
          <select
            value={formData.weeklyTarget}
            onChange={(e) => handleInputChange('weeklyTarget', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="0.5">0.5 kg/week (Gradual)</option>
            <option value="1">1 kg/week (Moderate)</option>
            <option value="1.5">1.5 kg/week (Aggressive)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Activity Level
          </label>
          <select
            value={formData.activityLevel}
            onChange={(e) => handleInputChange('activityLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select activity level</option>
            <option value="sedentary">Sedentary (Little to no exercise)</option>
            <option value="light">Lightly Active (Light exercise 1-3 days/week)</option>
            <option value="moderate">Moderately Active (Moderate exercise 3-5 days/week)</option>
            <option value="very">Very Active (Hard exercise 6-7 days/week)</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          onClick={handleCancel}
          className="flex-1 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default GoalSettings;