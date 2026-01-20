'use client';

import { useState } from 'react';
import { X, Wrench, Droplet, Building2, Calendar, Plus, Trash2 } from 'lucide-react';
import { CalendarEvent } from '@/types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  onDelete?: (eventId: string) => void;
  existingEvents?: CalendarEvent[]; // All events for this date
}

const eventTypes = [
  { value: 'maintenance', label: 'Maintenance', icon: Wrench, color: 'ancient-gold' },
  { value: 'cleaning', label: 'Cleaning', icon: Droplet, color: 'sheikah-blue' },
  { value: 'service', label: 'Service Center', icon: Building2, color: 'shrine-teal' },
  { value: 'custom', label: 'Custom Task', icon: Calendar, color: 'spirit-yellow' },
] as const;

export default function EventModal({ isOpen, onClose, date, onSave, onDelete, existingEvents = [] }: EventModalProps) {
  const [showForm, setShowForm] = useState(existingEvents.length === 0); // Show form immediately if no events
  const [type, setType] = useState<'maintenance' | 'cleaning' | 'service' | 'custom'>('maintenance');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      date,
      type,
      title: title.trim(),
      description: description.trim(),
      completed: false,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setType('maintenance');
    setShowForm(false);
    onClose();
  };

  const getEventIcon = (eventType: CalendarEvent['type']) => {
    const et = eventTypes.find(t => t.value === eventType);
    return et ? et.icon : Calendar;
  };

  const getEventColor = (eventType: CalendarEvent['type']) => {
    const et = eventTypes.find(t => t.value === eventType);
    return et ? et.color : 'sheikah-blue';
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-dark-stone border-2 border-sheikah-blue rounded-lg max-w-md w-full p-6 shadow-2xl my-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-sheikah-blue sheikah-glow">
            Events
          </h2>
          <button
            onClick={onClose}
            className="text-aged-paper hover:text-sheikah-blue transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Date Display */}
        <div className="mb-4 p-3 bg-slate-blue/20 border border-ancient-gold/30 rounded">
          <p className="text-aged-paper text-sm">
            <span className="text-ancient-gold font-semibold">Date:</span>{' '}
            {date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Existing Events List */}
        {existingEvents.length > 0 && !showForm && (
          <div className="mb-4">
            <h3 className="text-lg font-bold text-ancient-gold mb-3">Scheduled Events</h3>
            <div className="space-y-2 mb-4">
              {existingEvents.map((event) => {
                const EventIcon = getEventIcon(event.type);
                const color = getEventColor(event.type);
                return (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg border-2 border-${color} bg-${color}/10 flex items-start justify-between`}
                  >
                    <div className="flex items-start gap-2 flex-1">
                      <EventIcon size={20} className={`text-${color} mt-0.5`} />
                      <div>
                        <p className={`font-bold text-${color}`}>{event.title}</p>
                        {event.description && (
                          <p className="text-sm text-aged-paper/70">{event.description}</p>
                        )}
                        <p className="text-xs text-aged-paper/50 mt-1 capitalize">{event.type}</p>
                      </div>
                    </div>
                    {onDelete && !event.recurring && (
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${event.title}"?`)) {
                            onDelete(event.id);
                          }
                        }}
                        className="text-health-red hover:text-health-red/80 transition-colors ml-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3 rounded-lg bg-sheikah-blue/20 border-2 border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone transition-all font-bold flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Event
            </button>
          </div>
        )}

        {/* Add Event Form */}
        {showForm && (
          <form onSubmit={handleSubmit}>
          {/* Event Type Selection */}
          <div className="mb-6">
            <label className="block text-aged-paper font-semibold mb-3">Event Type</label>
            <div className="grid grid-cols-2 gap-3">
              {eventTypes.map((eventType) => {
                const TypeIcon = eventType.icon;
                return (
                  <button
                    key={eventType.value}
                    type="button"
                    onClick={() => setType(eventType.value)}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                      type === eventType.value
                        ? `border-${eventType.color} bg-${eventType.color}/10`
                        : 'border-slate-blue/30 bg-slate-blue/10 hover:border-aged-paper/50'
                    }`}
                  >
                    <TypeIcon 
                      size={20} 
                      className={type === eventType.value ? `text-${eventType.color}` : 'text-aged-paper/70'}
                    />
                    <span className={type === eventType.value ? `text-${eventType.color}` : 'text-aged-paper'}>
                      {eventType.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-aged-paper font-semibold mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Oil change at service center"
              className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label className="block text-aged-paper font-semibold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional notes (optional)"
              rows={3}
              className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                if (existingEvents.length > 0) {
                  setShowForm(false);
                  setTitle('');
                  setDescription('');
                } else {
                  onClose();
                }
              }}
              className="flex-1 px-4 py-3 bg-slate-blue/30 hover:bg-slate-blue/50 text-aged-paper rounded-lg transition-all border border-aged-paper/20"
            >
              {existingEvents.length > 0 ? 'Back' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className={`flex-1 px-4 py-3 rounded-lg transition-all border-2 flex items-center justify-center gap-2 ${
                title.trim()
                  ? 'bg-sheikah-blue/20 border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone sheikah-glow'
                  : 'bg-slate-blue/10 border-slate-blue/30 text-aged-paper/30 cursor-not-allowed'
              }`}
            >
              <Plus size={20} />
              Save Event
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}

