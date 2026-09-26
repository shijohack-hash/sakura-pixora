import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shijo.pixora',
  appName: 'Pixora',
  webDir: 'www',

  server: {
    url: 'http://10.0.2.2:3000',
    cleartext: true,
  },
};

export default config;