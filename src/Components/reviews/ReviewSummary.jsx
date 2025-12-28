import React from 'react';
import { Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import GlassCard from '../ui/GlassCard';

export default function ReviewSummary({ reviews }) {
  const totalReviews = reviews?.length || 0;
  
  if (totalReviews === 0) {
    return null;
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
  
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / totalReviews) * 100
  }));

  return (
    <GlassCard className="p-6" hover={false}>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Student Reviews</h3>
      
      <div className="flex gap-8">
        {/* Average Rating */}
        <div className="text-center">
          <p className="text-5xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
          <div className="flex justify-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(avgRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">{totalReviews} reviews</p>
        </div>

        {/* Rating Breakdown */}
        <div className="flex-1 space-y-2">
          {ratingCounts.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-12">{rating} star</span>
              <Progress value={percentage} className="flex-1 h-2" />
              <span className="text-sm text-gray-500 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}