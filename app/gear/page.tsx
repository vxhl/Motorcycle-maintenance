'use client';

import { useApp } from '@/contexts/AppContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Trash2, Check, Shield } from 'lucide-react';
import { RidingGear } from '@/types';

export default function GearPage() {
  const { data, addRidingGear, updateRidingGear, deleteRidingGear } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'helmet' as RidingGear['category'],
    priority: 'medium' as RidingGear['priority'],
    price: 0,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRidingGear({
      ...formData,
      owned: false,
      targetDate: null,
    });
    setFormData({
      name: '',
      category: 'helmet',
      priority: 'medium',
      price: 0,
      notes: '',
    });
    setShowForm(false);
  };

  const toggleOwned = (gear: RidingGear) => {
    updateRidingGear({ ...gear, owned: !gear.owned });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-health-red text-health-red';
      case 'medium':
        return 'border-spirit-yellow text-spirit-yellow';
      case 'low':
        return 'border-stamina-green text-stamina-green';
      default:
        return 'border-slate-blue text-aged-paper';
    }
  };

  const ownedGear = data.ridingGear.filter(g => g.owned);
  const wishlistGear = data.ridingGear.filter(g => !g.owned);

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
              <Shield size={28} />
              Champion's Inventory
            </h2>
            <p className="text-aged-paper/80">
              Manage your riding gear and plan future acquisitions
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 rounded-lg bg-sheikah-blue/20 border-2 border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone font-bold transition-all flex items-center gap-2 sheikah-glow"
          >
            <Plus size={20} />
            Add Item
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-slate-blue/40 to-sheikah-blue/20 rounded-lg p-6 border-2 border-sheikah-blue"
        >
          <Package className="text-sheikah-blue mb-2" size={24} />
          <p className="text-sm text-aged-paper/70 mb-1">Total Items</p>
          <p className="text-3xl font-bold text-sheikah-blue">{data.ridingGear.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-stamina-green/40 to-shrine-teal/20 rounded-lg p-6 border-2 border-stamina-green"
        >
          <Check className="text-stamina-green mb-2" size={24} />
          <p className="text-sm text-aged-paper/70 mb-1">Acquired</p>
          <p className="text-3xl font-bold text-stamina-green">{ownedGear.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-ancient-gold/40 to-spirit-yellow/20 rounded-lg p-6 border-2 border-ancient-gold col-span-2 md:col-span-1"
        >
          <Package className="text-ancient-gold mb-2" size={24} />
          <p className="text-sm text-aged-paper/70 mb-1">Needed</p>
          <p className="text-3xl font-bold text-ancient-gold">{wishlistGear.length}</p>
        </motion.div>
      </div>

      {/* Add Gear Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-dark-stone rounded-lg p-6 border-2 border-sheikah-blue"
        >
          <h3 className="text-xl font-bold text-sheikah-blue mb-4">Add New Gear</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-aged-paper font-semibold mb-2">Item Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors"
                  placeholder="e.g., AGV K6 Helmet"
                  required
                />
              </div>
              <div>
                <label className="block text-aged-paper font-semibold mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as RidingGear['category'] })}
                  className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper focus:border-sheikah-blue focus:outline-none transition-colors"
                >
                  <option value="helmet">Helmet</option>
                  <option value="jacket">Jacket</option>
                  <option value="gloves">Gloves</option>
                  <option value="boots">Boots</option>
                  <option value="pants">Pants</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-aged-paper font-semibold mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as RidingGear['priority'] })}
                  className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper focus:border-sheikah-blue focus:outline-none transition-colors"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-aged-paper font-semibold mb-2">Estimated Rupees</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-aged-paper font-semibold mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3 bg-slate-blue/20 border-2 border-sheikah-blue/30 rounded-lg text-aged-paper placeholder-aged-paper/40 focus:border-sheikah-blue focus:outline-none transition-colors resize-none"
                placeholder="Add notes about this gear"
                rows={3}
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
                Add to Inventory
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Owned Gear */}
      {ownedGear.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-stamina-green mb-4 flex items-center gap-2">
            <Check size={24} />
            Acquired Gear
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {ownedGear.map((gear, index) => (
              <motion.div
                key={gear.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-stamina-green/20 to-shrine-teal/20 rounded-lg p-6 border-2 border-stamina-green"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-sheikah-blue">{gear.name}</h4>
                    <p className="text-sm text-aged-paper/70 capitalize">{gear.category}</p>
                  </div>
                  <button
                    onClick={() => deleteRidingGear(gear.id)}
                    className="text-health-red hover:text-health-red/80 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                {gear.notes && (
                  <p className="text-sm text-aged-paper/80 mb-3 italic border-l-2 border-stamina-green/30 pl-3">{gear.notes}</p>
                )}
                <div className="flex justify-between items-center">
                  {gear.price > 0 && (
                    <span className="text-ancient-gold font-bold">{gear.price} Rupees</span>
                  )}
                  <button
                    onClick={() => toggleOwned(gear)}
                    className="px-4 py-2 rounded-lg bg-stamina-green/20 border border-stamina-green text-stamina-green hover:bg-stamina-green/30 transition font-semibold"
                  >
                    ✓ Acquired
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Wishlist */}
      {wishlistGear.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-ancient-gold mb-4 flex items-center gap-2 ancient-glow">
            <Package size={24} />
            Needed Gear
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {wishlistGear.map((gear, index) => {
              const priorityColor = getPriorityColor(gear.priority);
              return (
                <motion.div
                  key={gear.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-slate-blue/20 rounded-lg p-6 border-2 ${priorityColor}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-sheikah-blue">{gear.name}</h4>
                      <p className="text-sm text-aged-paper/70 capitalize">{gear.category}</p>
                    </div>
                    <button
                      onClick={() => deleteRidingGear(gear.id)}
                      className="text-health-red hover:text-health-red/80 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  {gear.notes && (
                    <p className="text-sm text-aged-paper/80 mb-3 italic">{gear.notes}</p>
                  )}
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      {gear.price > 0 && (
                        <span className="text-ancient-gold font-bold">{gear.price} Rupees</span>
                      )}
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${priorityColor} bg-opacity-20 capitalize`}>
                        {gear.priority} Priority
                      </span>
                    </div>
                    <button
                      onClick={() => toggleOwned(gear)}
                      className="px-4 py-2 rounded-lg bg-sheikah-blue/20 border border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone transition font-semibold"
                    >
                      Mark Acquired
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {data.ridingGear.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-blue/20 rounded-lg p-12 border-2 border-slate-blue/50 text-center"
        >
          <Shield size={64} className="mx-auto mb-4 text-aged-paper/30" />
          <h3 className="text-xl font-bold text-aged-paper/70 mb-2">Your Inventory is Empty</h3>
          <p className="text-aged-paper/50 mb-6">
            Start adding riding gear to track what you own and what you need
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-lg bg-sheikah-blue/20 border-2 border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone font-bold transition-all inline-flex items-center gap-2"
          >
            <Plus size={20} />
            Add Your First Item
          </button>
        </motion.div>
      )}
    </div>
  );
}
