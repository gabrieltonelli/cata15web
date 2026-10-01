/**
 * Handler Serverless Nativo para Netlify Functions
 * Ruta: /.netlify/functions/api o /api/*
 * Compatible al 100% con Node 18+ y 20+ sin dependencias externas obligatorias
 */

export const handler = async (event) => {
  // Cabeceras estándar para CORS y respuesta JSON
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Atender preflight OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    }
  }

  const path = event.path || ''
  const isHealth = path.endsWith('/health') || path === '/health'
  const isRSVP = path.endsWith('/rsvp') || path === '/rsvp' || (!isHealth && event.httpMethod === 'POST')

  // Endpoint de comprobación: GET /api/health
  if (event.httpMethod === 'GET' && isHealth) {
    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || process.env.VITE_GOOGLE_APPS_SCRIPT_URL || ''
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        hasAppsScriptUrl: Boolean(appsScriptUrl),
        googleSheetId: process.env.GOOGLE_SHEET_ID || ''
      })
    }
  }

  // Endpoint de confirmación: POST /api/rsvp
  if (event.httpMethod === 'POST' && isRSVP) {
    try {
      let data = {}
      if (event.body) {
        const bodyStr = event.isBase64Encoded
          ? Buffer.from(event.body, 'base64').toString('utf8')
          : event.body
        data = JSON.parse(bodyStr)
      }

      const { nombre, apellido, asistencia, requerimientoAlimenticio, cancionSugerida, comentarios } = data

      if (!nombre || !apellido) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'El nombre y apellido son obligatorios.'
          })
        }
      }

      const payload = {
        nombre: String(nombre).trim(),
        apellido: String(apellido).trim(),
        asistencia: asistencia || 'Confirma asistencia',
        requerimientoAlimenticio: requerimientoAlimenticio || 'Ninguno',
        cancionSugerida: cancionSugerida || 'Sin sugerencia',
        comentarios: comentarios || 'Sin comentarios',
        fechaEnvio: data.fechaEnvio || new Date().toISOString()
      }

      // Obtener URL de Google Apps Script desde variables de Netlify
      const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || process.env.VITE_GOOGLE_APPS_SCRIPT_URL || ''

      if (!appsScriptUrl) {
        console.warn('[Netlify Function] Variable GOOGLE_APPS_SCRIPT_URL no configurada en Netlify.')
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            warning: 'La variable GOOGLE_APPS_SCRIPT_URL no está configurada en las variables de entorno de Netlify.',
            method: 'fallback'
          })
        }
      }

      console.log('[Netlify Function] Enviando datos a Google Apps Script:', appsScriptUrl)

      // Llamada directa a Google Apps Script
      const googleRes = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload),
        redirect: 'follow'
      })

      const rawGoogleText = await googleRes.text()

      // Verificar si Google respondió con la pantalla de error 404 de Google Drive
      if (rawGoogleText.includes('<!DOCTYPE html>') || rawGoogleText.includes('<html')) {
        if (rawGoogleText.includes('No se pudo abrir el archivo') || rawGoogleText.includes('Page Not Found')) {
          console.error('[Netlify Function Error] Google Apps Script devolvió 404 (No se pudo abrir el archivo).')
          return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
              success: false,
              error: 'Google Sheets rechazó la conexión (Error 404). Por favor revisá en Apps Script que la Aplicación Web esté implementada con acceso para: "Cualquier persona" (Anyone).'
            })
          }
        }
      }

      if (!googleRes.ok) {
        console.error(`[Netlify Function Error] Google Apps Script HTTP ${googleRes.status}:`, rawGoogleText)
        return {
          statusCode: 502,
          headers,
          body: JSON.stringify({
            success: false,
            error: `Google Apps Script respondió con error HTTP ${googleRes.status}.`
          })
        }
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Confirmación registrada con éxito en Google Sheets.',
          method: 'apps-script'
        })
      }

    } catch (err) {
      console.error('[Netlify Function Exception]:', err)
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Error interno en la función serverless: ' + err.message
        })
      }
    }
  }

  // Cualquier otra ruta o método
  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({
      success: false,
      error: `Ruta no encontrada en la API serverless: ${event.httpMethod} ${path}`
    })
  }
}
