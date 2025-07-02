import React from 'react';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';

const FoodLogEntry = ({ log, onDelete }) => {
  const { Id, timestamp, photoUrl, foodItems, totalCalories } = log;

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex items-start space-x-3">
        {/* Photo Thumbnail */}
        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
          {photoUrl ? (
            <img src={photoUrl} alt="Food" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ApperIcon name="Camera" size={20} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Food Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-gray-500">
                {format(new Date(timestamp), 'h:mm a')}
              </p>
              <p className="font-semibold text-gray-900">
                {totalCalories} calories
              </p>
            </div>
            
            <button
              onClick={() => onDelete(Id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <ApperIcon name="Trash2" size={16} />
            </button>
          </div>

          <div className="space-y-1">
            {foodItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 truncate">{item.name}</span>
                <span className="text-gray-500 flex-shrink-0 ml-2">{item.calories} cal</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodLogEntry;