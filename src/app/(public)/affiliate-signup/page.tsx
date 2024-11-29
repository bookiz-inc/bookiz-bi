'use client';

import { useState } from 'react';
import { AffiliateSignupForm } from '@/components/affiliations/AffiliateSignupForm';
import { WelcomeStep } from '@/components/affiliations/WelcomeStep';
import { motion, AnimatePresence } from 'framer-motion';

export default function AffiliateSignupPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <WelcomeStep onContinue={() => setShowForm(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-3xl mx-auto"
            >
              <AffiliateSignupForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}