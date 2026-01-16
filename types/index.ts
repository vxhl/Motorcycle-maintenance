// Core types for the motorcycle maintenance app

export interface MaintenanceTask {
  id: string;
  type: 'wash' | 'chain_lube' | 'chain_clean' | 'component_check';
  name: string;
  description: string;
  frequency: number; // in days
  lastCompleted: Date | null;
  nextDue: Date | null;
  completed: boolean;
  streak: number;
}

export interface ComponentCheck {
  id: string;
  name: string;
  category: 'engine' | 'brakes' | 'tires' | 'lights' | 'fluids' | 'other';
  status: 'good' | 'warning' | 'critical';
  lastChecked: Date | null;
  notes: string;
}

export interface MileageEntry {
  id: string;
  date: Date;
  kilometers: number;
  totalKilometers: number;
  notes: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt: Date | null;
  progress: number;
  target: number;
  category: 'maintenance' | 'mileage' | 'gear' | 'special';
}

export interface RidingGear {
  id: string;
  name: string;
  category: 'helmet' | 'jacket' | 'gloves' | 'boots' | 'pants' | 'accessories';
  owned: boolean;
  priority: 'high' | 'medium' | 'low';
  targetDate: Date | null;
  price: number;
  notes: string;
}

export interface CalendarEvent {
  id: string;
  date: Date;
  type: 'maintenance' | 'cleaning' | 'service' | 'custom';
  title: string;
  description: string;
  completed: boolean;
  icon?: string;
}

export interface AppData {
  maintenanceTasks: MaintenanceTask[];
  componentChecks: ComponentCheck[];
  mileageEntries: MileageEntry[];
  achievements: Achievement[];
  ridingGear: RidingGear[];
  calendarEvents: CalendarEvent[];
  totalKilometers: number;
  bikeModel: string;
  bikeYear: number;
}

