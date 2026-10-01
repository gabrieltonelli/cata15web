import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

// Sincronización automática de conveniencia:
// Si el usuario edita el .env en la raíz del proyecto, sincronizarlo con client/.env
const rootEnvPath = path.resolve(rootDir, '.env')
const clientEnvPath = path.resolve(__dirname, '.env')

if (fs.existsSync(rootEnvPath)) {
  try {
    const rootStat = fs.statSync(rootEnvPath)
    const clientStat = fs.existsSync(clientEnvPath) ? fs.statSync(clientEnvPath) : null
    if (!clientStat || rootStat.mtimeMs > clientStat.mtimeMs) {
      fs.copyFileSync(rootEnvPath, clientEnvPath)
      console.log('🔄 Sincronizado .env desde la raíz hacia client/.env')
    }
  } catch (err) {
    console.warn('Advertencia al sincronizar .env:', err.message)
  }
}

export default defineConfig(({ mode }) => {
  // Cargar variables combinadas
  const env = loadEnv(mode, __dirname, '')

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
