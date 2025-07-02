const settingsService = {
  async getUserSettings() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      profile: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        age: 28,
        height: 165,
        currentWeight: 68.5,
        gender: "female"
      },
      goals: {
        targetWeight: 63,
        targetDate: "2024-06-01",
        weeklyTarget: "1",
        primaryGoal: "lose_weight",
        activityLevel: "moderate"
      },
      notifications: {
        mealReminders: true,
        workoutReminders: true,
        progressUpdates: true,
        achievements: true,
        weeklyReports: false,
        mealReminderTimes: {
          breakfast: "08:00",
          lunch: "12:30",
          dinner: "18:00"
        },
        workoutReminderTime: "17:00"
      },
      preferences: {
        units: "metric",
        theme: "light",
        language: "en",
        weekStartsOn: "monday",
        dataPriority: "accuracy",
        autoSync: true,
        shareData: false,
        digestFrequency: "weekly"
      }
    };
  },

  async updateProfile(profileData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    // In a real app, this would update the server
    const currentSettings = await this.getUserSettings();
    return {
      ...currentSettings,
      profile: { ...currentSettings.profile, ...profileData }
    };
  },

  async updateGoals(goalData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    const currentSettings = await this.getUserSettings();
    return {
      ...currentSettings,
      goals: { ...currentSettings.goals, ...goalData }
    };
  },

  async updateNotifications(notificationData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    const currentSettings = await this.getUserSettings();
    return {
      ...currentSettings,
      notifications: { ...currentSettings.notifications, ...notificationData }
    };
  },

  async updatePreferences(preferenceData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    const currentSettings = await this.getUserSettings();
    return {
      ...currentSettings,
      preferences: { ...currentSettings.preferences, ...preferenceData }
    };
  }
};

export { settingsService };