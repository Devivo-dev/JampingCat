import { defineConfig } from 'vite';
import path from 'path';
import { globSync } from 'glob';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  root: 'src',
  build: {
    rollupOptions: {
      input: globSync('./src/**/*.html')// знайде всі HTML в src
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
    FullReload(['./src/**/*.html'])
  ]
});
