import image_e4a06c2e5310bf3279847237a4634192b0b18136 from 'figma:asset/e4a06c2e5310bf3279847237a4634192b0b18136.png';
import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';
import logo from 'figma:asset/3fa5936f1e03b7c4b97ead6aca18c60e7c42855b.png';
import vaithyaText from 'figma:asset/7d6b53efc078c0030fa563bc08163619de4a413e.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 0.8 
          }}
          className="mb-8 inline-block"
        >
          <img src={image_e4a06c2e5310bf3279847237a4634192b0b18136} alt="HealthTrack Logo" className="w-32 h-32" />
        </motion.div>

        {/* App Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-4xl font-bold text-black mb-4"
        >
          <img src={vaithyaText} alt="Vaithya" className="h-12 w-auto mx-auto" />
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg text-black/90 max-w-xs mx-auto px-6 mb-12"
        >
          Your journey to optimal health starts here
        </motion.p>

        {/* Get Started Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          onClick={onComplete}
          className="bg-[#337e51] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow hover:bg-[#2a6742]"
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
}