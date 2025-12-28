import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';
import GlassCard from '../ui/GlassCard';

export default function ReviewForm({ courseId, userName, userEmail, onReviewSubmitted }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    await base44.entities.Review.create({
      user_email: userEmail,
      user_name: userName,
      course_id: courseId,
      rating,
      comment
    });
    
    setIsSubmitting(false);
    setRating(0);
    setComment('');
    onReviewSubmitted?.();
  };

  return (
    <GlassCard className="p-6" hover={false}>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Write a Review</h3>
      
      {/* Star Rating */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-600 mr-2">Your Rating:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  star <= (hoverRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </motion.button>
          ))}
        </div>
        {rating > 0 && (
          <span className="text-sm text-gray-500 ml-2">
            {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
          </span>
        )}
      </div>

      {/* Comment */}
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this course..."
        className="mb-4 h-24"
      />

      <Button
        onClick={handleSubmit}
        disabled={rating === 0 || isSubmitting}
        className="bg-gradient-to-r from-purple-500 to-indigo-500"
      >
        <Send className="w-4 h-4 mr-2" />
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </GlassCard>
  );
}