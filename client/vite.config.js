import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  // Cargar variables exclusivas del cliente desde client/.env
  const env = loadEnv(mode, process.cwd(), '')

  // Valores con fallback seguro para metadatos Open Graph / WhatsApp
  const siteUrl = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || '').replace(/\/+$/, '')
  const ogImage = process.env.VITE_OG_IMAGE || env.VITE_OG_IMAGE || '/assets/photos/og-preview.jpg'
  const ogTitle = process.env.VITE_OG_TITLE || env.VITE_OG_TITLE || 'CATALINA • MIS XV'
  const ogDesc = process.env.VITE_OG_DESCRIPTION || env.VITE_OG_DESCRIPTION || 'Invitación Digital Especial. Sábado 28 de Noviembre de 2026 • 20:30 hs. Ruta 7 Km 214,5 • Chacabuco • Buenos Aires'
  const eventMainTitle = process.env.VITE_EVENT_MAIN_TITLE || env.VITE_EVENT_MAIN_TITLE || 'MIS XV CATALINA'

  // Contraseñas de acceso para el Gestor y la Pantalla Proyectable
  // Si la variable no está definida o está vacía, se calcula el hash SHA-256 de una contraseña por defecto
  const gestorPass = process.env.VITE_SORTEO_GESTOR_PASSWORD || env.VITE_SORTEO_GESTOR_PASSWORD || 'cata15gestor'
  const pantallaPass = process.env.VITE_SORTEO_PANTALLA_PASSWORD || env.VITE_SORTEO_PANTALLA_PASSWORD || 'cata15pantalla'

  const gestorPassHash = crypto.createHash('sha256').update(gestorPass).digest('hex')
  const pantallaPassHash = crypto.createHash('sha256').update(pantallaPass).digest('hex')

  const applyReplacements = (html) => {
    return html
      .replace(/%VITE_SITE_URL%/g, siteUrl)
      .replace(/%VITE_OG_IMAGE%/g, ogImage)
      .replace(/%VITE_OG_TITLE%/g, ogTitle)
      .replace(/%VITE_OG_DESCRIPTION%/g, ogDesc)
      .replace(/%VITE_EVENT_MAIN_TITLE%/g, eventMainTitle)
      .replace(/%VITE_SORTEO_GESTOR_HASH%/g, gestorPassHash)
      .replace(/%VITE_SORTEO_PANTALLA_HASH%/g, pantallaPassHash)
  }

  return {
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return applyReplacements(html)
        },
        closeBundle() {
          // Procesar archivos HTML copiados directamente desde public a dist (sorteo-gestor.html, etc.)
          const distDir = path.resolve(process.cwd(), 'dist')
          if (fs.existsSync(distDir)) {
            const files = fs.readdirSync(distDir)
            for (const file of files) {
              if (file.endsWith('.html')) {
                const filePath = path.join(distDir, file)
                const content = fs.readFileSync(filePath, 'utf-8')
                const updated = applyReplacements(content)
                if (updated !== content) {
                  fs.writeFileSync(filePath, updated, 'utf-8')
                }
              }
            }
          }
        }
      }
    ],
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
