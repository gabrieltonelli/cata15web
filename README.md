# ✦ Cata15Web - Monorepo (Client + Server)

Aplicación Web de Invitación a Evento (15 años) con arquitectura **Monorepo limpia**:
- **Frontend (`client/`)**: Desarrollado con **React 19 + Vite + Tailwind CSS**, bajo un concepto estético de alto contraste (*Dark Mode / Blanco / Negro*), tipografía editorial y transiciones de video fluidas. Maneja sus propias dependencias y su propio archivo de entorno `client/.env`.
- **Backend (`server/`)**: API REST con **Express y Netlify Functions** para procesar las confirmaciones de asistencia (RSVP) y persistirlas en **Google Sheets** sin exponer credenciales en el cliente web. Maneja sus propias dependencias y su propio archivo de entorno `server/.env`.

---

## 📁 Estructura del Proyecto

```text
cata15web/
├── client/                      # Frontend autónomo (SPA React + Vite)
│   ├── public/                  # Multimedia (videos, fotos, audio Rihanna-Diamonds.mp3, favicon)
│   │   ├── capture.html         # Mini-app generadora de imágenes Open Graph (600x600 WhatsApp preview)
│   │   └── assets/              # icons, photos, mp3, video
│   ├── src/
│   │   ├── components/          # WelcomeHero, Countdown, InfoCards, RSVP, Footer, etc.
│   │   ├── config/              # eventData.js (parametrización)
│   │   └── styles/              # index.css (Tailwind & custom utilities)
│   ├── .env                     # Variables de entorno locales del cliente (ignorado en git)
│   ├── .env.template            # Plantilla documentada de variables del cliente
│   ├── package.json             # Dependencias y scripts de React/Vite
│   └── vite.config.js           # Configuración con proxy hacia http://localhost:3002/api
│
├── server/                      # Backend autónomo (Node.js + Express + Netlify Functions)
│   ├── data/                    # submissions.json (resguardo local de seguridad)
│   ├── functions/
│   │   └── api.js               # Handler serverless para Netlify Functions
│   ├── src/
│   │   ├── config/env.js        # Carga de server/.env y validación
│   │   ├── services/
│   │   │   └── sheetsService.js # Persistencia en Google Sheets (Apps Script / Service Account / Local)
│   │   ├── app.js               # Express application (/api/health, /api/rsvp)
│   │   └── server.js            # Servidor local Express
│   ├── .env                     # Variables y credenciales del servidor (ignorado en git)
│   ├── .env.template            # Plantilla documentada de variables del servidor
│   └── package.json             # Dependencias y scripts del backend
│
├── docs/
│   ├── google-apps-script.js    # Código listo para pegar en Google Sheets Apps Script
│   └── gu_a_de_diseño_y_requerimientos_refactorizacion_de_invitacion.md
├── netlify.toml                 # Configuración de despliegue para Netlify (build & functions)
└── README.md                    # Documentación del proyecto
```

---

## 🚀 Cómo Levantar el Proyecto Localmente

Tanto el backend como el frontend son completamente autónomos. Abrí dos terminales:

### 1. Iniciar el Servidor Backend (`server/`)
```bash
cd server
npm install    # (solo la primera vez)
npm run dev
```
El backend iniciará en **`http://localhost:3002`** (parametrizable vía `PORT` en `server/.env`) con los endpoints:
- Comprobación de estado: `http://localhost:3002/api/health`
- Recepción de confirmaciones: `http://localhost:3002/api/rsvp`

### 2. Iniciar el Cliente Frontend (`client/`)
```bash
cd client
npm install    # (solo la primera vez)
npm run dev
```
El cliente iniciará en **`http://localhost:5173`**. Las llamadas a `/api/*` son reenviadas automáticamente por el proxy de Vite hacia el servidor en `http://localhost:3002`.

---

## 📊 Persistencia en Google Sheets

Planilla de destino:
👉 **[Ver Planilla de Google Sheets](https://docs.google.com/spreadsheets/d/1u7LT_cZn-SUzWxPNg1MZfPi0wsJNZfeUgEoilp0wemo/edit?usp=sharing)**
*(ID: `1u7LT_cZn-SUzWxPNg1MZfPi0wsJNZfeUgEoilp0wemo`)*

El backend soporta **dos métodos de conexión** sin exponer credenciales en el cliente:

### Método 1: Google Apps Script Webhook (Recomendado - 2 minutos)
Es la forma más sencilla, segura y directa ya que no requiere dar de alta un proyecto en Google Cloud Console:
1. Abrí la planilla en tu navegador.
2. Hacé clic en **Extensiones** ➔ **Apps Script**.
3. Copiá el código completo que se encuentra en [docs/google-apps-script.js](file:///c:/Users/gabrielt/Documents/Proyectos/PROPIOS/cata15web/docs/google-apps-script.js) y reemplazá el contenido del editor.
4. Hacé clic en **Guardar** (ícono de disquete).
5. Hacé clic en **Implementar** ➔ **Nueva implementación**.
6. Seleccioná el tipo **Aplicación web**:
   - *Descripción*: `Webhook RSVP Mis XV`
   - *Ejecutar como*: `Yo` (tu cuenta)
   - *Quién tiene acceso*: `Cualquier persona` (Anyone)
7. Hacé clic en **Implementar** y autorizá los permisos.
8. Copiá la **URL de la aplicación web** generada (termina en `/exec`).
9. Pegá dicha URL en `server/.env`:
   ```env
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```

### Método 2: Google Cloud Service Account (API Oficial v4)
Si preferís utilizar una cuenta de servicio de Google Cloud:
1. En Google Cloud Console, habilitá la **Google Sheets API**.
2. Creá una **Cuenta de Servicio** y generá una clave en formato JSON.
3. Compartí la planilla de Google Sheets con el correo de la cuenta de servicio con permisos de **Editor**.
4. Configurá las variables en `server/.env`:
   ```env
   GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-servicio@proyecto.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

### Resguardo Local de Seguridad (Fallback)
Si aún no configuraste ninguna credencial de Google, el backend **resguarda automáticamente las confirmaciones** en el archivo local `server/data/submissions.json` y avisa por consola. De esta forma:
- El formulario web nunca falla de cara al invitado.
- Los datos nunca se pierden durante pruebas locales o antes del despliegue final.

---

## 🌐 Despliegue en Netlify

El archivo [netlify.toml](file:///c:/Users/gabrielt/Documents/Proyectos/PROPIOS/cata15web/netlify.toml) compila el frontend e instala las dependencias de la función backend sin requerir dependencias en la raíz:

```toml
[build]
  command = "cd client && npm install && npm run build"
  publish = "client/dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

1. **Variables de entorno en el panel de Netlify** (*Site configuration* ➔ *Environment variables*):
   - `GOOGLE_SHEET_ID`: `1u7LT_cZn-SUzWxPNg1MZfPi0wsJNZfeUgEoilp0wemo`
   - `GOOGLE_APPS_SCRIPT_URL`: (la URL de tu Webhook de Apps Script)
   - *(Opcional)* `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_PRIVATE_KEY` si usás Service Account.

---

## ⚙️ Variables de Entorno y Parametrización

### Frontend (`client/.env`)
Documentadas con comentarios y ejemplos en [client/.env.template](file:///c:/Users/gabrielt/Documents/Proyectos/PROPIOS/cata15web/client/.env.template):
- `VITE_EVENT_MAIN_TITLE`: Título principal (`MIS XV CATALINA`).
- `VITE_HERO_VIDEO`: Ruta del video de fondo del Hero (`/assets/video/hero-bg2.mp4`).
- `VITE_HERO_VIDEO_BOOMERANG`: Activar o desactivar efecto boomerang en el Hero (`true` o `false`, recomendado `false` para móviles).
- `VITE_TRANSITION_VIDEO`: Ruta del video de la sección Una Noche Inolvidable.
- `VITE_TRANSITION_VIDEO_BOOMERANG`: Activar o desactivar efecto boomerang en transición (`true` o `false`, recomendado `false`).
- `VITE_VIDEO_AUTO_PAUSE`: Pausa automática con `IntersectionObserver` cuando el video sale de pantalla para liberar GPU/RAM (`true` o `false`, default: `true`).
- `VITE_VIDEO_CSS_FILTERS`: Habilitar o desactivar filtros CSS en tiempo real (grayscale/contrast) para teléfonos de baja gama (`true` o `false`, default: `true`).
- `VITE_EVENT_TARGET_DATE`: Fecha y hora para la cuenta regresiva.
- `VITE_VENUE_LATITUDE` y `VITE_VENUE_LONGITUDE`: Coordenadas mostradas en la sección “Dónde”.
- `VITE_RSVP_ENDPOINT`: Endpoint hacia la API (por defecto `/api/rsvp`).
- `VITE_WHATSAPP_PHONE`: Teléfono de contacto de WhatsApp.
- `VITE_WHATSAPP_MESSAGE`: Mensaje preconfigurado al contactar.
- `VITE_SITE_URL`: URL base pública del sitio desplegado (`https://cata15.netlify.app`).
- `VITE_OG_IMAGE`: Ruta de la imagen para vista previa Open Graph / WhatsApp (`/assets/photos/og-preview.jpg`).
- `VITE_OG_TITLE`: Título para la tarjeta de previsualización (`CATALINA • MIS XV`).
- `VITE_OG_DESCRIPTION`: Descripción para la tarjeta de previsualización de WhatsApp y redes.
- `VITE_SCROLL_HINT_ENABLED`: Activar o desactivar ayuda visual animada de scroll (`true` o `false`).
- `VITE_SCROLL_HINT_INITIAL_DELAY_MS`: Tiempo de espera en milisegundos tras entrar al Hero para mostrar la primera ayuda (por defecto `3000` = 3s).
- `VITE_SCROLL_HINT_REPEAT_DELAY_MS`: Intervalo en milisegundos para repetir la ayuda si continúa sin scrollear (por defecto `10000` = 10s).
- `VITE_SCROLL_HINT_DURATION_MS`: Tiempo de permanencia de la ayuda visual en pantalla antes del fade-out (en milisegundos, por defecto `2800` = 2.8s).
- `VITE_SCROLL_HINT_DISMISS_THRESHOLD_PX`: Umbral mínimo en píxeles de scroll o arrastre vertical para considerar que el usuario scrolleó y desactivar la ayuda (por defecto `120` px, previene cancelaciones accidentales por micro-desplazamientos de 1 o 2 px).
- `VITE_SCROLL_HINT_PEEK_DISTANCE`: Desplazamiento en píxeles del peek automático hacia abajo y retorno (por defecto `140`).
- `VITE_SCROLL_HINT_MOBILE_ONLY`: Limitar la visualización exclusivamente a móviles y pantallas táctiles (`true` o `false`).

### Backend (`server/.env`)
Documentadas con comentarios y ejemplos en [server/.env.template](file:///c:/Users/gabrielt/Documents/Proyectos/PROPIOS/cata15web/server/.env.template):
- `PORT`: Puerto del servidor local (`3002`).
- `CORS_ORIGIN`: Origen permitido para CORS (`*`).
- `GOOGLE_SHEET_ID`: ID del documento de Google Sheets.
- `GOOGLE_SHEET_NAME`: Nombre de la pestaña de respuestas (`Respuestas`).
- `GOOGLE_APPS_SCRIPT_URL`: URL del Webhook de Apps Script.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Email de la cuenta de servicio de Google.
- `GOOGLE_PRIVATE_KEY`: Clave privada RSA de la cuenta de servicio.

---

## 🎨 Aspectos Visuales y Experiencia de Usuario

- **Video de Fondo y Transición de Alto Rendimiento (Optimizado para Móviles):**
  - **Loop Nativo HTML5:** Reproducción directa acelerada por hardware de los codecs nativos del dispositivo (`MediaCodec` en Android / `AVPlayer` en iOS), prescindiendo del reverso por software (efecto boomerang) para eliminar el consumo innecesario de CPU y saltos de fotogramas.
  - **Eliminación de Videos Duplicados Ocultos:** Se optimizó [client/src/components/FixedBackground.jsx](file:///c:/Users/gabrielt/Documents/Proyectos/PROPIOS/cata15web/client/src/components/FixedBackground.jsx) para ser un fondo base liviano con gradiente y textura, eliminando la segunda instancia redundante de video que corría por debajo del Hero.
  - **Auto-Pausa con IntersectionObserver:** [client/src/components/BoomerangVideo.jsx](file:///c:/Users/gabrielt/Documents/Proyectos/PROPIOS/cata15web/client/src/components/BoomerangVideo.jsx) pausa automáticamente el video tan pronto sale del viewport y lo reanuda al entrar, garantizando que el smartphone decodifique **un único video a la vez**.
  - **Composición en GPU (Hardware Layer):** Directivas CSS (`translateZ(0)`, `will-change: transform`) que aislan el video en su propia capa de renderizado, evitando repintados continuos del resto de la página.
  - **Control de Filtros CSS:** Parametrizables vía `VITE_VIDEO_CSS_FILTERS="true"`/`"false"` para dispositivos con GPUs muy limitadas.
- **Efecto de Entrada Progresivo (Scroll Reveal):**
  - Implementación con `IntersectionObserver` de alto rendimiento (`threshold: 0.12`, `rootMargin: '0px 0px -40px 0px'`).
  - Transición fluida con curva de desaceleración editorial de lujo `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Desplazamiento y escalado microscópico suave (`opacity: 0 -> 1`, `translateY: 28px -> 0`, `scale: 0.985 -> 1`).
  - Animación única por elemento (`unobserve`) que evita interrupciones o saltos visuales durante la lectura.
  - Aplicado a todas las secciones posteriores al Hero: ¿Cuándo?, Una Noche Inolvidable (Boomerang), ¿Dónde?, Regalos, Dress Code, RSVP y Footer "Te Espero".
- **Iconos Animados One-Shot (Estética de Línea Fina):**
  - Animación secuencial que se ejecuta **una única vez tras la aparición** en pantalla de cada sección, sin loops infinitos molestos:
    - **¿Cuándo? (Fecha y Horario):** Trazo vectorial dinámico del marco del calendario (`anim-draw-stroke`) seguido de la aparición en cascada armónica (staggered pop) de los días.
    - **¿Dónde? (Ubicación):** Descenso elástico suave del pin de mapa con micro-rebote y onda sonar concéntrica que emana en la base al fijarse la coordenada.
    - **Regalos (Presentes):** Apertura sutil de la tapa de la caja con respiración del moño y destello suave de cinta antes de asentarse.
    - **Dress Code (Vestimenta):** Trazado orfebre del diamante facetado con barrido diagonal de reflejo especular (*shimmer sweep*).
  - Conservan la estética minimalista de líneas negras puras (o blancas sobre fondo oscuro) con `strokeWidth={1.25}`.
- **Pantalla de Entrada:** Portada de lujo con precarga multimedia optimizada (sin saltos de layout ni vibración del contador) y botón dinámico `INGRESAR` con contraste adaptativo.
- **Hero:** Video en bucle con filtro CSS en escala de grises y alto contraste (`grayscale(100%) contrast(150%)`).
- **Countdown:** Título principal de gran tamaño con contador reescalado (-30%).
- **Una Noche Inolvidable:** Sección sin márgenes ni bordes con video en bucle boomerang reversible (controlable vía `VITE_TRANSITION_VIDEO_BOOMERANG`).
- **Tarjetas Informativas:** Cuándo, Dónde, Regalos y Dress Code sin bordes innecesarios y con modal bancario.
- **Ayuda Visual de Scroll para Mobile (Swipe Down-Up Hint):**
  - Desarrollada en [client/src/components/ScrollHint.jsx](file:///c:/Users/gabrielt/Documents/Proyectos/PROPIOS/cata15web/client/src/components/ScrollHint.jsx). Diseñada para guiar intuitivamente a los usuarios en dispositivos móviles y pantallas táctiles que permanecen en el Hero sin percatarse de que deben deslizar hacia arriba.
  - **Mano Esquemática (Síntesis de Línea):** Iconografía vectorial SVG minimalista con trazo fino (`strokeWidth={1.75}`), pulso de contacto en la yema del dedo índice y estela vertical que simula el movimiento natural de arrastre táctil *down-to-up*.
  - **Peek Scroll Sincronizado:** Durante el gesto de la mano, la pantalla realiza un suave asomo hacia abajo (por defecto 140px) y retorna a la posición superior.
  - **Temporizador Inteligente y No Invasivo:** Aparece tras N segundos (por defecto 3s) de ingresar al sitio. Si a los M segundos (por defecto 10s) el usuario continúa sin scrollear, la ayuda reaparece en loop.
  - **Desactivación Inmediata:** En cuanto se detecta cualquier interacción nativa del usuario (scroll manual, toque táctil, rueda del ratón o teclado), la ayuda se desvanece de inmediato y se desactiva permanentemente para no interrumpir la navegación.
  - **Parametrización Completa:** Tiempos, distancias, activación y filtro móvil configurables mediante variables de entorno `VITE_SCROLL_HINT_*`.
- **Footer:** Sección "TE ESPERO" con fondo blanco puro y última banda de créditos con **icono de WhatsApp blanco**.

---

## 📸 Herramienta de Vista Previa Open Graph (WhatsApp Preview)

El proyecto incluye una herramienta interactiva autónoma en **[client/public/capture.html](file:///c:/Users/gabrielt/Documents/Proyectos/PROPIOS/cata15web/client/public/capture.html)** diseñada para crear y exportar imágenes de previsualización (*link preview / rich card*) para WhatsApp, Facebook y redes sociales.

### ¿Cómo usar la herramienta?

1. Con el servidor de desarrollo activo (`npm run dev` en `client/`), abrí en tu navegador:
   👉 **`http://localhost:5173/capture.html`**
2. **Panel de Controles en tiempo real:**
   - **Video de fondo:** Incluye monitor de video en tiempo real. Permite seleccionar cualquiera de los videos de `/assets/video/` y mover el cursor de tiempo para elegir el segundo exacto con las luces o bolas espejadas más llamativas. También permite reproducir/pausar en tiempo real.
   - **Filtros visuales:** Ajustá contraste, brillo, opacidad del degradado oscuro y activá/desactivá escala de grises.
   - **Textos y tamaños tipográficos individuales:**
     - Modificá el contenido de cada línea en vivo.
     - Controles deslizantes independientes para calibrar el tamaño exacto en píxeles de: Encabezado (*BIENVENIDOS*), Título principal (*MIS XV CATALINA*), Fecha y hora, Línea 4 (Dirección/Lugar) y Línea 5 (opcional).
     - La Línea 5 se omite de la imagen cuando su campo queda vacío.
     - **Márgenes independientes para Línea 2 (Título):** Sliders para calibrar margen superior e inferior.
     - Ajuste vertical global (*Offset Y*) para centrar o desplazar el bloque en el lienzo a voluntad.
     - Activar/desactivar el separador ornamental `✦`.
3. **Exportación:**
   - Hacé clic en **📥 Descargar og-preview.jpg**: Genera automáticamente la imagen de **600 x 600 px** en formato JPG optimizado (~52 KB, cumpliendo holgadamente el límite de 300 KB que exige WhatsApp).
   - O hacé clic en **📋 Copiar Imagen** para enviarla directamente por el portapapeles.
4. **Ubicación final:**
   - Guardá la imagen resultante en `client/public/assets/photos/og-preview.jpg` para que quede lista para ser referenciada por las etiquetas Open Graph del sitio.

