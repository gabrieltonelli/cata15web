import eventConfig from '../config/eventData'

/**
 * Componente 5: Footer / Despedida
 * Visual: Fondo de bolas espejadas con overlay oscuro para mantener la coherencia visual con el Hero.
 * Contenido: Mensaje de cierre corto ("TE ESPERO"), año y destellos lineales.
 */
const Footer = () => {
  return (
    <footer
      className="relative z-10 w-full py-28 px-6 text-center text-white overflow-hidden bg-center bg-cover border-t border-white/10"
      style={{
        backgroundImage: `url("${eventConfig.discoBallsImage}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      {/* Overlay oscuro para máximo contraste y legibilidad */}
      <div className="absolute inset-0 bg-dark-950/85 backdrop-blur-[1px]" />

      <div className="relative z-10 max-w-xl mx-auto space-y-8">
        {/* Destellos / estrellas minimalistas */}
        <div className="flex items-center justify-center gap-4 text-white/40">
          <span className="text-sm font-serif">✧</span>
          <span className="text-xl font-serif text-white/80">✦</span>
          <span className="text-sm font-serif">✧</span>
        </div>

        {/* Mensaje de cierre corto */}
        <div className="space-y-3">
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.2em] text-white uppercase drop-shadow-md">
            {eventConfig.footerClosing}
          </h2>
          <p className="font-sans text-xs tracking-luxury text-white/70 uppercase pt-1">
            {eventConfig.mainTitle} • {eventConfig.footerYear}
          </p>
        </div>

        {/* Separador fino */}
        <div className="w-16 h-px bg-white/20 mx-auto" />

        {/* Información mínima y sobria */}
        <div className="pt-2">
          <p className="font-sans text-[10px] tracking-ultra-luxury uppercase text-white/40">
            INVITACIÓN DIGITAL EXCLUSIVA
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
