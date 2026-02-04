import React, { useEffect, useState } from 'react';
import { Smartphone, Download, CheckCircle2, Wifi, WifiOff } from 'lucide-react';

export const PWAStatus: React.FC = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPromptAvailable, setInstallPromptAvailable] = useState(false);

  useEffect(() => {
    // Check if app is installed
    const checkInstalled = () => {
      const isInStandaloneMode = 
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes('android-app://');
      
      setIsInstalled(isInStandaloneMode);
    };

    checkInstalled();

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPromptAvailable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Smartphone className="w-5 h-5 text-[#337e51]" />
        App Status
      </h3>
      
      <div className="space-y-2">
        {/* Installation Status */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            {isInstalled ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Download className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-sm text-gray-700">Installed</span>
          </div>
          <span className={`text-sm font-medium ${isInstalled ? 'text-green-600' : 'text-gray-500'}`}>
            {isInstalled ? 'Yes' : 'Web Version'}
          </span>
        </div>

        {/* Online Status */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-orange-500" />
            )}
            <span className="text-sm text-gray-700">Connection</span>
          </div>
          <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-orange-600'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {/* Install Available */}
        {!isInstalled && installPromptAvailable && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-2">
              Install this app for quick access and offline use
            </p>
            <button 
              onClick={() => {
                // The install prompt will be shown by PWAInstallPrompt component
                localStorage.removeItem('pwa-install-prompt-dismissed');
                window.location.reload();
              }}
              className="text-xs text-[#337e51] font-medium hover:underline"
            >
              Show install option
            </button>
          </div>
        )}

        {/* Offline Notice */}
        {!isOnline && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              You're offline. Some features may be limited.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
