import React from 'react';
import { motion } from 'framer-motion';
import { Inbox, Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import GlassCard from '../ui/GlassCard';

export default function DashboardRequests({ requests = [], type = 'creator' }) {
  if (requests.length === 0) {
    return (
      <GlassCard className="p-8" hover={false}>
        <div className="text-center py-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
          >
            <Inbox className="w-10 h-10 text-gray-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Requests Yet</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            {type === 'creator' 
              ? "Clients will contact you here when they're interested in your services."
              : "Brands will send collaboration requests here when they want to work with you."}
          </p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6" hover={false}>
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        {type === 'creator' ? 'Service Requests' : 'Campaign Requests'}
      </h3>
      <div className="space-y-4">
        {requests.map((request, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-gray-900">{request.service_type || request.title}</p>
                <p className="text-sm text-gray-500">From: {request.client_email || request.brand_name}</p>
              </div>
              <Badge className={
                request.status === 'completed' ? 'bg-green-100 text-green-700' :
                request.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                request.status === 'accepted' ? 'bg-purple-100 text-purple-700' :
                'bg-yellow-100 text-yellow-700'
              }>
                {request.status?.replace(/_/g, ' ')}
              </Badge>
            </div>
            {request.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{request.description}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {request.deadline || 'No deadline'}
              </span>
              {request.budget && (
                <span className="font-medium text-green-600">₹{request.budget?.toLocaleString('en-IN')}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}