import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import path from 'path';

export default defineConfig({
  // 🔥 базовий шлях для GitHub Pages
  base: '/project-name/',
  root: 'src',
  build: {
    rollupOptions: {
      // ✅ включає всі HTML-файли, навіть вкладені
      input: glob.sync('./src/**/*.html'),
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, './src/scss'),
      '@scripts': path.resolve(__dirname, './src/scripts'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html']),
  ],
});
