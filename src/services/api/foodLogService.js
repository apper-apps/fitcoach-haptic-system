const foodLogService = {
  async getTodayLogs() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));

    return [
      {
        Id: 1,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        photoUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop",
        totalCalories: 450,
        foodItems: [
          { name: "Grilled Chicken Breast", calories: 165 },
          { name: "Quinoa", calories: 120 },
          { name: "Steamed Broccoli", calories: 55 },
          { name: "Olive Oil", calories: 110 }
        ]
      },
      {
        Id: 2,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        photoUrl: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=200&h=200&fit=crop",
        totalCalories: 320,
        foodItems: [
          { name: "Greek Yogurt", calories: 130 },
          { name: "Mixed Berries", calories: 85 },
          { name: "Granola", calories: 105 }
        ]
      }
    ];
  },

  async getTodayNutrition() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    return {
      calories: 1450,
      protein: 85,
      carbs: 145,
      fats: 58,
      targets: {
        calories: 1800,
        protein: 120,
        carbs: 180,
        fats: 60
      }
    };
  },

  async createFromPhoto(photoData) {
    // Simulate API delay for AI processing
    await new Promise(resolve => setTimeout(resolve, 400));

    const newId = Date.now();
    const newLog = {
      Id: newId,
      timestamp: new Date().toISOString(),
      photoUrl: photoData.photoUrl,
      foodItems: photoData.foodItems,
      totalCalories: photoData.totalCalories
    };

    return newLog;
  },

  async delete(logId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // In a real app, this would delete from server
    return { success: true };
  }
};

export { foodLogService };