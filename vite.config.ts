import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are loaded correctly on GitHub Pages (relative paths)
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext', // Optimizes for modern browsers
  },
  define: {
    // This ensures process.env.API_KEY is replaced with the actual value during build
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || 'YOUR_GEMINI_API_KEY_HERE'),
    // Prevents "process is not defined" errors in some third-party libs
    'process.env': {} 
  }
});