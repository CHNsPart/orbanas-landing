'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

interface LogoLoaderProps {
  onComplete?: () => void;
  minDisplayTime?: number; // Minimum time to show loader (ms)
}

export default function LogoLoader({ 
  onComplete, 
  minDisplayTime = 2000 
}: LogoLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [particlePositions, setParticlePositions] = useState<{ left: string; top: string }[]>([]);

  useEffect(() => {
    // This effect runs only once on the client after mounting
    const positions = Array.from({ length: 6 }).map(() => ({
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 60}%`,
    }));
    setParticlePositions(positions);
  }, []);


  useEffect(() => {
    // FIX 1: Changed 'let' to 'const' since startTime is never reassigned.
    const startTime = Date.now();

    
    // Simulate loading progress
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / minDisplayTime) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(progressInterval);
        // Wait a bit more then hide
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onComplete?.(), 500); // Wait for exit animation
        }, 300);
      }
    };

    // FIX 2: Declared and initialized with 'const' in one step.
    const progressInterval = setInterval(updateProgress, 50);

    // The cleanup function now correctly clears the interval.
    return () => {
      clearInterval(progressInterval);
    };
  }, [minDisplayTime, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
          
          {/* Main Logo Animation */}
          <div className="relative">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 3, 
                ease: "linear", 
                repeat: Infinity 
              }}
              className="absolute inset-0 w-32 h-32 border-2 border-transparent border-t-primary rounded-full"
            />
            
            {/* Inner pulsing ring */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut", 
                repeat: Infinity 
              }}
              className="absolute inset-2 w-28 h-28 border border-primary/30 rounded-full"
            />
            
            {/* Logo container */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1, 
                ease: "easeOut",
                delay: 0.2
              }}
              className="relative w-32 h-32 flex items-center justify-center"
            >
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="w-16 h-16 relative"
              >
                <Image
                  src="/orbanas-logo.svg"
                  alt="Orbanas"
                  fill
                  className="object-contain filter drop-shadow-lg"
                  priority
                />
                
                {/* Glowing effect */}
                <div className="absolute inset-0 w-full h-full bg-primary/20 rounded-full blur-xl animate-pulse" />
              </motion.div>
            </motion.div>
          </div>

          {/* Company Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <h1 className="text-3xl font-black text-white mb-2 tracking-wider">
              ORBANAS
            </h1>
            <p className="text-white/60 text-sm font-medium tracking-wide">
              Complete Business Solutions
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "200px" }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8 h-1 bg-white/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-orange-400 to-primary bg-300% animate-gradient rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ 
              delay: 1.2, 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 0.5
            }}
            className="mt-4 text-white/40 text-xs font-medium tracking-widest uppercase"
          >
            Loading Experience...
          </motion.p>

          {/* Floating particles */}
          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: pos.left,
                top: pos.top,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2, // Randomizing animation is fine here
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}