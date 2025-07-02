import React from 'react';
import { useLocation } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/food-log':
        return 'Food Log';
      case '/workouts':
        return 'Workouts';
      case '/progress':
        return 'Progress';
      case '/settings':
        return 'Settings';
      default:
        return 'FitCoach AI';
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-40 safe-area-top">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{getPageTitle()}</h1>
              {location.pathname === '/' && (
                <p className="text-sm text-gray-500">{getGreeting()}, Sarah!</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ApperIcon name="Bell" size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ApperIcon name="User" size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;