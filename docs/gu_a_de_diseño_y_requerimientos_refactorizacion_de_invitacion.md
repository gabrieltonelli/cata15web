# Guía de Diseño y Requerimientos: Web App de Invitación a Evento

## 1. Contexto del Proyecto
El objetivo es refactorizar un proyecto existente creado en **React + Vite** para convertirlo en una Single Page Application (SPA) responsiva que funcione como una invitación interactiva, moderna y elegante para un evento (ej. cumpleaños, fiesta de gala). 

**Regla de Oro (Estrictamente prohibido):** Nada de elementos "cursis". No se deben incluir galerías de fotos de la persona, biografías, ni mensajes excesivamente sentimentales. El enfoque es 100% utilitario, minimalista, elegante y enfocado en la experiencia del usuario (UX) para proveer información y recolectar confirmaciones.

## 2. Concepto Visual y Experiencia de Usuario (UX)

### 2.1. Estilo General
*   **Minimalismo y Elegancia:** Diseño tipo "Dark Mode" o alto contraste (Blanco, Negro y tonos neutros oscuros). 
*   **Tipografía:** Uso de tipografías modernas. Una fuente Sans-Serif limpia para los textos generales (ej. Montserrat, Inter o Roboto) y una Serif elegante (o Sans-Serif bold) para los títulos principales. Letras en mayúsculas con tracking (espaciado entre letras) amplio para dar sensación de lujo.
*   **Iconografía:** Minimalista, de trazo fino (lineal).

### 2.2. Comportamiento y Desplazamiento (Scrolling)
*   **Fondo Fijo (Fixed Background / Parallax):** El fondo de la aplicación debe ser un video sutil en loop (ej. bolas de disco en blanco y negro, texturas abstractas oscuras) o una imagen de alta calidad oscurecida. Este fondo permanece fijo (`position: fixed` o `background-attachment: fixed`) mientras el usuario hace scroll hacia abajo.
*   **Bloques de Contenido Superpuestos:** Los diferentes componentes (Fecha, Lugar, etc.) se desplazan por encima del fondo fijo. Estos bloques alternan entre fondos sólidos (blancos o negros plenos) y fondos transparentes para revelar el fondo dinámico.
*   **Animaciones (Fade-in):** Los elementos deben aparecer suavemente (`fade-in` y ligero `transform: translateY`) a medida que entran en el viewport usando Intersection Observer o librerías como Framer Motion.

### 2.3. Reproductor de Audio
*   Un pequeño control flotante y discreto en la parte inferior de la pantalla para reproducir/pausar una pista de música ambiental.

## 3. Estructura de Componentes (Secciones)

El layout debe ser un scroll vertical continuo. A continuación, el orden y especificación de cada componente:

### Componente 1: Pantalla de Bienvenida (Hero Overlay)
*   **Visual:** Fondo sólido (ej. blanco) que ocupa el 100vh.
*   **Contenido:** Título del evento (ej. "MIS XV [NOMBRE]" o "FIESTA [NOMBRE]"). Subtítulo corto y directo.
*   **Interacción:** Un botón central ("INGRESAR"). Al hacer clic, este overlay se desvanece (fade-out) revelando el fondo fijo interactivo y el resto de la página.

### Componente 2: Contador (Countdown)
*   **Visual:** Fondo transparente (se ve el video/imagen de fondo). Texto en color claro.
*   **Contenido:** Reloj en cuenta regresiva dinámico mostrando Días, Horas, Minutos y Segundos restantes hasta la fecha del evento.

### Componente 3: Tarjetas de Información (Info Cards)
Se deben crear componentes reutilizables tipo "Tarjeta" que ocupen todo el ancho de la pantalla (en mobile) con padding generoso.

*   **Tarjeta A (Fecha y Hora):**
    *   Fondo: Sólido (Blanco). Letras: Oscuras.
    *   Icono: Calendario minimalista.
    *   Contenido: Título "¿CUÁNDO?". Fecha completa y horario.
*   **Tarjeta B (Ubicación):**
    *   Fondo: Sólido (Blanco). Letras: Oscuras.
    *   Icono: Globo terráqueo o Pin de mapa.
    *   Contenido: Título "¿DÓNDE?". Nombre del salón/lugar. Botón secundario: "CÓMO LLEGAR" (Enlace a Google Maps).
*   **Tarjeta C (Regalos):**
    *   Fondo: Sólido (Negro). Letras: Claras.
    *   Icono: Caja de regalo.
    *   Contenido: Título "REGALOS". Texto breve, formal y directo indicando que el mejor regalo es la presencia, pero si desean regalar, se proporcionan los datos. Botón: "HACER REGALO" (Abre un modal con CBU/Alias o enlace).
*   **Tarjeta D (Dress Code):**
    *   Fondo: Sólido (Blanco o transparente sobre el fondo).
    *   Icono: Diamante o Percha.
    *   Contenido: Título "DRESS CODE". Ej: "Elegante Sport". (Opcional: Indicar colores prohibidos o sugeridos de forma muy breve).

### Componente 4: Formulario de Asistencia (RSVP)
Esta es la sección interactiva más importante.
*   **Visual:** Fondo oscuro o negro, creando un fuerte contraste.
*   **Contenido:** Título "CONFIRMÁ TU ASISTENCIA". Subtítulo con fecha límite.
*   **Campos del Formulario:**
    1.  **Nombre** (Input text, Requerido).
    2.  **Apellido** (Input text, Requerido).
    3.  **¿Asistirás?** (Radio buttons: "¡Sí, confirmo!" / "No podré asistir").
    4.  **Requerimientos alimenticios** (Dropdown/Select: Ninguno, Celíaco, Vegano, Vegetariano, etc.).
    5.  **Sugerencia Musical** (Input text: "¿Qué canción no puede faltar?").
*   **Acción:** Botón de "Confirmar". Debe tener manejo de estado (Cargando, Éxito, Error) y enviar la data a un backend o servicio como EmailJS/Firebase.

### Componente 5: Footer / Despedida
*   **Visual:** Fondo transparente o blanco.
*   **Contenido:** Un mensaje de cierre corto ("TE ESPERO" o "NOS VEMOS PRONTO") acompañado de un icono de destellos/estrellas.

## 4. Requerimientos Técnicos para el Prompt de Refactorización

Al instruir a la IA para refactorizar el código, asegúrate de que cumpla con lo siguiente:
1.  **Tecnologías:** React funcional (Hooks), Vite para el bundler.
2.  **Estilos:** Utilizar Tailwind CSS (recomendado por la facilidad de manejar componentes utility-first) o CSS Modules, garantizando que el diseño sea `mobile-first`.
3.  **Estado:** Usar `useState` y `useEffect` para manejar el Countdown y los inputs del formulario RSVP.
4.  **Limpieza de código:** Estructura modular. Mover la data estática (textos, fechas, coordenadas) a un archivo de configuración (ej. `config.js` o `data.json`) para que sea fácil actualizarla sin tocar los componentes visuales.