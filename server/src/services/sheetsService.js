import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { google } from 'googleapis'
import config from '../config/env.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const fallbackStoragePath = path.resolve(__dirname, '../../data/submissions.json')

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
    console.log('[Storage Fallback] Registro guardado localmente en server/data/submissions.json')
  } catch (err) {
    console.error('[Storage Fallback Error]', err)
  }
}

/**
 * Método 1: Persistencia vía Google Apps Script Webhook
 * Permite que una función doPost en el Sheet reciba directamente el payload.
 */
const appendViaAppsScript = async (data) => {
  const url = config.google.appsScriptUrl
  if (!url) return null

  console.log(`[Google Sheets] Enviando datos a Apps Script Webhook: ${url}`)
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    redirect: 'follow'
  })

  if (!response.ok) {
    throw new Error(`Apps Script respondió con status: ${response.status} ${response.statusText}`)
  }

  const result = await response.text()
  return { method: 'apps-script', result }
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
 * Prioriza:
 * 1. Apps Script Webhook si está configurado.
 * 2. Service Account API si está configurado.
 * 3. Fallback a almacenamiento local en JSON si aún no se configuraron credenciales.
 */
export const appendRSVP = async (data) => {
  const timestamp = new Date().toISOString()
  const fullData = {
    ...data,
    fechaEnvio: data.fechaEnvio || timestamp
  }

  // Siempre guardamos copia local de resguardo
  await saveToLocalFallback(fullData)

  // Intentar Método 1: Google Apps Script Webhook
  if (config.google.appsScriptUrl) {
    try {
      const res = await appendViaAppsScript(fullData)
      return { success: true, method: 'apps-script', details: res }
    } catch (appsScriptErr) {
      console.error('[Google Sheets - Apps Script Error]:', appsScriptErr.message)
      // Si falla, intentará el siguiente método si está disponible
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

  // Si no hay ninguna credencial remota configurada, advertir pero confirmar con fallback local
  console.warn(
    '[Google Sheets Warning] No se encontraron credenciales de Google configuradas (GOOGLE_APPS_SCRIPT_URL o GOOGLE_SERVICE_ACCOUNT_*). ' +
    'Los datos se resguardaron localmente en server/data/submissions.json.'
  )

  return {
    success: true,
    method: 'local-fallback',
    warning: 'Datos resguardados localmente. Configura GOOGLE_APPS_SCRIPT_URL o GOOGLE_SERVICE_ACCOUNT en server/.env para sincronizar con Google Sheets.'
  }
}

export default { appendRSVP }
