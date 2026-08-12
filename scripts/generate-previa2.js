/**
 * Script para generar imágenes de previa restantes
 * Uso: node scripts/generate-previa2.js
 */

import { writeFileSync } from 'fs'
import { join } from 'path'
import https from 'https'
import http from 'http'

const PHOTOS_DIR = join(process.cwd(), 'public', 'assets', 'photos')

const PREVIA_IMAGES = [
  { name: 'previa-05-accesorios.jpg', prompt: 'sparkling crystal tiara and pearl necklace on pink velvet cushion, elegant jewelry display, soft bokeh' },
  { name: 'previa-06-familia.jpg', prompt: 'happy family portrait, parents hugging teenage daughter, emotional moment, warm golden hour lighting' },
  { name: 'previa-07-amigas.jpg', prompt: 'group of teenage girls taking selfie together, laughing, colorful party decorations background, joyful moment' },
  { name: 'previa-08-momentos.jpg', prompt: 'candid party moment, young people dancing happily, confetti, colorful lights, celebration atmosphere' }
]

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    
    client.get(url, { timeout: 120000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject)
        return
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`))
        return
      }
      
      const chunks = []
      res.on('data', chunk => chunks.push(chunk))
      res.on('end', () => {
        const buffer = Buffer.concat(chunks)
        writeFileSync(filepath, buffer)
        resolve(buffer.length)
      })
      res.on('error', reject)
    }).on('error', reject)
  })
}

async function generatePrevia() {
  console.log('📸 Generando imágenes de previa restantes...\n')
  
  let success = 0
  let failed = 0
  
  for (const img of PREVIA_IMAGES) {
    const filepath = join(PHOTOS_DIR, img.name)
    const encodedPrompt = encodeURIComponent(img.prompt)
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=450&height=600&nologo=true`
    
    process.stdout.write(`⏳ ${img.name}... `)
    
    try {
      const size = await downloadImage(url, filepath)
      console.log(`✅ (${(size / 1024).toFixed(1)} KB)`)
      success++
    } catch (err) {
      console.log(`❌ ${err.message}`)
      failed++
    }
    
    // Pausa entre imágenes
    await new Promise(r => setTimeout(r, 500))
  }
  
  console.log(`\n📊 Resultado: ${success} éxitos, ${failed} fallos`)
}

generatePrevia().catch(console.error)
