import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import { onboardingService } from '@/services/api/onboardingService';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    profile: {
      name: '',
      age: '',
      height: '',
      currentWeight: '',
      gender: ''
    },
    goals: {
      targetWeight: '',
      targetDate: '',
      weeklyTarget: '1',
      primaryGoal: ''
    },
    preferences: {
      activityLevel: '',
      dietaryRestrictions: [],
      workoutTypes: [],
      availableTime: ''
    }
  });

  const totalSteps = 3;

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: checked
          ? [...prev[section][field], value]
          : prev[section][field].filter(item => item !== value)
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    try {
      await onboardingService.completeOnboarding(formData);
      toast.success("Welcome to FitCoach AI! Let's start your journey! 🎉");
      navigate('/');
    } catch (err) {
      toast.error("Failed to complete setup. Please try again.");
      console.error('Onboarding error:', err);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.profile.name && formData.profile.age && 
               formData.profile.height && formData.profile.currentWeight && 
               formData.profile.gender;
      case 2:
        return formData.goals.targetWeight && formData.goals.targetDate && 
               formData.goals.primaryGoal;
      case 3:
        return formData.preferences.activityLevel && 
               formData.preferences.availableTime;
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="User" size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Tell us about yourself</h2>
        <p className="text-gray-600">This helps us create your personalized plan</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your name?
          </label>
          <input
            type="text"
            value={formData.profile.name}
            onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              value={formData.profile.age}
              onChange={(e) => handleInputChange('profile', 'age', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="25"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              value={formData.profile.gender}
              onChange={(e) => handleInputChange('profile', 'gender', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={formData.profile.height}
              onChange={(e) => handleInputChange('profile', 'height', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="165"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Weight (kg)
            </label>
            <input
              type="number"
              value={formData.profile.currentWeight}
              onChange={(e) => handleInputChange('profile', 'currentWeight', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="70"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Target" size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">What's your goal?</h2>
        <p className="text-gray-600">Let's set realistic and achievable targets</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Goal
          </label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { value: 'lose_weight', label: 'Lose Weight', icon: 'TrendingDown' },
              { value: 'maintain', label: 'Maintain Weight', icon: 'Minus' },
              { value: 'build_muscle', label: 'Build Muscle', icon: 'TrendingUp' }
            ].map((goal) => (
              <button
                key={goal.value}
                onClick={() => handleInputChange('goals', 'primaryGoal', goal.value)}
                className={`p-4 border-2 rounded-xl flex items-center space-x-3 transition-all ${
                  formData.goals.primaryGoal === goal.value
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Weight (kg)
            </label>
            <input
              type="number"
              value={formData.goals.targetWeight}
              onChange={(e) => handleInputChange('goals', 'targetWeight', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="65"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Date
            </label>
            <input
              type="date"
              value={formData.goals.targetDate}
              onChange={(e) => handleInputChange('goals', 'targetDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weekly Weight Loss Target
          </label>
          <select
            value={formData.goals.weeklyTarget}
            onChange={(e) => handleInputChange('goals', 'weeklyTarget', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="0.5">0.5 kg/week (Gradual)</option>
            <option value="1">1 kg/week (Moderate)</option>
            <option value="1.5">1.5 kg/week (Aggressive)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Settings" size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your preferences</h2>
        <p className="text-gray-600">Help us customize your experience</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Level
          </label>
          <div className="space-y-2">
            {[
              { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
              { value: 'light', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
              { value: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
              { value: 'very', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' }
            ].map((level) => (
              <button
                key={level.value}
                onClick={() => handleInputChange('preferences', 'activityLevel', level.value)}
                className={`w-full p-3 border-2 rounded-xl text-left transition-all ${
                  formData.preferences.activityLevel === level.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{level.label}</div>
                <div className="text-sm text-gray-600">{level.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Workout Time
          </label>
          <select
            value={formData.preferences.availableTime}
            onChange={(e) => handleInputChange('preferences', 'availableTime', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select duration</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Workout Types
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Cardio', 'Strength', 'Yoga', 'HIIT', 
              'Walking', 'Swimming', 'Dancing', 'Cycling'
            ].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.preferences.workoutTypes.includes(type)}
                  onChange={(e) => handleArrayChange('preferences', 'workoutTypes', type, e.target.checked)}
                  className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!isStepValid()}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Complete Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;