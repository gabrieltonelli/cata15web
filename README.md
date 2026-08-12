# 🎀 Cata15Web - Página de Quinceañera de Catalina

Sitio web interactivo con animaciones de scroll para celebrar los 15 años de Catalina.

**Repo:** [github.com/gabrieltonelli/cata15web](https://github.com/gabrieltonelli/cata15web)

---

## ✨ Características

- **Hero con parallax** y partículas flotantes animadas
- **Scroll reveal** línea por línea en secciones de texto
- **Horizontal scroll** en galería de fotos
- **Countdown animado** para el evento
- **Formulario de sugerencias musicales** con votación
- **RSVP interactivo** con partículas reactivas
- **Scroll suave** con GSAP ScrollSmoother
- **Diseño responsive** (mobile-first)
- **Tema personalizado** con colores rosa, púrpura y dorado

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19.x | Framework UI |
| Vite | 6.x | Bundler y dev server |
| GSAP | 3.x | Animaciones y scroll |
| ScrollTrigger | - | Animaciones basadas en scroll |
| ScrollSmoother | - | Scroll suave |
| Tailwind CSS | 3.x | Estilos utility-first |

---

## 📋 Prerrequisitos

- **Node.js** >= 18.0.0 ([descargar](https://nodejs.org/))
- **npm** >= 9.0.0 (viene con Node.js)
- Git (opcional, para clonar)

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/gabrieltonelli/cata15web.git
cd cata15web
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

### 4. Abrir en el navegador

```
http://localhost:5173
```

> El servidor se reinicia automáticamente al guardar cambios (Hot Module Replacement).

---

## 📦 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Ejecuta linter (ESLint) |

---

## 📁 Estructura del Proyecto

```
cata15web/
├── public/
│   └── favicon.svg          # Icono personalizado
├── src/
│   ├── components/
│   │   ├── Hero.jsx         # Sección principal con parallax
│   │   ├── Invitation.jsx   # Invitación con scroll reveal
│   │   ├── CatalinaBio.jsx  # Bio de la quinceañera
│   │   ├── PreviaGallery.jsx # Galería horizontal scroll
│   │   ├── EventDetails.jsx # Detalles del evento + countdown
│   │   ├── MusicSuggestions.jsx # Sugerencias musicales
│   │   ├── RSVP.jsx         # Confirmación de asistencia
│   │   └── Footer.jsx       # Pie de página
│   ├── styles/
│   │   └── index.css        # Estilos globales + Tailwind
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 📸 Guía de Assets Multimedia

### 📊 Resumen General

| Categoría | Cantidad | Formato | Directorio |
|-----------|----------|---------|------------|
| Videos | 1 | MP4/WebM | `public/assets/video/` |
| Fotos principales | 1 | JPG/PNG | `public/assets/photos/` |
| Fotos galería | 6 | JPG/PNG | `public/assets/photos/` |
| Fotos previa | 8 | JPG/PNG | `public/assets/photos/` |
| Mapa del lugar | 1 | JPG/PNG | `public/assets/photos/` |
| Iconos SVG | 5 | SVG | `public/assets/icons/` |
| **TOTAL** | **22 archivos** | | |

### 🎬 Video Hero (1 archivo)

| Campo | Valor |
|-------|-------|
| **Archivo** | `hero-bg.mp4` |
| **Formato** | MP4 (H.264) + WebM (fallback) |
| **Resolución** | 1920x1080 (Full HD) |
| **Duración** | 10-30 segundos (loop) |
| **Tamaño máx** | 5-10 MB |
| **Dir** | `public/assets/video/` |
| **Uso** | Fondo animado en Hero section |

### 👩 Foto Principal de Catalina (1 archivo)

| Campo | Valor |
|-------|-------|
| **Archivo** | `catalina-main.jpg` |
| **Formato** | JPG (calidad 85%) |
| **Resolución** | 800x1067 (3:4) |
| **Tamaño máx** | 200-400 KB |
| **Dir** | `public/assets/photos/` |
| **Uso** | Sección Bio - Foto principal |

### 📸 Fotos Galería Bio (6 archivos)

| # | Archivo | Resolución | Uso |
|---|---------|------------|-----|
| 1 | `catalina-01.jpg` | 600x600 (1:1) | Grid galería |
| 2 | `catalina-02.jpg` | 600x600 (1:1) | Grid galería |
| 3 | `catalina-03.jpg` | 600x600 (1:1) | Grid galería |
| 4 | `catalina-04.jpg` | 600x600 (1:1) | Grid galería |
| 5 | `catalina-05.jpg` | 600x600 (1:1) | Grid galería |
| 6 | `catalina-06.jpg` | 600x600 (1:1) | Grid galería |

**Formato:** JPG | **Tamaño máx:** 100-200 KB c/u | **Dir:** `public/assets/photos/`

### 🎀 Fotos Horizontal Scroll - La Previa (8 archivos)

| # | Archivo | Resolución | Uso |
|---|---------|------------|-----|
| 1 | `previa-01-preparativos.jpg` | 450x600 (3:4) | Scroll horizontal |
| 2 | `previa-02-vestido.jpg` | 450x600 (3:4) | Scroll horizontal |
| 3 | `previa-03-maquillaje.jpg` | 450x600 (3:4) | Scroll horizontal |
| 4 | `previa-04-pelo.jpg` | 450x600 (3:4) | Scroll horizontal |
| 5 | `previa-05-accesorios.jpg` | 450x600 (3:4) | Scroll horizontal |
| 6 | `previa-06-familia.jpg` | 450x600 (3:4) | Scroll horizontal |
| 7 | `previa-07-amigas.jpg` | 450x600 (3:4) | Scroll horizontal |
| 8 | `previa-08-momentos.jpg` | 450x600 (3:4) | Scroll horizontal |

**Formato:** JPG | **Tamaño máx:** 100-150 KB c/u | **Dir:** `public/assets/photos/`

### 🗺️ Mapa del Evento (1 archivo)

| Campo | Valor |
|-------|-------|
| **Archivo** | `venue-map.jpg` |
| **Formato** | JPG |
| **Resolución** | 1200x600 (2:1) |
| **Tamaño máx** | 200-300 KB |
| **Dir** | `public/assets/photos/` |
| **Uso** | Sección Event Details |

### 🎨 Iconos SVG (5 archivos)

| # | Archivo | Uso |
|---|---------|-----|
| 1 | `envelope.svg` | Icono de invitación |
| 2 | `sparkle.svg` | Estrella decorativa |
| 3 | `note-music.svg` | Nota musical |
| 4 | `heart.svg` | Corazón |
| 5 | `star.svg` | Estrella |

**Dir:** `public/assets/icons/`

### 📁 Estructura de Directorios

```
public/
└── assets/
    ├── video/
    │   ├── hero-bg.mp4
    │   └── hero-bg.webm
    ├── photos/
    │   ├── catalina-main.jpg
    │   ├── catalina-01.jpg
    │   ├── catalina-02.jpg
    │   ├── catalina-03.jpg
    │   ├── catalina-04.jpg
    │   ├── catalina-05.jpg
    │   ├── catalina-06.jpg
    │   ├── previa-01-preparativos.jpg
    │   ├── previa-02-vestido.jpg
    │   ├── previa-03-maquillaje.jpg
    │   ├── previa-04-pelo.jpg
    │   ├── previa-05-accesorios.jpg
    │   ├── previa-06-familia.jpg
    │   ├── previa-07-amigas.jpg
    │   ├── previa-08-momentos.jpg
    │   └── venue-map.jpg
    └── icons/
        ├── envelope.svg
        ├── sparkle.svg
        ├── note-music.svg
        ├── heart.svg
        └── star.svg
```

### 📋 Guía de Nomenclatura

```
[categoria]-[numero]-[descriptor].[formato]

Ejemplos:
- catalina-main.jpg
- catalina-01.jpg
- previa-01-preparativos.jpg
- hero-bg.mp4
- venue-map.jpg
```

### ⚙️ Especificaciones Técnicas

| Tipo | Formato | Compresión | Color Profile |
|------|---------|------------|---------------|
| Fotos JPG | .jpg | Calidad 80-85% | sRGB |
| Video MP4 | .mp4 | H.264, CRF 23 | - |
| Video WebM | .webm | VP9 | - |
| Iconos | .svg | Optimizado | - |

### 🔄 Checklist de Reemplazo

| Componente | Placeholder | Reemplazar con |
|------------|-------------|----------------|
| `Hero.jsx` | Gradiente animado | `hero-bg.mp4` |
| `CatalinaBio.jsx` | `👩` emoji | `catalina-main.jpg` |
| `CatalinaBio.jsx` | Gradientes color | `catalina-01.jpg` a `catalina-06.jpg` |
| `PreviaGallery.jsx` | Emojis | `previa-01.jpg` a `previa-08.jpg` |
| `EventDetails.jsx` | `🗺️` emoji | `venue-map.jpg` |

### 🤖 Generar Imágenes de Ejemplo

El proyecto incluye un script para generar imágenes de ejemplo usando **Pollinations.ai** (gratis, sin API key):

```bash
node scripts/generate-assets.js
```

Esto creará imágenes de ejemplo en `public/assets/photos/`. Luego reemplázalas con fotos reales.

### 📝 Notas de Optimización

1. **Herramientas de compresión:**
   - [Squoosh](https://squoosh.app/) - Compresión inteligente
   - [TinyPNG](https://tinypng.com/) - Compresión JPG/PNG
   - [Cloudinary](https://cloudinary.com/) - CDN con transformaciones

2. **Responsive:** Las fotos se redimensionan automáticamente con CSS

3. **Lazy loading:** Agregar `loading="lazy"` a imágenes no críticas:
   ```jsx
   <img src="/assets/foto.jpg" loading="lazy" alt="..." />
   ```

4. **Formatos modernos:** Considerar WebP para mejor compresión:
   ```html
   <picture>
     <source srcset="/assets/foto.webp" type="image/webp">
     <img src="/assets/foto.jpg" alt="...">
   </picture>
   ```

---

## 🎨 Personalización

### Colores

Edita `tailwind.config.js` para cambiar la paleta:

```js
colors: {
  'rosa': '#FF6B9D',        // Rosa principal
  'rosa-claro': '#FFB3CC',  // Rosa claro
  'pupura': '#C44DFF',      // Púrpura
  'dorado': '#FFD93D',      // Dorado
  'oscuro': '#1A1A2E',      // Fondo oscuro
}
```

### Fuentes

Las fuentes están configuradas en `index.html` y `tailwind.config.js`:

- **Playfair Display** - Títulos elegantes
- **Montserrat** - Texto general
- **Dancing Script** - Texto manuscrito

### Contenido

Cada componente tiene placeholders para:

- Fotos de Catalina (reemplazar con imágenes reales)
- Video de fondo en Hero
- Dirección y detalles del evento
- Información de contacto en Footer

---

## 🖼️ Agregar Imagenes

1. Coloca las imágenes en `public/assets/`
2. Referencia en componentes:

```jsx
<img src="/assets/foto-catalina.jpg" alt="Catalina" />
```

Para el video de fondo en Hero, agrega en `Hero.jsx`:

```jsx
<video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
  <source src="/assets/video-bg.mp4" type="video/mp4" />
</video>
```

---

## 🚢 Deploy

### Vercel (Recomendado)

```bash
npm i -g vercel
vercel
```

### Netlify

1. Push a GitHub
2. Conecta el repo en Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

```bash
npm run build
# Subir carpeta dist/ a gh-pages
```

---

## 🐛 Solución de Problemas

### Error: "npm not found"

Instala Node.js desde [nodejs.org](https://nodejs.org/)

### Error: "port 5173 already in use"

```bash
# Usa otro puerto
npm run dev -- --port 3000
```

### Animaciones no funcionan

- Verifica que GSAP esté instalado: `npm list gsap`
- Abre consola del navegador (F12) para ver errores

### Estilos no se aplican

```bash
# Reinicia el servidor de desarrollo
# Ctrl+C y luego npm run dev
```

---

## 📄 Licencia

Proyecto personal - Uso privado

---

## 👨‍💻 Autor

Gabriel Tonelli - [GitHub](https://github.com/gabrieltonelli)
