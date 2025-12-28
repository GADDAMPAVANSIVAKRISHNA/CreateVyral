import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ 
  children, 
  className = "", 
  onClick,
  hover = true,
  delay = 0 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { 
        scale: 1.02, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        y: -5
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`
        backdrop-blur-xl bg-white/70 
        border border-white/40
        rounded-3xl shadow-xl
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}