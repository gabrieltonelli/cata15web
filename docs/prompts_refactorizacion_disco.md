# Prompts de Refactorización Visual — Cata15Web (estética disco)

Adaptación de los prompts de referencia TIMBRE al contexto de la fiesta de 15 años de Catalina, con la bola espejada de discoteca como objeto protagonista.

---

## PROMPT 1 — Estructura y reglas de diseño

```
Refactorizá el diseño completo del sitio de invitación para los 15 años de Catalina.
Estética disco de los '70 traída al presente: la protagonista visual es una bola espejada de discoteca.

STACK Y ESTRUCTURA
Sitio de una sola página. React + Vite, Tailwind para el layout, GSAP + ScrollTrigger para la animación de scroll, Lenis para smooth scroll (reemplazando ScrollSmoother), Motion solo para el LoadingScreen.
NO uses Three.js ni ninguna librería de 3D. La bola espejada es siempre una fotografía, nunca un modelo 3D. Un objeto 3D texturizado con una foto se nota a la legua.
Secciones, en este orden: Hero, Invitación, Catalina, El brillo de la noche (sección temática disco), Detalles del evento, Sugerí tu canción, Confirmá tu asistencia, Galería de la previa, Footer.

REGISTRO VISUAL (bloqueado, no lo cambies)
Pista de baile, no salón de fiestas genérico. Superficies espejadas, luz dura cenital, reflejos largos. El sitio es oscuro y profundo, y el único brillo real lo trae la bola espejada con sus destellos.
Fondo #0A0A0F. Texto #EDEDED. Gris de apoyo #6E6E73.
Prohibidas: gradientes rosa-a-violeta de quinceañera genérica, glassmorphism blanco, colores pastel, dorado texturizado.
Prohibidos por código exacto: #FF69B4 (hot pink genérico) y #FFD700 (gold genérico).

TIPOGRAFÍA (bloqueada)
Clash Display para titulares grandes. Satoshi para cuerpo de texto. JetBrains Mono para datos técnicos: fecha, hora, dirección, countdown.
Prohibidas: Inter, Roboto, Poppins, Montserrat (actualmente en uso), Space Grotesk, y cualquier serif incluyendo Playfair Display (actualmente en uso).
Dancing Script (actualmente en uso) se reemplaza por un tratamiento tipográfico con Clash Display en itálica o peso light, nunca por otra script.

COLORES DE ACENTO (4 momentos del reflejo)
La bola espejada no tiene color propio: refleja la luz de la pista. Los 4 acentos son los colores que el reflejo proyecta:
— Magenta pista (#E91E90): el foco principal
— Azul eléctrico (#2D7AFF): la contraluz
— Violeta profundo (#8B5CF6): la mezcla de ambos
— Plata destello (#C0C0C0): el reflejo puro en las facetas
Cada uno tiene su momento en el scroll, nunca los cuatro juntos.

INVENTARIO DE IMÁGENES (cerrado, no lo amplíes)
El sitio entero usa exactamente estos archivos:
1. Foto de bola espejada, formato vertical — hero, capa frontal
2. La misma foto con fondo transparente — hero, capa recortada
3. La misma foto llevada a 16:9 — hero, capa de fondo
4. catalina-main.jpg — sección Catalina, foto principal
5. catalina-01 a catalina-06.jpg — grilla de fotos de Catalina
6. previa-01 a previa-08.jpg — galería horizontal
7. Video de bola espejada girando — sección "El brillo de la noche"

Ninguna sección puede pedir una imagen que no esté en esta lista.
Las secciones Invitación, Detalles del evento, Sugerí tu canción y RSVP se resuelven SIN imagen: tipografía, números, líneas y grilla en CSS.
Si una sección te queda vacía, la resolvés con tipografía. Nunca agregando una imagen nueva, nunca dibujando la bola en SVG o en CSS.

EL HERO VA EN DOS CAPAS
Capa de atrás: la foto de la bola llevada a 16:9, oscurecida y con desenfoque leve.
Capa de adelante: la bola recortada con fondo transparente, nítida y grande.
Las dos capas se mueven a distinta velocidad con el scroll, la de atrás bastante más lento. Eso es el parallax, y sin las dos capas separadas no existe.
Usá animation-timeline de CSS, no listeners de scroll. Animá solamente transform y opacity.
El mouse mueve la capa de la bola unos pocos píxeles, nada más.
El texto del hero ("¡Celebramos mis 15!", "Catalina", la fecha) aparece limpio, sin emojis, sin ornamentos flotantes.

SECCIÓN "EL BRILLO DE LA NOCHE"
Sección pineada de 300vh con el video de la bola girando.
El scroll maneja el tiempo del video cuadro por cuadro: avanzar scroll hace girar la bola, volver para atrás la devuelve. El usuario controla la rotación.
Textos escalonados mientras la bola gira, sin taparla: frases cortas sobre la fiesta, la pista, la noche.
Precargá el video entero antes de que la sección entre en pantalla.
El primer cuadro se muestra como imagen fija hasta que el video cargue, así la sección nunca aparece en negro.

SECCIÓN CONFIRMÁ TU ASISTENCIA (RSVP)
El formulario se resuelve con tipografía y líneas. Sin tarjetas glass, sin partículas.
Netlify Forms con honeypot. Campos: nombre, cantidad de personas, mensaje.
Cuando el usuario envía, los reflejos de la bola (los 4 colores de acento) hacen un destello sutil en el fondo, una sola vez.

FONDO Y MOVIMIENTO
Grilla de pista de baile: líneas finas que forman una cuadrícula en perspectiva, como un piso de discoteca visto desde arriba. Se deforma suavemente con el scroll.
Destellos diminutos que se prenden y apagan sobre la grilla, como reflejos de la bola proyectados en las paredes.
Movimiento generoso pero de una pieza. Todo lo que se mueve, se mueve por la misma razón: la bola girando y proyectando luz.

REGLAS DE OFICIO
Titulares de 8 palabras como máximo. Párrafos de 25.
Cero guiones largos en todo el sitio.
Nada de cursor propio. El cursor del sistema queda como está.
Nada de partículas que repelen o atraen con el mouse.
Un solo texto de botón en toda la página (el del RSVP).
Nada de tarjetas iguales en fila de a tres. Nada de centrar todo.
Nada de etiquetas tipo "001 · Sección" ni "deslizá para explorar".
Nada de emojis inline en los titulares ni en las tarjetas de info.
Nada de glassmorphism (eliminar .glass actual).
Nada de ornamentos ✦ ni ✨ flotantes (eliminar los actuales).
Con las animaciones desactivadas en el sistema, el sitio se cuenta entero igual: las secciones pineadas muestran una foto fija y el texto completo.

ARRANCÁ POR ACÁ
Armá el sitio completo con rectángulos de color en lugar de cada imagen nueva (bola espejada), con las proporciones finales y un texto chico adentro que diga qué archivo del inventario va ahí.
Conservá las fotos de Catalina y la previa que ya existen en el proyecto.
Todavía no generes nada. Levantalo en local y decime cómo verlo.
```

---

## PROMPT 2 — Visuales de la bola espejada

```
La estructura va. Ahora los visuales de la bola espejada.

1. Foto de una bola espejada de discoteca, formato vertical 4:5.
Fondo negro profundo seamless, sin luz propia.
Una sola luz dura cenital entrando desde arriba-izquierda, que deja un destello especular en las facetas superiores y una sombra larga cayendo abajo. El lado inferior de la esfera cae casi a negro.
Reflejos en las facetas estrictamente fríos: blancos y plata. Cero reflejos de color, nada de magenta, azul, naranja ni verde en los espejos. El color lo pone el sitio con CSS, no la foto.
Ángulo levemente por debajo del ecuador de la esfera, cámara mirando hacia arriba. La bola domina el encuadre.
Superficies perfectamente especulares (son espejos). Fotografía de producto, técnica y contenida, no un flyer de fiesta.
Sin texto, sin logos, sin cadena de colgar, sin manos, sin props, sin reflejos de equipo de estudio.

2. Sobre la foto, dos operaciones más:
Pasale remove_background y guardá el recorte con fondo transparente (archivo 2 del inventario).
Llevá la foto original a 16:9 con reframe, oscureciendo los bordes (archivo 3 del inventario).

3. Conservá intactas todas las fotos existentes del proyecto:
catalina-main.jpg, catalina-01 a catalina-06.jpg, previa-01 a previa-08.jpg.
No las modifiques, no las reencuadres, no les cambies el nombre.

No generes iconos, logo, favicon ni texturas de fondo. Los íconos se resuelven con SVG inline, el fondo es la grilla en CSS.

Cuando estén, descargá las 3 imágenes nuevas (foto original, recorte, reframe 16:9) a public/assets/photos/ y reemplazá los rectángulos de color.
```

---

## PROMPT 3 — Video de la bola girando

```
Ahora el video de la sección "El brillo de la noche".

QUÉ GENERAR
Usá la foto de la bola espejada como primer frame y generá un video image-to-video, 10 segundos, 720p, sin audio, en el MISMO formato vertical de la foto, 4:5. No lo pidas en 16:9 o el primer frame sale recortado.

LA TOMA
La bola espejada gira lenta y continua sobre su eje vertical, una vuelta completa, como colgada de un motor giratorio.
La cámara está fija: la bola queda centrada y del mismo tamaño de principio a fin. Nada de zoom, nada de cámara en mano, nada de orbitar alrededor.
Los destellos de las facetas se mueven naturalmente con la rotación: puntos de luz que barren las paredes del fondo negro. El único movimiento es la rotación, nada más.
Fondo negro profundo fijo, una sola luz dura cenital, exposición y balance de blancos fijos, sin parpadeo, sin cortes. Cero texto dentro del video.

CÓMO MONTARLO
Va en la sección "El brillo de la noche", que ya está pineada y armada.
Re-comprimí el video con keyframes cada 5 cuadros: sin eso el navegador tiene que decodificar desde muy atrás en cada movimiento del scroll y el efecto se traba.
Verificá que el scrub funcione igual scrolleando para arriba.

NO toques las secciones que usan las fotos existentes de Catalina y la previa. Quedan exactamente como están.
```

---

## PROMPT 4 — Chequeos finales y deploy

```
Antes de publicar, tres chequeos y el deploy.

1. Optimizá el peso: comprimí las imágenes nuevas de la bola a WebP y confirmá que el video no supere unos pocos megabytes. Las fotos de Catalina y la previa ya están comprimidas, no las toques. El scrub necesita que todo esté cargado.

2. Revisá el sitio en móvil. Las secciones pineadas tienen que seguir funcionando o degradar a una foto fija con el texto completo, nunca romperse. El countdown tiene que ser legible en pantallas chicas.

3. Buscá y sacá cualquier resto:
— ScrollSmoother si fue reemplazado por Lenis.
— Dependencias de 3D que hayan quedado en el package.json.
— Imágenes en la carpeta que no estén en el inventario definido.
— Cualquier texto de relleno tipo "[música/arte/deporte]" o lorem ipsum.
— Clases .glass, .text-glow, .text-gradient rosa-violeta-dorado del diseño anterior.
— Emojis inline en titulares y tarjetas.
— Ornamentos ✦ ✨ 🌸 flotantes.

Después deployá en Netlify (ya configurado en netlify.toml) y pasame el link cuando esté online.
```

---

## Notas de adaptación

| Concepto en TIMBRE | Concepto en Cata15Web |
|---|---|
| Altavoz portátil 360° | Bola espejada de discoteca |
| Anodizado grafito/rojo/azul/verde | 4 colores de reflejo: magenta, azul eléctrico, violeta, plata |
| "Un minuto con el TIMBRE encendido" | "El brillo de la noche" |
| Grilla acústica (ondas desde el centro) | Grilla de pista de baile (perspectiva + destellos) |
| Sección Colorways (crossfade 4 fotos) | **Eliminada** — la bola no cambia de color, refleja. Los 4 acentos se usan en distintos momentos del scroll |
| Taller de audio, no laboratorio | Pista de baile, no salón de fiestas genérico |
| Sección Producto + Componentes + Física del sonido | Invitación + Catalina + El brillo de la noche |
| CTA final | RSVP (formulario Netlify) |
| Rotación video scrub (altavoz) | Rotación video scrub (bola espejada) |
| Fondo #0A0A0B | Fondo #0A0A0F (un toque más azulado/nocturno) |
| Clash Display + Satoshi + JetBrains Mono | Mismo stack tipográfico, reemplazando Playfair + Montserrat + Dancing Script |

> [!IMPORTANT]
> Estos prompts son para iterar. Antes de ejecutar, revisá que cada punto se adapte a lo que querés para la fiesta de Cata. Marcame lo que haya que ajustar.
