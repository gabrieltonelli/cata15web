# AGENTS.md - Contexto del Proyecto para OpenCode

## Resumen del Proyecto

**Cata15Web** es un sitio web de invitación para los 15 años de Catalina. Estética **disco de los '70**: bola espejada de discoteca como protagonista visual, fondo oscuro, luz dura, reflejos largos.

El evento es el **20 de noviembre de 2026** en Quintana 30, Chacabuco, Buenos Aires, Argentina.

**Idioma:** Español argentino (usa "vos")

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.x | UI Framework (JSX, NO TypeScript) |
| Vite | 6.x | Bundler + Dev Server |
| GSAP | 3.12.x | Animaciones scroll (ScrollTrigger) |
| Lenis | 1.x | Smooth scroll (reemplaza ScrollSmoother) |
| Motion | 12.x | Solo LoadingScreen (Framer Motion successor) |
| Tailwind CSS | 3.4.x | Estilos utility-first |

**Módulos:** ES Modules (`"type": "module"`)

---

## Comandos Importantes

```bash
npm run dev      # Dev server en localhost:5173
npm run build    # Build producción → dist/
npm run lint     # ESLint
```

**Puerto:** 5173 (configurado en `vite.config.js` con `host: true`)

---

## Registro Visual (Bloqueado)

- **Fondo:** #0A0A0F · **Texto:** #EDEDED · **Gris:** #6E6E73
- **Prohibidos:** #FF69B4, #FFD700, gradientes rosa-a-violeta, glassmorphism, pastel, dorado texturizado
- **Prohibidos:** partículas con mouse, ornamentos ✦ ✨, emojis inline, etiquetas de sección
- **Cursor:** sistema (no propio)

### Colores de Acento (4 momentos del reflejo)
- `magenta`: #E91E90 — foco principal
- `azul`: #2D7AFF — contraluz
- `violeta`: #8B5CF6 — mezcla
- `plata`: #C0C0C0 — reflejo puro

Cada color tiene su momento en el scroll, nunca los cuatro juntos.

---

## Tipografía (Bloqueada)

| Fuente | Uso | Prohibidas |
|--------|-----|------------|
| **Clash Display** | Titulares | Playfair, Montserrat, Inter, Roboto, Poppins, Space Grotesk, serif |
| **Satoshi** | Cuerpo de texto | Dancing Script (reemplazada por Clash Display itálica/light) |
| **JetBrains Mono** | Datos técnicos, countdown, fechas | |

---

## Estructura del Código

```
src/
├── main.jsx              # Entry point (createRoot)
├── App.jsx               # Root: LoadingScreen → Lenis → secciones
├── styles/
│   └── index.css         # Tailwind + .disco-grid + .letterbox + .flash-* 
└── components/
    ├── LoadingScreen.jsx  # Motion: progreso minimalista
    ├── Hero.jsx           # Parallax 2 capas (fondo 16:9 + cutout) + mouse
    ├── Invitation.jsx     # Solo tipografía, scroll reveal
    ├── CatalinaBio.jsx    # Bio + grilla fotos existentes
    ├── ElBrillo.jsx       # VIDEO SCROLL-DRIVEN pineado 300vh
    ├── EventDetails.jsx   # Countdown + datos + Google Maps
    ├── MusicSuggestions.jsx # Form + votación (localStorage)
    ├── RSVP.jsx           # Netlify Forms + flash de 4 colores al enviar
    ├── PreviaGallery.jsx  # Horizontal scroll gallery
    └── Footer.jsx         # Contacto minimalista

public/
├── assets/
│   ├── icons/
│   ├── photos/    # catalina-*, previa-*, venue-map
│   └── video/     # hero-bg.mp4/.webm (bola espejada)
└── _redirects     # Netlify SPA redirect
```

---

## Patrones de Código Importantes

### 1. GSAP en Componentes (sin ScrollSmoother)
```jsx
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Component() {
  const ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, { y: 60, opacity: 0, ... });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <section ref={ref}>...</section>;
}
```

### 2. Lenis en App.jsx
- Se inicializa DESPUÉS del LoadingScreen
- `new Lenis({ duration: 1.2, easing: ..., touchMultiplier: 1.5 })`
- raf loop manual

### 3. Hero: Parallax con GSAP ScrollTrigger (NO animation-timeline CSS)
- Dos capas: fondo 16:9 oscurecido + cutout nítido
- `gsap.to(bg, { yPercent: 30, scrub: 1.5 })` (fondo lento)
- `gsap.to(ball, { yPercent: 15, scrub: 0.8 })` (bola medio)
- Mouse: `translate()` con easing suave (~20px max)

### 4. ElBrillo: Video Scroll-Driven
- Sección pineada de 300vh con `ScrollTrigger.create({ pin: container })`
- `onUpdate` scrub: `video.currentTime = progress * video.duration`
- Textos escalonados con opacity/scroll
- Poster: primer cuadro como imagen fija antes de cargar

### 5. RSVP: Flash de Colores
- Al enviar: 4 divs con clase `.flash-magenta`, `.flash-azul`, `.flash-violeta`, `.flash-plata`
- Animación CSS `flash-reflect` (0.8s, staggered)

### 6. Fondo: Grilla de Pista de Baile
- Clase `.disco-grid` fija con CSS `perspective + rotateX`
- Líneas finas en cuadrícula, mask radial
- `.grid-sparkle`: puntos que parpadean sobre la grilla

### 7. Placeholders de Imágenes
- Clase `.letterbox` con borde dashed y texto monoespacio indicando qué archivo va ahí
- Ejemplo: `<div className="letterbox"><span>ball-cutout.png</span></div>`

---

## Inventario de Imágenes (Cerrado)

| # | Archivo | Uso |
|---|---------|-----|
| 1 | bola-espejada-vertical.png | Hero, capa frontal (generada con Nano Banana 2) |
| 2 | bola-espejada-cutout.png | Hero, capa recortada (remove_background) |
| 3 | bola-espejada-16-9.png | Hero, capa de fondo (generada 16:9) |
| 4 | catalina-main.jpg | Sección Catalina |
| 5 | catalina-01 a 06.jpg | Grilla Catalina |
| 6 | previa-01 a 08.jpg | Galería horizontal |
| 7 | hero-bg.mp4 | Sección El Brillo (video bola girando) |

Ninguna sección puede pedir una imagen fuera de esta lista.

---

## Reglas de Oficio

- Titulares de 8 palabras máximo. Párrafos de 25.
- Cero guiones largos (—)
- Un solo texto de botón en toda la página (RSVP: "Confirmar asistencia")
- Con animaciones desactivadas, el sitio se cuenta entero
- Las secciones sin imagen se resuelven con tipografía y CSS

---

## Deploy

- **Netlify** configurado en `netlify.toml`
- Build: `npm run build` → `dist/`
- Forms: `rsvp` y `music-suggestions` con honeypot
- Redirect SPA en `public/_redirects`

---

## Archivos de Configuración Clave

| Archivo | Propósito |
|---------|-----------|
| `vite.config.js` | React plugin, host:true, port:5173 |
| `tailwind.config.js` | Colores disco, fonts (Clash/Satoshi/JetBrains) |
| `postcss.config.js` | tailwindcss + autoprefixer |
| `netlify.toml` | Deploy config + form handling |
| `index.html` | FontShare fonts + mount point #root |
