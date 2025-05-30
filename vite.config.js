import { defineConfig } from 'vite';
import path from 'path';
import { globSync } from 'glob'; // <- виправлено
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  base: '/JampingCat/',
  root: 'src',
  build: {
    rollupOptions: {
      input: globSync('./src/**/*.html') // <- тепер правильно
    },
    outDir: '../dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@scss': path.resolve(__dirname, './src/scss'),
      '@scripts': path.resolve(__dirname, './src/scripts'),
      '@assets': path.resolve(__dirname, './src/assets'),
    }
  },
  plugins: [
    injectHTML(),
    FullReload(['./src/**/*.html'])
  ]
});
