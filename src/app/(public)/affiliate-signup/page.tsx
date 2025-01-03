'use client';

import { useState } from 'react';
import { AffiliateSignupForm } from '@/components/affiliations/AffiliateSignupForm';
import { WelcomeStep } from '@/components/affiliations/WelcomeStep';
import { TermsStep } from '@/components/affiliations/TermsStep';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 'welcome' | 'terms' | 'form';

export default function AffiliateSignupPage() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <WelcomeStep onContinue={() => setCurrentStep('terms')} />
          </motion.div>
        );
      case 'terms':
        return (
          <motion.div
            key="terms"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <TermsStep 
              onAccept={() => setCurrentStep('form')}
              onBack={() => setCurrentStep('welcome')}
            />
          </motion.div>
        );
      case 'form':
        return (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl mx-auto"
          >
            <AffiliateSignupForm />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
}