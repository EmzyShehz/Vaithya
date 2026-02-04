import React, { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@mui/material';

export const PWAUpdateNotification: React.FC = () => {
  const [showUpdate, setShowUpdate] = useState(false);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      setShowUpdate(true);
    }
  }, [needRefresh]);

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  const handleDismiss = () => {
    setShowUpdate(false);
    setNeedRefresh(false);
  };

  if (!showUpdate && !offlineReady) return null;

  return (
    <>
      {/* Offline Ready Notification */}
      {offlineReady && !needRefresh && (
        <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 border border-green-200 max-w-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">App ready to work offline</h4>
              <p className="text-sm text-gray-600 mt-1">
                Vaithya is now available offline
              </p>
            </div>
            <button
              onClick={() => setOfflineReady(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Update Available Notification */}
      {showUpdate && needRefresh && (
        <div className="fixed top-4 right-4 bg-white shadow-xl rounded-lg p-4 z-50 border-2 border-[#337e51] max-w-sm">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-[#e8f5ee] rounded-full flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5 text-[#337e51]" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Update Available</h4>
              <p className="text-sm text-gray-600 mt-1">
                A new version of Vaithya is available
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleDismiss}
              variant="outlined"
              size="small"
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
              Later
            </Button>
            <Button
              onClick={handleUpdate}
              variant="contained"
              size="small"
              startIcon={<RefreshCw className="w-4 h-4" />}
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
              Update Now
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
