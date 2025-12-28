import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGradientBg = ({ children, className = "" }) => {
    return (
        <div className={`relative w-full h-full overflow-hidden bg-slate-900 ${className}`}>
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-600/30 to-indigo-600/30 rounded-full blur-3xl"
                />
            </div>
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default AnimatedGradientBg;
