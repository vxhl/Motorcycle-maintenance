'use client';

import { useApp } from '@/contexts/AppContext';
import { Calendar, Wrench, TrendingUp, Trophy, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HomePage() {
  const { data } = useApp();

  const overdueTasks = data.maintenanceTasks.filter(task => {
    if (!task.nextDue) return false;
    return new Date(task.nextDue) < new Date();
  });

  const criticalComponents = data.componentChecks.filter(c => c.status === 'critical');
  const recentMileage = data.mileageEntries.slice(0, 3);
  const recentAchievements = data.achievements
    .filter(a => a.unlocked)
    .sort((a, b) => {
      if (!a.unlockedAt || !b.unlockedAt) return 0;
      return b.unlockedAt.getTime() - a.unlockedAt.getTime();
    })
    .slice(0, 3);

  // Get upcoming scheduled events (next 7 days)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const upcomingEvents = [...data.calendarEvents]
    .filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today && eventDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero Section */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-slate-blue to-deep-blue rounded-xl p-6 border-2 border-sheikah-blue shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-sheikah-blue opacity-5 rounded-full blur-3xl"></div>
        <div className="flex items-center gap-3 mb-2">
          <Image 
            src="/tripower.png" 
            alt="Triforce" 
            width={32} 
            height={32}
            className="drop-shadow-[0_0_10px_rgba(243,156,18,0.6)]"
          />
          <h2 className="text-2xl font-bold text-sheikah-blue sheikah-glow relative">
            Welcome, Champion
          </h2>
        </div>
        <p className="text-aged-paper relative">
          Your Master Cycle awaits - track upgrades and complete your journey
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          variants={itemVariants}
          className="bg-slate-blue/50 rounded-xl p-4 border-2 border-sheikah-blue shadow-lg hover:shadow-sheikah-blue/20 transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={20} className="text-sheikah-blue" />
            <span className="text-sm text-aged-paper">Journey</span>
          </div>
          <p className="text-2xl font-bold text-sheikah-blue">
            {data.totalKilometers.toFixed(0)}
          </p>
          <span className="text-xs text-aged-paper/70">km traveled</span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-slate-blue/50 rounded-xl p-4 border-2 border-ancient-gold shadow-lg hover:shadow-ancient-gold/20 transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <Wrench size={20} className="text-ancient-gold" />
            <span className="text-sm text-aged-paper">Upgrades</span>
          </div>
          <p className="text-2xl font-bold text-ancient-gold">
            {data.maintenanceTasks.length}
          </p>
          <span className="text-xs text-aged-paper/70">tracked</span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-slate-blue/50 rounded-xl p-4 border-2 border-shrine-teal shadow-lg hover:shadow-shrine-teal/20 transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={20} className="text-shrine-teal" />
            <span className="text-sm text-aged-paper">Shrines</span>
          </div>
          <p className="text-2xl font-bold text-shrine-teal">
            {data.achievements.filter(a => a.unlocked).length}
          </p>
          <span className="text-xs text-aged-paper/70">completed</span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-slate-blue/50 rounded-xl p-4 border-2 border-spirit-yellow shadow-lg hover:shadow-spirit-yellow/20 transition-all"
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={20} className="text-spirit-yellow" />
            <span className="text-sm text-aged-paper">Overdue</span>
          </div>
          <p className="text-2xl font-bold text-spirit-yellow">
            {overdueTasks.length}
          </p>
          <span className="text-xs text-aged-paper/70">tasks</span>
        </motion.div>
      </div>

      {/* Alerts */}
      {(overdueTasks.length > 0 || criticalComponents.length > 0) && (
        <motion.div
          variants={itemVariants}
          className="bg-health-red/10 border-2 border-health-red rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="text-health-red" />
            <h3 className="text-lg font-bold text-health-red">⚠️ Champion's Notice</h3>
          </div>
          <div className="space-y-2">
            {overdueTasks.map(task => (
              <div key={task.id} className="text-sm text-aged-paper">
                • {task.name} requires attention
              </div>
            ))}
            {criticalComponents.map(comp => (
              <div key={comp.id} className="text-sm text-aged-paper">
                • {comp.name} needs immediate care
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Scheduled Events Section */}
      {upcomingEvents.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-slate-blue/50 rounded-xl p-6 border-2 border-spirit-yellow shadow-lg"
        >
          <h3 className="text-lg font-bold text-spirit-yellow mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Upcoming Scheduled Events
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map(event => {
              const eventDate = new Date(event.date);
              const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              const isToday = daysUntil === 0;
              const isTomorrow = daysUntil === 1;
              
              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-deep-blue/30 transition border border-spirit-yellow/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {event.type === 'maintenance' && '🔧'}
                      {event.type === 'cleaning' && '💧'}
                      {event.type === 'service' && '🏢'}
                      {event.type === 'custom' && '📅'}
                    </div>
                    <div>
                      <p className="text-aged-paper font-semibold">{event.title}</p>
                      <p className="text-xs text-aged-paper/60">
                        {isToday ? '🔴 Today' : isTomorrow ? '🟡 Tomorrow' : `${daysUntil} days`}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-spirit-yellow">
                    {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              );
            })}
          </div>
          <Link
            href="/maintenance"
            className="mt-4 block text-center py-2 rounded-lg bg-spirit-yellow/20 text-spirit-yellow hover:bg-spirit-yellow/30 transition-all border border-spirit-yellow/50"
          >
            View Full Calendar
          </Link>
        </motion.div>
      )}

      {/* Recent Activity Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Mileage */}
        <motion.div
          variants={itemVariants}
          className="bg-slate-blue/50 rounded-xl p-6 border-2 border-sheikah-blue shadow-lg"
        >
          <h3 className="text-lg font-bold text-sheikah-blue mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Recent Adventures
          </h3>
          {recentMileage.length === 0 ? (
            <p className="text-aged-paper/70 text-sm">No adventures logged yet</p>
          ) : (
            <div className="space-y-3">
              {recentMileage.map(entry => (
                <div key={entry.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-deep-blue/30 transition">
                  <div>
                    <p className="text-sm text-aged-paper">
                      {new Date(entry.date).toLocaleDateString()}
                    </p>
                    {entry.notes && (
                      <p className="text-xs text-aged-paper/60">{entry.notes}</p>
                    )}
                  </div>
                  <p className="text-lg font-bold text-sheikah-blue">
                    {entry.kilometers} km
                  </p>
                </div>
              ))}
            </div>
          )}
          <Link
            href="/mileage"
            className="mt-4 block text-center py-2 rounded-lg bg-sheikah-blue/20 text-sheikah-blue hover:bg-sheikah-blue/30 transition-all border border-sheikah-blue/50"
          >
            View All Adventures
          </Link>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          variants={itemVariants}
          className="bg-slate-blue/50 rounded-xl p-6 border-2 border-ancient-gold shadow-lg"
        >
          <h3 className="text-lg font-bold text-ancient-gold mb-4 flex items-center gap-2">
            <Trophy size={20} />
            Recent Shrines
          </h3>
          {recentAchievements.length === 0 ? (
            <p className="text-aged-paper/70 text-sm">No shrines completed yet</p>
          ) : (
            <div className="space-y-3">
              {recentAchievements.map(ach => (
                <div key={ach.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-deep-blue/30 transition">
                  <span className="text-3xl">{ach.icon}</span>
                  <div>
                    <p className="font-bold text-ancient-gold">{ach.name}</p>
                    <p className="text-xs text-aged-paper/70">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link
            href="/achievements"
            className="mt-4 block text-center py-2 rounded-lg bg-ancient-gold/20 text-ancient-gold hover:bg-ancient-gold/30 transition-all border border-ancient-gold/50"
          >
            View All Shrines
          </Link>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        <Link
          href="/maintenance"
          className="bg-gradient-to-br from-sheikah-blue/20 to-shrine-teal/20 border-2 border-sheikah-blue rounded-xl p-4 md:p-6 hover:scale-105 hover:shadow-xl hover:shadow-sheikah-blue/20 transition-all"
        >
          <Wrench className="text-sheikah-blue mb-2" size={24} />
          <p className="font-bold text-sheikah-blue text-base md:text-lg">Upgrade Station</p>
          <p className="text-xs text-aged-paper/70 mt-1">Tune your cycle</p>
        </Link>
        <Link
          href="/mileage"
          className="bg-gradient-to-br from-ancient-gold/20 to-spirit-yellow/20 border-2 border-ancient-gold rounded-xl p-4 md:p-6 hover:scale-105 hover:shadow-xl hover:shadow-ancient-gold/20 transition-all"
        >
          <TrendingUp className="text-ancient-gold mb-2" size={24} />
          <p className="font-bold text-ancient-gold text-base md:text-lg">Log Journey</p>
          <p className="text-xs text-aged-paper/70 mt-1">Track adventures</p>
        </Link>
        <Link
          href="/bike"
          className="bg-gradient-to-br from-shrine-teal/20 to-stamina-green/20 border-2 border-shrine-teal rounded-xl p-4 md:p-6 hover:scale-105 hover:shadow-xl hover:shadow-shrine-teal/20 transition-all"
        >
          <Trophy className="text-shrine-teal mb-2" size={24} />
          <p className="font-bold text-shrine-teal text-base md:text-lg">View Cycle</p>
          <p className="text-xs text-aged-paper/70 mt-1">3D model</p>
        </Link>
      </motion.div>
    </motion.div>
  );
}
