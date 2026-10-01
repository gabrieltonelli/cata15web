import serverless from 'serverless-http'
import app from '../src/app.js'

// Exporta el handler serverless para Netlify Functions
export const handler = serverless(app)
