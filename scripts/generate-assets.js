/**
 * Script para generar imágenes de ejemplo usando Pollinations.ai
 * No requiere API key ni registro
 * 
 * Uso: node scripts/generate-assets.js
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import https from 'https'
import http from 'http'

const BASE_DIR = join(process.cwd(), 'public', 'assets')

// Configuración de imágenes
const IMAGES = [
  // Foto principal de Catalina
  {
    name: 'catalina-main.jpg',
    dir: 'photos',
    width: 800,
    height: 1067,
    prompt: 'beautiful 15 year old latina girl, elegant portrait, soft lighting, pink and gold tones, professional photography, bokeh background, celebrating quinceanera'
  },
  // Fotos galería
  ...Array.from({ length: 6 }, (_, i) => ({
    name: `catalina-0${i + 1}.jpg`,
    dir: 'photos',
    width: 600,
    height: 600,
    prompt: [
      'happy teenage girl with friends at party, colorful decorations, celebration',
      'elegant quinceanera dress, pink gown, studio photo',
      'girl getting makeup done, beauty preparation, soft lighting',
      'girl doing hair styling, elegant updo, preparation',
      'sparkling jewelry and accessories, tiara, necklace, close up',
      'family portrait, happy parents with teenage daughter, warm tones'
    ][i]
  })),
  // Fotos previa
  ...Array.from({ length: 8 }, (_, i) => ({
    name: `previa-0${i + 1}-${['preparativos', 'vestido', 'maquillaje', 'pelo', 'accesorios', 'familia', 'amigas', 'momentos'][i]}.jpg`,
    dir: 'photos',
    width: 450,
    height: 600,
    prompt: [
      'behind the scenes party preparation, decorations being set up, balloons',
      'beautiful quinceanera dress hanging, pink and gold, elegant',
      'makeup artist applying makeup to young girl, beauty preparation',
      'hairstylist creating elegant updo hairstyle, hair preparation',
      'sparkling tiara and jewelry on velvet, elegant accessories',
      'family gathering, parents and daughter hugging, emotional moment',
      'group of teenage girls taking selfie, friends celebrating',
      'candid moment at party, dancing, joy, celebration'
    ][i]
  })),
  // Mapa del lugar
  {
    name: 'venue-map.jpg',
    dir: 'photos',
    width: 1200,
    height: 600,
    prompt: 'elegant event venue exterior, garden party location, decorated entrance, evening lighting, wedding venue style'
  }
]

// Función para descargar imagen
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    
    client.get(url, { timeout: 60000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Seguir redirect
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

// Función principal
async function generateAssets() {
  console.log('🎨 Generando assets de ejemplo con Pollinations.ai\n')
  
  // Crear directorios
  const dirs = ['photos', 'video', 'icons']
  dirs.forEach(dir => {
    const path = join(BASE_DIR, dir)
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true })
      console.log(`📁 Creado: assets/${dir}`)
    }
  })
  
  console.log('')
  
  // Generar imágenes
  let success = 0
  let failed = 0
  
  for (const img of IMAGES) {
    const filepath = join(BASE_DIR, img.dir, img.name)
    const encodedPrompt = encodeURIComponent(img.prompt)
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${img.width}&height=${img.height}&nologo=true`
    
    process.stdout.write(`⏳ ${img.name}... `)
    
    try {
      const size = await downloadImage(url, filepath)
      console.log(`✅ (${(size / 1024).toFixed(1)} KB)`)
      success++
    } catch (err) {
      console.log(`❌ ${err.message}`)
      failed++
    }
    
    // Pausa para no sobrecargar
    await new Promise(r => setTimeout(r, 1000))
  }
  
  console.log(`\n📊 Resultado: ${success} éxitos, ${failed} fallos`)
  console.log('\n✨ Assets generados en public/assets/')
}

generateAssets().catch(console.error)
