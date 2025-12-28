import React from 'react';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <GlassCard className="p-6 text-center" hover={false}>
        <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </GlassCard>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id || index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <GlassCard className="p-5" hover={false}>
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold shrink-0">
                {review.user_name?.charAt(0) || review.user_email?.charAt(0) || 'U'}
              </div>
              
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{review.user_name || 'Anonymous'}</p>
                    <p className="text-xs text-gray-500">{formatDate(review.created_date)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Comment */}
                {review.comment && (
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}