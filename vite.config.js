// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://demo3.wms.net.in',
        changeOrigin: true,
        secure: false, // Use this if you're having issues with self-signed certificates
      },
    },
  },
});
