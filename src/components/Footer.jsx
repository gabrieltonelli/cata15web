import eventConfig from '../config/eventData'

/**
 * Componente 5: Footer / Despedida
 * Visual: Fondo transparente o sobrio oscuro sobre el fondo fijo.
 * Contenido: Mensaje de cierre corto ("TE ESPERO" o "NOS VEMOS PRONTO") con destellos/estrellas lineales.
 */
const Footer = () => {
  return (
    <footer className="relative z-10 w-full py-20 px-6 text-center text-white">
      <div className="max-w-xl mx-auto space-y-8">
        
        {/* Destellos / estrellas minimalistas */}
        <div className="flex items-center justify-center gap-4 text-white/40">
          <span className="text-sm font-serif">✧</span>
          <span className="text-xl font-serif text-white/80">✦</span>
          <span className="text-sm font-serif">✧</span>
        </div>

        {/* Mensaje de cierre corto */}
        <div className="space-y-2">
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.2em] text-white">
            {eventConfig.footerClosing}
          </h2>
          <p className="font-serif italic text-sm text-white/60 tracking-widest pt-1">
            {eventConfig.title} • {eventConfig.footerYear}
          </p>
        </div>

        {/* Separador fino */}
        <div className="w-16 h-px bg-white/20 mx-auto" />

        {/* Información mínima y sobria */}
        <div className="pt-2">
          <p className="font-sans text-[10px] tracking-ultra-luxury uppercase text-white/40">
            INVITACIÓN DIGITAL
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
