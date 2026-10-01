# ✦ Cata15Web - Web App de Invitación a Evento

Aplicación Web Single Page (SPA) moderna, minimalista y elegante para invitación a evento (15 años), desarrollada en **React 19 + Vite + Tailwind CSS**.

Diseñada bajo un concepto visual de **alto contraste (Dark Mode / Blanco / Negro)**, enfoque 100% utilitario y refinado, eliminando cualquier elemento sentimental o cursi y priorizando la experiencia de usuario (UX) para brindar información clara y recolectar confirmaciones de asistencia.

---

## 🎨 Concepto Visual y Arquitectura

El diseño sigue una estética editorial de lujo con un scroll vertical continuo:

1. **Fondo Fijo (Fixed Background / Parallax):**
   - Video de fondo sutil en loop con oscurecimiento controlado (`brightness: 0.42`).
   - Permanece fijo mientras el usuario se desplaza, revelando u ocultando el video a través de la alternancia de bloques sólidos y transparentes.

2. **Componente 1: Pantalla de Bienvenida (`WelcomeHero`):**
   - Hero overlay a pantalla completa (100vh) en fondo sólido blanco y tipografía editorial de alto impacto.
   - Botón interactivo central `INGRESAR` que genera un fade-out suave revelando el contenido interactivo y activando la música ambiental.

3. **Componente 2: Contador Dinámico (`Countdown`):**
   - Fondo transparente sobre el video en loop.
   - Cálculo en tiempo real de días, horas, minutos y segundos restantes hasta la fecha del evento.

4. **Componente 3: Tarjetas de Información (`InfoCards`):**
   - Bloques con alternancia de alto contraste:
     - **Tarjeta A (¿Cuándo?):** Fondo blanco sólido, icono de calendario lineal, fecha completa, hora y botón para agendar directamente en Google Calendar.
     - **Tarjeta B (¿Dónde?):** Fondo blanco sólido, icono de pin/ubicación lineal, dirección y botón con enlace directo a Google Maps.
     - **Tarjeta C (Regalos):** Fondo negro sólido, icono de caja de regalo lineal, mensaje sobrio y botón `HACER REGALO` que abre un modal con datos bancarios (CBU, Alias, Banco, Titular) y copia rápida al portapapeles.
     - **Tarjeta D (Dress Code):** Fondo blanco sólido, icono de diamante lineal y especificaciones de vestimenta elegante.

5. **Componente 4: Formulario de Asistencia (`RSVP`):**
   - Fondo negro pleno de alto contraste.
   - Campos:
     - Nombre (requerido)
     - Apellido (requerido)
     - ¿Asistirás? (selectores claros: *¡Sí, confirmo!* / *No podré asistir*)
     - Requerimientos alimenticios (Ninguno, Celíaco, Vegetariano, Vegano, Hipertenso, etc.)
     - Sugerencia musical (*¿Qué canción no puede faltar en la fiesta?*)
   - Manejo de estados (cargando, pantalla de éxito, error) con integración hacia Netlify Forms, API endpoint configurable vía variable de entorno y respaldo en almacenamiento local (`localStorage`).

6. **Componente 5: Footer / Despedida (`Footer`):**
   - Fondo transparente o sobrio con mensaje de cierre corto ("TE ESPERO"), año y destellos lineales minimalistas (`✦ ✧ ✦`).

7. **Reproductor de Audio Ambiental (`AudioPlayer`):**
   - Control flotante y discreto en la esquina inferior con animación de ondas sonoras, play/pause y soporte de inicio automático tras el clic en `INGRESAR`.

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 19.x | Componentes funcionales y Hooks (`useState`, `useEffect`, `useRef`) |
| **Vite** | 6.x | Bundler ultra rápido y entorno de desarrollo |
| **Tailwind CSS** | 3.4.x | Estilos utility-first y diseño responsive mobile-first |
| **Google Fonts** | - | Tipografías de lujo: *Cinzel*, *Playfair Display* y *Montserrat* |

---

## ⚙️ Variables de Entorno y Parametrización

Toda la data estática se encuentra centralizada en `src/config/eventData.js` y puede configurarse mediante variables de entorno en `.env` evitando valores hardcodeados.

Consulte el archivo [.env.template](file:///.env.template) para ver todas las opciones documentadas con comentarios y ejemplos.

### Lista de variables disponibles:

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `VITE_EVENT_MAIN_TITLE` | Título principal en la portada y Hero | `MIS XV CATALINA` |
| `VITE_EVENT_TITLE` | Nombre secundario | `CATALINA` |
| `VITE_EVENT_SUBTITLE` | Subtítulo descriptivo | `MIS XV AÑOS` |
| `VITE_HERO_DATE_DISPLAY` | Fecha mostrada en la pantalla de bienvenida | `20 • 11 • 2026` |
| `VITE_DISCO_BALLS_IMAGE` | Ruta de la imagen de fondo con bolas espejadas | `/assets/photos/a2c632e4-3d7f-434f-831a-6cfb07fc3aef.jpg` |
| `VITE_EVENT_TARGET_DATE` | Fecha objetivo ISO 8601 para el Countdown | `2026-11-20T20:00:00` |
| `VITE_EVENT_DATE_TEXT` | Texto legible de la fecha | `Viernes 20 de Noviembre de 2026` |
| `VITE_EVENT_TIME_TEXT` | Texto del horario | `20:00 hs (Puntual)` |
| `VITE_GOOGLE_CALENDAR_URL` | Enlace directo para añadir el evento al calendario | URL de Google Calendar |
| `VITE_VENUE_NAME` | Nombre del salón o recinto | `Salón Quintana` |
| `VITE_VENUE_ADDRESS` | Dirección completa del evento | `Quintana 30, Chacabuco, Buenos Aires` |
| `VITE_MAPS_URL` | Enlace para navegación en Google Maps | URL de búsqueda Maps |
| `VITE_MAPS_EMBED_URL` | URL del iframe para mapa integrado | Embed de Google Maps |
| `VITE_GIFTS_TEXT` | Texto explicativo para la sección de regalos | Mensaje formal |
| `VITE_BANK_HOLDER` | Nombre del titular de la cuenta | `Catalina Tonelli` |
| `VITE_BANK_NAME` | Nombre del banco o billetera | `Banco Galicia` |
| `VITE_BANK_CBU` | CBU bancario (22 dígitos) | `0070000000000000000000` |
| `VITE_BANK_ALIAS` | Alias de la cuenta bancaria | `CATA.15.FIESTA` |
| `VITE_BANK_ACCOUNT_TYPE` | Tipo de cuenta bancaria | `Caja de Ahorro en Pesos` |
| `VITE_DRESS_CODE` | Código de vestimenta | `Elegante` |
| `VITE_DRESS_CODE_DETAILS` | Aclaraciones del dress code | Indicaciones sobre tonos recomendados |
| `VITE_RSVP_DEADLINE` | Fecha límite para confirmar asistencia | `Por favor confirmar antes del 1 de Noviembre de 2026` |
| `VITE_RSVP_ENDPOINT` | URL de backend o webhook opcional para RSVP | `""` (usa Netlify Forms / LocalStorage) |
| `VITE_AUDIO_URL` | Enlace a la pista de audio ambiental | URL a archivo `.mp3` |
| `VITE_AUDIO_TITLE` | Título de la pista de música ambiental | `Música de bienvenida` |
| `VITE_FOOTER_CLOSING` | Frase de despedida en el footer | `TE ESPERO` |
| `VITE_FOOTER_YEAR` | Año visible en el footer | `2026` |

---

## 🚀 Instalación y Uso

### 1. Clonar el repositorio y acceder a la carpeta:
```bash
git clone https://github.com/gabrieltonelli/cata15web.git
cd cata15web
```

### 2. Configurar variables de entorno:
```bash
cp .env.template .env
```
Edite `.env` con los datos reales del evento.

### 3. Instalar dependencias:
```bash
npm install
```

### 4. Iniciar en modo desarrollo:
```bash
npm run dev
```

### 5. Compilar para producción:
```bash
npm run build
```
Los archivos optimizados se generarán en la carpeta `dist/`.

---

## 📁 Estructura del Proyecto

```
cata15web/
├── docs/
│   └── gu_a_de_diseño_y_requerimientos_refactorizacion_de_invitacion.md # Guía oficial
├── public/
│   ├── assets/
│   │   ├── icons/       # Iconografía SVG
│   │   └── video/       # Video de fondo hero-bg.mp4
│   ├── _redirects       # Reglas de redirección para SPA
│   └── favicon.svg      # Favicon minimalista
├── src/
│   ├── components/
│   │   ├── AudioPlayer.jsx     # Reproductor flotante de audio ambiental
│   │   ├── Countdown.jsx       # Componente 2: Contador en tiempo real
│   │   ├── FixedBackground.jsx # Fondo fijo de video en loop con gradiente
│   │   ├── Footer.jsx          # Componente 5: Cierre y despedida
│   │   ├── GiftModal.jsx       # Modal de datos bancarios con copia rápida
│   │   ├── InfoCards.jsx       # Componente 3: Tarjetas A, B, C y D
│   │   ├── RSVP.jsx            # Componente 4: Formulario de asistencia
│   │   └── WelcomeHero.jsx     # Componente 1: Pantalla inicial con botón INGRESAR
│   ├── config/
│   │   └── eventData.js        # Configuración centralizada vía import.meta.env
│   ├── styles/
│   │   └── index.css           # Estilos base y tokens de Tailwind
│   ├── App.jsx                 # Componente principal ensamblador
│   └── main.jsx                # Punto de entrada de React
├── .env.template               # Plantilla de variables de entorno documentada
├── .env                        # Variables locales (ignorado en git)
├── .gitignore                  # Configuración de exclusión para Git
├── package.json                # Dependencias y scripts
├── tailwind.config.js          # Configuración de diseño y tipografías
└── vite.config.js              # Configuración de Vite
```

---

## 📄 Licencia

Proyecto privado desarrollado para la celebración de 15 años de Catalina.
