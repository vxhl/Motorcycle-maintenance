'use client';

import { useApp } from '@/contexts/AppContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Fuel, Plus, TrendingUp, DollarSign, Droplet, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FuelModal from '@/components/FuelModal';

export default function FuelPage() {
  const { data, addFuelEntry, deleteFuelEntry } = useApp();
  const [showFuelModal, setShowFuelModal] = useState(false);

  // Calculate stats
  const totalSpent = data.fuelEntries.reduce((sum, entry) => sum + entry.totalCost, 0);
  const totalLiters = data.fuelEntries.reduce((sum, entry) => sum + entry.liters, 0);
  const avgPricePerLiter = data.fuelEntries.length > 0
    ? totalSpent / totalLiters
    : 0;

  // Calculate fuel efficiency (if we have multiple full tank entries)
  const fullTankEntries = data.fuelEntries.filter(e => e.fullTank).slice().reverse();
  let avgFuelEfficiency = 0;
  if (fullTankEntries.length >= 2) {
    let totalEfficiency = 0;
    let count = 0;
    for (let i = 1; i < fullTankEntries.length; i++) {
      const distance = fullTankEntries[i].odometer - fullTankEntries[i - 1].odometer;
      const litersUsed = fullTankEntries[i - 1].liters;
      if (distance > 0 && litersUsed > 0) {
        totalEfficiency += distance / litersUsed;
        count++;
      }
    }
    avgFuelEfficiency = count > 0 ? totalEfficiency / count : 0;
  }

  // Prepare chart data
  const chartData = data.fuelEntries
    .slice()
    .reverse()
    .slice(-10)
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: entry.pricePerLiter,
      liters: entry.liters,
      cost: entry.totalCost,
    }));

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-blue to-deep-blue rounded-lg p-6 border-2 border-sheikah-blue shadow-xl"
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-sheikah-blue sheikah-glow mb-2">
              ⛽ Fuel Log
            </h2>
            <p className="text-aged-paper/80">
              Track your fuel expenses and monitor efficiency
            </p>
          </div>
          <button
            onClick={() => setShowFuelModal(true)}
            className="px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg bg-sheikah-blue/20 border-2 border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone font-bold transition-all flex items-center gap-1 md:gap-2 sheikah-glow"
          >
            <Plus size={18} className="md:w-5 md:h-5" />
            <span>Add Fill-up</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-blue/40 to-sheikah-blue/20 rounded-lg p-6 border-2 border-sheikah-blue"
        >
          <DollarSign className="text-sheikah-blue mb-2" size={24} />
          <p className="text-sm text-aged-paper/70 mb-1">Total Spent</p>
          <p className="text-3xl font-bold text-sheikah-blue">
            ₹{totalSpent.toFixed(0)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-shrine-teal/40 to-ancient-gold/20 rounded-lg p-6 border-2 border-ancient-gold"
        >
          <Droplet className="text-ancient-gold mb-2" size={24} />
          <p className="text-sm text-aged-paper/70 mb-1">Total Liters</p>
          <p className="text-3xl font-bold text-ancient-gold">
            {totalLiters.toFixed(1)} L
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-spirit-yellow/40 to-shrine-teal/20 rounded-lg p-6 border-2 border-spirit-yellow"
        >
          <TrendingUp className="text-spirit-yellow mb-2" size={24} />
          <p className="text-sm text-aged-paper/70 mb-1">Avg Price/L</p>
          <p className="text-3xl font-bold text-spirit-yellow">
            ₹{avgPricePerLiter.toFixed(2)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-stamina-green/40 to-shrine-teal/20 rounded-lg p-6 border-2 border-stamina-green"
        >
          <Fuel className="text-stamina-green mb-2" size={24} />
          <p className="text-sm text-aged-paper/70 mb-1">Avg Efficiency</p>
          <p className="text-3xl font-bold text-stamina-green">
            {avgFuelEfficiency > 0 ? `${avgFuelEfficiency.toFixed(1)} km/L` : 'N/A'}
          </p>
        </motion.div>
      </div>

      {/* Fuel Entry Modal */}
      <FuelModal
        isOpen={showFuelModal}
        onClose={() => setShowFuelModal(false)}
        currentOdometer={data.totalKilometers}
        onSave={(entry) => {
          addFuelEntry({
            ...entry,
            date: new Date(),
          });
        }}
      />

      {/* Chart */}
      {chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-stone rounded-lg p-6 border-2 border-ancient-gold"
        >
          <h3 className="text-xl font-bold text-ancient-gold mb-4 ancient-glow">
            Fuel Price Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a4a" />
              <XAxis
                dataKey="date"
                stroke="#e8dcc4"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#e8dcc4" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a24',
                  border: '2px solid #4dd0e1',
                  borderRadius: '8px',
                  color: '#e8dcc4',
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#f39c12"
                strokeWidth={3}
                dot={{ fill: '#f39c12', r: 4 }}
                activeDot={{ r: 6 }}
                name="Price/L"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Recent Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-dark-stone rounded-lg p-6 border-2 border-shrine-teal"
      >
        <h3 className="text-xl font-bold text-shrine-teal mb-4">Recent Fill-ups</h3>
        {data.fuelEntries.length === 0 ? (
          <p className="text-aged-paper/60 text-center py-8">
            No fuel entries yet. Add your first fill-up!
          </p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {data.fuelEntries.slice(0, 20).map((entry) => (
              <div
                key={entry.id}
                className="bg-slate-blue/20 rounded-lg p-4 border border-slate-blue/50 hover:border-shrine-teal/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <Fuel className="text-ancient-gold" size={24} />
                    <div>
                      <p className="font-semibold text-sheikah-blue">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-aged-paper/70 capitalize">
                        {entry.fuelType} • {entry.liters.toFixed(2)}L • ₹{entry.pricePerLiter.toFixed(2)}/L
                        {entry.fullTank && ' • 🔵 Full Tank'}
                      </p>
                      <p className="text-xs text-aged-paper/60">
                        Odometer: {entry.odometer.toFixed(1)} km
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-ancient-gold">
                      ₹{entry.totalCost.toFixed(0)}
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Delete this fuel entry?')) {
                          deleteFuelEntry(entry.id);
                        }
                      }}
                      className="text-health-red hover:text-health-red/80 transition-colors text-sm mt-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-aged-paper/80 text-sm mt-2 pl-9 italic border-l-2 border-spirit-yellow/30">
                    {entry.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
