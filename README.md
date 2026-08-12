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
