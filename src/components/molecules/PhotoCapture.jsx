import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const PhotoCapture = ({ onCapture, onClose }) => {
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [foodItems, setFoodItems] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedPhoto(e.target.result);
        analyzePhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePhoto = async (photo) => {
    setAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      // Mock AI analysis results
      const mockResults = [
        { name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        { name: 'Steamed Broccoli', calories: 25, protein: 3, carbs: 5, fat: 0.3 },
        { name: 'Brown Rice', calories: 110, protein: 2.5, carbs: 23, fat: 0.9 }
      ];
      
      setFoodItems(mockResults);
      setAnalyzing(false);
    }, 2000);
  };

  const handleConfirm = () => {
    const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);
    
    const logEntry = {
      photoUrl: capturedPhoto,
      foodItems,
      totalCalories,
      timestamp: new Date().toISOString()
    };
    
    onCapture(logEntry);
  };

  const updateFoodItem = (index, field, value) => {
    setFoodItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const removeFoodItem = (index) => {
    setFoodItems(prev => prev.filter((_, i) => i !== index));
  };

  const addFoodItem = () => {
    setFoodItems(prev => [...prev, { 
      name: '', 
      calories: 0, 
      protein: 0, 
      carbs: 0, 
      fat: 0 
    }]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Log Your Meal</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          </div>

          {/* Photo Upload */}
          {!capturedPhoto ? (
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-colors"
              >
                <ApperIcon name="Camera" size={32} className="text-gray-400 mb-2" />
                <p className="text-gray-600 font-medium">Take a photo of your meal</p>
                <p className="text-sm text-gray-500">or upload from gallery</p>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Captured Photo */}
              <div className="relative">
                <img 
                  src={capturedPhoto} 
                  alt="Captured meal" 
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <button
                  onClick={() => {
                    setCapturedPhoto(null);
                    setFoodItems([]);
                    setAnalyzing(false);
                  }}
                  className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-xl hover:bg-black/70 transition-colors"
                >
                  <ApperIcon name="X" size={16} />
                </button>
              </div>

              {/* AI Analysis */}
              {analyzing ? (
                <div className="text-center py-4">
                  <div className="inline-flex items-center space-x-2 text-primary-600">
                    <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing your meal...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Food Items */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Detected Foods</h3>
                      <button
                        onClick={addFoodItem}
                        className="text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        <ApperIcon name="Plus" size={18} />
                      </button>
                    </div>

                    {foodItems.map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateFoodItem(index, 'name', e.target.value)}
                            className="bg-transparent font-medium text-gray-900 border-none outline-none flex-1"
                            placeholder="Food name"
                          />
                          <button
                            onClick={() => removeFoodItem(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <ApperIcon name="Trash2" size={16} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <label className="text-gray-600">Calories</label>
                            <input
                              type="number"
                              value={item.calories}
                              onChange={(e) => updateFoodItem(index, 'calories', parseInt(e.target.value) || 0)}
                              className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1"
                            />
                          </div>
                          <div>
                            <label className="text-gray-600">Protein (g)</label>
                            <input
                              type="number"
                              value={item.protein}
                              onChange={(e) => updateFoodItem(index, 'protein', parseFloat(e.target.value) || 0)}
                              className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total Calories */}
                  <div className="bg-primary-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-primary-700">Total Calories</p>
                    <p className="text-2xl font-bold text-primary-900">
                      {foodItems.reduce((sum, item) => sum + item.calories, 0)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirm}
                      disabled={foodItems.length === 0}
                      className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Log Meal
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoCapture;