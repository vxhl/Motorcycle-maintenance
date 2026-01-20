'use client';

import { useState } from 'react';
import { X, Map } from 'lucide-react';

interface OdometerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOdometer: number;
  onSave: (kilometers: number, notes: string) => void;
}

export default function OdometerModal({ isOpen, onClose, currentOdometer, onSave }: OdometerModalProps) {
  const [kilometers, setKilometers] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const km = parseFloat(kilometers);
    if (km > 0) {
      onSave(km, notes);
      setKilometers('');
      setNotes('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-dark-stone border-2 border-sheikah-blue rounded-lg max-w-md w-full p-6 shadow-2xl my-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-sheikah-blue sheikah-glow flex items-center gap-2">
            <Map size={24} />
            Update Odometer
          </h2>
          <button
            onClick={onClose}
            className="text-aged-paper hover:text-sheikah-blue transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Current Reading */}
        <div className="mb-4 p-3 bg-slate-blue/20 border border-ancient-gold/30 rounded">
          <p className="text-aged-paper text-sm">
            <span className="text-ancient-gold font-semibold">Current Reading:</span>{' '}
            <span className="text-sheikah-blue font-bold text-lg">{currentOdometer.toFixed(1)} km</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-aged-paper font-semibold mb-2">
              Distance Traveled (km) *
            </label>
            <input
              type="number"
              step="0.1"
              value={kilometers}
              onChange={(e) => setKilometers(e.target.value)}
              placeholder="e.g., 25.5"
              className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors"
              required
              autoFocus
            />
            {kilometers && parseFloat(kilometers) > 0 && (
              <p className="text-sm text-sheikah-blue mt-2">
                New reading: {(currentOdometer + parseFloat(kilometers)).toFixed(1)} km
              </p>
            )}
          </div>

          <div>
            <label className="block text-aged-paper font-semibold mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Where did you travel? (optional)"
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
              disabled={!kilometers || parseFloat(kilometers) <= 0}
              className={`flex-1 px-4 py-3 rounded-lg transition-all border-2 flex items-center justify-center gap-2 ${
                kilometers && parseFloat(kilometers) > 0
                  ? 'bg-sheikah-blue/20 border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone sheikah-glow font-bold'
                  : 'bg-slate-blue/10 border-slate-blue/30 text-aged-paper/30 cursor-not-allowed'
              }`}
            >
              <Map size={20} />
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
