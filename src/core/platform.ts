import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

export function isNativePlatform(): boolean {
  return Capacitor.isNativePlatform();
}

export function initNativeBackButtonHandling(onBack: () => void): void {
  if (!isNativePlatform()) return;

  App.addListener('backButton', ({ canGoBack }) => {
    if (!canGoBack) {
      onBack();
    }
  });
}

