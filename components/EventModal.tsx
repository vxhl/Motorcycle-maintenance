'use client';

import { useState } from 'react';
import { X, Wrench, Droplet, Building2, Calendar } from 'lucide-react';
import { CalendarEvent } from '@/types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  onSave: (event: Omit<CalendarEvent, 'id'>) => void;
  existingEvent?: CalendarEvent;
}

const eventTypes = [
  { value: 'maintenance', label: 'Maintenance', icon: Wrench, color: 'ancient-gold' },
  { value: 'cleaning', label: 'Cleaning', icon: Droplet, color: 'sheikah-blue' },
  { value: 'service', label: 'Service Center', icon: Building2, color: 'shrine-teal' },
  { value: 'custom', label: 'Custom Task', icon: Calendar, color: 'spirit-yellow' },
] as const;

export default function EventModal({ isOpen, onClose, date, onSave, existingEvent }: EventModalProps) {
  const [type, setType] = useState<'maintenance' | 'cleaning' | 'service' | 'custom'>(
    existingEvent?.type || 'maintenance'
  );
  const [title, setTitle] = useState(existingEvent?.title || '');
  const [description, setDescription] = useState(existingEvent?.description || '');

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
    onClose();
  };

  const selectedEventType = eventTypes.find(et => et.value === type)!;
  const Icon = selectedEventType.icon;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-stone border-2 border-sheikah-blue rounded-lg max-w-md w-full p-6 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-sheikah-blue sheikah-glow">
            {existingEvent ? 'Edit Event' : 'New Event'}
          </h2>
          <button
            onClick={onClose}
            className="text-aged-paper hover:text-sheikah-blue transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Date Display */}
        <div className="mb-6 p-3 bg-slate-blue/20 border border-ancient-gold/30 rounded">
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
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-blue/30 hover:bg-slate-blue/50 text-aged-paper rounded-lg transition-all border border-aged-paper/20"
            >
              Cancel
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
              <Icon size={20} />
              {existingEvent ? 'Update' : 'Save Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

