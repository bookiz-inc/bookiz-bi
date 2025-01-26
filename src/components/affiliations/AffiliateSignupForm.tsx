'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Instagram, Facebook, AlertCircle, Mail, Phone, MapPin, Calendar, Building2, User2 } from 'lucide-react';

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

export function AffiliateSignupForm() {
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
    tier: 'SILVER'
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Remove any non-digit characters
    value = value.replace(/\D/g, '');
    
    // Ensure the number starts with 0
    if (value && value[0] !== '0') {
      value = '0' + value;
    }
    
    // Limit to 10 digits (Israeli phone number format)
    value = value.slice(0, 10);
    
    setFormData({ ...formData, phone_number: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://bookiz-back-pk3wl.ondigitalocean.app/api/v1/affiliates/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': 'CSX0phqIMsEW130p6U526fP3lNx4XkiILn0rIoVweUd8pCTXwSRWEXwVXLDClrHX'
        },
        body: JSON.stringify(formData)
      });

      if (response.status === 201) {
        // Redirect to success page instead of direct app redirect
        window.location.href = '/affiliate-signup/success';
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mx-auto w-full max-w-4xl"
    >
      <div className="text-center mb-6 sm:mb-8" dir="rtl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">הצטרפות לתכנית השותפים</h1>
        <p className="text-base sm:text-lg text-gray-600">הצטרפו למשפחת בוקיז והתחילו להרוויח</p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 flex items-center"
          dir="rtl"
        >
          <AlertCircle className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />
          <span className="text-red-700 text-sm sm:text-base">{error}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Personal Information */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">שם פרטי</label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="text-black block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                required
                autoComplete="given-name"
                name="first_name"
              />
              <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">שם משפחה</label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="text-black block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                required
                autoComplete="family-name"
                name="last_name"
              />
              <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">מגדר</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="text-black block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
              required
            >
              <option value="">בחר/י מגדר</option>
              <option value="MALE">זכר</option>
              <option value="FEMALE">נקבה</option>
              <option value="OTHER">אחר</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">תאריך לידה</label>
            <div className="mt-1 relative">
              <input
                type="date"
                value={formData.birth_date}
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                className="text-black block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                required
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">אימייל</label>
            <div className="mt-1 relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-black block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                required
                autoComplete="email"
                name="email"
                inputMode="email"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">טלפון</label>
            <div className="mt-1 relative">
              <input
                type="tel"
                value={formData.phone_number}
                onChange={handlePhoneNumberChange}
                className="text-black block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                required
                autoComplete="tel"
                name="phone_number"
                inputMode="numeric"
                pattern="^0\d{9}$"
                maxLength={10}
                placeholder="0501234567"
                dir="ltr"
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <div className="absolute -bottom-5 right-0 text-xs text-gray-500">
                מספר טלפון חייב להתחיל ב-0 ולהכיל 10 ספרות
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">תחום עיסוק</label>
            <select
              value={formData.business_category}
              onChange={(e) => setFormData({ ...formData, business_category: e.target.value })}
              className="text-black block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
              required
            >
              <option value="">בחר/י תחום</option>
              {businessCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">מספר עוסק/ח.פ</label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={formData.tax_id}
                onChange={(e) => setFormData({ ...formData, tax_id: e.target.value })}
                className="text-black block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                required
                autoComplete="organization"
                name="tax_id"
                dir="ltr"
              />
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">כתובת</label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="text-black block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                required
                autoComplete="street-address"
                name="address"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">עיר</label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="text-black block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                required
                autoComplete="address-level2"
                name="city"
              />
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Social Media */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">אינסטגרם</label>
            <div className="mt-1 relative">
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="text-black block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                placeholder="https://instagram.com/username"
                dir="ltr"
              />
              <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">פייסבוק</label>
            <div className="mt-1 relative">
              <input
                type="url"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="text-black block w-full px-4 py-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base"
                placeholder="https://facebook.com/username"
                dir="ltr"
              />
              <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-6">
          <label className="flex items-start sm:items-center space-x-2 space-x-reverse cursor-pointer group">
            <input
              type="checkbox"
              required
              className="mt-1 sm:mt-0 h-5 w-5 text-primary-600 focus:ring-2 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
              קראתי ואני מסכים/ה ל
              <a href="#" className="text-primary-600 hover:text-primary-700 focus:outline-none focus:underline mr-1">
                תנאי השימוש
              </a>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 sm:py-4 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                מתחבר...
              </>
            ) : (
              'הצטרף עכשיו'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
