// Push notification utilities

export class NotificationManager {
  private static hasPermission = false;

  static async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      this.hasPermission = true;
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      this.hasPermission = permission === 'granted';
      return this.hasPermission;
    }

    return false;
  }

  static async sendNotification(title: string, options?: NotificationOptions) {
    if (!this.hasPermission) {
      await this.requestPermission();
    }

    if (this.hasPermission && 'Notification' in window) {
      const notification = new Notification(title, {
        icon: '/mastery.png',
        badge: '/icon-192.png',
        ...options,
      });

      // Auto-close after 10 seconds
      setTimeout(() => notification.close(), 10000);

      return notification;
    }

    return null;
  }

  static async notifyOverdueTasks(tasks: Array<{ name: string; daysOverdue: number }>) {
    if (tasks.length === 0) return;

    const title = tasks.length === 1
      ? '🏍️ Master Cycle Maintenance Due!'
      : `🏍️ ${tasks.length} Maintenance Tasks Due!`;

    const body = tasks.length === 1
      ? `${tasks[0].name} is overdue by ${tasks[0].daysOverdue} days`
      : tasks.map(t => `• ${t.name}`).join('\n');

    await this.sendNotification(title, {
      body,
      tag: 'overdue-tasks',
      requireInteraction: true,
    });
  }

  static async notifyUpcomingEvents(events: Array<{ title: string; daysUntil: number }>) {
    if (events.length === 0) return;

    const title = '📅 Upcoming Maintenance Events';
    const body = events.map(e => {
      const dayText = e.daysUntil === 0 ? 'today' : e.daysUntil === 1 ? 'tomorrow' : `in ${e.daysUntil} days`;
      return `• ${e.title} ${dayText}`;
    }).join('\n');

    await this.sendNotification(title, {
      body,
      tag: 'upcoming-events',
    });
  }

  static async notifyFuelEfficiency(efficiency: number, isLow: boolean) {
    if (!isLow) return;

    await this.sendNotification('⛽ Fuel Efficiency Alert', {
      body: `Your fuel efficiency has dropped to ${efficiency.toFixed(1)} km/L. Consider checking tire pressure and chain lubrication.`,
      tag: 'fuel-efficiency',
    });
  }

  static async notifyAchievement(achievement: { name: string; description: string; icon: string }) {
    await this.sendNotification(`${achievement.icon} Achievement Unlocked!`, {
      body: `${achievement.name}\n${achievement.description}`,
      tag: 'achievement',
      requireInteraction: true,
    });
  }

  static async notifyTripMilestone(distance: number) {
    await this.sendNotification('🎯 Trip Milestone!', {
      body: `You've traveled ${distance.toFixed(0)} km on this trip!`,
      tag: 'trip-milestone',
    });
  }

  static checkPermissionStatus(): NotificationPermission {
    if (!('Notification' in window)) {
      return 'denied';
    }
    return Notification.permission;
  }
}

// Helper to schedule periodic notification checks
export function scheduleNotificationChecks(checkCallback: () => void) {
  // Check immediately
  checkCallback();

  // Check every hour
  const hourly = setInterval(checkCallback, 60 * 60 * 1000);

  // Check at 9 AM daily
  const now = new Date();
  const tomorrow9AM = new Date();
  tomorrow9AM.setDate(tomorrow9AM.getDate() + 1);
  tomorrow9AM.setHours(9, 0, 0, 0);
  const timeUntil9AM = tomorrow9AM.getTime() - now.getTime();

  const daily = setTimeout(() => {
    checkCallback();
    // Then repeat every 24 hours
    setInterval(checkCallback, 24 * 60 * 60 * 1000);
  }, timeUntil9AM);

  // Return cleanup function
  return () => {
    clearInterval(hourly);
    clearTimeout(daily);
  };
}
