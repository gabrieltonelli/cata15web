import express from 'express'
import cors from 'cors'
import config from './config/env.js'
import { appendRSVP } from './services/sheetsService.js'

const app = express()

// Middlewares
app.use(cors({
  origin: config.corsOrigin === '*' ? true : config.corsOrigin,
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware para normalizar rutas provenientes de Netlify Functions
app.use((req, res, next) => {
  // En Netlify Functions req.url puede llegar como '/.netlify/functions/api/rsvp' o '/rsvp'
  if (req.url.startsWith('/.netlify/functions/api')) {
    req.url = req.url.replace('/.netlify/functions/api', '/api')
  } else if (!req.url.startsWith('/api')) {
    req.url = '/api' + req.url
  }
  console.log(`[API ${req.method}] ${req.url} - IP: ${req.ip || 'desconocida'}`)
  next()
})

// Ruta de comprobación de salud
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    hasAppsScriptUrl: Boolean(config.google.appsScriptUrl),
    hasServiceAccount: Boolean(config.google.serviceAccountEmail && config.google.privateKey)
  })
})

// Ruta para recibir confirmaciones de RSVP
app.post('/api/rsvp', async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      asistencia,
      requerimientoAlimenticio,
      cancionSugerida,
      comentarios,
      fechaEnvio
    } = req.body

    if (!nombre || !apellido) {
      return res.status(400).json({
        success: false,
        error: 'El nombre y apellido son obligatorios.'
      })
    }

    const payload = {
      nombre: String(nombre).trim(),
      apellido: String(apellido).trim(),
      asistencia: asistencia || 'Confirma asistencia',
      requerimientoAlimenticio: requerimientoAlimenticio || 'Ninguno',
      cancionSugerida: cancionSugerida || 'Sin sugerencia',
      comentarios: comentarios || 'Sin comentarios',
      fechaEnvio: fechaEnvio || new Date().toISOString()
    }

    const result = await appendRSVP(payload)

    res.status(200).json({
      success: true,
      message: 'Confirmación registrada con éxito.',
      ...result
    })
  } catch (error) {
    console.error('[RSVP Error en servidor]:', error)
    res.status(500).json({
      success: false,
      error: 'Ocurrió un error al registrar la confirmación en Google Sheets.',
      details: error.message
    })
  }
})

// Fallback para cualquier otra ruta API no mapeada
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Ruta no encontrada: ${req.method} ${req.url}`
  })
})

export default app
