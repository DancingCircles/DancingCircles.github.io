import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: 'src/assets',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    open: true
  }
})



