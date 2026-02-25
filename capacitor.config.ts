import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.demo.supermario',
  appName: 'Super Mario Demo',
  webDir: 'www',
  android: {
    allowMixedContent: false,
    overScrollMode: 'never',
    backgroundColor: '#000000',
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 0,
      backgroundColor: '#000000',
    },
  },
};

export default config;
