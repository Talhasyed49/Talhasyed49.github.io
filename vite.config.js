import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths work on GitHub Pages user/project sites and local preview
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})
