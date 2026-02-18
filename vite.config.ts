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
      // Externalize dependencies so they are loaded via the importmap in index.html
      // This ensures consistency between the preview environment and the deployed GitHub Pages site.
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        '@google/genai',
        'jszip',
        'lucide-react'
      ],
      output: {
        format: 'es', // Output ES modules so the browser can import the external dependencies
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