import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Let the Google sign-in popup talk back to the app (fixes the
    // "Cross-Origin-Opener-Policy would block window.closed" warning).
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
})
