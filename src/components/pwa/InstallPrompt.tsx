'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, HomeIcon } from 'lucide-react';
import Cookies from 'js-cookie';

const INSTALL_PROMPT_COOKIE = 'bookiz-install-prompt-shown';

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if already shown
    const hasShown = Cookies.get(INSTALL_PROMPT_COOKIE);
    if (hasShown) return;

    // Check if it's a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) return;

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;
    
    // Set cookie and hide prompt regardless of outcome
    Cookies.set(INSTALL_PROMPT_COOKIE, 'true', { expires: 30 }); // Expires in 30 days
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    Cookies.set(INSTALL_PROMPT_COOKIE, 'true', { expires: 30 });
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-4 z-50"
          dir="rtl"
        >
          <button
            onClick={handleDismiss}
            className="absolute left-2 top-2 text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary-100 rounded-full p-2">
              <HomeIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">הוסף את בוקיז למסך הבית</h3>
              <p className="text-sm text-gray-500">לגישה מהירה ונוחה</p>
            </div>
          </div>

          <button
            onClick={handleInstall}
            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>הוסף למסך הבית</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 