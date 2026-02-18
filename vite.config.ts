import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are loaded correctly on GitHub Pages (relative paths)
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // We removed 'rollupOptions' to allow Vite to bundle dependencies normally.
    // This is the most robust way to ensure the app works in both Preview and Production.
  }
});