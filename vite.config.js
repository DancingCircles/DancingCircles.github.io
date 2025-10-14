import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/xoberon.github.io/',
  publicDir: 'src/assets',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    open: true
  }
})



