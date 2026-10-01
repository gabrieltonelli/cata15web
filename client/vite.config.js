import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Cargar variables exclusivas del cliente desde client/.env
  const env = loadEnv(mode, process.cwd(), '')

  // Valores con fallback seguro para metadatos Open Graph / WhatsApp
  const siteUrl = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || 'https://cata15.netlify.app').replace(/\/+$/, '')
  const ogImage = process.env.VITE_OG_IMAGE || env.VITE_OG_IMAGE || '/assets/photos/og-preview.jpg'
  const ogTitle = process.env.VITE_OG_TITLE || env.VITE_OG_TITLE || 'CATALINA • MIS XV'
  const ogDesc = process.env.VITE_OG_DESCRIPTION || env.VITE_OG_DESCRIPTION || 'Invitación formal al festejo de 15 años de Catalina. Sábado 28 de Noviembre de 2026 • 20:30 hs. Salón Quintana, Chacabuco.'
  const eventMainTitle = process.env.VITE_EVENT_MAIN_TITLE || env.VITE_EVENT_MAIN_TITLE || 'MIS XV CATALINA'

  return {
    plugins: [
      react(),
      {
        name: 'html-og-transform',
        transformIndexHtml(html) {
          return html
            .replace(/%VITE_SITE_URL%/g, siteUrl)
            .replace(/%VITE_OG_IMAGE%/g, ogImage)
            .replace(/%VITE_OG_TITLE%/g, ogTitle)
            .replace(/%VITE_OG_DESCRIPTION%/g, ogDesc)
            .replace(/%VITE_EVENT_MAIN_TITLE%/g, eventMainTitle)
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
