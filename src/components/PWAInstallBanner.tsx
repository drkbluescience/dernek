import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { usePWA } from '@/hooks/usePWA';

const PWAInstallBanner: React.FC = () => {
  const { t } = useLanguage();
  const { showInstallPrompt, installApp, dismissInstallPrompt, isOnline } = usePWA();

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
      <Card className="border-society-purple bg-gradient-to-r from-society-purple to-purple-600 text-white shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-full">
                <Smartphone className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">
                  {t('pwa.install.title')}
                </h3>
                <p className="text-xs opacity-90">
                  {t('pwa.install.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={installApp}
                className="bg-white text-society-purple hover:bg-gray-100 text-xs px-3 py-1"
              >
                <Download className="h-3 w-3 mr-1" />
                {t('pwa.install.button')}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={dismissInstallPrompt}
                className="text-white hover:bg-white hover:bg-opacity-20 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {!isOnline && (
            <div className="mt-2 text-xs opacity-75 flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              {t('pwa.offline.message')}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAInstallBanner;
