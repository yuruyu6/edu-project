import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  /* logLevel: 'error', */
  plugins: [react()],
  server: {
    port: 3030,
    open: true,
    hmr: { overlay: true },
  },
})
