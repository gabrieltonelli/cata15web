import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Cargar .env exclusivamente desde server/.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const config = {
  port: parseInt(process.env.PORT || '3002', 10),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  nodeEnv: process.env.NODE_ENV || 'development',

  // Configuración de Google Sheets
  google: {
    sheetId: process.env.GOOGLE_SHEET_ID || '1u7LT_cZn-SUzWxPNg1MZfPi0wsJNZfeUgEoilp0wemo',
    sheetName: process.env.GOOGLE_SHEET_NAME || 'Respuestas',
    
    // Método 1: Webhook de Google Apps Script (el más rápido y directo de configurar)
    appsScriptUrl: process.env.GOOGLE_APPS_SCRIPT_URL || '',

    // Método 2: Google Service Account oficial
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    privateKey: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  }
}

export default config
