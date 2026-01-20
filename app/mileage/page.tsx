'use client';

import { useApp } from '@/contexts/AppContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Plus, Calendar, Map } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import OdometerModal from '@/components/OdometerModal';

export default function MileagePage() {
  const { data, addMileageEntry, addTripEntry, updateTripEntry, deleteTripEntry } = useApp();
  const [showOdometerModal, setShowOdometerModal] = useState(false);
  const [showTripForm, setShowTripForm] = useState(false);
  
  // Trip form states
  const [tripName, setTripName] = useState('');
  const [tripNotes, setTripNotes] = useState('');
  const [tripLocations, setTripLocations] = useState('');
  const [editingTrip, setEditingTrip] = useState<string | null>(null);

  const handleOdometerUpdate = (kilometers: number, notes: string) => {
    addMileageEntry(kilometers, notes);
  };

  const handleTripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tripName.trim()) return;

    const locations = tripLocations.split(',').map(l => l.trim()).filter(l => l);
    
    if (editingTrip) {
      // End existing trip
      const trip = data.tripEntries.find(t => t.id === editingTrip);
      if (trip) {
        updateTripEntry({
          ...trip,
          endDate: new Date(),
          endOdometer: data.totalKilometers,
          distance: data.totalKilometers - trip.startOdometer,
        });
      }
      setEditingTrip(null);
    } else {
      // Start new trip
      addTripEntry({
        name: tripName,
        startDate: new Date(),
        endDate: null,
        startOdometer: data.totalKilometers,
        endOdometer: null,
        distance: 0,
        notes: tripNotes,
        locations,
      });
    }

    setTripName('');
    setTripNotes('');
    setTripLocations('');
    setShowTripForm(false);
  };

  const ongoingTrip = data.tripEntries.find(t => t.endDate === null);
  const completedTrips = data.tripEntries.filter(t => t.endDate !== null);

  // Calculate days since purchase
  const purchaseDate = new Date(data.bikePurchaseDate);
  const today = new Date();
  const daysSincePurchase = Math.floor((today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));

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
      {/* Odometer Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-blue to-deep-blue rounded-xl p-8 border-2 border-sheikah-blue shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-sheikah-blue opacity-5 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-sheikah-blue sheikah-glow mb-2 flex items-center gap-2">
                <Map size={28} />
                Journey
              </h2>
              <p className="text-aged-paper/80">
                Your adventure since {purchaseDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <button
              onClick={() => setShowOdometerModal(true)}
              className="px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-lg bg-sheikah-blue/20 border-2 border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone font-bold transition-all flex items-center gap-1 md:gap-2 sheikah-glow"
            >
              <Plus size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Update</span> Odometer
            </button>
          </div>
          
          {/* Big Odometer Display */}
          <div className="text-center py-8">
            <p className="text-6xl md:text-8xl font-bold text-sheikah-blue sheikah-glow mb-4">
              {data.totalKilometers.toLocaleString()}
            </p>
            <p className="text-3xl text-ancient-gold font-bold">kilometers</p>
            <p className="text-aged-paper/60 mt-4">
              {daysSincePurchase} days on the road
            </p>
          </div>
        </div>
      </motion.div>

      {/* Ongoing Trip Display */}
      {ongoingTrip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-spirit-yellow/20 to-ancient-gold/20 rounded-xl p-6 border-2 border-spirit-yellow shadow-xl"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-spirit-yellow mb-2">🚀 Trip in Progress</h3>
              <p className="text-3xl font-bold text-sheikah-blue mb-2">{ongoingTrip.name}</p>
              <p className="text-aged-paper/80 mb-2">
                Started: {new Date(ongoingTrip.startDate).toLocaleDateString()}
              </p>
              <p className="text-aged-paper/80 mb-2">
                Start Odometer: {ongoingTrip.startOdometer.toFixed(1)} km
              </p>
              <p className="text-2xl font-bold text-ancient-gold">
                Distance so far: {(data.totalKilometers - ongoingTrip.startOdometer).toFixed(1)} km
              </p>
            </div>
            <button
              onClick={() => {
                setEditingTrip(ongoingTrip.id);
                setTripName(ongoingTrip.name);
                setShowTripForm(true);
              }}
              className="px-3 py-2 text-sm md:text-base rounded-lg bg-stamina-green/20 border-2 border-stamina-green text-stamina-green hover:bg-stamina-green hover:text-dark-stone font-bold transition-all"
            >
              End Trip
            </button>
          </div>
        </motion.div>
      )}

      {/* Trip Logger Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-blue/50 rounded-xl p-6 border-2 border-ancient-gold shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-ancient-gold ancient-glow">Long Ride Logger</h3>
          {!ongoingTrip && (
            <button
              onClick={() => setShowTripForm(!showTripForm)}
              className="px-3 py-2 text-sm md:text-base rounded-lg bg-ancient-gold/20 border-2 border-ancient-gold text-ancient-gold hover:bg-ancient-gold hover:text-dark-stone font-bold transition-all flex items-center gap-1 md:gap-2"
            >
              <Plus size={16} className="md:w-5 md:h-5" />
              Start Trip
            </button>
          )}
        </div>
        
        <p className="text-aged-paper/70 text-sm mb-4">
          Track your long rides and epic journeys separately from daily commutes
        </p>

        {/* Trip Form */}
        {showTripForm && (
          <form onSubmit={handleTripSubmit} className="mb-4 p-4 bg-dark-stone/50 rounded-lg border border-ancient-gold/30">
            <h4 className="text-lg font-bold text-sheikah-blue mb-3">
              {editingTrip ? 'End Trip' : 'Start New Trip'}
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-aged-paper font-semibold mb-2">Trip Name *</label>
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  placeholder="e.g., Weekend Goa Trip"
                  className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none"
                  required
                  disabled={!!editingTrip}
                />
              </div>
              {!editingTrip && (
                <>
                  <div>
                    <label className="block text-aged-paper font-semibold mb-2">Locations (comma-separated)</label>
                    <input
                      type="text"
                      value={tripLocations}
                      onChange={(e) => setTripLocations(e.target.value)}
                      placeholder="e.g., Mumbai, Pune, Goa"
                      className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-aged-paper font-semibold mb-2">Notes</label>
                    <textarea
                      value={tripNotes}
                      onChange={(e) => setTripNotes(e.target.value)}
                      placeholder="Trip details, route, companions, etc."
                      rows={3}
                      className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none resize-none"
                    />
                  </div>
                </>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowTripForm(false);
                    setEditingTrip(null);
                    setTripName('');
                    setTripNotes('');
                    setTripLocations('');
                  }}
                  className="flex-1 px-4 py-2 bg-slate-blue/30 hover:bg-slate-blue/50 text-aged-paper rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-ancient-gold/20 border-2 border-ancient-gold text-ancient-gold hover:bg-ancient-gold hover:text-dark-stone rounded-lg transition-all font-bold"
                >
                  {editingTrip ? 'End Trip' : 'Start Trip'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Completed Trips */}
        {completedTrips.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-shrine-teal">Completed Trips</h4>
            {completedTrips.slice(0, 5).map((trip) => (
              <div
                key={trip.id}
                className="p-4 rounded-lg bg-slate-blue/20 border border-shrine-teal/30 hover:border-shrine-teal/60 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xl font-bold text-sheikah-blue">{trip.name}</p>
                    <p className="text-sm text-aged-paper/70">
                      {new Date(trip.startDate).toLocaleDateString()} - {trip.endDate && new Date(trip.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-ancient-gold">{trip.distance.toFixed(1)} km</p>
                </div>
                {trip.locations.length > 0 && (
                  <p className="text-sm text-shrine-teal">📍 {trip.locations.join(' → ')}</p>
                )}
                {trip.notes && (
                  <p className="text-sm text-aged-paper/60 mt-2 italic">{trip.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-shrine-teal/40 to-ancient-gold/20 rounded-lg p-6 border-2 border-ancient-gold"
        >
          <Calendar className="text-ancient-gold mb-2" size={24} />
          <p className="text-sm text-aged-paper/70 mb-1">Daily Updates</p>
          <p className="text-3xl font-bold text-ancient-gold">
            {data.mileageEntries.length}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-spirit-yellow/40 to-shrine-teal/20 rounded-lg p-6 border-2 border-spirit-yellow"
        >
          <Map className="text-spirit-yellow mb-2" size={24} />
          <p className="text-sm text-aged-paper/70 mb-1">Long Trips</p>
          <p className="text-3xl font-bold text-spirit-yellow">
            {completedTrips.length}
          </p>
        </motion.div>
      </div>

      {/* Odometer Update Modal */}
      <OdometerModal
        isOpen={showOdometerModal}
        onClose={() => setShowOdometerModal(false)}
        currentOdometer={data.totalKilometers}
        onSave={handleOdometerUpdate}
      />

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
        <h3 className="text-xl font-bold text-spirit-yellow mb-4">Odometer Milestones</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { target: 1000, label: 'First 1K', emoji: '🏁' },
            { target: 5000, label: 'Road Warrior', emoji: '👑' },
            { target: 10000, label: 'Ten Thousand', emoji: '⚔️' },
            { target: 25000, label: 'Master Rider', emoji: '🌟' },
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
                <p className="text-sm text-aged-paper/70 mb-2">{milestone.target.toLocaleString()} km</p>
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
