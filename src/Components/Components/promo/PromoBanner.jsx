import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

const PromoBanner = () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white py-2.5 px-4 relative z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-xs md:text-sm font-medium">
                <div className="hidden md:block"></div> {/* Spacer */}
                <div className="flex items-center gap-2 mx-auto">
                    <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                    <span>
                        Launch Offer: Get <span className="font-bold text-yellow-300">Pro Plan</span> for just ₹999/mo!
                        <span className="ml-2 bg-white/20 px-2 py-0.5 rounded text-xs font-mono">EARLYBIRD</span>
                    </span>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
                    aria-label="Close banner"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default PromoBanner;