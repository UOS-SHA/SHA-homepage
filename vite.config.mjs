import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/SHA-homepage/',
  plugins: [
    react(),
    legacy({
      targets: ['>0.2%', 'not dead', 'not op_mini all'],
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
