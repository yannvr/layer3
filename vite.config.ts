import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@emotion']
      }
    })
  ],
  build: {
    outDir: 'dist',
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://layer3.xyz',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },

});
