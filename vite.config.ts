import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/unihub/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
