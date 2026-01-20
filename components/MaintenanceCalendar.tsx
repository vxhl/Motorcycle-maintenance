'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Wrench, Droplet, Building2, Calendar as CalendarIcon, Trash2 } from 'lucide-react';
import { MaintenanceTask, CalendarEvent, ComponentCheck } from '@/types';
import EventModal from './EventModal';

interface MaintenanceCalendarProps {
  tasks: MaintenanceTask[];
  componentChecks?: ComponentCheck[];
  calendarEvents?: CalendarEvent[];
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  onDeleteEvent: (eventId: string) => void;
}

export default function MaintenanceCalendar({ 
  tasks, 
  componentChecks = [], 
  calendarEvents = [],
  onAddEvent,
  onDeleteEvent 
}: MaintenanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    clickedDate.setHours(0, 0, 0, 0);
    setSelectedDate(clickedDate);
    setIsModalOpen(true);
  };

  const getEventsForDate = (date: Date) => {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === targetDate.getTime();
    });
  };

  const getActivitiesForDate = (day: number) => {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    targetDate.setHours(0, 0, 0, 0);
    
    const activities = {
      completedTasks: [] as MaintenanceTask[],
      dueTasks: [] as MaintenanceTask[],
      componentChecks: [] as ComponentCheck[],
      customEvents: [] as CalendarEvent[],
    };

    // Check maintenance tasks
    tasks.forEach(task => {
      if (task.lastCompleted) {
        const completedDate = new Date(task.lastCompleted);
        completedDate.setHours(0, 0, 0, 0);
        if (completedDate.getTime() === targetDate.getTime()) {
          activities.completedTasks.push(task);
        }
      }
      if (task.nextDue) {
        const dueDate = new Date(task.nextDue);
        dueDate.setHours(0, 0, 0, 0);
        if (dueDate.getTime() === targetDate.getTime()) {
          activities.dueTasks.push(task);
        }
      }
    });

    // Check component checks
    componentChecks.forEach(check => {
      if (check.lastChecked) {
        const checkedDate = new Date(check.lastChecked);
        checkedDate.setHours(0, 0, 0, 0);
        if (checkedDate.getTime() === targetDate.getTime()) {
          activities.componentChecks.push(check);
        }
      }
    });

    // Check custom calendar events
    calendarEvents.forEach(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      if (eventDate.getTime() === targetDate.getTime()) {
        activities.customEvents.push(event);
      }
    });

    return activities;
  };

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'maintenance': return Wrench;
      case 'cleaning': return Droplet;
      case 'service': return Building2;
      default: return CalendarIcon;
    }
  };

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'maintenance': return 'ancient-gold';
      case 'cleaning': return 'sheikah-blue';
      case 'service': return 'shrine-teal';
      default: return 'spirit-yellow';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const today = new Date();
  const isToday = (day: number | null) => {
    if (!day) return false;
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <>
      <div className="bg-dark-stone rounded-lg border-2 border-sheikah-blue overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-sheikah-blue/20 to-shrine-teal/20 p-4 flex items-center justify-between border-b-2 border-sheikah-blue/30">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg hover:bg-sheikah-blue/30 transition text-sheikah-blue"
          >
            <ChevronLeft size={24} />
          </button>
          <h3 className="text-2xl font-bold text-sheikah-blue sheikah-glow">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-sheikah-blue/30 transition text-sheikah-blue"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="p-4">
          {/* Day names */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(name => (
              <div key={name} className="text-center text-sm font-bold text-ancient-gold py-2">
                {name}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="invisible" />;
              }

              const activities = getActivitiesForDate(day);
              const hasCompleted = activities.completedTasks.length > 0;
              const hasDue = activities.dueTasks.length > 0;
              const hasChecks = activities.componentChecks.length > 0;
              const hasCustomEvents = activities.customEvents.length > 0;
              const hasActivity = hasCompleted || hasDue || hasChecks || hasCustomEvents;

              const totalActivities = activities.completedTasks.length + 
                                     activities.dueTasks.length + 
                                     activities.componentChecks.length +
                                     activities.customEvents.length;

              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={`
                    min-h-[80px] md:min-h-[100px] flex flex-col items-center justify-start p-2 rounded-lg transition-all cursor-pointer relative group
                    ${isToday(day) ? 'bg-sheikah-blue/30 border-2 border-sheikah-blue text-sheikah-blue font-bold shadow-lg shadow-sheikah-blue/30' : ''}
                    ${!isToday(day) ? 'bg-slate-blue/20 text-aged-paper hover:bg-slate-blue/40 border-2 border-slate-blue/30' : ''}
                    ${hasActivity && !isToday(day) ? 'ring-2 ring-ancient-gold/50' : ''}
                  `}
                  title={`Click to add event on ${monthNames[currentDate.getMonth()]} ${day}`}
                >
                  <span className={`text-lg font-semibold mb-1`}>
                    {day}
                  </span>
                  
                  {/* Activity indicators */}
                  {hasActivity && (
                    <div className="flex flex-wrap gap-1 justify-center items-center">
                      {hasCompleted && (
                        <div 
                          className={`w-2 h-2 rounded-full bg-stamina-green`}
                          title={`${activities.completedTasks.length} completed`}
                        />
                      )}
                      {hasDue && (
                        <div 
                          className={`w-2 h-2 rounded-full bg-spirit-yellow`}
                          title={`${activities.dueTasks.length} due`}
                        />
                      )}
                      {hasChecks && (
                        <div 
                          className={`w-2 h-2 rounded-full bg-shrine-teal`}
                          title={`${activities.componentChecks.length} checks`}
                        />
                      )}
                      {hasCustomEvents && (
                        <div 
                          className={`w-2 h-2 rounded-full bg-ancient-gold`}
                          title={`${activities.customEvents.length} events`}
                        />
                      )}
                    </div>
                  )}

                  {/* Plus icon hint */}
                  <Plus 
                    size={16} 
                    className={`mt-auto opacity-0 group-hover:opacity-50 transition-opacity ${isToday(day) ? 'text-sheikah-blue' : 'text-aged-paper'}`} 
                  />

                  {/* Tooltip on hover */}
                  {hasActivity && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-56">
                      <div className="bg-dark-stone border-2 border-sheikah-blue rounded-lg p-3 text-xs text-left shadow-xl">
                        <div className="font-bold text-sheikah-blue mb-2">
                          {monthNames[currentDate.getMonth()]} {day}
                        </div>
                        
                        {activities.customEvents.length > 0 && (
                          <div className="mb-2">
                            <div className="text-ancient-gold font-semibold mb-1">📅 Events:</div>
                            {activities.customEvents.map(event => {
                              const EventIcon = getEventIcon(event.type);
                              return (
                                <div 
                                  key={event.id} 
                                  className="flex items-center gap-2 text-aged-paper ml-2 mb-1 group/event"
                                >
                                  <EventIcon size={12} className={`text-${getEventColor(event.type)}`} />
                                  <span className="flex-1">{event.title}</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (confirm(`Delete "${event.title}"?`)) {
                                        onDeleteEvent(event.id);
                                      }
                                    }}
                                    className="opacity-0 group-hover/event:opacity-100 transition-opacity text-health-red hover:text-health-red/80"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        
                        {activities.completedTasks.length > 0 && (
                          <div className="mb-2">
                            <div className="text-stamina-green font-semibold mb-1">✓ Completed:</div>
                            {activities.completedTasks.map(task => (
                              <div key={task.id} className="text-aged-paper ml-2">• {task.name}</div>
                            ))}
                          </div>
                        )}
                        
                        {activities.dueTasks.length > 0 && (
                          <div className="mb-2">
                            <div className="text-spirit-yellow font-semibold mb-1">⏰ Due:</div>
                            {activities.dueTasks.map(task => (
                              <div key={task.id} className="text-aged-paper ml-2">• {task.name}</div>
                            ))}
                          </div>
                        )}
                        
                        {activities.componentChecks.length > 0 && (
                          <div>
                            <div className="text-shrine-teal font-semibold mb-1">🔧 Checked:</div>
                            {activities.componentChecks.map(check => (
                              <div key={check.id} className="text-aged-paper ml-2">• {check.name}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-slate-blue/50 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-sheikah-blue bg-sheikah-blue/30" />
              <span className="text-aged-paper">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-ancient-gold" />
              <span className="text-aged-paper">Custom Event</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-stamina-green" />
              <span className="text-aged-paper">Task Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-spirit-yellow" />
              <span className="text-aged-paper">Task Due</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-shrine-teal" />
              <span className="text-aged-paper">Component Checked</span>
            </div>
            <div className="text-aged-paper/70 ml-auto hidden md:block">
              💡 Click dates to add events
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedDate && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDate(null);
          }}
          date={selectedDate}
          onSave={onAddEvent}
          onDelete={onDeleteEvent}
          existingEvents={getEventsForDate(selectedDate)}
        />
      )}
    </>
  );
}
