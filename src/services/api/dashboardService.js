const dashboardService = {
  async getTodayData() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const today = new Date().toISOString().split('T')[0];

    return {
      dailyTargets: {
        calories: {
          consumed: 1450,
          target: 1800
        },
        protein: {
          consumed: 85,
          target: 120
        },
        exercise: {
          completed: 25,
          target: 30
        }
      },
      meals: [
        {
          Id: 1,
          name: "Breakfast",
          time: "8:00 AM",
          calories: 350,
          protein: 25,
          carbs: 35,
          fats: 12,
          completed: true,
          foods: [
            { name: "Greek Yogurt", amount: "150g" },
            { name: "Berries", amount: "100g" },
            { name: "Granola", amount: "30g" }
          ]
        },
        {
          Id: 2,
          name: "Lunch",
          time: "12:30 PM",
          calories: 450,
          protein: 35,
          carbs: 40,
          fats: 15,
          completed: true,
          foods: [
            { name: "Grilled Chicken", amount: "150g" },
            { name: "Quinoa", amount: "80g" },
            { name: "Mixed Vegetables", amount: "150g" }
          ]
        },
        {
          Id: 3,
          name: "Snack",
          time: "3:30 PM",
          calories: 200,
          protein: 10,
          carbs: 15,
          fats: 12,
          completed: false,
          foods: [
            { name: "Apple", amount: "1 medium" },
            { name: "Almond Butter", amount: "1 tbsp" }
          ]
        },
        {
          Id: 4,
          name: "Dinner",
          time: "7:00 PM",
          calories: 500,
          protein: 40,
          carbs: 45,
          fats: 18,
          completed: false,
          foods: [
            { name: "Salmon", amount: "150g" },
            { name: "Sweet Potato", amount: "120g" },
            { name: "Broccoli", amount: "150g" }
          ]
        }
      ],
      todayWorkout: {
        Id: 1,
        name: "Full Body Strength",
        duration: 30,
        difficulty: "intermediate",
        caloriesBurned: 250,
        completed: false,
        exercises: [
          {
            Id: 1,
            name: "Push-ups",
            sets: 3,
            reps: 12,
            targetMuscles: "Chest, Arms",
            completed: false
          },
          {
            Id: 2,
            name: "Squats",
            sets: 3,
            reps: 15,
            targetMuscles: "Legs, Glutes",
            completed: false
          },
          {
            Id: 3,
            name: "Plank",
            sets: 3,
            duration: "30s",
            targetMuscles: "Core",
            completed: false
          }
        ]
      },
      streak: 12,
      weekProgress: {
        weeklyAverage: 68.5,
        lastWeekChange: -0.8,
        totalWorkouts: 4,
        averageCalories: 1650
      }
    };
  }
};

export { dashboardService };