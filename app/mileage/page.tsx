'use client';

import { useApp } from '@/contexts/AppContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Plus, Calendar, Map } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MileagePage() {
  const { data, addMileageEntry } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [kilometers, setKilometers] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const km = parseFloat(kilometers);
    if (km > 0) {
      addMileageEntry(km, notes);
      setKilometers('');
      setNotes('');
      setShowForm(false);
    }
  };

  // Prepare chart data
  const chartData = data.mileageEntries
    .slice()
    .reverse()
    .slice(-10)
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      km: entry.kilometers,
      total: entry.totalKilometers,
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
            <h2 className="text-2xl font-bold text-sheikah-blue sheikah-glow mb-2 flex items-center gap-2">
              <Map size={28} />
              Journey Tracker
            </h2>
            <p className="text-aged-paper/80">
              Log your daily adventures and track your travels across Hyrule
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 rounded-lg bg-sheikah-blue/20 border-2 border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone font-bold transition-all flex items-center gap-2 sheikah-glow"
          >
            <Plus size={20} />
            Log Journey
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-slate-blue/40 to-sheikah-blue/20 rounded-lg p-6 border-2 border-sheikah-blue"
        >
          <TrendingUp className="text-sheikah-blue mb-2" size={24} />
          <p className="text-sm text-aged-paper/70 mb-1">Total Distance</p>
          <p className="text-3xl font-bold text-sheikah-blue">
            {data.totalKilometers.toFixed(1)} <span className="text-lg">km</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-shrine-teal/40 to-ancient-gold/20 rounded-lg p-6 border-2 border-ancient-gold"
        >
          <Calendar className="text-ancient-gold mb-2" size={24} />
          <p className="text-sm text-aged-paper/70 mb-1">Total Journeys</p>
          <p className="text-3xl font-bold text-ancient-gold">
            {data.mileageEntries.length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-spirit-yellow/40 to-shrine-teal/20 rounded-lg p-6 border-2 border-spirit-yellow col-span-2 md:col-span-1"
        >
          <Map className="text-spirit-yellow mb-2" size={24} />
          <p className="text-sm text-aged-paper/70 mb-1">Avg Per Journey</p>
          <p className="text-3xl font-bold text-spirit-yellow">
            {data.mileageEntries.length > 0
              ? (data.totalKilometers / data.mileageEntries.length).toFixed(1)
              : '0.0'}{' '}
            <span className="text-lg">km</span>
          </p>
        </motion.div>
      </div>

      {/* Add Entry Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-dark-stone rounded-lg p-6 border-2 border-sheikah-blue"
        >
          <h3 className="text-xl font-bold text-sheikah-blue mb-4">Record New Journey</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-aged-paper font-semibold mb-2">
                Distance (km) *
              </label>
              <input
                type="number"
                step="0.1"
                value={kilometers}
                onChange={(e) => setKilometers(e.target.value)}
                placeholder="e.g., 25.5"
                className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-aged-paper font-semibold mb-2">
                Journey Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Where did you travel today? (optional)"
                rows={3}
                className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-3 bg-slate-blue/30 hover:bg-slate-blue/50 text-aged-paper rounded-lg transition-all border border-aged-paper/20"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-sheikah-blue/20 border-2 border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone rounded-lg transition-all font-bold sheikah-glow"
              >
                Log Journey
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Chart */}
      {chartData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-stone rounded-lg p-6 border-2 border-ancient-gold"
        >
          <h3 className="text-xl font-bold text-ancient-gold mb-4 ancient-glow">
            Adventure Progress
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
                dataKey="total"
                stroke="#4dd0e1"
                strokeWidth={3}
                dot={{ fill: '#4dd0e1', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Recent Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-dark-stone rounded-lg p-6 border-2 border-shrine-teal"
      >
        <h3 className="text-xl font-bold text-shrine-teal mb-4">Recent Journeys</h3>
        {data.mileageEntries.length === 0 ? (
          <p className="text-aged-paper/60 text-center py-8">
            No journeys recorded yet. Start your adventure!
          </p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {data.mileageEntries.slice(0, 10).map((entry) => (
              <div
                key={entry.id}
                className="bg-slate-blue/20 rounded-lg p-4 border border-slate-blue/50 hover:border-shrine-teal/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-ancient-gold" size={20} />
                    <div>
                      <p className="font-semibold text-sheikah-blue">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-aged-paper/70">
                        {new Date(entry.date).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-ancient-gold">
                      {entry.kilometers.toFixed(1)} km
                    </p>
                    <p className="text-xs text-aged-paper/60">
                      Total: {entry.totalKilometers.toFixed(1)} km
                    </p>
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-aged-paper/80 text-sm mt-2 pl-8 italic border-l-2 border-spirit-yellow/30">
                    {entry.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-spirit-yellow/20 to-ancient-gold/20 rounded-lg p-6 border-2 border-spirit-yellow"
      >
        <h3 className="text-xl font-bold text-spirit-yellow mb-4">Journey Milestones</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { target: 100, label: 'First Century', emoji: '🏁' },
            { target: 500, label: 'Explorer', emoji: '🗺️' },
            { target: 1000, label: 'Adventurer', emoji: '⚔️' },
            { target: 5000, label: 'Road Warrior', emoji: '👑' },
          ].map((milestone) => {
            const progress = (data.totalKilometers / milestone.target) * 100;
            const achieved = data.totalKilometers >= milestone.target;
            return (
              <div
                key={milestone.target}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achieved
                    ? 'bg-stamina-green/20 border-stamina-green'
                    : 'bg-slate-blue/20 border-slate-blue/50'
                }`}
              >
                <div className="text-3xl mb-2">{milestone.emoji}</div>
                <p className="font-bold text-aged-paper">{milestone.label}</p>
                <p className="text-sm text-aged-paper/70 mb-2">{milestone.target} km</p>
                <div className="w-full bg-slate-blue/30 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      achieved ? 'bg-stamina-green' : 'bg-spirit-yellow'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-aged-paper/60 mt-1">
                  {achieved ? '✓ Achieved!' : `${progress.toFixed(1)}%`}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
