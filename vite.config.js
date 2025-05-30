export default defineConfig({
  base: '/JampingCat/', // <- важливо для GitHub Pages
  root: 'src',
  build: {
    rollupOptions: {
      input: globSync('./src/**/*.html')
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
