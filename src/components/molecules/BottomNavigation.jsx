import React from 'react';
import { NavLink } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const BottomNavigation = () => {
  const navItems = [
    { path: '/', icon: 'Home', label: 'Dashboard' },
    { path: '/food-log', icon: 'Camera', label: 'Food Log' },
    { path: '/workouts', icon: 'Dumbbell', label: 'Workouts' },
    { path: '/progress', icon: 'TrendingUp', label: 'Progress' },
    { path: '/settings', icon: 'Settings', label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-all duration-200 ${
                isActive
                  ? 'text-primary-500 scale-105'
                  : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-lg transition-all duration-200 ${
                  isActive ? 'bg-primary-50' : ''
                }`}>
                  <ApperIcon 
                    name={item.icon} 
                    size={20} 
                    className={isActive ? 'text-primary-500' : 'text-current'}
                  />
                </div>
                <span className="text-xs font-medium mt-1 leading-none">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;