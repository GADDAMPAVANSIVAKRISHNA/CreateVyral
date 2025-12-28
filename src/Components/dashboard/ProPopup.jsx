import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

export default function ProPopup({ isPro, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup only if not pro
    if (!isPro) {
      // Check if popup was shown before
      const lastShown = localStorage.getItem('proPopupLastShown');
      const now = Date.now();
      
      // Show if never shown or if 24 hours have passed
      if (!lastShown || now - parseInt(lastShown) > 24 * 60 * 60 * 1000) {
        setTimeout(() => setIsVisible(true), 2000);
      }
    }
  }, [isPro]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('proPopupLastShown', Date.now().toString());
    if (onClose) onClose();
  };

  if (isPro || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 opacity-50" />

          {/* Content */}
          <div className="relative text-center">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center"
            >
              <Crown className="w-10 h-10 text-white" />
            </motion.div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              🚀 Go Pro to unlock premium opportunities!
            </h3>
            
            <p className="text-gray-600 mb-6">
              Get hired directly by clients, earn more, and access exclusive features.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-left">
                <Sparkles className="w-5 h-5 text-purple-500 shrink-0" />
                <span className="text-sm text-gray-700">Direct client connections</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Sparkles className="w-5 h-5 text-pink-500 shrink-0" />
                <span className="text-sm text-gray-700">Higher earnings potential</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Sparkles className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-sm text-gray-700">24/7 priority support</span>
              </div>
            </div>

            <Link to={createPageUrl('ProPlan')}>
              <Button className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:opacity-90 text-white py-6">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Pro - ₹1,500
              </Button>
            </Link>

            <button
              onClick={handleClose}
              className="mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}