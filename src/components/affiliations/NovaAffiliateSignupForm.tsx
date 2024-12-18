'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Instagram, Facebook, AlertCircle, Mail, Phone, MapPin, Calendar, Building2, User2 } from 'lucide-react';
import Image from 'next/image';

interface FormData {
  gender: string;
  business_category: string;
  birth_date: string;
  address: string;
  city: string;
  first_name: string;
  last_name: string;
  email: string;
  tax_id: string;
  phone_number: string;
  instagram: string;
  facebook: string;
  tier: 'SILVER';
  affiliate_parent: string;
}

const businessCategories = [
  'עסקים ויזמות',
  'טיפוח ויופי',
  'בריאות וספורט',
  'חינוך והדרכה',
  'טיפול ורפואה משלימה',
  'אומנות ויצירה',
  'אחר'
];

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export function NovaAffiliateSignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    gender: '',
    business_category: '',
    birth_date: '',
    address: '',
    city: '',
    first_name: '',
    last_name: '',
    email: '',
    tax_id: '',
    phone_number: '',
    instagram: '',
    facebook: '',
    tier: 'SILVER',
    affiliate_parent: 'noga' // This is the new field that identifies Noga as the referrer
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch('https://api.bookiz.co.il/api/v1/affiliates/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': 'CSX0phqIMsEW130p6U526fP3lNx4XkiILn0rIoVweUd8pCTXwSRWEXwVXLDClrHX'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.status === 201) {
        // Trigger confetti animation
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        // Wait for confetti to finish before redirecting
        setTimeout(() => {
          window.location.href = '/affiliate-signup/success';
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.error || 'אירעה שגיאה בעת יצירת החשבון');
      }
    } catch (err) {
      setError('אירעה שגיאה בעת התחברות לשרת');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden border border-white/20"
    >
      {/* Decorative gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 p-[2px] -z-10" />

      {/* Noga's Personal Section */}
      <motion.div 
        className="text-center mb-12" 
        dir="rtl"
        variants={itemVariants}
      >
        <div className="relative w-32 h-32 mx-auto mb-6 group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 animate-spin-slow" />
          <div className="absolute inset-[2px] rounded-full bg-white" />
          <Image
            src="/images/bookiz-purple.png"
            alt="Noga"
            fill
            className="rounded-full object-cover p-[2px] group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent mb-4"
          variants={itemVariants}
        >
          ברוכים הבאים לתכנית השותפים של בוקיז!
        </motion.h1>
        <motion.div 
          className="max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <p className="text-lg text-gray-700 mb-4">
            היי, אני נוגה! אני כאן כדי ללוות אתכם בדרך להצלחה עם בוקיז.
            כשותפה בכירה, אני יודעת בדיוק איך להפוך את העסק שלכם למצליח יותר עם המערכת שלנו.
          </p>
          <p className="text-gray-600">
            הצטרפו אליי ולקהילת בוקיז המצליחה, ובואו נתחיל לצמוח יחד!
          </p>
        </motion.div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center"
          dir="rtl"
        >
          <AlertCircle className="h-5 w-5 text-red-500 ml-2" />
          <span className="text-red-700">{error}</span>
        </motion.div>
      )}

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6" 
        dir="rtl"
        variants={formVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form fields remain the same, but wrap each field in motion.div */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">שם פרטי</label>
            <div className="mt-1 relative group">
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="text-gray-900 block w-full px-4 py-2 border border-gray-300 rounded-md 
                  focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent 
                  bg-white/50 backdrop-blur-sm transition-all duration-200 
                  group-hover:bg-white/80 group-hover:border-fuchsia-300"
                required
                autoComplete="given-name"
                name="first_name"
              />
              <User2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-fuchsia-500 transition-colors" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">שם משפחה</label>
            <div className="mt-1 relative group">
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="text-gray-900 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                required
                autoComplete="family-name"
                name="last_name"
              />
              <User2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">מגדר</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
              required
            >
              <option value="">בחר/י מגדר</option>
              <option value="MALE">זכר</option>
              <option value="FEMALE">נקבה</option>
              <option value="OTHER">אחר</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">תאריך לידה</label>
            <div className="mt-1 relative group">
              <input
                type="date"
                value={formData.birth_date}
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                className="text-gray-900 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                required
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">אימייל</label>
            <div className="mt-1 relative group">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-gray-900 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                required
                autoComplete="email"
                name="email"
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">טלפון</label>
            <div className="mt-1 relative group">
              <input
                type="tel"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                className="text-gray-900 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                required
                autoComplete="tel"
                name="phone_number"
              />
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">תחום עיסוק</label>
            <select
              value={formData.business_category}
              onChange={(e) => setFormData({ ...formData, business_category: e.target.value })}
              className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
              required
            >
              <option value="">בחר/י תחום</option>
              {businessCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">מספר עוסק/ח.פ</label>
            <div className="mt-1 relative group">
              <input
                type="text"
                value={formData.tax_id}
                onChange={(e) => setFormData({ ...formData, tax_id: e.target.value })}
                className="text-gray-900 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                required
                autoComplete="organization"
                name="tax_id"
              />
              <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">כתובת</label>
            <div className="mt-1 relative group">
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="text-gray-900 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                required
                autoComplete="street-address"
                name="address"
              />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">עיר</label>
            <div className="mt-1 relative group">
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="text-gray-900 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                required
                autoComplete="address-level2"
                name="city"
              />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">אינסטגרם</label>
            <div className="mt-1 relative group">
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                placeholder="https://instagram.com/username"
              />
              <Instagram className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">פייסבוק</label>
            <div className="mt-1 relative group">
              <input
                type="url"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                placeholder="https://facebook.com/username"
              />
              <Facebook className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
            </div>
          </motion.div>
        </div>

        {/* Terms and Conditions */}
        <motion.div variants={itemVariants} className="mt-6">
          <label className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              required
              className="h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-600">
              קראתי ואני מסכים/ה ל
              <a href="#" className="text-fuchsia-600 hover:text-fuchsia-500 mr-1 hover:underline">
                תנאי השימוש
              </a>
            </span>
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg 
              text-sm font-medium text-white
              bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 
              hover:from-pink-600 hover:via-fuchsia-600 hover:to-indigo-600
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 
              transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
              ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'מתחבר...' : 'הצטרף עכשיו'}
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
} 