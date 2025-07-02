const progressService = {
  async getProgressData(timeframe) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350));

    const generateWeightData = (timeframe) => {
      const baseWeight = 70;
      const days = timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : timeframe === '6M' ? 180 : 365;
      const data = [];
      
      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const randomVariation = (Math.random() - 0.5) * 0.5;
        const trendReduction = (days - i) * 0.02; // Gradual weight loss trend
        const weight = baseWeight - trendReduction + randomVariation;
        
        data.push({
          date: date.toLocaleDateString(),
          weight: parseFloat(weight.toFixed(1))
        });
      }
      
      return data;
    };

    const weightData = generateWeightData(timeframe);
    const initialWeight = weightData[0]?.weight || 70;
    const currentWeight = weightData[weightData.length - 1]?.weight || 68.5;

    return {
      weightData,
      stats: {
        weightLoss: initialWeight - currentWeight,
        streakDays: 12,
        workoutsCompleted: 28,
        avgCalories: 1650,
        goal: {
          totalWeightLoss: 5 // Target 5kg loss
        }
      },
      photos: [
        {
          Id: 1,
          url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
          date: "2024-01-15",
          weight: 70.2,
          note: "Starting photo"
        },
        {
          Id: 2,
          url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=400&fit=crop",
          date: "2024-02-01",
          weight: 69.1,
          note: "Two weeks in"
        },
        {
          Id: 3,
          url: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=300&h=400&fit=crop",
          date: "2024-02-15",
          weight: 68.5,
          note: "One month progress"
        }
      ],
      achievements: [
        {
          Id: 1,
          name: "First Week",
          description: "Complete 7 days of logging",
          category: "streak",
          earned: true,
          earnedDate: "2024-01-22"
        },
        {
          Id: 2,
          name: "Workout Warrior",
          description: "Complete 10 workouts",
          category: "workout",
          earned: true,
          earnedDate: "2024-01-28"
        },
        {
          Id: 3,
          name: "Weight Loss Hero",
          description: "Lose 2kg",
          category: "weight",
          earned: false,
          progress: 1.7,
          target: 2
        },
        {
          Id: 4,
          name: "Consistency King",
          description: "Maintain 30-day streak",
          category: "streak",
          earned: false,
          progress: 12,
          target: 30
        },
        {
          Id: 5,
          name: "Milestone Master",
          description: "Reach goal weight",
          category: "milestone",
          earned: false,
          progress: 1.7,
          target: 5
        }
      ]
    };
  }
};

export { progressService };