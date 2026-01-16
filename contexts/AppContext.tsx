'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppData, MaintenanceTask, MileageEntry, Achievement, ComponentCheck, RidingGear, CalendarEvent } from '@/types';
import { defaultAppData } from '@/lib/defaultData';

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
  checkAchievements: () => void;
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<AppData>(defaultAppData);
  const [isLoaded, setIsLoaded] = useState(false);

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

      return {
        ...prev,
        maintenanceTasks: updatedTasks,
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

  const checkAchievements = () => {
    setData(prev => {
      const updatedAchievements = prev.achievements.map(achievement => {
        if (achievement.unlocked) return achievement;

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
        }

        const unlocked = progress >= achievement.target;

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

