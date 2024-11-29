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
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
    >
      <div className="text-center mb-8" dir="rtl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">הצטרפות לתכנית השותפים</h1>
        <p className="text-gray-600">הצטרפו למשפחת בוקיז והתחילו להרוויח</p>
      </div>

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

      <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <label className="block text-sm font-medium text-black">שם פרטי</label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <User2 className="absolute left-3 top-2.5 h-5 w-5 text-black" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">שם משפחה</label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <User2 className="absolute left-3 top-2.5 h-5 w-5 text-black" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">מגדר</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="">בחר/י מגדר</option>
              <option value="MALE">זכר</option>
              <option value="FEMALE">נקבה</option>
              <option value="OTHER">אחר</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">תאריך לידה</label>
            <div className="mt-1 relative">
              <input
                type="date"
                value={formData.birth_date}
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                className="text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">אימייל</label>
            <div className="mt-1 relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">טלפון</label>
            <div className="mt-1 relative">
              <input
                type="tel"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                className="text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Business Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700">תחום עיסוק</label>
            <select
              value={formData.business_category}
              onChange={(e) => setFormData({ ...formData, business_category: e.target.value })}
              className=" text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="">בחר/י תחום</option>
              {businessCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">מספר עוסק/ח.פ</label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={formData.tax_id}
                onChange={(e) => setFormData({ ...formData, tax_id: e.target.value })}
                className="text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-black" />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">כתובת</label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-black" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">עיר</label>
            <div className="mt-1 relative">
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="text-black block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-black" />
            </div>
          </div>

          {/* Social Media */}
          <div>
            <label className="block text-sm font-medium text-gray-700">אינסטגרם</label>
            <div className="mt-1 relative">
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://instagram.com/username"
              />
              <Instagram className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">פייסבוק</label>
            <div className="mt-1 relative">
              <input
                type="url"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://facebook.com/username"
              />
              <Facebook className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-6">
          <label className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-600">
              קראתי ואני מסכים/ה ל
              <a href="#" className="text-primary-600 hover:text-primary-500 mr-1">
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
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'מתחבר...' : 'הצטרף עכשיו'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}