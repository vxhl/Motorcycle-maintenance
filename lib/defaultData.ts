// Default data and initial state for the app
import { AppData, MaintenanceTask, Achievement, ComponentCheck, CalendarEvent } from '@/types';

export const defaultMaintenanceTasks: MaintenanceTask[] = [
  {
    id: 'wash-1',
    type: 'wash',
    name: 'Wash Motorcycle',
    description: 'Full motorcycle wash and cleaning',
    frequency: 30, // monthly
    lastCompleted: null,
    nextDue: null,
    completed: false,
    streak: 0,
  },
  {
    id: 'chain-lube-1',
    type: 'chain_lube',
    name: 'Chain Lubrication',
    description: 'Apply chain lube to keep it running smooth',
    frequency: 14, // bi-weekly
    lastCompleted: null,
    nextDue: null,
    completed: false,
    streak: 0,
  },
  {
    id: 'chain-clean-1',
    type: 'chain_clean',
    name: 'Chain Cleaning',
    description: 'Deep clean the chain',
    frequency: 14, // bi-weekly
    lastCompleted: null,
    nextDue: null,
    completed: false,
    streak: 0,
  },
];

export const defaultComponentChecks: ComponentCheck[] = [
  {
    id: 'comp-1',
    name: 'Engine Oil',
    category: 'fluids',
    status: 'good',
    lastChecked: null,
    notes: '',
  },
  {
    id: 'comp-2',
    name: 'Brake Pads',
    category: 'brakes',
    status: 'good',
    lastChecked: null,
    notes: '',
  },
  {
    id: 'comp-3',
    name: 'Tire Pressure',
    category: 'tires',
    status: 'good',
    lastChecked: null,
    notes: '',
  },
  {
    id: 'comp-4',
    name: 'Headlight',
    category: 'lights',
    status: 'good',
    lastChecked: null,
    notes: '',
  },
  {
    id: 'comp-5',
    name: 'Coolant Level',
    category: 'fluids',
    status: 'good',
    lastChecked: null,
    notes: '',
  },
];

export const defaultAchievements: Achievement[] = [
  {
    id: 'ach-1',
    name: 'First Ride',
    description: 'Log your first kilometer',
    icon: '🏍️',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 1,
    category: 'mileage',
  },
  {
    id: 'ach-2',
    name: 'Century Club',
    description: 'Ride 100 kilometers',
    icon: '💯',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 100,
    category: 'mileage',
  },
  {
    id: 'ach-3',
    name: 'Thousand Miles',
    description: 'Ride 1000 kilometers',
    icon: '🌟',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 1000,
    category: 'mileage',
  },
  {
    id: 'ach-4',
    name: 'Clean Machine',
    description: 'Wash your bike 5 times',
    icon: '✨',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 5,
    category: 'maintenance',
  },
  {
    id: 'ach-5',
    name: 'Chain Master',
    description: 'Lube chain 10 times',
    icon: '⛓️',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 10,
    category: 'maintenance',
  },
  {
    id: 'ach-6',
    name: 'Safety First',
    description: 'Complete all component checks',
    icon: '🔧',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 5,
    category: 'maintenance',
  },
  {
    id: 'ach-7',
    name: 'Gear Up',
    description: 'Add 3 riding gear items to wishlist',
    icon: '🧥',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 3,
    category: 'gear',
  },
  {
    id: 'ach-8',
    name: 'Fully Equipped',
    description: 'Own all essential riding gear',
    icon: '🎯',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 5,
    category: 'gear',
  },
  {
    id: 'ach-9',
    name: 'Maintenance Streak',
    description: 'Complete maintenance 7 days in a row',
    icon: '🔥',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 7,
    category: 'special',
  },
  {
    id: 'ach-10',
    name: 'Road Warrior',
    description: 'Ride 5000 kilometers',
    icon: '⚡',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 5000,
    category: 'mileage',
  },
  // Weird/Fun achievements
  {
    id: 'ach-11',
    name: 'Night Rider',
    description: 'Log a journey past midnight',
    icon: '🌙',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 1,
    category: 'special',
  },
  {
    id: 'ach-12',
    name: 'Fuel Hoarder',
    description: 'Fill up 20 times',
    icon: '⛽',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 20,
    category: 'special',
  },
  {
    id: 'ach-13',
    name: 'Chain Obsessed',
    description: 'Lube your chain 50 times',
    icon: '🔗',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 50,
    category: 'maintenance',
  },
  {
    id: 'ach-14',
    name: 'Expedition Leader',
    description: 'Complete 3 long trips',
    icon: '🗺️',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 3,
    category: 'special',
  },
  {
    id: 'ach-15',
    name: 'Speed Demon',
    description: 'Log 200km in a single day',
    icon: '💨',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 1,
    category: 'mileage',
  },
  {
    id: 'ach-16',
    name: 'Penny Pincher',
    description: 'Track fuel for 10 consecutive fills',
    icon: '💰',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 10,
    category: 'special',
  },
  {
    id: 'ach-17',
    name: 'OCD Mechanic',
    description: 'Complete all maintenance tasks in one day',
    icon: '🔧',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 1,
    category: 'maintenance',
  },
  {
    id: 'ach-18',
    name: 'Birthday Ride',
    description: 'Log a journey on your bike\'s purchase anniversary',
    icon: '🎂',
    unlocked: false,
    unlockedAt: null,
    progress: 0,
    target: 1,
    category: 'special',
  },
];

// Create default calendar events for maintenance tasks (30 days out)
const getDefaultCalendarEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];
  const today = new Date();
  
  // Add wash motorcycle event (30 days from now)
  const washDate = new Date(today);
  washDate.setDate(washDate.getDate() + 30);
  events.push({
    id: 'default-wash',
    date: washDate,
    type: 'cleaning',
    title: 'Wash Motorcycle',
    description: 'Monthly motorcycle wash',
    completed: false,
    recurring: true,
    linkedTaskId: 'wash-1',
    icon: '🧼',
  });

  // Add chain lubrication (14 days from now)
  const chainLubeDate = new Date(today);
  chainLubeDate.setDate(chainLubeDate.getDate() + 14);
  events.push({
    id: 'default-chain-lube',
    date: chainLubeDate,
    type: 'maintenance',
    title: 'Chain Lubrication',
    description: 'Bi-weekly chain lubrication',
    completed: false,
    recurring: true,
    linkedTaskId: 'chain-lube-1',
    icon: '⛓️',
  });

  // Add chain cleaning (14 days from now)
  const chainCleanDate = new Date(today);
  chainCleanDate.setDate(chainCleanDate.getDate() + 14);
  events.push({
    id: 'default-chain-clean',
    date: chainCleanDate,
    type: 'maintenance',
    title: 'Chain Cleaning',
    description: 'Deep clean the chain',
    completed: false,
    recurring: true,
    linkedTaskId: 'chain-clean-1',
    icon: '🔗',
  });

  // Add component checks (7 days from now)
  const engineCheckDate = new Date(today);
  engineCheckDate.setDate(engineCheckDate.getDate() + 7);
  events.push({
    id: 'default-engine-check',
    date: engineCheckDate,
    type: 'service',
    title: 'Engine Oil Check',
    description: 'Check engine oil level and condition',
    completed: false,
    icon: '🛢️',
  });

  const brakeCheckDate = new Date(today);
  brakeCheckDate.setDate(brakeCheckDate.getDate() + 10);
  events.push({
    id: 'default-brake-check',
    date: brakeCheckDate,
    type: 'service',
    title: 'Brake System Check',
    description: 'Inspect brake pads and fluid',
    completed: false,
    icon: '🛑',
  });

  const tireCheckDate = new Date(today);
  tireCheckDate.setDate(tireCheckDate.getDate() + 7);
  events.push({
    id: 'default-tire-check',
    date: tireCheckDate,
    type: 'service',
    title: 'Tire Pressure Check',
    description: 'Check and adjust tire pressure',
    completed: false,
    icon: '🎯',
  });

  return events;
};

export const defaultAppData: AppData = {
  maintenanceTasks: defaultMaintenanceTasks,
  componentChecks: defaultComponentChecks,
  mileageEntries: [],
  achievements: defaultAchievements,
  ridingGear: [],
  calendarEvents: getDefaultCalendarEvents(),
  fuelEntries: [],
  tripEntries: [],
  totalKilometers: 0, // User will set their starting odometer in settings
  bikeModel: 'My Bike',
  bikeYear: new Date().getFullYear(),
  bikePurchaseDate: new Date(), // User will set their actual purchase date in settings
};

