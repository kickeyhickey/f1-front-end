import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    proxy: {
      // Your backend API - preserves /api path
      '/api': {
        target: 'http://backend:8080',
        changeOrigin: true,
      },
      // External F1 data API - rewrites /f1-api to /api
      '/f1-api': {
        target: 'https://f1connectapi.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/f1-api/, '/api'),
      },
    },
  },
});
