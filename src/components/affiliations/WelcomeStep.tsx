'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { WelcomeMemojiGroup } from './WelcomeMemojiGroup';

interface WelcomeStepProps {
  onContinue: () => void;
  welcomeTitle?: string;
  welcomeDescription?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  showLogo?: boolean;
}

export function WelcomeStep({ 
  onContinue, 
  welcomeTitle = "ברוך הבא משפיען חדש!",
  welcomeDescription = "אנחנו שמחים שבחרת להצטרף למשפחת בוקיז. בוא נתחיל בתהליך ההרשמה",
  avatarSrc,
  avatarAlt = "Profile Picture",
  showLogo = true
}: WelcomeStepProps) {
  useEffect(() => {
    // Confetti effect code remains the same
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
        {avatarSrc ? (
          <div className="relative">
            <Image
              src={avatarSrc}
              alt={avatarAlt}
              width={200}
              height={200}
              className="w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full object-cover border-4 border-white shadow-xl"
              priority
            />
            {showLogo && (
              <div className="absolute -bottom-4 -right-4">
                <Image
                  src="/images/bookiz-purple.png"
                  alt="Bookiz Logo"
                  width={60}
                  height={60}
                  className="w-12 h-12 md:w-16 md:h-16"
                />
              </div>
            )}
          </div>
        ) : showLogo && (
          <Image
            src="/images/bookiz-purple.png"
            alt="Bookiz Logo"
            width={200}
            height={200}
            className="w-32 h-32 md:w-48 md:h-48 mx-auto"
            priority
          />
        )}
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
          dangerouslySetInnerHTML={{ __html: welcomeTitle }}
        />
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-lg md:text-xl text-gray-600 px-4" 
          dir="rtl"
        >
          {welcomeDescription}
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