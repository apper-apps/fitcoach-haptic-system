import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const ExerciseLibrary = ({ exercises }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'strength', label: 'Strength' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'flexibility', label: 'Flexibility' },
    { value: 'balance', label: 'Balance' }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.targetMuscles.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-amber-600 bg-amber-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <ApperIcon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exercises..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-3">
        {filteredExercises.map((exercise) => (
          <div key={exercise.Id} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Target" size={14} />
                    <span>{exercise.targetMuscles}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Clock" size={14} />
                    <span>{exercise.duration || `${exercise.sets}x${exercise.reps}`}</span>
                  </div>
                  {exercise.equipment && (
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Package" size={14} />
                      <span>{exercise.equipment}</span>
                    </div>
                  )}
                </div>
              </div>

              <button className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors">
                <ApperIcon name="Plus" size={18} />
              </button>
            </div>

            {exercise.instructions && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-700">{exercise.instructions}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-8">
          <ApperIcon name="Search" size={32} className="text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">No exercises found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;