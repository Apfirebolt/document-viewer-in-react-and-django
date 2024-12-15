import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', 
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  build: {
    outDir: '../static/dist', // Output directory relative to Django's static directory
    manifest: true, // Generate a manifest.json file for Django
    assetsDir: 'static/assets',
    emptyOutDir: true, // Clean the output directory before building
    rollupOptions: {
      input: {
        main: './src/main.jsx', // Entry point of your React app
      },
    },
  },
})
