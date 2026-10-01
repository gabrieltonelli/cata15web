import eventConfig from '../config/eventData'

/**
 * Componente 5: Footer / Despedida
 * Visual: Sección "TE ESPERO" con fondo blanco sólido y tipografía oscura de lujo.
 * Última banda: Créditos con enlace directo a WhatsApp.
 */
const Footer = () => {
  const whatsappUrl = `https://wa.me/${eventConfig.whatsappPhone}?text=${encodeURIComponent(
    eventConfig.whatsappMessage
  )}`

  return (
    <footer className="relative z-10 w-full flex flex-col">
      {/* Sección principal TE ESPERO (Fondo Blanco Sólido) */}
      <div className="w-full py-24 sm:py-32 px-6 text-center text-dark-950 bg-white">
        <div className="max-w-xl mx-auto space-y-8">
          {/* Destellos / estrellas minimalistas */}
          <div className="flex items-center justify-center gap-4 text-dark-400">
            <span className="text-sm font-serif">✧</span>
            <span className="text-xl font-serif text-dark-900">✦</span>
            <span className="text-sm font-serif">✧</span>
          </div>

          {/* Mensaje de cierre corto */}
          <div className="space-y-3">
            <h2 className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-normal tracking-[0.2em] text-dark-950 uppercase">
              {eventConfig.footerClosing}
            </h2>
            <p className="font-sans text-xs tracking-luxury text-dark-600 uppercase font-medium pt-1">
              {eventConfig.mainTitle} • {eventConfig.footerYear}
            </p>
          </div>

          {/* Separador fino */}
          <div className="w-16 h-px bg-dark-900/20 mx-auto" />

          {/* Subtítulo minimalista */}
          <div className="pt-2">
            <p className="font-sans text-[10px] tracking-ultra-luxury uppercase text-dark-500 font-semibold">
              INVITACIÓN DIGITAL EXCLUSIVA
            </p>
          </div>
        </div>
      </div>

      {/* Última banda: Créditos con enlace interactivo a WhatsApp */}
      <div className="w-full py-4 px-6 bg-dark-950 text-white border-t border-white/10 text-center">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 font-sans text-xs sm:text-sm tracking-wider text-white/80 hover:text-white transition-colors group cursor-pointer"
        >
          <span>{eventConfig.creatorCredit}</span>
          <svg
            className="w-5 h-5 text-white group-hover:text-white/80 transition-transform duration-200 group-hover:scale-110"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}

export default Footer
