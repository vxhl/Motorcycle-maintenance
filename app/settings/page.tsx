'use client';

import { useApp } from '@/contexts/AppContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Bike } from 'lucide-react';

export default function SettingsPage() {
  const { data, updateBikeInfo } = useApp();
  const [bikeModel, setBikeModel] = useState('');
  const [bikeYear, setBikeYear] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [startingOdometer, setStartingOdometer] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setBikeModel(data.bikeModel || '');
    setBikeYear(data.bikeYear?.toString() || '');
    
    // Format date for input field (YYYY-MM-DD)
    if (data.bikePurchaseDate) {
      const date = new Date(data.bikePurchaseDate);
      const formatted = date.toISOString().split('T')[0];
      setPurchaseDate(formatted);
    }
    
    // Starting odometer is the purchase odometer, which is totalKilometers minus all mileage entries
    const totalMileageLogged = data.mileageEntries.reduce((sum, entry) => sum + entry.kilometers, 0);
    const startingOdo = data.totalKilometers - totalMileageLogged;
    setStartingOdometer(startingOdo.toString());
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const yearNum = parseInt(bikeYear);
    const startOdo = parseFloat(startingOdometer);
    
    if (!bikeModel.trim() || !yearNum || !purchaseDate || startOdo < 0) {
      alert('Please fill in all fields correctly');
      return;
    }

    updateBikeInfo({
      bikeModel: bikeModel.trim(),
      bikeYear: yearNum,
      bikePurchaseDate: new Date(purchaseDate),
      startingOdometer: startOdo,
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-blue to-deep-blue rounded-xl p-6 border-2 border-sheikah-blue shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-sheikah-blue opacity-5 rounded-full blur-3xl"></div>
        <div className="relative">
          <h2 className="text-2xl font-bold text-sheikah-blue sheikah-glow mb-2 flex items-center gap-2">
            <Settings size={28} />
            ⚙️ Bike Settings
          </h2>
          <p className="text-aged-paper/80">
            Configure your Master Cycle details
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-blue/50 rounded-xl p-6 border-2 border-sheikah-blue shadow-lg"
      >
        <h3 className="text-xl font-bold text-sheikah-blue mb-4 flex items-center gap-2">
          <Bike size={20} />
          Motorcycle Information
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-aged-paper font-semibold mb-2">
              Bike Model/Name *
            </label>
            <input
              type="text"
              value={bikeModel}
              onChange={(e) => setBikeModel(e.target.value)}
              placeholder="e.g., Royal Enfield Classic 350"
              className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-aged-paper font-semibold mb-2">
              Year of Manufacture *
            </label>
            <input
              type="number"
              value={bikeYear}
              onChange={(e) => setBikeYear(e.target.value)}
              placeholder="e.g., 2024"
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-aged-paper font-semibold mb-2">
              Purchase Date *
            </label>
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors"
              required
            />
            <p className="text-sm text-aged-paper/60 mt-1">
              The date you purchased or started using this bike
            </p>
          </div>

          <div>
            <label className="block text-aged-paper font-semibold mb-2">
              Starting Odometer Reading (km) *
            </label>
            <input
              type="number"
              step="0.1"
              value={startingOdometer}
              onChange={(e) => setStartingOdometer(e.target.value)}
              placeholder="e.g., 5011"
              min="0"
              className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors"
              required
            />
            <p className="text-sm text-aged-paper/60 mt-1">
              The odometer reading when you bought the bike (or started tracking)
            </p>
          </div>

          <div className="bg-ancient-gold/10 border border-ancient-gold/30 rounded-lg p-4">
            <p className="text-sm text-ancient-gold font-semibold mb-1">💡 Important Note:</p>
            <p className="text-xs text-aged-paper/70">
              Changing the starting odometer will affect your total journey calculation. 
              Your current total: <span className="font-bold text-sheikah-blue">{data.totalKilometers.toFixed(1)} km</span>
            </p>
          </div>

          {isSaved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-stamina-green/20 border border-stamina-green rounded-lg p-3 text-center"
            >
              <p className="text-stamina-green font-bold">✓ Settings saved successfully!</p>
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 rounded-lg bg-sheikah-blue/20 border-2 border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone font-bold transition-all flex items-center justify-center gap-2 sheikah-glow"
          >
            <Save size={20} />
            Save Bike Information
          </button>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-spirit-yellow/10 border-2 border-spirit-yellow rounded-xl p-4"
      >
        <h4 className="text-lg font-bold text-spirit-yellow mb-2">📊 Current Stats</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-aged-paper/60">Bike Model</p>
            <p className="text-aged-paper font-bold">{data.bikeModel}</p>
          </div>
          <div>
            <p className="text-aged-paper/60">Year</p>
            <p className="text-aged-paper font-bold">{data.bikeYear}</p>
          </div>
          <div>
            <p className="text-aged-paper/60">Purchase Date</p>
            <p className="text-aged-paper font-bold">
              {new Date(data.bikePurchaseDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-aged-paper/60">Days Owned</p>
            <p className="text-aged-paper font-bold">
              {Math.floor((new Date().getTime() - new Date(data.bikePurchaseDate).getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
