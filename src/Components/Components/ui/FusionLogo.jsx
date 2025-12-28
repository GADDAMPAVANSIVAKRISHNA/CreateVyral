import React from 'react';
import { motion } from 'framer-motion';

export default function FusionLogo({ size = 32 }) {
    return (
        <div className="flex items-center gap-2">
            <motion.div
                className="relative"
                style={{ width: size, height: size }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-lg transform rotate-45" />
                <div className="absolute inset-[20%] bg-white rounded-md" />
                <div className="absolute inset-[40%] bg-gradient-to-bl from-cyan-400 to-purple-600 rounded-sm" />
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent hidden sm:block">
                CreateVyral
            </span>
        </div>
    );
}