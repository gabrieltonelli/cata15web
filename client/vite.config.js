import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Cargar variables exclusivas del cliente desde client/.env
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: process.env.VITE_API_PROXY_URL || env.VITE_API_PROXY_URL || 'http://localhost:3002',
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})
