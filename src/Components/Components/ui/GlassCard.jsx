import React from 'react';

const GlassCard = ({ children, className = '' }) => {
    return (
        <div className={`backdrop-blur-md bg-white/10 rounded-xl border border-white/20 ${className}`}>
            {children}
        </div>
    );
};

export default GlassCard;
