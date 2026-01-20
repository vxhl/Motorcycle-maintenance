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
  recurring?: boolean; // For auto-recurring events
  linkedTaskId?: string; // Link to maintenance task for auto-scheduling
}

export interface FuelEntry {
  id: string;
  date: Date;
  liters: number;
  pricePerLiter: number;
  totalCost: number;
  odometer: number; // Current odometer reading
  fuelType: 'petrol' | 'premium' | 'diesel';
  fullTank: boolean;
  notes: string;
}

export interface TripEntry {
  id: string;
  name: string; // Trip name/title
  startDate: Date;
  endDate: Date | null; // null if ongoing
  startOdometer: number;
  endOdometer: number | null; // null if ongoing
  distance: number; // calculated or manual
  notes: string;
  photos?: string[]; // URLs to photos
  locations: string[]; // Places visited
}

export interface AppData {
  maintenanceTasks: MaintenanceTask[];
  componentChecks: ComponentCheck[];
  mileageEntries: MileageEntry[];
  achievements: Achievement[];
  ridingGear: RidingGear[];
  calendarEvents: CalendarEvent[];
  fuelEntries: FuelEntry[];
  tripEntries: TripEntry[];
  totalKilometers: number;
  bikeModel: string;
  bikeYear: number;
  bikePurchaseDate: Date; // When the bike was purchased
}

