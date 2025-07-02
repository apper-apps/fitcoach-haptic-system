import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const NotificationSettings = ({ notifications, onUpdate }) => {
  const [settings, setSettings] = useState({
    mealReminders: notifications.mealReminders || false,
    workoutReminders: notifications.workoutReminders || false,
    progressUpdates: notifications.progressUpdates || false,
    achievements: notifications.achievements || false,
    weeklyReports: notifications.weeklyReports || false,
    mealReminderTimes: notifications.mealReminderTimes || {
      breakfast: '08:00',
      lunch: '12:00',
      dinner: '18:00'
    },
    workoutReminderTime: notifications.workoutReminderTime || '17:00'
  });

  const handleToggle = (setting) => {
    const updatedSettings = {
      ...settings,
      [setting]: !settings[setting]
    };
    setSettings(updatedSettings);
    onUpdate(updatedSettings);
  };

  const handleTimeChange = (type, time) => {
    let updatedSettings;
    if (type.includes('meal')) {
      const mealType = type.split('.')[1];
      updatedSettings = {
        ...settings,
        mealReminderTimes: {
          ...settings.mealReminderTimes,
          [mealType]: time
        }
      };
    } else {
      updatedSettings = {
        ...settings,
        [type]: time
      };
    }
    setSettings(updatedSettings);
    onUpdate(updatedSettings);
  };

  const notificationItems = [
    {
      key: 'mealReminders',
      title: 'Meal Reminders',
      description: 'Get reminded to log your meals',
      icon: 'Clock'
    },
    {
      key: 'workoutReminders',
      title: 'Workout Reminders',
      description: 'Daily workout notifications',
      icon: 'Dumbbell'
    },
    {
      key: 'progressUpdates',
      title: 'Progress Updates',
      description: 'Weekly progress summaries',
      icon: 'TrendingUp'
    },
    {
      key: 'achievements',
      title: 'Achievements',
      description: 'Get notified when you unlock badges',
      icon: 'Trophy'
    },
    {
      key: 'weeklyReports',
      title: 'Weekly Reports',
      description: 'Detailed weekly progress reports',
      icon: 'FileText'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Notification Toggles */}
      <div className="space-y-4">
        {notificationItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <ApperIcon name={item.icon} size={16} className="text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
            
            <button
              onClick={() => handleToggle(item.key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings[item.key] ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Meal Reminder Times */}
      {settings.mealReminders && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Meal Reminder Times</h4>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(settings.mealReminderTimes).map(([meal, time]) => (
              <div key={meal}>
                <label className="block text-sm text-gray-600 mb-1 capitalize">
                  {meal}
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(`mealReminderTimes.${meal}`, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workout Reminder Time */}
      {settings.workoutReminders && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Workout Reminder Time</h4>
          <div className="w-full max-w-xs">
            <input
              type="time"
              value={settings.workoutReminderTime}
              onChange={(e) => handleTimeChange('workoutReminderTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Notification Permissions */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Bell" size={20} className="text-amber-600 mt-0.5" />
          <div>
            <p className="font-medium text-amber-900">Enable Browser Notifications</p>
            <p className="text-sm text-amber-700 mt-1">
              Allow notifications in your browser settings to receive reminders even when the app is closed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;