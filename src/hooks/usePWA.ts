import { useState, useEffect } from 'react';

interface PWAInstallPrompt {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface UsePWAReturn {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  installApp: () => Promise<void>;
  showInstallPrompt: boolean;
  dismissInstallPrompt: () => void;
}

export const usePWA = (): UsePWAReturn => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState<PWAInstallPrompt | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    };

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as any);
      setIsInstallable(true);
      
      // Show install prompt after a delay (don't be too aggressive)
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setShowInstallPrompt(false);
      console.log('PWA was installed');
    };

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial checks
    checkIfInstalled();

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const installApp = async (): Promise<void> => {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setInstallPrompt(null);
      setIsInstallable(false);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Error installing app:', error);
    }
  };

  const dismissInstallPrompt = (): void => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show install prompt if dismissed in this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      setShowInstallPrompt(false);
    }
  }, []);

  return {
    isInstallable,
    isInstalled,
    isOnline,
    installApp,
    showInstallPrompt,
    dismissInstallPrompt
  };
};
