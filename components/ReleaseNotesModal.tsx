'use client';

import { X, Sparkles, Calendar, Fuel, Settings, Bell, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReleaseNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReleaseNotesModal({ isOpen, onClose }: ReleaseNotesModalProps) {
  if (!isOpen) return null;

  const features = [
    {
      icon: Settings,
      title: 'Bike Settings',
      description: 'Customize your bike details - model, year, purchase date, and starting odometer. No more hardcoded values!',
      color: 'sheikah-blue',
    },
    {
      icon: Fuel,
      title: 'Fuel Logging',
      description: 'Track your fuel expenses, monitor efficiency (km/L), and analyze fuel price trends over time.',
      color: 'ancient-gold',
    },
    {
      icon: Map,
      title: 'Trip Logger',
      description: 'Log long rides separately! Track trip start/end dates, distances, and locations visited.',
      color: 'shrine-teal',
    },
    {
      icon: Calendar,
      title: 'Auto Calendar Events',
      description: 'System checks and maintenance tasks now auto-schedule to your calendar with color-coded icons!',
      color: 'spirit-yellow',
    },
    {
      icon: Bell,
      title: 'Push Notifications',
      description: 'Get reminded about overdue tasks, upcoming events, and achievement unlocks. Never miss maintenance!',
      color: 'health-red',
    },
    {
      icon: Sparkles,
      title: 'Weird Achievements',
      description: '8 new fun achievements added - Night Rider, Chain Obsessed, Speed Demon, Birthday Ride, and more!',
      color: 'stamina-green',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-dark-stone to-slate-blue border-2 border-sheikah-blue rounded-xl max-w-2xl w-full shadow-2xl shadow-sheikah-blue/20 my-8"
        >
          {/* Header */}
          <div className="relative p-6 pb-4 border-b border-sheikah-blue/30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-sheikah-blue/10 via-ancient-gold/10 to-shrine-teal/10 opacity-50"></div>
            <div className="relative">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sheikah-blue/20 rounded-lg border border-sheikah-blue">
                    <Sparkles className="text-sheikah-blue" size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-sheikah-blue sheikah-glow">
                      ✨ What's New!
                    </h2>
                    <p className="text-sm text-ancient-gold font-semibold">
                      Version 2.0 - Major Update
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-aged-paper hover:text-sheikah-blue transition-colors p-2 hover:bg-sheikah-blue/20 rounded-lg"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-aged-paper/80 text-sm">
                🏍️ Your Master Cycle Tracker just got a major upgrade!
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className={`bg-slate-blue/30 rounded-lg p-4 border-2 border-${feature.color}/50 hover:border-${feature.color} transition-all hover:bg-slate-blue/50`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 bg-${feature.color}/20 rounded-lg border border-${feature.color}/50 flex-shrink-0`}>
                        <Icon className={`text-${feature.color}`} size={20} />
                      </div>
                      <div>
                        <h3 className={`font-bold text-${feature.color} mb-1`}>
                          {feature.title}
                        </h3>
                        <p className="text-sm text-aged-paper/70 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-ancient-gold/10 border border-ancient-gold/30 rounded-lg"
            >
              <p className="text-sm text-aged-paper/80 mb-2">
                <span className="font-bold text-ancient-gold">🎯 Quick Start:</span>
              </p>
              <ul className="text-xs text-aged-paper/70 space-y-1 ml-4">
                <li>• Go to <span className="text-sheikah-blue font-semibold">Settings</span> to configure your bike details</li>
                <li>• Visit <span className="text-ancient-gold font-semibold">Fuel</span> to start logging fill-ups</li>
                <li>• Check <span className="text-shrine-teal font-semibold">Calendar</span> for scheduled maintenance</li>
                <li>• Allow notifications to never miss important tasks</li>
              </ul>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-4 border-t border-sheikah-blue/30 bg-deep-blue/50">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <p className="text-xs text-aged-paper/60 text-center sm:text-left">
                Thanks for using Master Cycle Tracker! 🏍️
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-sheikah-blue/20 border-2 border-sheikah-blue text-sheikah-blue hover:bg-sheikah-blue hover:text-dark-stone rounded-lg transition-all font-bold sheikah-glow w-full sm:w-auto"
              >
                Got it, Let's Ride! 🚀
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
