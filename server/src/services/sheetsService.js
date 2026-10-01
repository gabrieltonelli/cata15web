import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { google } from 'googleapis'
import config from '../config/env.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// En entornos serverless (Netlify / Lambda), el filesystem es de solo lectura salvo /tmp
const isServerless = Boolean(
  process.env.NETLIFY ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.LAMBDA_TASK_ROOT
)

const fallbackStoragePath = isServerless
  ? path.resolve('/tmp', 'submissions.json')
  : path.resolve(__dirname, '../../data/submissions.json')

/**
 * Guarda el registro en un archivo JSON local como fallback de seguridad
 */
const saveToLocalFallback = async (entry) => {
  try {
    const dir = path.dirname(fallbackStoragePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    let records = []
    if (fs.existsSync(fallbackStoragePath)) {
      const content = fs.readFileSync(fallbackStoragePath, 'utf8')
      records = JSON.parse(content || '[]')
    }

    records.push(entry)
    fs.writeFileSync(fallbackStoragePath, JSON.stringify(records, null, 2), 'utf8')
    console.log(`[Storage Fallback] Registro guardado en ${fallbackStoragePath}`)
  } catch (err) {
    console.warn('[Storage Fallback Warning]: No se pudo escribir copia local en disco (entorno serverless):', err.message)
  }
}

/**
 * Método 1: Persistencia vía Google Apps Script Webhook
 */
const appendViaAppsScript = async (data) => {
  const url = config.google.appsScriptUrl
  if (!url) return null

  console.log(`[Google Sheets] Enviando datos a Apps Script Webhook: ${url}`)

  // Enviamos con text/plain para que Google Apps Script reciba el payload sin preflight OPTIONS ni truncamiento
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(data),
    redirect: 'follow'
  })

  const rawText = await response.text()

  if (!response.ok) {
    throw new Error(`Google Apps Script respondió con HTTP ${response.status}: ${rawText.slice(0, 200)}`)
  }

  // Detectar si Google devolvió una página de error HTML (ej. 404 Google Drive o pantalla de login)
  if (rawText.includes('<!DOCTYPE html>') || rawText.includes('<html')) {
    if (rawText.includes('No se pudo abrir el archivo') || rawText.includes('Page Not Found')) {
      throw new Error(
        'Google Apps Script devolvió 404 (No se pudo abrir el archivo). ' +
        'Revisá la configuración de la Web App en Google Sheets: debe estar implementada con acceso "Cualquier persona" (Anyone).'
      )
    }
  }

  let parsed = null
  try {
    parsed = JSON.parse(rawText)
  } catch (parseErr) {
    // Si no es JSON pero devolvió 200, retornamos el texto
  }

  return { method: 'apps-script', result: parsed || rawText }
}

/**
 * Método 2: Persistencia vía Google Sheets API v4 (Service Account)
 */
const appendViaServiceAccount = async (data) => {
  const { sheetId, sheetName, serviceAccountEmail, privateKey } = config.google

  if (!serviceAccountEmail || !privateKey || !sheetId) {
    return null
  }

  console.log(`[Google Sheets] Autenticando con Service Account: ${serviceAccountEmail}`)
  const auth = new google.auth.JWT(
    serviceAccountEmail,
    null,
    privateKey,
    ['https://www.googleapis.com/auth/spreadsheets']
  )

  const sheets = google.sheets({ version: 'v4', auth })

  const rowValues = [
    data.fechaEnvio || new Date().toISOString(),
    data.nombre || '',
    data.apellido || '',
    data.asistencia || '',
    data.requerimientoAlimenticio || '',
    data.cancionSugerida || '',
    data.comentarios || ''
  ]

  const range = `${sheetName}!A:G`

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [rowValues]
    }
  })

  return { method: 'google-api', updatedRange: response.data.updates?.updatedRange }
}

/**
 * Función principal para agregar una confirmación de RSVP.
 */
export const appendRSVP = async (data) => {
  const timestamp = new Date().toISOString()
  const fullData = {
    ...data,
    fechaEnvio: data.fechaEnvio || timestamp
  }

  // Guardado de respaldo local
  await saveToLocalFallback(fullData)

  // Intentar Método 1: Google Apps Script Webhook
  if (config.google.appsScriptUrl) {
    try {
      const res = await appendViaAppsScript(fullData)
      return { success: true, method: 'apps-script', details: res }
    } catch (appsScriptErr) {
      console.error('[Google Sheets - Apps Script Error]:', appsScriptErr.message)
      // Si no hay Service Account configurado, lanzar el error explícito
      if (!config.google.serviceAccountEmail || !config.google.privateKey) {
        throw appsScriptErr
      }
    }
  }

  // Intentar Método 2: Google Service Account API
  if (config.google.serviceAccountEmail && config.google.privateKey) {
    try {
      const res = await appendViaServiceAccount(fullData)
      return { success: true, method: 'service-account', details: res }
    } catch (apiErr) {
      console.error('[Google Sheets - Service Account Error]:', apiErr.message)
      throw apiErr
    }
  }

  // Si no hay ninguna credencial remota configurada
  console.warn(
    '[Google Sheets Warning] No se encontraron credenciales de Google configuradas (GOOGLE_APPS_SCRIPT_URL o GOOGLE_SERVICE_ACCOUNT_*).'
  )

  return {
    success: true,
    method: 'local-fallback',
    warning: 'Datos resguardados localmente. Configura GOOGLE_APPS_SCRIPT_URL en el panel de Netlify para sincronizar con Google Sheets.'
  }
}

export default { appendRSVP }
