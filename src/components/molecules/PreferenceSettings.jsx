import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const PreferenceSettings = ({ preferences, onUpdate }) => {
  const [settings, setSettings] = useState({
    units: preferences.units || 'metric',
    theme: preferences.theme || 'light',
    language: preferences.language || 'en',
    weekStartsOn: preferences.weekStartsOn || 'monday',
    dataPriority: preferences.dataPriority || 'accuracy',
    autoSync: preferences.autoSync || true,
    shareData: preferences.shareData || false,
    digestFrequency: preferences.digestFrequency || 'weekly'
  });

  const handleSettingChange = (setting, value) => {
    const updatedSettings = {
      ...settings,
      [setting]: value
    };
    setSettings(updatedSettings);
    onUpdate(updatedSettings);
  };

  const handleToggle = (setting) => {
    handleSettingChange(setting, !settings[setting]);
  };

  return (
    <div className="space-y-6">
      {/* Display Preferences */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Display</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-900">Units</p>
              <p className="text-sm text-gray-600">Measurement system</p>
            </div>
            <select
              value={settings.units}
              onChange={(e) => handleSettingChange('units', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, ft)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-900">Theme</p>
              <p className="text-sm text-gray-600">App appearance</p>
            </div>
            <select
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-900">Week Starts On</p>
              <p className="text-sm text-gray-600">First day of the week</p>
            </div>
            <select
              value={settings.weekStartsOn}
              onChange={(e) => handleSettingChange('weekStartsOn', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Preferences */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Data & Sync</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <ApperIcon name="Sync" size={20} className="text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">Auto Sync</p>
                <p className="text-sm text-gray-600">Automatically sync with wearables</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('autoSync')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoSync ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoSync ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-900">Data Priority</p>
              <p className="text-sm text-gray-600">AI recommendation focus</p>
            </div>
            <select
              value={settings.dataPriority}
              onChange={(e) => handleSettingChange('dataPriority', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="accuracy">Accuracy</option>
              <option value="simplicity">Simplicity</option>
              <option value="speed">Speed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Communication Preferences */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Communication</h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-900">Progress Digest</p>
              <p className="text-sm text-gray-600">How often to receive summaries</p>
            </div>
            <select
              value={settings.digestFrequency}
              onChange={(e) => handleSettingChange('digestFrequency', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="never">Never</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <ApperIcon name="Share" size={20} className="text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">Share Anonymous Data</p>
                <p className="text-sm text-gray-600">Help improve AI recommendations</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('shareData')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.shareData ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.shareData ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Shield" size={20} className="text-primary-600 mt-0.5" />
          <div>
            <p className="font-medium text-primary-900">Privacy & Security</p>
            <p className="text-sm text-primary-700 mt-1">
              Your data is encrypted and stored securely. We never share personal information with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferenceSettings;