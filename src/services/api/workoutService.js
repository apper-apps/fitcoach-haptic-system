const workoutService = {
  async getTodayWorkout() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      Id: 1,
      name: "Full Body Strength Training",
      duration: 35,
      difficulty: "intermediate",
      caloriesBurned: 280,
      completed: false,
      exercises: [
        {
          Id: 1,
          name: "Push-ups",
          sets: 3,
          reps: 12,
          targetMuscles: "Chest, Shoulders, Triceps",
          instructions: "Keep your body straight and lower until chest nearly touches ground",
          completed: false
        },
        {
          Id: 2,
          name: "Bodyweight Squats",
          sets: 3,
          reps: 15,
          targetMuscles: "Quadriceps, Glutes, Hamstrings",
          instructions: "Lower until thighs are parallel to ground, keep knees aligned",
          completed: false
        },
        {
          Id: 3,
          name: "Plank Hold",
          sets: 3,
          duration: "45s",
          targetMuscles: "Core, Shoulders",
          instructions: "Maintain straight line from head to heels, engage core",
          completed: false
        },
        {
          Id: 4,
          name: "Mountain Climbers",
          sets: 3,
          reps: 20,
          targetMuscles: "Core, Cardio",
          instructions: "Alternate bringing knees to chest in plank position",
          completed: false
        },
        {
          Id: 5,
          name: "Lunges",
          sets: 3,
          reps: 12,
          targetMuscles: "Legs, Glutes",
          instructions: "Step forward and lower back knee toward ground",
          completed: false
        }
      ]
    };
  },

  async getExerciseLibrary() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 250));

    return [
      {
        Id: 1,
        name: "Push-ups",
        category: "strength",
        difficulty: "beginner",
        targetMuscles: "Chest, Shoulders, Triceps",
        description: "Classic bodyweight exercise for upper body strength",
        instructions: "Start in plank position, lower body until chest nearly touches ground, push back up",
        sets: 3,
        reps: 12,
        equipment: "None"
      },
      {
        Id: 2,
        name: "Jumping Jacks",
        category: "cardio",
        difficulty: "beginner",
        targetMuscles: "Full Body",
        description: "High-energy cardio exercise to get heart rate up",
        instructions: "Jump while spreading legs and raising arms overhead, return to starting position",
        duration: "30s",
        equipment: "None"
      },
      {
        Id: 3,
        name: "Deadlifts",
        category: "strength",
        difficulty: "intermediate",
        targetMuscles: "Hamstrings, Glutes, Lower Back",
        description: "Compound movement for posterior chain strength",
        instructions: "Hinge at hips, lower weight while keeping back straight, drive through heels to stand",
        sets: 4,
        reps: 8,
        equipment: "Barbell or Dumbbells"
      },
      {
        Id: 4,
        name: "Yoga Flow",
        category: "flexibility",
        difficulty: "beginner",
        targetMuscles: "Full Body",
        description: "Gentle stretching sequence for flexibility and relaxation",
        instructions: "Follow flowing movements connecting breath with motion",
        duration: "10-15 minutes",
        equipment: "Yoga Mat"
      },
      {
        Id: 5,
        name: "Burpees",
        category: "cardio",
        difficulty: "advanced",
        targetMuscles: "Full Body",
        description: "High-intensity full body exercise",
        instructions: "Squat down, jump back to plank, do push-up, jump feet forward, jump up",
        sets: 3,
        reps: 10,
        equipment: "None"
      },
      {
        Id: 6,
        name: "Single-Leg Balance",
        category: "balance",
        difficulty: "beginner",
        targetMuscles: "Core, Stabilizers",
        description: "Improve balance and stability",
        instructions: "Stand on one leg, hold position while maintaining balance",
        duration: "30s each leg",
        equipment: "None"
      }
    ];
  },

  async completeWorkout(workoutId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return { success: true };
  }
};

export { workoutService };