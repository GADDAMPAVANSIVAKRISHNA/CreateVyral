import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calendar, Wallet } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from '../ui/GlassCard';

const placeholderData = [
  { month: 'Jan', earnings: 0 },
  { month: 'Feb', earnings: 0 },
  { month: 'Mar', earnings: 0 },
  { month: 'Apr', earnings: 0 },
  { month: 'May', earnings: 0 },
  { month: 'Jun', earnings: 0 },
];

export default function DashboardEarnings({ totalEarnings = 0, completedProjects = 0, pendingPayments = 0 }) {
  const hasEarnings = totalEarnings > 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="text-2xl font-bold text-gray-900">₹{totalEarnings.toLocaleString('en-IN')}</p>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-3">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-gray-500">Completed Projects</p>
          <p className="text-2xl font-bold text-gray-900">{completedProjects}</p>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-3">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-gray-500">Pending Payments</p>
          <p className="text-2xl font-bold text-gray-900">₹{pendingPayments.toLocaleString('en-IN')}</p>
        </GlassCard>
      </div>

      {/* Earnings Chart */}
      <GlassCard className="p-6" hover={false}>
        <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Earnings</h3>
        
        {hasEarnings ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={placeholderData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Area type="monotone" dataKey="earnings" stroke="#10b981" fillOpacity={1} fill="url(#colorEarnings)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center"
            >
              <TrendingUp className="w-10 h-10 text-green-400" />
            </motion.div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">₹0 Earnings</h4>
            <p className="text-gray-500 max-w-sm mx-auto">
              Complete your first project to start earning. Your earnings graph will appear here.
            </p>
          </div>
        )}
      </GlassCard>
    </div>
  );
}