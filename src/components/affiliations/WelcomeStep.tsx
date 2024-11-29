'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { WelcomeMemojiGroup } from './WelcomeMemojiGroup';

interface WelcomeStepProps {
  onContinue: () => void;
}

export function WelcomeStep({ onContinue }: WelcomeStepProps) {
  useEffect(() => {
    // Initial confetti burst
    const duration = 2000;
    const end = Date.now() + duration;

    const runConfetti = () => {
      const particleCount = window.innerWidth < 768 ? 30 : 50;
      
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 },
        colors: ['#6366f1', '#8b5cf6', '#d946ef']
      });
      
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 },
        colors: ['#6366f1', '#8b5cf6', '#d946ef']
      });

      if (Date.now() < end) {
        requestAnimationFrame(runConfetti);
      }
    };

    runConfetti();
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.7
        }}
        className="mb-8 relative"
      >
        <Image
          src="/images/bookiz-purple.png"
          alt="Bookiz Logo"
          width={200}
          height={200}
          className="w-32 h-32 md:w-48 md:h-48 mx-auto"
          priority
        />
      </motion.div>

      <WelcomeMemojiGroup />

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center space-y-6 max-w-md mx-auto"
      >
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight" 
          dir="rtl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ברוך הבא
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-primary-600"
          >
            משפיען חדש!
          </motion.span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-lg md:text-xl text-gray-600 px-4" 
          dir="rtl"
        >
          אנחנו שמחים שבחרת להצטרף למשפחת בוקיז. בוא נתחיל בתהליך ההרשמה
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-full shadow-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
        >
          בוא נתחיל
        </motion.button>
      </motion.div>
    </div>
  );
}