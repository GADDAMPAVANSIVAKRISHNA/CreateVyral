import React from 'react';
import { motion } from 'framer-motion';
import { Eye, MessageSquare, Clock, TrendingUp, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import GlassCard from '../ui/GlassCard';

export default function DashboardAnalytics({ 
  profileViews = 0, 
  inquiries = 0, 
  avgResponse = null,
  engagementRate = null,
  hasData = false 
}) {
  const stats = [
    { 
      label: 'Profile Views', 
      value: hasData ? profileViews.toLocaleString() : '0', 
      icon: Eye, 
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      change: hasData ? '+12%' : null
    },
    { 
      label: 'Inquiries', 
      value: hasData ? inquiries.toString() : '0', 
      icon: MessageSquare, 
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      change: hasData ? '+8%' : null
    },
    { 
      label: 'Avg Response', 
      value: avgResponse || '—', 
      icon: Clock, 
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50',
      change: null
    },
    { 
      label: 'Engagement Rate', 
      value: engagementRate ? `${engagementRate}%` : '—%', 
      icon: TrendingUp, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      change: hasData ? '+5%' : null
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="p-5" delay={i * 0.1}>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            {stat.change && (
              <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
                <TrendingUp className="w-3 h-3" />
                {stat.change} this week
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      {/* Detailed Analytics */}
      <GlassCard className="p-6" hover={false}>
        <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Metrics</h3>
        
        {hasData ? (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Engagement Rate</span>
                <span className="font-bold">{engagementRate || 0}%</span>
              </div>
              <Progress value={engagementRate || 0} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Profile Completion</span>
                <span className="font-bold">85%</span>
              </div>
              <Progress value={85} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Response Rate</span>
                <span className="font-bold">92%</span>
              </div>
              <Progress value={92} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Client Satisfaction</span>
                <span className="font-bold">95%</span>
              </div>
              <Progress value={95} className="h-3" />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center"
            >
              <BarChart3 className="w-10 h-10 text-purple-400" />
            </motion.div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">No Analytics Yet</h4>
            <p className="text-gray-500 max-w-sm mx-auto">
              Complete your profile and start receiving requests to see your analytics here.
            </p>
          </div>
        )}
      </GlassCard>
    </div>
  );
}