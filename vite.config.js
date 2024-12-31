import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Proxy configuration
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8800', // Target server URL
        changeOrigin: true,               // Change origin for CORS
        secure: false                     // If you are using HTTP instead of HTTPS
      }
    }
  }
});
