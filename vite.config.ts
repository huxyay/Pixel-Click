import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Treat these as external. The app will resolve them from the index.html importmap.
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        '@google/genai',
        'jszip',
        'lucide-react'
      ],
      output: {
        format: 'es', // Use ES modules to support browser-native imports
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@google/genai': 'GoogleGenAI',
          jszip: 'JSZip',
          'lucide-react': 'lucideReact'
        }
      }
    }
  }
});