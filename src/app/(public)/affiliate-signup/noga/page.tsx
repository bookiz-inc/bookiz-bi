'use client';

import { NovaAffiliateSignupForm } from '@/components/affiliations/NovaAffiliateSignupForm';
import { motion } from 'framer-motion';

export default function NovaAffiliateSignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-pink-500 to-fuchsia-600 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm"
              animate={{
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glassmorphism container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto"
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

        <NovaAffiliateSignupForm />
      </motion.div>
    </div>
  );
} 