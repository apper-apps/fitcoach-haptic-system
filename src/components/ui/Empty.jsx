import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  icon = "Inbox",
  title = "Nothing here yet",
  description = "Get started by adding your first item.",
  actionLabel = "Get Started",
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={40} className="text-gray-400" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-sm leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center space-x-2"
        >
          <ApperIcon name="Plus" size={18} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default Empty;