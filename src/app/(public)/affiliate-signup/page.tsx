'use client';

import { AffiliateSignupForm } from '@/components/affiliations/AffiliateSignupForm';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AffiliateSignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <Image
            src="/images/bookiz-logo.png"
            alt="Bookiz Logo"
            width={180}
            height={60}
            className="h-12 w-auto"
          />
        </motion.div>
        <div className="max-w-3xl mx-auto">
          <AffiliateSignupForm />
        </div>
      </div>
    </div>
  );
}