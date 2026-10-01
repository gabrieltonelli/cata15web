import { useState } from 'react'
import eventConfig from '../config/eventData'

/**
 * Componente 1: Pantalla de Bienvenida (Hero Overlay)
 * Fondo blanco sólido de 100vh con tipografía de lujo.
 * Al hacer clic en "INGRESAR", se desvanece suavemente para revelar el contenido interactivo.
 */
const WelcomeHero = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  const handleEnter = () => {
    setIsExiting(true)
    if (onEnter) onEnter()
    setTimeout(() => {
      setIsDismissed(true)
    }, 900)
  }

  if (isDismissed) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-dark-900 transition-all duration-1000 ease-in-out px-6 select-none ${
        isExiting ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Contenedor central con proporciones y espaciado editorial */}
      <div className="max-w-xl w-full text-center flex flex-col items-center justify-center space-y-8">
        {/* Adorno superior fino */}
        <div className="flex items-center justify-center gap-3 text-dark-600 opacity-60">
          <div className="w-8 h-px bg-dark-900" />
          <span className="text-xs tracking-widest uppercase">INVITACIÓN ESPECIAL</span>
          <div className="w-8 h-px bg-dark-900" />
        </div>

        {/* Título y Subtítulo principal */}
        <div className="space-y-3">
          <h1 className="font-cinzel text-5xl sm:text-6xl md:text-7xl font-bold tracking-[0.18em] text-dark-950 uppercase">
            {eventConfig.title}
          </h1>
          <p className="font-sans text-xs sm:text-sm tracking-luxury text-dark-600 uppercase font-medium">
            {eventConfig.subtitle}
          </p>
        </div>

        {/* Fecha sobria en formato espaciado */}
        <div className="py-2">
          <p className="font-serif italic text-base sm:text-lg text-dark-700 tracking-wider">
            {eventConfig.heroDateDisplay}
          </p>
        </div>

        {/* Separador minimalista */}
        <div className="w-12 h-px bg-dark-900/20" />

        {/* Botón de ingreso central */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleEnter}
            className="group relative inline-flex items-center justify-center px-10 py-3.5 border border-dark-900 text-dark-950 font-sans text-xs tracking-ultra-luxury uppercase font-semibold transition-all duration-300 hover:bg-dark-950 hover:text-white focus:outline-none focus:ring-1 focus:ring-dark-900 active:scale-95 cursor-pointer shadow-sm"
          >
            <span>INGRESAR</span>
            <svg
              className="ml-2 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeHero
