import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'www',
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@core': '/src/core',
      '@ui': '/src/ui',
      '@games': '/src/games',
    },
  },
});

