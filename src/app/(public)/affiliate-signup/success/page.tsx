'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366f1', '#8b5cf6', '#d946ef']
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366f1', '#8b5cf6', '#d946ef']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = 'https://app.bookiz.co.il/affiliate';
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="mb-8"
      >
        <Image
          src="/images/bookiz-logo.png"
          alt="Bookiz Logo"
          width={180}
          height={60}
          className="h-12 w-auto"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <Check className="h-8 w-8 text-green-600" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2" dir="rtl">
          ברוכים הבאים למשפחת בוקיז!
        </h1>
        <p className="text-gray-600 mb-6" dir="rtl">
          ההרשמה הושלמה בהצלחה. מעבירים אותך למערכת...
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center text-sm text-gray-500"
        >
          <span>מועברים לדף הבית</span>
          <ArrowRight className="h-4 w-4 mr-2 animate-pulse" />
        </motion.div>
      </motion.div>
    </div>
  );
}
