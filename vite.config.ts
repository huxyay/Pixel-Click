import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Pixel-Click/', // GitHub Pages base path
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext',
  },
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || 'YOUR_GEMINI_API_KEY_HERE')
  }
});