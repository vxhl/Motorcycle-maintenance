'use client';

import { useState } from 'react';
import { X, Fuel } from 'lucide-react';

interface FuelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOdometer: number;
  onSave: (entry: {
    liters: number;
    pricePerLiter: number;
    totalCost: number;
    odometer: number;
    fuelType: 'petrol' | 'premium' | 'diesel';
    fullTank: boolean;
    notes: string;
  }) => void;
}

export default function FuelModal({ isOpen, onClose, currentOdometer, onSave }: FuelModalProps) {
  const [liters, setLiters] = useState('');
  const [pricePerLiter, setPricePerLiter] = useState('');
  const [odometer, setOdometer] = useState(currentOdometer.toString());
  const [fuelType, setFuelType] = useState<'petrol' | 'premium' | 'diesel'>('petrol');
  const [fullTank, setFullTank] = useState(true);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const litersNum = parseFloat(liters);
    const priceNum = parseFloat(pricePerLiter);
    const odometerNum = parseFloat(odometer);

    if (litersNum > 0 && priceNum > 0 && odometerNum > 0) {
      onSave({
        liters: litersNum,
        pricePerLiter: priceNum,
        totalCost: litersNum * priceNum,
        odometer: odometerNum,
        fuelType,
        fullTank,
        notes,
      });

      setLiters('');
      setPricePerLiter('');
      setNotes('');
      onClose();
    }
  };

  const totalCost = liters && pricePerLiter ? (parseFloat(liters) * parseFloat(pricePerLiter)).toFixed(2) : '0.00';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-dark-stone border-2 border-sheikah-blue rounded-lg max-w-md w-full p-6 shadow-2xl my-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-sheikah-blue sheikah-glow flex items-center gap-2">
            <Fuel size={24} />
            Add Fill-up
          </h2>
          <button
            onClick={onClose}
            className="text-aged-paper hover:text-sheikah-blue transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Total Cost Preview */}
        {liters && pricePerLiter && (
          <div className="mb-4 p-3 bg-gradient-to-r from-ancient-gold/20 to-spirit-yellow/20 border border-ancient-gold/50 rounded">
            <p className="text-aged-paper text-sm">
              <span className="text-ancient-gold font-semibold">Total Cost:</span>{' '}
              <span className="text-sheikah-blue font-bold text-2xl">₹{totalCost}</span>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-aged-paper font-semibold mb-2 text-sm">
                Liters *
              </label>
              <input
                type="number"
                step="0.01"
                value={liters}
                onChange={(e) => setLiters(e.target.value)}
                placeholder="12.5"
                className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-aged-paper font-semibold mb-2 text-sm">
                Price/L (₹) *
              </label>
              <input
                type="number"
                step="0.01"
                value={pricePerLiter}
                onChange={(e) => setPricePerLiter(e.target.value)}
                placeholder="105.50"
                className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-aged-paper font-semibold mb-2 text-sm">
              Odometer (km) *
            </label>
            <input
              type="number"
              step="0.1"
              value={odometer}
              onChange={(e) => setOdometer(e.target.value)}
              placeholder="Current km"
              className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-aged-paper font-semibold mb-2 text-sm">
              Fuel Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['petrol', 'premium', 'diesel'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFuelType(type)}
                  className={`py-2 px-3 rounded-lg transition-all border-2 capitalize text-sm ${
                    fuelType === type
                      ? 'bg-sheikah-blue/20 border-sheikah-blue text-sheikah-blue font-bold'
                      : 'bg-slate-blue/10 border-slate-blue/30 text-aged-paper hover:border-aged-paper/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-blue/20 rounded-lg">
            <input
              type="checkbox"
              id="fullTank"
              checked={fullTank}
              onChange={(e) => setFullTank(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-sheikah-blue bg-slate-blue/20 cursor-pointer"
            />
            <label htmlFor="fullTank" className="text-aged-paper font-semibold cursor-pointer text-sm flex-1">
              Full Tank <span className="text-aged-paper/60 text-xs">(for efficiency calc)</span>
            </label>
          </div>

          <div>
            <label className="block text-aged-paper font-semibold mb-2 text-sm">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Station, location, etc. (optional)"
              rows={2}
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
              disabled={!liters || !pricePerLiter || !odometer}
              className={`flex-1 px-4 py-3 rounded-lg transition-all border-2 flex items-center justify-center gap-2 ${
                liters && pricePerLiter && odometer
                  ? 'bg-sheikah-blue/20 border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone sheikah-glow font-bold'
                  : 'bg-slate-blue/10 border-slate-blue/30 text-aged-paper/30 cursor-not-allowed'
              }`}
            >
              <Fuel size={20} />
              Add Fill-up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
