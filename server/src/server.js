import app from './app.js'
import config from './config/env.js'

const PORT = config.port

app.listen(PORT, () => {
  console.log('='.repeat(50))
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`)
  console.log(`📡 Healthcheck: http://localhost:${PORT}/api/health`)
  console.log(`📝 Endpoint RSVP: http://localhost:${PORT}/api/rsvp`)
  console.log(`📊 Google Sheet ID: ${config.google.sheetId}`)
  if (config.google.appsScriptUrl) {
    console.log(`🔗 Apps Script Webhook configurado: Sí`)
  } else if (config.google.serviceAccountEmail) {
    console.log(`🔑 Service Account configurado: ${config.google.serviceAccountEmail}`)
  } else {
    console.log(`⚠️ Modo demostración: las confirmaciones se guardarán localmente en server/data/submissions.json`)
  }
  console.log('='.repeat(50))
})
