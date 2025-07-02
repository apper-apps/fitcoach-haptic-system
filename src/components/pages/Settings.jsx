import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ProfileSettings from '@/components/molecules/ProfileSettings';
import GoalSettings from '@/components/molecules/GoalSettings';
import NotificationSettings from '@/components/molecules/NotificationSettings';
import PreferenceSettings from '@/components/molecules/PreferenceSettings';
import ApperIcon from '@/components/ApperIcon';
import { settingsService } from '@/services/api/settingsService';

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError('');
      const settingsData = await settingsService.getUserSettings();
      setSettings(settingsData);
    } catch (err) {
      setError('Failed to load settings. Please try again.');
      console.error('Settings load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleUpdateProfile = async (profileData) => {
    try {
      const updatedSettings = await settingsService.updateProfile(profileData);
      setSettings(updatedSettings);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
      console.error('Profile update error:', err);
    }
  };

  const handleUpdateGoals = async (goalData) => {
    try {
      const updatedSettings = await settingsService.updateGoals(goalData);
      setSettings(updatedSettings);
      toast.success("Goals updated successfully!");
    } catch (err) {
      toast.error("Failed to update goals");
      console.error('Goals update error:', err);
    }
  };

  const handleUpdateNotifications = async (notificationData) => {
    try {
      const updatedSettings = await settingsService.updateNotifications(notificationData);
      setSettings(updatedSettings);
      toast.success("Notification preferences updated!");
    } catch (err) {
      toast.error("Failed to update notifications");
      console.error('Notifications update error:', err);
    }
  };

  const handleUpdatePreferences = async (preferenceData) => {
    try {
      const updatedSettings = await settingsService.updatePreferences(preferenceData);
      setSettings(updatedSettings);
      toast.success("Preferences updated successfully!");
    } catch (err) {
      toast.error("Failed to update preferences");
      console.error('Preferences update error:', err);
    }
  };

  if (loading) {
    return <Loading type="dashboard" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadSettings} />;
  }

  if (!settings) {
    return <Error message="No settings data available" onRetry={loadSettings} />;
  }

  const settingsSections = [
    {
      id: 'profile',
      title: 'Profile',
      icon: 'User',
      component: (
        <ProfileSettings
          profile={settings.profile}
          onUpdate={handleUpdateProfile}
        />
      )
    },
    {
      id: 'goals',
      title: 'Goals & Targets',
      icon: 'Target',
      component: (
        <GoalSettings
          goals={settings.goals}
          onUpdate={handleUpdateGoals}
        />
      )
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'Bell',
      component: (
        <NotificationSettings
          notifications={settings.notifications}
          onUpdate={handleUpdateNotifications}
        />
      )
    },
    {
      id: 'preferences',
      title: 'Preferences',
      icon: 'Settings',
      component: (
        <PreferenceSettings
          preferences={settings.preferences}
          onUpdate={handleUpdatePreferences}
        />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-6">
        {/* App Info */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <ApperIcon name="Zap" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">FitCoach AI</h1>
              <p className="text-white/80 text-sm">Your personal wellness companion</p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          {settingsSections.map((section) => (
            <div key={section.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                    <ApperIcon name={section.icon} size={18} className="text-primary-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                </div>
              </div>
              <div className="p-4">
                {section.component}
              </div>
            </div>
          ))}
        </div>

        {/* App Version */}
        <div className="text-center text-gray-500 text-sm py-4">
          FitCoach AI v1.0.0
        </div>
      </div>
    </div>
  );
};

export default Settings;