import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const ProfileSettings = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    age: profile.age || '',
    height: profile.height || '',
    currentWeight: profile.currentWeight || '',
    gender: profile.gender || ''
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
      name: profile.name || '',
      email: profile.email || '',
      age: profile.age || '',
      height: profile.height || '',
      currentWeight: profile.currentWeight || '',
      gender: profile.gender || ''
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Profile Information</h3>
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
            <label className="text-sm text-gray-600">Name</label>
            <p className="font-medium text-gray-900">{profile.name}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="font-medium text-gray-900">{profile.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Age</label>
            <p className="font-medium text-gray-900">{profile.age} years</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <p className="font-medium text-gray-900 capitalize">{profile.gender}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Height</label>
            <p className="font-medium text-gray-900">{profile.height} cm</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Current Weight</label>
            <p className="font-medium text-gray-900">{profile.currentWeight} kg</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Edit Profile</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Weight (kg)
          </label>
          <input
            type="number"
            value={formData.currentWeight}
            onChange={(e) => handleInputChange('currentWeight', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
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

export default ProfileSettings;