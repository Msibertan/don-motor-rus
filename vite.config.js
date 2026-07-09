import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // В клиент попадают только переменные с этими префиксами.
  envPrefix: ['VITE_', 'TELEGRAM_'],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    open: false,
  },
})
