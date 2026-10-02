import { useState, useEffect } from 'react'
import eventConfig from '../config/eventData'

/**
 * Componente 1: Pantalla de Bienvenida (Hero Overlay / Pantalla de Ingreso)
 * Precarga de recursos multimedia en segundo plano (videos e imágenes).
 * Botón "INGRESAR" con animación de llenado dinámico e inversión de contraste de color.
 */
const WelcomeHero = ({ onEnter }) => {
  const [loadProgress, setLoadProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  // Precarga optimizada y no bloqueante de recursos críticos
  useEffect(() => {
    let currentProgress = 0
    let isCancelled = false

    // Precarga liviana de imágenes críticas (la imagen de bolas espejadas)
    if (eventConfig.discoBallsImage) {
      const img = new Image()
      img.src = eventConfig.discoBallsImage
    }

    // Animación suave, constante y fluida de la barra de progreso (duración total: ~2.2 segundos)
    const startTime = Date.now()
    const targetDuration = 2200 // 2.2 segundos en total

    const interval = setInterval(() => {
      if (isCancelled) return

      const elapsed = Date.now() - startTime
      const calculated = Math.min(100, Math.round((elapsed / targetDuration) * 100))

      setLoadProgress(calculated)

      if (calculated >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          if (!isCancelled) setIsReady(true)
        }, 200)
      }
    }, 40)

    return () => {
      isCancelled = true
      clearInterval(interval)
    }
  }, [])

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
      {/* Contenedor central */}
      <div className="max-w-xl w-full text-center flex flex-col items-center justify-center space-y-8">
        
        {/* Adorno superior fino */}
        <div className="flex items-center justify-center gap-3 text-dark-600 opacity-60">
          <div className="w-8 h-px bg-dark-900/40" />
          <span className="font-sans text-[11px] tracking-ultra-luxury uppercase">INVITACIÓN</span>
          <div className="w-8 h-px bg-dark-900/40" />
        </div>

        {/* Texto de entrada: "MIS XV CATALINA" centrado, sans-serif elegante y minimalista */}
        <div className="space-y-3">
          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.22em] text-dark-950 uppercase leading-snug">
            {eventConfig.mainTitle}
          </h1>
          <p className="font-sans text-xs tracking-luxury text-dark-600 uppercase font-medium">
            {eventConfig.heroDateDisplay}
          </p>
        </div>

        {/* Separador minimalista */}
        <div className="w-12 h-px bg-dark-900/20" />

        {/* Botón de ingreso con llenado dinámico e inversión de contraste */}
        <div className="pt-2 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleEnter}
            disabled={!isReady && loadProgress < 100}
            className="group relative inline-flex items-center justify-center w-60 sm:w-64 h-12 border border-dark-950 overflow-hidden transition-transform duration-300 active:scale-95 cursor-pointer shadow-sm disabled:cursor-wait"
            aria-label="Ingresar a la invitación"
          >
            {/* CAPA 1 (Inferior): Fondo blanco con texto y flecha en NEGRO (#0A0A0A) */}
            <div className="absolute inset-0 flex items-center justify-center text-dark-950 font-sans text-xs tracking-ultra-luxury uppercase font-semibold">
              <span>INGRESAR</span>
              <svg
                className="ml-2 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* CAPA 2 (Superior): Fondo negro dinámico con texto y flecha en BLANCO (#FFFFFF) */}
            <div
              className="absolute inset-y-0 left-0 bg-dark-950 overflow-hidden transition-[width] duration-300 ease-out"
              style={{ width: `${Math.min(100, Math.round(loadProgress))}%` }}
            >
              <div className="w-60 sm:w-64 h-12 flex items-center justify-center text-white font-sans text-xs tracking-ultra-luxury uppercase font-semibold">
                <span>INGRESAR</span>
                <svg
                  className="ml-2 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </button>

          {/* Indicador de precarga: espacio reservado fijo (cero saltos) y ancho tabular fijo (cero vibración) */}
          <div className="h-5 flex items-center justify-center overflow-hidden">
            <div
              className={`flex items-center justify-center font-sans text-[10px] tracking-widest uppercase transition-all duration-700 ease-out select-none ${
                loadProgress >= 100
                  ? 'opacity-0 pointer-events-none -translate-y-0.5'
                  : 'text-dark-600/70 opacity-100 translate-y-0'
              }`}
            >
              <span>PREPARANDO EXPERIENCIA •&nbsp;</span>
              <span className="tabular-nums font-mono w-10 text-left inline-block font-medium">
                {Math.round(loadProgress)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeHero
