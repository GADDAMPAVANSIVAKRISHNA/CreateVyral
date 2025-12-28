import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

export default function PromoPopups() {
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  useEffect(() => {
    // Popup 1 after 10 seconds
    const timer1 = setTimeout(() => {
      const shown = sessionStorage.getItem('popup20Shown');
      if (!shown) {
        setShowPopup1(true);
      }
    }, 10000);

    // Popup 2 after 2 minutes (120 seconds)
    const timer2 = setTimeout(() => {
      const shown = sessionStorage.getItem('popup30Shown');
      const popup1Open = !sessionStorage.getItem('popup20Shown');
      if (!shown && !popup1Open) {
        setShowPopup2(true);
      }
    }, 120000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const closePopup1 = () => {
    setShowPopup1(false);
    sessionStorage.setItem('popup20Shown', 'true');
    // Check if popup 2 should show
    setTimeout(() => {
      const shown = sessionStorage.getItem('popup30Shown');
      if (!shown) {
        setShowPopup2(true);
      }
    }, 3000);
  };

  const closePopup2 = () => {
    setShowPopup2(false);
    sessionStorage.setItem('popup30Shown', 'true');
  };

  return (
    <>
      {/* Popup 1 - 20% OFF Courses */}
      <AnimatePresence>
        {showPopup1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
            onClick={closePopup1}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />
              
              <button
                onClick={closePopup1}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="p-8 text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  🔥 LIMITED TIME: 20% OFF on All Courses!
                </h2>
                <p className="text-gray-600 mb-6">
                  Boost your skills with VyRal premium learning.
                </p>

                <Link to={createPageUrl('Courses')} onClick={closePopup1}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold rounded-xl"
                  >
                    Explore Courses
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup 2 - 30% OFF Marketing */}
      <AnimatePresence>
        {showPopup2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md"
            onClick={closePopup2}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-50" />
              
              <button
                onClick={closePopup2}
                className="absolute top-4 right-4 p-2 hover:bg-purple-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="relative p-8 text-center">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center"
                >
                  <Rocket className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  🚀 30% OFF — Market Your Product with Influencers!
                </h2>
                <p className="text-gray-600 mb-6">
                  Promote your brand through VyRal creators.
                </p>

                <Link to={createPageUrl('Campaigns')} onClick={closePopup2}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl"
                  >
                    Start Campaign
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}