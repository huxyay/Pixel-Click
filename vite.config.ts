import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths work on GitHub Pages
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext', // Optimizes for modern browsers
    assetsDir: 'assets',
  },
  // explicit define to ensure process.env.API_KEY doesn't crash the build if not polyfilled
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || 'YOUR_GEMINI_API_KEY_HERE')
  }
});