import React from 'react';
import { useLocation } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const FloatingActionButton = () => {
  const location = useLocation();

  const getActionIcon = () => {
    switch (location.pathname) {
      case '/food-log':
        return 'Camera';
      case '/workouts':
        return 'Play';
      default:
        return 'Plus';
    }
  };

  const handleClick = () => {
    switch (location.pathname) {
      case '/food-log':
        // Trigger photo capture
        console.log('Open camera for food photo');
        break;
      case '/workouts':
        // Start workout
        console.log('Start workout');
        break;
      default:
        // Quick add menu
        console.log('Open quick add menu');
        break;
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fab flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
    >
      <ApperIcon name={getActionIcon()} size={24} />
    </button>
  );
};

export default FloatingActionButton;