import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    proxy: {
      // Proxy F1 API requests to avoid CORS in development
      '/api': {
        target: 'https://f1connectapi.vercel.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path,
      },
      // Proxy local backend API requests (Docker service name)
      '/local-api': {
        target: 'http://backend:8080', // Direct container-to-container communication
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/local-api/, '/api'),
      },
    },
  },
});
