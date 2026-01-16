'use client';

import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';
import { Sparkles, Lock, Star, Award } from 'lucide-react';

export default function AchievementsPage() {
  const { data } = useApp();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mileage':
        return 'border-sheikah-blue text-sheikah-blue';
      case 'maintenance':
        return 'border-ancient-gold text-ancient-gold';
      case 'gear':
        return 'border-shrine-teal text-shrine-teal';
      case 'special':
        return 'border-spirit-yellow text-spirit-yellow';
      default:
        return 'border-slate-blue text-aged-paper';
    }
  };

  const unlockedAchievements = data.achievements.filter(a => a.unlocked);
  const lockedAchievements = data.achievements.filter(a => !a.unlocked);

  const completionPercentage = (unlockedAchievements.length / data.achievements.length) * 100;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-blue to-deep-blue rounded-lg p-6 border-2 border-sheikah-blue shadow-xl"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-sheikah-blue sheikah-glow mb-2 flex items-center gap-2">
              <Sparkles size={28} />
              Shrine Trials
            </h2>
            <p className="text-aged-paper/80">
              Complete trials to earn Spirit Orbs and prove your worth as a Champion
            </p>
          </div>
          <Award className="text-ancient-gold" size={40} />
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-aged-paper/70">Trials Completed</span>
            <span className="text-lg font-bold text-sheikah-blue">
              {unlockedAchievements.length}/{data.achievements.length}
            </span>
          </div>
          <div className="w-full h-4 bg-slate-blue/30 rounded-full overflow-hidden border-2 border-sheikah-blue/30">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-sheikah-blue via-shrine-teal to-ancient-gold"
            />
          </div>
          <p className="text-center text-sheikah-blue font-bold mt-2 sheikah-glow">{completionPercentage.toFixed(0)}% Complete</p>
        </div>
      </motion.div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-ancient-gold mb-4 flex items-center gap-2 ancient-glow">
            <Star className="text-spirit-yellow" />
            Completed Trials
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAchievements.map((achievement, index) => {
              const categoryColor = getCategoryColor(achievement.category);
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-gradient-to-br from-slate-blue/40 to-deep-blue/60 rounded-lg p-6 border-2 ${categoryColor} relative overflow-hidden shadow-lg`}
                >
                  {/* Shrine glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-sheikah-blue/10 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />

                  <div className="relative">
                    <div className="text-5xl mb-3 text-center drop-shadow-[0_0_8px_rgba(77,208,225,0.5)]">{achievement.icon}</div>
                    <h4 className="text-lg font-bold text-sheikah-blue mb-1 text-center">
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-aged-paper/80 mb-3 text-center">
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-1 rounded ${categoryColor} bg-opacity-20 capitalize border border-current`}>
                        {achievement.category}
                      </span>
                      {achievement.unlockedAt && (
                        <span className="text-aged-paper/60">
                          {new Date(achievement.unlockedAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-aged-paper/70 mb-4 flex items-center gap-2">
            <Lock size={20} className="text-slate-blue" />
            Sealed Trials
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedAchievements.map((achievement, index) => {
              const categoryColor = getCategoryColor(achievement.category);
              const progressPercentage = (achievement.progress / achievement.target) * 100;

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-slate-blue/20 rounded-lg p-6 border-2 border-slate-blue/50 hover:border-slate-blue transition relative`}
                >
                  <div className="relative opacity-70">
                    <div className="text-5xl mb-3 text-center grayscale">{achievement.icon}</div>
                    <h4 className="text-lg font-bold text-aged-paper/70 mb-1 text-center">
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-aged-paper/50 mb-3 text-center">
                      {achievement.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1 text-xs">
                        <span className="text-aged-paper/50">Progress</span>
                        <span className="text-aged-paper/70 font-bold">
                          {achievement.progress.toLocaleString()}/{achievement.target.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-dark-stone rounded-full overflow-hidden border border-slate-blue/30">
                        <div
                          className={`h-full ${categoryColor.split(' ')[1].replace('text-', 'bg-')}`}
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        />
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-xs text-aged-paper/50">
                          {progressPercentage.toFixed(0)}% Complete
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className={`px-2 py-1 rounded text-xs ${categoryColor} bg-opacity-20 capitalize border border-current`}>
                        {achievement.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Spirit Orb Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-spirit-yellow/20 to-ancient-gold/20 rounded-lg p-6 border-2 border-spirit-yellow"
      >
        <div className="flex items-start gap-4">
          <Sparkles size={32} className="text-spirit-yellow flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-spirit-yellow mb-2">About Spirit Orbs</h3>
            <p className="text-aged-paper/80 text-sm">
              Each completed trial rewards you with a Spirit Orb. These sacred orbs are proof of your dedication
              and skill as a Master Cycle champion. Complete trials by maintaining your cycle, logging journeys,
              and expanding your inventory. The path of a true champion is paved with perseverance!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
