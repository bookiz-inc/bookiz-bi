'use client';

import { motion } from 'framer-motion';
import { ScrollText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface TermsStepProps {
  onAccept: () => void;
  onBack: () => void;
}

export function TermsStep({ onAccept, onBack }: TermsStepProps) {
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAccept = () => {
    if (!hasReadTerms) {
      setShowError(true);
      return;
    }
    onAccept();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8"
    >
      <div className="text-center mb-8" dir="rtl">
        <div className="flex justify-center mb-4">
          <ScrollText className="h-12 w-12 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">תנאי השותפות</h1>
        <p className="text-gray-600">אנא קראו בעיון את תנאי השותפות לפני ההמשך</p>
      </div>

      {/* Terms Content */}
      <div 
        className="bg-gray-50 rounded-xl p-6 mb-6 max-h-[60vh] overflow-y-auto scroll-smooth"
        dir="rtl"
      >
        <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-bold mb-4">תקנון משפיעניות - מערכת לזימון תורים Bookiz</h2>
          
          <h3 className="text-lg font-semibold mt-6 mb-3">1. עמלת שיווק שותפים:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>המשפיענית זכאית לעמלת שיווק שותפים בלבד ואינה נחשבת כשותפה במערכת.</li>
            <li>כל משפיענית מקבלת לינק אישי וייחודי לפרסום, שעליה לפרסם באופן בלעדי, כך שדרכו ניתן לזהות הרשמות המגיעות ישירות מפעילות השיווק שלה.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">2. פעילות פרסום מצד המשפיענית:</h3>
          <p>המשפיענית תפרסם את בוקיז ברשתות החברתיות, ברשימות תפוצה, בקבוצות וואצאפ וכדומה, בהתאם לרצונה ויכולתה.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3">3. תנאי זכאות לעמלה:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>אם משתמשת נרשמה דרך דף הנחיתה של המשפיענית והשלימה את הרכישה תוענק עמלה למשפיענית.</li>
            <li>המשפיענית מתחילה לקבל עמלה רק מרגע ביצוע תשלום בפועל מצד הלקוחה לבוקיז. (בסיום תקופת הניסיון)</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">4. סוגי תגמול בהתאם למספר לקוחות משלמים:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>רמה א׳: 1-9 לקוחות - עמלת 20% למשך שנה.</li>
            <li>רמה ב׳: 10-29 לקוחות - עמלת 25% למשך שנתיים.</li>
            <li>רמה ג׳: 30 לקוחות ומעלה - עמלת 25% למשך 3 שנים.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">5. כללי ביטול וחידוש:</h3>
          <p>כאשר לקוחה מבטלת את המנוי במערכת בוקיז, המשפיענית לא תקבל עמלה נוספת עבור אותה לקוחה. גם אם חזרה בהמשך לבוקיז. אלא אם חזרה שוב למערכת דרך לינק שיווק השותפים של המשפיענית.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3">6. עמלות על רכישות נוספות:</h3>
          <p>המשפיענית זכאית לעמלה על כל הסכומים שהלקוחה תשלם לבוקיז, כולל תשלומים עבור שדרוגים ואפסיילים פנימיים בתוך המערכת.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3">7. הטבה לשימוש בבוקיז למשפיעניות:</h3>
          <div className="space-y-4">
            <p><strong>זכאות לחצי שנה חינם:</strong> כל משפיענית זכאית לשימוש חופשי במערכת Bookiz למשך חצי שנה.</p>
            
            <p><strong>המשך ההטבה לאחר חצי שנה:</strong></p>
            <ul className="list-disc list-inside space-y-2">
              <li>משפיענית שתהיה קשורה להגעה של 10 לקוחות משלמים או יותר במהלך חצי השנה הראשונה, תקבל זכאות להמשך שימוש חינם במערכת לחצי שנה נוספת.</li>
              <li>במידה ולא, השימוש במערכת יתומחר בהתאם למחיר המפורסם באתר Bookiz.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {showError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-600 mb-4 justify-center"
          dir="rtl"
        >
          <AlertCircle className="h-5 w-5" />
          <span>יש לקרוא ולאשר את התנאים להמשך</span>
        </motion.div>
      )}

      {/* Checkbox and Buttons */}
      <div className="space-y-6" dir="rtl">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={hasReadTerms}
            onChange={(e) => {
              setHasReadTerms(e.target.checked);
              setShowError(false);
            }}
            className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-gray-700">קראתי ואני מסכים/ה לתנאי השותפות</span>
        </label>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBack}
            className="px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            חזרה
          </button>
          <button
            onClick={handleAccept}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span>אישור והמשך</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
} 