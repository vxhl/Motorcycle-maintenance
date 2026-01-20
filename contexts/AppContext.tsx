'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppData, MaintenanceTask, MileageEntry, Achievement, ComponentCheck, RidingGear, CalendarEvent, FuelEntry, TripEntry } from '@/types';
import { defaultAppData } from '@/lib/defaultData';
import { NotificationManager, scheduleNotificationChecks } from '@/utils/notifications';

interface AppContextType {
  data: AppData;
  addMileageEntry: (kilometers: number, notes: string) => void;
  completeMaintenanceTask: (taskId: string) => void;
  resetMaintenanceTask: (taskId: string) => void;
  updateComponentCheck: (check: ComponentCheck) => void;
  addRidingGear: (gear: Omit<RidingGear, 'id'>) => void;
  updateRidingGear: (gear: RidingGear) => void;
  deleteRidingGear: (gearId: string) => void;
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateCalendarEvent: (event: CalendarEvent) => void;
  deleteCalendarEvent: (eventId: string) => void;
  addFuelEntry: (entry: Omit<FuelEntry, 'id'>) => void;
  deleteFuelEntry: (entryId: string) => void;
  addTripEntry: (entry: Omit<TripEntry, 'id'>) => void;
  updateTripEntry: (entry: TripEntry) => void;
  deleteTripEntry: (entryId: string) => void;
  updateBikeInfo: (info: { bikeModel: string; bikeYear: number; bikePurchaseDate: Date; startingOdometer: number }) => void;
  checkAchievements: () => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AppData>(defaultAppData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('cyberride-data');
      if (!savedData) {
        console.log('No saved data found, using defaults');
        setIsLoaded(true);
        return;
      }
      
      const parsed = JSON.parse(savedData);
      // Convert date strings back to Date objects
      parsed.mileageEntries = parsed.mileageEntries?.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date),
      })) || [];
      parsed.maintenanceTasks = parsed.maintenanceTasks?.map((task: any) => ({
        ...task,
        lastCompleted: task.lastCompleted ? new Date(task.lastCompleted) : null,
        nextDue: task.nextDue ? new Date(task.nextDue) : null,
      })) || defaultAppData.maintenanceTasks;
      parsed.achievements = parsed.achievements?.map((ach: any) => ({
        ...ach,
        unlockedAt: ach.unlockedAt ? new Date(ach.unlockedAt) : null,
      })) || defaultAppData.achievements;
      parsed.componentChecks = parsed.componentChecks?.map((check: any) => ({
        ...check,
        lastChecked: check.lastChecked ? new Date(check.lastChecked) : null,
      })) || defaultAppData.componentChecks;
      parsed.ridingGear = parsed.ridingGear?.map((gear: any) => ({
        ...gear,
        targetDate: gear.targetDate ? new Date(gear.targetDate) : null,
      })) || [];
      parsed.calendarEvents = parsed.calendarEvents?.map((event: any) => ({
        ...event,
        date: new Date(event.date),
      })) || [];
      
      // Merge in missing default calendar events for existing users
      if (parsed.calendarEvents) {
        const existingEventIds = new Set(parsed.calendarEvents.map((e: CalendarEvent) => e.id));
        const defaultEvents = defaultAppData.calendarEvents || [];
        
        defaultEvents.forEach(defaultEvent => {
          if (!existingEventIds.has(defaultEvent.id)) {
            parsed.calendarEvents.push(defaultEvent);
          }
        });
      }
      
      parsed.fuelEntries = parsed.fuelEntries?.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date),
      })) || [];
      parsed.tripEntries = parsed.tripEntries?.map((trip: any) => ({
        ...trip,
        startDate: new Date(trip.startDate),
        endDate: trip.endDate ? new Date(trip.endDate) : null,
      })) || [];
      parsed.bikePurchaseDate = parsed.bikePurchaseDate ? new Date(parsed.bikePurchaseDate) : defaultAppData.bikePurchaseDate;
      setData(parsed);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cyberride-data', JSON.stringify(data));
    }
  }, [data, isLoaded]);

  // Request notification permission and set up checks
  useEffect(() => {
    if (!isLoaded) return;

    const initNotifications = async () => {
      const hasPermission = await NotificationManager.requestPermission();
      setNotificationsEnabled(hasPermission);
      
      if (hasPermission) {
        // Initial check
        checkAndNotify();
      }
    };

    initNotifications();

    // Schedule periodic checks (hourly and daily at 9 AM)
    const cleanup = scheduleNotificationChecks(() => {
      if (NotificationManager.checkPermissionStatus() === 'granted') {
        checkAndNotify();
      }
    });

    return cleanup;
  }, [isLoaded]);

  // Check for overdue tasks and upcoming events
  const checkAndNotify = () => {
    const now = new Date();
    
    // Check overdue tasks
    const overdueTasks = data.maintenanceTasks
      .filter(task => {
        if (!task.nextDue) return false;
        const dueDate = new Date(task.nextDue);
        return dueDate < now;
      })
      .map(task => {
        const dueDate = new Date(task.nextDue!);
        const daysOverdue = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
        return { name: task.name, daysOverdue };
      });

    if (overdueTasks.length > 0) {
      NotificationManager.notifyOverdueTasks(overdueTasks);
    }

    // Check upcoming events (next 3 days)
    const threeDaysFromNow = new Date(now);
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

    const upcomingEvents = data.calendarEvents
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= threeDaysFromNow && !event.completed;
      })
      .map(event => {
        const eventDate = new Date(event.date);
        const daysUntil = Math.floor((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return { title: event.title, daysUntil };
      });

    if (upcomingEvents.length > 0) {
      NotificationManager.notifyUpcomingEvents(upcomingEvents);
    }
  };

  const addMileageEntry = (kilometers: number, notes: string) => {
    const newEntry: MileageEntry = {
      id: `mile-${Date.now()}`,
      date: new Date(),
      kilometers,
      totalKilometers: data.totalKilometers + kilometers,
      notes,
    };

    setData(prev => ({
      ...prev,
      mileageEntries: [newEntry, ...prev.mileageEntries],
      totalKilometers: prev.totalKilometers + kilometers,
    }));

    // Check achievements after adding mileage
    setTimeout(() => checkAchievements(), 100);
  };

  const completeMaintenanceTask = (taskId: string) => {
    setData(prev => {
      const updatedTasks = prev.maintenanceTasks.map(task => {
        if (task.id === taskId) {
          const now = new Date();
          const nextDue = new Date(now);
          nextDue.setDate(nextDue.getDate() + task.frequency);
          
          return {
            ...task,
            lastCompleted: now,
            nextDue,
            completed: true,
            streak: task.streak + 1,
          };
        }
        return task;
      });

      // Create auto-recurring calendar event for the next due date
      const completedTask = updatedTasks.find(t => t.id === taskId);
      let newCalendarEvents = [...prev.calendarEvents];
      
      if (completedTask && completedTask.nextDue) {
        // Remove old recurring event for this task
        newCalendarEvents = newCalendarEvents.filter(e => e.linkedTaskId !== taskId);
        
        // Add new recurring event for next due date
        const newEvent: CalendarEvent = {
          id: `event-${Date.now()}-${taskId}`,
          date: completedTask.nextDue,
          type: completedTask.type === 'wash' ? 'cleaning' : 'maintenance',
          title: completedTask.name,
          description: `Scheduled ${completedTask.name.toLowerCase()}`,
          completed: false,
          recurring: true,
          linkedTaskId: taskId,
        };
        newCalendarEvents.push(newEvent);
      }

      return {
        ...prev,
        maintenanceTasks: updatedTasks,
        calendarEvents: newCalendarEvents,
      };
    });

    setTimeout(() => checkAchievements(), 100);
  };

  const resetMaintenanceTask = (taskId: string) => {
    setData(prev => {
      const updatedTasks = prev.maintenanceTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            lastCompleted: null,
            nextDue: null,
            completed: false,
            // Keep the streak to maintain progress
          };
        }
        return task;
      });

      return {
        ...prev,
        maintenanceTasks: updatedTasks,
      };
    });
  };

  const updateComponentCheck = (check: ComponentCheck) => {
    setData(prev => ({
      ...prev,
      componentChecks: prev.componentChecks.map(c => 
        c.id === check.id ? { ...check, lastChecked: new Date() } : c
      ),
    }));

    setTimeout(() => checkAchievements(), 100);
  };

  const addRidingGear = (gear: Omit<RidingGear, 'id'>) => {
    const newGear: RidingGear = {
      ...gear,
      id: `gear-${Date.now()}`,
    };

    setData(prev => ({
      ...prev,
      ridingGear: [...prev.ridingGear, newGear],
    }));

    setTimeout(() => checkAchievements(), 100);
  };

  const updateRidingGear = (gear: RidingGear) => {
    setData(prev => ({
      ...prev,
      ridingGear: prev.ridingGear.map(g => g.id === gear.id ? gear : g),
    }));

    setTimeout(() => checkAchievements(), 100);
  };

  const deleteRidingGear = (gearId: string) => {
    setData(prev => ({
      ...prev,
      ridingGear: prev.ridingGear.filter(g => g.id !== gearId),
    }));
  };

  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: `event-${Date.now()}`,
    };

    setData(prev => ({
      ...prev,
      calendarEvents: [...prev.calendarEvents, newEvent],
    }));
  };

  const updateCalendarEvent = (event: CalendarEvent) => {
    setData(prev => ({
      ...prev,
      calendarEvents: prev.calendarEvents.map(e => e.id === event.id ? event : e),
    }));
  };

  const deleteCalendarEvent = (eventId: string) => {
    setData(prev => ({
      ...prev,
      calendarEvents: prev.calendarEvents.filter(e => e.id !== eventId),
    }));
  };

  const addFuelEntry = (entry: Omit<FuelEntry, 'id'>) => {
    const newEntry: FuelEntry = {
      ...entry,
      id: `fuel-${Date.now()}`,
    };

    setData(prev => ({
      ...prev,
      fuelEntries: [newEntry, ...prev.fuelEntries],
    }));

    setTimeout(() => checkAchievements(), 100);
  };

  const deleteFuelEntry = (entryId: string) => {
    setData(prev => ({
      ...prev,
      fuelEntries: prev.fuelEntries.filter(e => e.id !== entryId),
    }));
  };

  const addTripEntry = (entry: Omit<TripEntry, 'id'>) => {
    const newEntry: TripEntry = {
      ...entry,
      id: `trip-${Date.now()}`,
    };

    setData(prev => ({
      ...prev,
      tripEntries: [newEntry, ...prev.tripEntries],
    }));

    setTimeout(() => checkAchievements(), 100);
  };

  const updateTripEntry = (entry: TripEntry) => {
    setData(prev => ({
      ...prev,
      tripEntries: prev.tripEntries.map(t => t.id === entry.id ? entry : t),
    }));

    setTimeout(() => checkAchievements(), 100);
  };

  const deleteTripEntry = (entryId: string) => {
    setData(prev => ({
      ...prev,
      tripEntries: prev.tripEntries.filter(t => t.id !== entryId),
    }));
  };

  const updateBikeInfo = (info: { bikeModel: string; bikeYear: number; bikePurchaseDate: Date; startingOdometer: number }) => {
    setData(prev => {
      // Calculate the total distance from mileage entries
      const totalMileageLogged = prev.mileageEntries.reduce((sum, entry) => sum + entry.kilometers, 0);
      
      // New total kilometers = starting odometer + all logged mileage
      const newTotalKilometers = info.startingOdometer + totalMileageLogged;

      return {
        ...prev,
        bikeModel: info.bikeModel,
        bikeYear: info.bikeYear,
        bikePurchaseDate: info.bikePurchaseDate,
        totalKilometers: newTotalKilometers,
      };
    });
  };

  const checkAchievements = () => {
    setData(prev => {
      const updatedAchievements = prev.achievements.map(achievement => {
        if (achievement.unlocked) return achievement;
        
        const wasLocked = !achievement.unlocked;

        let progress = achievement.progress;
        
        // Update progress based on achievement type
        switch (achievement.id) {
          case 'ach-1': // First Ride
            progress = prev.totalKilometers > 0 ? 1 : 0;
            break;
          case 'ach-2': // Century Club
            progress = prev.totalKilometers;
            break;
          case 'ach-3': // Thousand Miles
            progress = prev.totalKilometers;
            break;
          case 'ach-4': // Clean Machine
            progress = prev.maintenanceTasks
              .filter(t => t.type === 'wash')
              .reduce((sum, t) => sum + t.streak, 0);
            break;
          case 'ach-5': // Chain Master
            progress = prev.maintenanceTasks
              .filter(t => t.type === 'chain_lube')
              .reduce((sum, t) => sum + t.streak, 0);
            break;
          case 'ach-6': // Safety First
            progress = prev.componentChecks.filter(c => c.lastChecked !== null).length;
            break;
          case 'ach-7': // Gear Up
            progress = prev.ridingGear.length;
            break;
          case 'ach-8': // Fully Equipped
            progress = prev.ridingGear.filter(g => g.owned).length;
            break;
          case 'ach-10': // Road Warrior
            progress = prev.totalKilometers;
            break;
          case 'ach-11': // Night Rider - check if any entry was logged after midnight
            progress = prev.mileageEntries.some(e => {
              const hour = new Date(e.date).getHours();
              return hour >= 0 && hour < 6;
            }) ? 1 : 0;
            break;
          case 'ach-12': // Fuel Hoarder
            progress = prev.fuelEntries.length;
            break;
          case 'ach-13': // Chain Obsessed
            progress = prev.maintenanceTasks
              .filter(t => t.type === 'chain_lube')
              .reduce((sum, t) => sum + t.streak, 0);
            break;
          case 'ach-14': // Expedition Leader
            progress = prev.tripEntries.filter(t => t.endDate !== null).length;
            break;
          case 'ach-15': // Speed Demon - check if any single entry >= 200km
            progress = prev.mileageEntries.some(e => e.kilometers >= 200) ? 1 : 0;
            break;
          case 'ach-16': // Penny Pincher - check consecutive fuel entries
            progress = Math.min(prev.fuelEntries.length, 10);
            break;
          case 'ach-17': // OCD Mechanic - check if all tasks completed same day
            const completedSameDay = prev.maintenanceTasks.every(t => {
              if (!t.lastCompleted) return false;
              const today = new Date().toDateString();
              return new Date(t.lastCompleted).toDateString() === today;
            });
            progress = completedSameDay ? 1 : 0;
            break;
          case 'ach-18': // Birthday Ride - check if any entry on bike's anniversary
            const purchaseDate = new Date(prev.bikePurchaseDate);
            const hasAnniversaryRide = prev.mileageEntries.some(e => {
              const entryDate = new Date(e.date);
              return entryDate.getMonth() === purchaseDate.getMonth() &&
                     entryDate.getDate() === purchaseDate.getDate() &&
                     entryDate.getFullYear() > purchaseDate.getFullYear();
            });
            progress = hasAnniversaryRide ? 1 : 0;
            break;
        }

        const unlocked = progress >= achievement.target;

        // Notify if newly unlocked
        if (wasLocked && unlocked && notificationsEnabled) {
          NotificationManager.notifyAchievement({
            name: achievement.name,
            description: achievement.description,
            icon: achievement.icon,
          });
        }

        return {
          ...achievement,
          progress,
          unlocked,
          unlockedAt: unlocked && !achievement.unlocked ? new Date() : achievement.unlockedAt,
        };
      });

      return {
        ...prev,
        achievements: updatedAchievements,
      };
    });
  };

  const resetData = () => {
    localStorage.removeItem('cyberride-data');
    setData(defaultAppData);
  };

  return (
    <AppContext.Provider
      value={{
        data,
        addMileageEntry,
        completeMaintenanceTask,
        resetMaintenanceTask,
        updateComponentCheck,
        addRidingGear,
        updateRidingGear,
        deleteRidingGear,
        addCalendarEvent,
        updateCalendarEvent,
        deleteCalendarEvent,
        addFuelEntry,
        deleteFuelEntry,
        addTripEntry,
        updateTripEntry,
        deleteTripEntry,
        updateBikeInfo,
        checkAchievements,
        resetData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

