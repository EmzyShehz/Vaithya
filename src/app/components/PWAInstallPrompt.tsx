import React, { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '@mui/material';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const isInStandaloneMode = () =>
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');

    setIsStandalone(isInStandaloneMode());

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Listen for beforeinstallprompt event (Android/Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay (don't be too aggressive)
      setTimeout(() => {
        const hasSeenPrompt = localStorage.getItem('pwa-install-prompt-dismissed');
        if (!hasSeenPrompt) {
          setShowPrompt(true);
        }
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Show iOS prompt if conditions are met
    if (iOS && !isInStandaloneMode()) {
      setTimeout(() => {
        const hasSeenIOSPrompt = localStorage.getItem('pwa-install-ios-dismissed');
        if (!hasSeenIOSPrompt) {
          setShowPrompt(true);
        }
      }, 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
    localStorage.setItem('pwa-install-prompt-dismissed', 'true');
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (isIOS) {
      localStorage.setItem('pwa-install-ios-dismissed', 'true');
    } else {
      localStorage.setItem('pwa-install-prompt-dismissed', 'true');
    }
  };

  // Don't show if already installed
  if (isStandalone) return null;

  // Don't show if dismissed
  if (!showPrompt) return null;

  // iOS Install Instructions
  if (isIOS) {
    return (
      <div className="fixed bottom-4 left-4 right-4 bg-white shadow-2xl rounded-2xl p-4 z-50 border border-gray-200 max-w-md mx-auto">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-[#337e51] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl font-bold">V</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">Install Vaithya</h3>
            <p className="text-sm text-gray-600 mt-1">
              Add to your home screen for quick access
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm text-gray-700">
          <p className="flex items-center gap-2">
            <span className="text-blue-500">1.</span>
            Tap the Share button 
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-blue-500">2.</span>
            Scroll and tap "Add to Home Screen"
          </p>
          <p className="flex items-center gap-2">
            <span className="text-blue-500">3.</span>
            Tap "Add" to confirm
          </p>
        </div>
      </div>
    );
  }

  // Android/Desktop Install Button
  if (deferredPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 bg-white shadow-2xl rounded-2xl p-4 z-50 border border-gray-200 max-w-md mx-auto">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 bg-[#337e51] rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-bold">V</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg">Install Vaithya</h3>
            <p className="text-sm text-gray-600">
              Install the app for a better experience
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={handleDismiss}
            variant="outlined"
            sx={{
              flex: 1,
              borderColor: '#e2e8f0',
              color: '#64748b',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#cbd5e1',
                backgroundColor: '#f8fafc'
              }
            }}
          >
            Not now
          </Button>
          <Button
            onClick={handleInstallClick}
            variant="contained"
            startIcon={<Download className="w-4 h-4" />}
            sx={{
              flex: 1,
              backgroundColor: '#337e51',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#2a6742'
              }
            }}
          >
            Install
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
