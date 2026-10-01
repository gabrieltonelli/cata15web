/**
 * Configuración centralizada del evento.
 * Todos los parámetros pueden ser sobrescritos mediante variables de entorno (VITE_*).
 */

export const eventConfig = {
  // Datos generales del evento
  mainTitle: import.meta.env.VITE_EVENT_MAIN_TITLE || 'MIS XV CATALINA',
  title: import.meta.env.VITE_EVENT_TITLE || 'CATALINA',
  subtitle: import.meta.env.VITE_EVENT_SUBTITLE || 'MIS XV AÑOS',
  heroDateDisplay: import.meta.env.VITE_HERO_DATE_DISPLAY || '20 • 11 • 2026',

  // Video de fondo para el Hero
  heroVideo: import.meta.env.VITE_HERO_VIDEO || '/assets/video/hero-bg2.mp4',

  // Video de transición para la sección Una Noche Inolvidable (efecto boomerang)
  transitionVideo: import.meta.env.VITE_TRANSITION_VIDEO || '/assets/video/video2.mp4',

  // Imagen de bolas espejadas para transiciones
  discoBallsImage: import.meta.env.VITE_DISCO_BALLS_IMAGE || '/assets/photos/a2c632e4-3d7f-434f-831a-6cfb07fc3aef.jpg',

  // Fecha objetivo para el countdown (formato ISO 8601)
  targetDate: import.meta.env.VITE_EVENT_TARGET_DATE || '2026-11-20T20:00:00',

  // Fecha y hora formateada para la tarjeta ¿Cuándo?
  dateTitle: '¿CUÁNDO?',
  dateText: import.meta.env.VITE_EVENT_DATE_TEXT || 'Viernes 20 de Noviembre de 2026',
  timeText: import.meta.env.VITE_EVENT_TIME_TEXT || '20:00 hs (Puntual)',
  calendarUrl: import.meta.env.VITE_GOOGLE_CALENDAR_URL || 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mis+15+Catalina&dates=20261120T230000Z/20261121T070000Z&details=Celebración+de+15+años+de+Catalina&location=Quintana+30,+Chacabuco,+Buenos+Aires',

  // Ubicación para la tarjeta ¿Dónde?
  locationTitle: '¿DÓNDE?',
  venueName: import.meta.env.VITE_VENUE_NAME || 'Salón de Eventos',
  address: import.meta.env.VITE_VENUE_ADDRESS || 'Quintana 30, Chacabuco, Buenos Aires',
  mapsUrl: import.meta.env.VITE_MAPS_URL || 'https://www.google.com/maps/search/?api=1&query=Quintana+30,+Chacabuco,+Buenos+Aires',
  mapsEmbedUrl: import.meta.env.VITE_MAPS_EMBED_URL || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.5!2d-60.451379309634284!3d-34.63026033819848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sQuintana+30%2C+Chacabuco!5e0!3m2!1ses!2sar!4v1700000000000',

  // Regalos
  giftsTitle: 'REGALOS',
  giftsText: import.meta.env.VITE_GIFTS_TEXT || 'Tu presencia es nuestro mejor regalo. Si deseas hacernos un presente, ponemos a tu disposición los siguientes datos bancarios:',
  bankDetails: {
    holder: import.meta.env.VITE_BANK_HOLDER || 'Catalina Tonelli',
    bank: import.meta.env.VITE_BANK_NAME || 'Banco Galicia',
    cbu: import.meta.env.VITE_BANK_CBU || '0070000000000000000000',
    alias: import.meta.env.VITE_BANK_ALIAS || 'CATA.15.FIESTA',
    accountType: import.meta.env.VITE_BANK_ACCOUNT_TYPE || 'Caja de Ahorro en Pesos',
  },

  // Dress Code
  dressCodeTitle: 'DRESS CODE',
  dressCodeValue: import.meta.env.VITE_DRESS_CODE || 'Elegante',
  dressCodeDetails: import.meta.env.VITE_DRESS_CODE_DETAILS || 'Traje o vestido de gala. Sugerimos reservar los tonos blancos para la homenajeada.',

  // RSVP
  rsvpTitle: 'CONFIRMÁ TU ASISTENCIA',
  rsvpDeadline: import.meta.env.VITE_RSVP_DEADLINE || 'Por favor confirmar antes del 1 de Noviembre de 2026',
  rsvpEndpoint: import.meta.env.VITE_RSVP_ENDPOINT || '/api/rsvp', // Endpoint API hacia el backend monorepo / Netlify Function

  // Audio de fondo
  audioUrl: import.meta.env.VITE_AUDIO_URL || '/assets/mp3/Rihanna-Diamonds.mp3',
  audioTitle: import.meta.env.VITE_AUDIO_TITLE || 'Rihanna - Diamonds',

  // Footer y Créditos
  footerClosing: import.meta.env.VITE_FOOTER_CLOSING || 'TE ESPERO',
  footerYear: import.meta.env.VITE_FOOTER_YEAR || '2026',
  creatorCredit: import.meta.env.VITE_CREATOR_CREDIT || 'Creado con amor by AncleGaby',
  whatsappPhone: import.meta.env.VITE_WHATSAPP_PHONE || '5492352440495',
  whatsappMessage: import.meta.env.VITE_WHATSAPP_MESSAGE || 'Hola, me interesaría crear una página de invitación a mi evento',
}

export default eventConfig
