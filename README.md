# ✦ Cata15Web - Monorepo (Client + Server)

Aplicación Web de Invitación a Evento (15 años) con arquitectura **Monorepo**:
- **Frontend (`client/`)**: Desarrollado con **React 19 + Vite + Tailwind CSS**, bajo un concepto estético de alto contraste (*Dark Mode / Blanco / Negro*), tipografía editorial y transiciones de video fluidas.
- **Backend (`server/`)**: API REST con **Express y Netlify Functions** para procesar las confirmaciones de asistencia (RSVP) y persistirlas en **Google Sheets** sin exponer credenciales ni tokens en el cliente web.

---

## 📁 Estructura del Monorepo

```text
cata15web/
├── client/                      # Frontend (SPA React + Vite)
│   ├── public/                  # Multimedia (videos, fotos, audio, favicon)
│   ├── src/
│   │   ├── components/          # WelcomeHero, Countdown, InfoCards, RSVP, Footer, etc.
│   │   ├── config/              # eventData.js (parametrización)
│   │   └── styles/              # index.css (Tailwind & custom utilities)
│   ├── .env                     # Variables locales del cliente (ignorado en git)
│   ├── .env.template            # Plantilla documentada de variables del cliente
│   ├── package.json             # Dependencias del cliente
│   └── vite.config.js           # Configuración con proxy a http://localhost:3002/api
│
├── server/                      # Backend (Node.js + Express + Netlify Functions)
│   ├── data/                    # submissions.json (fallback local de resguardo)
│   ├── functions/
│   │   └── api.js               # Handler serverless para Netlify Functions
│   ├── src/
│   │   ├── config/env.js        # Validación y lectura de variables de entorno
│   │   ├── services/            # sheetsService.js (integración con Google Sheets)
│   │   ├── app.js               # Express application y rutas (/api/health, /api/rsvp)
│   │   └── server.js            # Servidor local Express
│   ├── .env                     # Credenciales y puertos del servidor (ignorado en git)
│   ├── .env.template            # Plantilla documentada de variables del servidor
│   └── package.json             # Dependencias del servidor (express, googleapis, etc.)
│
├── docs/
│   └── google-apps-script.js    # Código listo para pegar en Google Sheets Apps Script
├── netlify.toml                 # Configuración de despliegue para Netlify (build & functions)
└── package.json                 # Scripts raíz del monorepo
```

---

## 🚀 Cómo Levantar el Proyecto Localmente

Para arrancar el entorno de desarrollo, abrí dos terminales o levantá primero el backend y luego el frontend:

### 1. Iniciar el Servidor Backend (`server/`)
```bash
# Opción A (desde la carpeta server):
cd server
npm install
npm run dev

# Opción B (desde la raíz del monorepo):
npm run dev:server
```
El backend iniciará en **`http://localhost:3002`** con los endpoints:
- Comprobación de estado: `http://localhost:3002/api/health`
- Recepción de confirmaciones: `http://localhost:3002/api/rsvp`

### 2. Iniciar el Cliente Frontend (`client/`)
```bash
# Opción A (desde la carpeta client):
cd client
npm install
npm run dev

# Opción B (desde la raíz del monorepo):
npm run dev:client
```
El cliente iniciará en **`http://localhost:5173`**. Las llamadas a `/api/*` serán reenviadas automáticamente por el proxy de Vite hacia el servidor en `http://localhost:3002`.

---

## 📊 Persistencia en Google Sheets

La planilla de destino configurada es:
👉 **[Ver Planilla de Google Sheets](https://docs.google.com/spreadsheets/d/1u7LT_cZn-SUzWxPNg1MZfPi0wsJNZfeUgEoilp0wemo/edit?usp=sharing)**
*(ID: `1u7LT_cZn-SUzWxPNg1MZfPi0wsJNZfeUgEoilp0wemo`)*

El backend soporta **dos métodos de conexión** y un **mecanismo de resguardo local**:

### Método 1: Google Apps Script Webhook (Recomendado - 2 minutos)
Es la forma más sencilla, segura y rápida ya que no requiere dar de alta credenciales en Google Cloud Console:
1. Abrí la planilla en tu navegador.
2. Hacé clic en **Extensiones** ➔ **Apps Script**.
3. Copiá el código completo que se encuentra en [docs/google-apps-script.js](file:///c:/Users/gabrielt/Documents/Proyectos/PROPIOS/cata15web/docs/google-apps-script.js) y reemplazá el contenido del editor.
4. Hacé clic en **Guardar** (ícono de disquete).
5. Hacé clic en **Implementar** ➔ **Nueva implementación**.
6. Seleccioná el tipo **Aplicación web**:
   - *Descripción*: `Webhook RSVP Mis XV`
   - *Ejecutar como*: `Yo` (tu cuenta)
   - *Quién tiene acceso*: `Cualquier persona` (Anyone)
7. Hacé clic en **Implementar** y copiá la **URL de la aplicación web** generada (termina en `/exec`).
8. Pegá dicha URL en `server/.env`:
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

El proyecto está listo para ser desplegado en **Netlify** con cero configuración adicional gracias al archivo [netlify.toml](file:///c:/Users/gabrielt/Documents/Proyectos/PROPIOS/cata15web/netlify.toml):

1. **Build settings en Netlify**:
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
   - **Functions directory**: `server/functions`
2. **Variables de entorno en Netlify**:
   Configurá en el panel de Netlify (*Site configuration* ➔ *Environment variables*):
   - `GOOGLE_SHEET_ID`: `1u7LT_cZn-SUzWxPNg1MZfPi0wsJNZfeUgEoilp0wemo`
   - `GOOGLE_APPS_SCRIPT_URL`: (la URL de tu Webhook de Apps Script)
   - *(Opcional)* `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_PRIVATE_KEY` si usás Service Account.
3. **Enrutamiento Serverless**:
   Cualquier petición enviada a `/api/rsvp` o `/api/health` es redirigida internamente por Netlify hacia la función `server/functions/api.js` (`/.netlify/functions/api/*`).

---

## ⚙️ Variables de Entorno

### Frontend (`client/.env`)
Revisá [client/.env.template](file:///c:/Users/gabrielt/Documents/Proyectos/PROPIOS/cata15web/client/.env.template) para detalles.
- `VITE_EVENT_MAIN_TITLE`: Título principal (`MIS XV CATALINA`).
- `VITE_EVENT_TARGET_DATE`: Fecha objetivo para el countdown.
- `VITE_RSVP_ENDPOINT`: Endpoint del backend (por defecto `/api/rsvp`).
- `VITE_WHATSAPP_PHONE`: Teléfono del enlace de contacto.
- `VITE_WHATSAPP_MESSAGE`: Mensaje preconfigurado de WhatsApp.

### Backend (`server/.env`)
Revisá [server/.env.template](file:///c:/Users/gabrielt/Documents/Proyectos/PROPIOS/cata15web/server/.env.template) para detalles.
- `PORT`: Puerto del servidor local (`3002`).
- `CORS_ORIGIN`: Origen permitido (`*`).
- `GOOGLE_SHEET_ID`: ID del documento de Google Sheets.
- `GOOGLE_SHEET_NAME`: Nombre de la hoja (`Respuestas`).
- `GOOGLE_APPS_SCRIPT_URL`: URL del Webhook de Apps Script.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Email de servicio de Google Cloud.
- `GOOGLE_PRIVATE_KEY`: Llave privada de la cuenta de servicio.

---

## 🎨 Aspectos Visuales y Experiencia de Usuario

- **Pantalla de Entrada:** Portada de lujo con precarga multimedia y botón dinámico `INGRESAR` con contraste adaptativo.
- **Hero:** Video en loop con filtro CSS en escala de grises y alto contraste (`grayscale(100%) contrast(150%)`).
- **Countdown:** Título principal de gran tamaño con contador reescalado (-30%).
- **Una Noche Inolvidable:** Sección sin márgenes ni bordes con video en bucle boomerang (avance y retroceso continuo).
- **Tarjetas Informativas:** Cuándo, Dónde, Regalos y Dress Code sin bordes innecesarios y con modal bancario.
- **Formulario RSVP:** Campos condicionales (si no asiste, oculta menú y música), campo de observaciones y confirmación visual.
- **Footer:** Sección "TE ESPERO" con fondo blanco puro y última banda de créditos con **icono de WhatsApp blanco**.
