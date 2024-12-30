'use client';

import { useState } from 'react';
import { NovaAffiliateSignupForm } from '@/components/affiliations/NovaAffiliateSignupForm';
import { AnimatePresence, motion } from 'framer-motion';
import { WelcomeStep } from '@/components/affiliations/WelcomeStep';

export default function NovaAffiliateSignupPage() {
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
              <WelcomeStep 
                onContinue={() => setShowForm(true)}
                welcomeTitle="ברוכים הבאים ל<span class='text-primary-600'>תוכנית השותפים של נוגה</span>"
                welcomeDescription=" ברוכות הבאות אם את כאן תדעי שלא סתם נבחרת לקחת חלק מקבוצת המשפיעניות של בוקיז - אנחנו כאן כדי לגדול יחד"
                avatarSrc="/images/noga.jpg"
                avatarAlt="Noga's Profile Picture"
                showLogo={true}
              />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-3xl mx-auto"
            >
              <NovaAffiliateSignupForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 
