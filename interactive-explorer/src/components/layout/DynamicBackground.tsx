'use client';

import React from 'react';
import { motion } from 'framer-motion';

const DynamicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-background">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />

      {/* Animated Blobs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 150, -100, 200, 0],
            y: [0, 100, 250, 50, 0],
            scale: [1, 1.4, 0.8, 1.2, 1],
            rotate: [0, 45, -45, 90, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-[15%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-600/30 blur-[160px]"
        />
        
        <motion.div
          animate={{
            x: [0, -200, 150, -100, 0],
            y: [0, 200, -100, 150, 0],
            scale: [1, 1.1, 1.5, 0.9, 1],
            rotate: [0, -90, 45, -180, 0],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-[10%] -right-[15%] w-[55%] h-[55%] rounded-full bg-violet-600/25 blur-[160px]"
        />

        <motion.div
          animate={{
            x: [0, 100, -250, 50, 0],
            y: [0, -150, 100, -200, 0],
            scale: [1, 1.3, 0.7, 1.1, 1],
            rotate: [0, 180, -90, 45, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-[20%] left-[10%] w-[65%] h-[65%] rounded-full bg-blue-600/20 blur-[160px]"
        />
      </div>
      
      {/* Vignette effect to soften edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_90%)] opacity-40 pointer-events-none" />
    </div>
  );
};

export default DynamicBackground;
