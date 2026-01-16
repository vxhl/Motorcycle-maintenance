'use client';

import { useApp } from '@/contexts/AppContext';
import { MaintenanceTask, ComponentCheck } from '@/types';
import { CheckCircle, Clock, AlertTriangle, Calendar, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import MaintenanceCalendar from '@/components/MaintenanceCalendar';

export default function MaintenancePage() {
  const { data, completeMaintenanceTask, updateComponentCheck, resetMaintenanceTask, addCalendarEvent, deleteCalendarEvent } = useApp();
  const [activeTab, setActiveTab] = useState<'tasks' | 'components' | 'calendar'>('tasks');

  const getTaskStatus = (task: MaintenanceTask) => {
    if (!task.nextDue) return 'pending';
    const now = new Date();
    const dueDate = new Date(task.nextDue);
    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) return 'overdue';
    if (daysUntilDue <= 3) return 'due-soon';
    return 'ok';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'border-red-500 bg-red-950/30';
      case 'due-soon':
        return 'border-yellow bg-yellow/10';
      case 'ok':
        return 'border-neon-blue bg-neon-blue/10';
      default:
        return 'border-gray-600 bg-gray-900/30';
    }
  };

  const getComponentStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'border-red-500 bg-red-950/30 text-red-500';
      case 'warning':
        return 'border-yellow bg-yellow/10 text-yellow';
      case 'good':
        return 'border-green-500 bg-green-950/30 text-green-500';
      default:
        return 'border-gray-600 bg-gray-900/30';
    }
  };

  const handleCompleteTask = (taskId: string) => {
    completeMaintenanceTask(taskId);
  };

  const canCompleteTask = (task: MaintenanceTask) => {
    // If never completed, can complete
    if (!task.lastCompleted) return true;
    
    // If completed, check if next due date has passed
    if (task.nextDue) {
      const now = new Date();
      const dueDate = new Date(task.nextDue);
      return now >= dueDate;
    }
    
    return false;
  };

  // Separate completed and pending tasks
  const pendingTasks = data.maintenanceTasks.filter(task => canCompleteTask(task));
  const completedTasks = data.maintenanceTasks.filter(task => !canCompleteTask(task));

  const handleUpdateComponent = (component: ComponentCheck, newStatus: ComponentCheck['status']) => {
    updateComponentCheck({ ...component, status: newStatus });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-blue to-deep-blue rounded-xl p-6 border-2 border-sheikah-blue shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-sheikah-blue opacity-5 rounded-full blur-3xl"></div>
        <h2 className="text-2xl font-bold text-sheikah-blue sheikah-glow mb-2 relative">
          ⚙️ Upgrade Station
        </h2>
        <p className="text-aged-paper relative">
          Maintain and enhance your Master Cycle
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 md:gap-4 border-b-2 border-sheikah-blue/30 overflow-x-auto bg-slate-blue/30 rounded-t-xl p-2">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 md:px-6 py-3 font-bold transition-all whitespace-nowrap rounded-lg ${
            activeTab === 'tasks'
              ? 'text-sheikah-blue bg-deep-blue border-b-2 border-sheikah-blue sheikah-glow'
              : 'text-aged-paper hover:text-sheikah-blue hover:bg-deep-blue/50'
          }`}
        >
          Upgrade Tasks
        </button>
        <button
          onClick={() => setActiveTab('components')}
          className={`px-4 md:px-6 py-3 font-bold transition-all whitespace-nowrap rounded-lg ${
            activeTab === 'components'
              ? 'text-sheikah-blue bg-deep-blue border-b-2 border-sheikah-blue sheikah-glow'
              : 'text-aged-paper hover:text-sheikah-blue hover:bg-deep-blue/50'
          }`}
        >
          System Checks
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-4 md:px-6 py-3 font-bold transition-all whitespace-nowrap flex items-center gap-2 rounded-lg ${
            activeTab === 'calendar'
              ? 'text-sheikah-blue bg-deep-blue border-b-2 border-sheikah-blue sheikah-glow'
              : 'text-aged-paper hover:text-sheikah-blue hover:bg-deep-blue/50'
          }`}
        >
          <Calendar size={18} />
          Adventure Log
        </button>
      </div>

      {/* Maintenance Tasks Tab */}
      {activeTab === 'tasks' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-sheikah-blue mb-4 flex items-center gap-2 sheikah-glow">
                <Clock size={20} />
                ⏳ Pending Upgrades ({pendingTasks.length})
              </h3>
              <div className="space-y-4">
                {pendingTasks.map((task, index) => {
            const status = getTaskStatus(task);
            const statusColor = getStatusColor(status);

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-blue/50 rounded-xl p-6 border-2 ${statusColor} shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-sheikah-blue mb-1">{task.name}</h3>
                    <p className="text-sm text-aged-paper/80">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {status === 'overdue' && <AlertTriangle className="text-health-red" />}
                    {status === 'due-soon' && <Clock className="text-spirit-yellow" />}
                    {status === 'ok' && <CheckCircle className="text-stamina-green" />}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-aged-paper/60 block mb-1">Frequency</span>
                    <span className="text-sheikah-blue font-bold text-base">
                      Every {task.frequency} days
                    </span>
                  </div>
                  <div>
                    <span className="text-aged-paper/60 block mb-1">Last Done</span>
                    <span className="text-ancient-gold font-bold text-base">
                      {task.lastCompleted
                        ? new Date(task.lastCompleted).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : 'Never'}
                    </span>
                  </div>
                  <div>
                    <span className="text-aged-paper/60 block mb-1">Next Due</span>
                    <span className="text-spirit-yellow font-bold text-base">
                      {task.nextDue
                        ? new Date(task.nextDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : 'Not scheduled'}
                    </span>
                  </div>
                  <div>
                    <span className="text-aged-paper/60 block mb-1">Streak</span>
                    <span className="text-shrine-teal font-bold text-lg">
                      🔥 {task.streak} {task.streak === 1 ? 'time' : 'times'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleCompleteTask(task.id)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sheikah-blue to-shrine-teal text-dark-stone font-bold hover:scale-105 transition-all shadow-lg hover:shadow-sheikah-blue/50"
                >
                  <CheckCircle className="inline mr-2" size={20} />
                  Complete Upgrade
                </button>
              </motion.div>
            );
          })}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-stamina-green mb-4 flex items-center gap-2 ancient-glow">
                <CheckCircle size={20} />
                ✓ Completed Upgrades ({completedTasks.length})
              </h3>
              <div className="space-y-4">
                {completedTasks.map((task, index) => {
                  const daysUntilDue = task.nextDue 
                    ? Math.ceil((new Date(task.nextDue).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                    : 0;

                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-blue/50 rounded-xl p-6 border-2 border-stamina-green/50 shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-sheikah-blue mb-1">{task.name}</h3>
                          <p className="text-sm text-aged-paper/80">{task.description}</p>
                        </div>
                        <CheckCircle className="text-stamina-green" size={24} />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-aged-paper/60 block mb-1">Completed</span>
                          <span className="text-stamina-green font-bold text-base">
                            {task.lastCompleted
                              ? new Date(task.lastCompleted).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                              : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-aged-paper/60 block mb-1">Next Due</span>
                          <span className="text-sheikah-blue font-bold text-base">
                            {task.nextDue
                              ? new Date(task.nextDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                              : 'N/A'}
                          </span>
                        </div>
                        <div>
                          <span className="text-aged-paper/60 block mb-1">Days Until Due</span>
                          <span className="text-spirit-yellow font-bold text-base">
                            {daysUntilDue} days
                          </span>
                        </div>
                        <div>
                          <span className="text-aged-paper/60 block mb-1">Streak</span>
                          <span className="text-shrine-teal font-bold text-lg">
                            🔥 {task.streak} {task.streak === 1 ? 'time' : 'times'}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => resetMaintenanceTask(task.id)}
                        className="w-full py-3 rounded-xl border-2 border-sheikah-blue/50 text-sheikah-blue hover:border-sheikah-blue hover:bg-sheikah-blue/10 transition-all flex items-center justify-center gap-2"
                      >
                        <RotateCcw size={20} />
                        Reset Upgrade
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MaintenanceCalendar 
            tasks={data.maintenanceTasks} 
            componentChecks={data.componentChecks}
            calendarEvents={data.calendarEvents}
            onAddEvent={addCalendarEvent}
            onDeleteEvent={deleteCalendarEvent}
          />
        </motion.div>
      )}

      {/* Component Checks Tab */}
      {activeTab === 'components' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {data.componentChecks.map((component, index) => {
            const statusColor = getComponentStatusColor(component.status);

            return (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-blue/50 rounded-xl p-6 border-2 ${statusColor} shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-sheikah-blue mb-1">{component.name}</h3>
                    <p className="text-sm text-aged-paper/80 capitalize">
                      Category: {component.category.replace('_', ' ')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded text-sm font-bold ${statusColor}`}>
                      {component.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="mb-4 text-sm">
                  <span className="text-aged-paper/60 block mb-1">Last Checked</span>
                  <span className="text-sheikah-blue font-bold">
                    {component.lastChecked
                      ? new Date(component.lastChecked).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                      : 'Never checked'}
                  </span>
                </div>

                {component.notes && (
                  <div className="mb-4 p-3 bg-deep-blue/50 rounded-lg border border-sheikah-blue/30">
                    <span className="text-aged-paper/60 text-sm block mb-1">Notes</span>
                    <p className="text-aged-paper">{component.notes}</p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleUpdateComponent(component, 'good')}
                    className="py-2 rounded-lg bg-stamina-green/20 text-stamina-green hover:bg-stamina-green/30 transition-all font-bold border border-stamina-green/50"
                  >
                    ✓ Good
                  </button>
                  <button
                    onClick={() => handleUpdateComponent(component, 'warning')}
                    className="py-2 rounded-lg bg-spirit-yellow/20 text-spirit-yellow hover:bg-spirit-yellow/30 transition-all font-bold border border-spirit-yellow/50"
                  >
                    ⚠ Warning
                  </button>
                  <button
                    onClick={() => handleUpdateComponent(component, 'critical')}
                    className="py-2 rounded-lg bg-health-red/20 text-health-red hover:bg-health-red/30 transition-all font-bold border border-health-red/50"
                  >
                    ✖ Critical
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

