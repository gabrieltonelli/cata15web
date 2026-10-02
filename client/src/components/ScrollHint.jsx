import { useState, useEffect, useRef, useCallback } from 'react'
import eventConfig from '../config/eventData'

/**
 * Componente: ScrollHint (Ayuda visual de gesto swipe down-up para mobile)
 * 
 * Funcionalidad:
 * 1. Aparece tras N segundos (por defecto 3s) si el usuario está en el Hero sin scrollear.
 * 2. Muestra una mano esquemática con trazo fino realizando el gesto de swipe hacia arriba.
 * 3. La pantalla realiza un leve scroll hacia abajo (peek) y regresa suavemente a su lugar.
 * 4. La mano desaparece con fade-out.
 * 5. Si tras M segundos (por defecto 10s) sigue sin scrollear, la ayuda reaparece en loop.
 * 6. Se desactiva de inmediato en cuanto se detecta que el usuario scrolleó por su cuenta.
 */
const ScrollHint = ({ hasEntered = false }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isSwiping, setIsSwiping] = useState(false)
  
  const hasUserScrolled = useRef(false)
  const isPeeking = useRef(false)
  const touchStartY = useRef(0)
  const animTimeouts = useRef([])
  const repeatTimer = useRef(null)

  const config = eventConfig.scrollHint || {
    enabled: true,
    initialDelayMs: 3000,
    repeatDelayMs: 10000,
    durationMs: 2800,
    dismissThresholdPx: 120,
    peekDistance: 140,
    mobileOnly: true,
  }

  const dismissThreshold = config.dismissThresholdPx || 120
  const visibleDuration = Math.max(1500, config.durationMs || 2800)

  // Limpiar todos los timeouts de animación y repetición
  const clearAllTimers = useCallback(() => {
    animTimeouts.current.forEach((t) => clearTimeout(t))
    animTimeouts.current = []
    if (repeatTimer.current) {
      clearTimeout(repeatTimer.current)
      repeatTimer.current = null
    }
  }, [])

  // Desactivar permanentemente la ayuda tras scroll real del usuario
  const dismissPermanently = useCallback(() => {
    hasUserScrolled.current = true
    setIsVisible(false)
    setIsSwiping(false)
    clearAllTimers()
  }, [clearAllTimers])

  // Comprobar si corresponde mostrar la ayuda según dispositivo y scroll
  const checkShouldRun = useCallback(() => {
    if (!config.enabled) return false
    if (hasUserScrolled.current) return false
    
    // Si ya scrolleó por encima del umbral configurado, no ejecutar
    if (window.scrollY > dismissThreshold) {
      hasUserScrolled.current = true
      return false
    }

    // Comprobación de móvil / táctil / DevTools
    if (config.mobileOnly) {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isMobileWidth = window.innerWidth <= 1024
      if (!isTouch && !isMobileWidth) return false
    }

    return true
  }, [config, dismissThreshold])

  // Ciclo completo de animación de la mano y peek de la pantalla
  const runSwipeAnimationCycle = useCallback(() => {
    if (!checkShouldRun()) return

    // 1. Fade-in de la mano en posición de inicio (t = 0)
    setIsVisible(true)
    setIsSwiping(false)

    // 2. A los 400ms: iniciar movimiento de swipe hacia arriba y peek de la pantalla
    const t1 = setTimeout(() => {
      if (hasUserScrolled.current) return
      setIsSwiping(true)

      // Peek: desplazar sutilmente la pantalla hacia abajo
      isPeeking.current = true
      try {
        window.scrollTo({
          top: config.peekDistance,
          behavior: 'smooth',
        })
      } catch {
        window.scrollTo(0, config.peekDistance)
      }
    }, 400)

    // 3. A la mitad de la permanencia: retornar suavemente la pantalla a su posición original
    const returnTime = Math.max(1000, Math.round(visibleDuration * 0.5))
    const t2 = setTimeout(() => {
      if (hasUserScrolled.current) return
      try {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      } catch {
        window.scrollTo(0, 0)
      }
    }, returnTime)

    // 4. Al cumplirse el tiempo de permanencia: finalizar peek y comenzar fade-out de la mano
    const t3 = setTimeout(() => {
      isPeeking.current = false
      if (hasUserScrolled.current) return
      setIsVisible(false)
    }, visibleDuration)

    // 5. Al concluir el desvanecimiento: resetear estado de swipe y programar repetición en M segundos
    const t4 = setTimeout(() => {
      setIsSwiping(false)
      if (hasUserScrolled.current) return

      repeatTimer.current = setTimeout(() => {
        if (!hasUserScrolled.current && window.scrollY <= dismissThreshold) {
          runSwipeAnimationCycle()
        }
      }, config.repeatDelayMs)
    }, visibleDuration + 500)

    animTimeouts.current = [t1, t2, t3, t4]
  }, [checkShouldRun, config.peekDistance, config.repeatDelayMs, visibleDuration, dismissThreshold])

  // Listener para detectar EXCLUSIVAMENTE cuando el usuario hace scroll por su cuenta
  useEffect(() => {
    // Solo escuchar una vez que el usuario ingresó al Hero
    if (!config.enabled || !hasEntered) return

    // Detección de scroll nativo de la ventana
    const handleScroll = () => {
      if (!isPeeking.current && window.scrollY > dismissThreshold) {
        dismissPermanently()
      }
    }

    // Detección de arrastre táctil (swipe del usuario)
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY.current = e.touches[0].clientY
      }
    }

    const handleTouchMove = (e) => {
      if (isPeeking.current) return
      if (e.touches && e.touches[0]) {
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current)
        // Desactivar solo si el arrastre supera el umbral configurado en píxeles
        if (deltaY > dismissThreshold || window.scrollY > dismissThreshold) {
          dismissPermanently()
        }
      }
    }

    // Detección de rueda del mouse (en simulación o desktop)
    const handleWheel = () => {
      if (!isPeeking.current && window.scrollY > dismissThreshold) {
        dismissPermanently()
      }
    }

    // Detección de teclas de scroll
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', 'Space', ' ', 'ArrowUp'].includes(e.key)) {
        dismissPermanently()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('keydown', handleKeyDown, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [hasEntered, config.enabled, dismissThreshold, dismissPermanently])

  // Iniciar la primera ayuda tras N segundos de entrar al Hero
  useEffect(() => {
    if (!config.enabled || !hasEntered) return

    const initialTimer = setTimeout(() => {
      if (!hasUserScrolled.current && window.scrollY <= dismissThreshold) {
        runSwipeAnimationCycle()
      }
    }, config.initialDelayMs)

    return () => {
      clearTimeout(initialTimer)
      clearAllTimers()
    }
  }, [hasEntered, config.enabled, config.initialDelayMs, dismissThreshold, runSwipeAnimationCycle, clearAllTimers])

  if (!config.enabled || hasUserScrolled.current) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed bottom-14 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center justify-center transition-all duration-700 ease-out select-none ${
        isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-95 pointer-events-none'
      }`}
    >
      {/* Contenedor flotante con glassmorphism */}
      <div className="relative flex flex-col items-center p-3 rounded-2xl bg-black/75 border border-white/20 backdrop-blur-md shadow-2xl">
        
        {/* Estela y flecha indicadora del swipe hacia arriba */}
        <div className="relative w-12 h-20 flex flex-col items-center justify-end overflow-hidden pb-1">
          {/* Línea guía punteada vertical */}
          <div className="absolute inset-y-2 w-px border-l border-dashed border-white/30" />

          {/* Flecha superior minimalista hacia arriba */}
          <div
            className={`absolute top-1 text-white/80 transition-all duration-500 ${
              isSwiping ? 'opacity-100 -translate-y-1' : 'opacity-40 translate-y-0'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>

          {/* Mano esquemática (síntesis de línea) animada */}
          <div
            className="transition-transform ease-out will-change-transform"
            style={{
              transitionDuration: isSwiping ? '900ms' : '0ms',
              transform: isSwiping ? 'translateY(-36px)' : 'translateY(12px)',
            }}
          >
            {/* Punto de contacto táctil (tap pulse) en la punta del dedo índice */}
            <div className="relative flex items-center justify-center">
              <div
                className={`absolute -top-1 w-4 h-4 rounded-full border border-white/60 bg-white/30 transition-all duration-300 ${
                  !isSwiping ? 'scale-125 opacity-80' : 'scale-50 opacity-0'
                }`}
              />
            </div>

            {/* SVG: Mano esquemática en síntesis de línea */}
            <svg
              className="w-10 h-10 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Dedo índice extendido hacia arriba */}
              <path d="M22 8 C22 5.5 25.5 5.5 25.5 8 V24" />
              
              {/* Pliegue superior del índice */}
              <path d="M22.5 14 H25" strokeWidth="1.2" opacity="0.6" />

              {/* Dedo medio plegado */}
              <path d="M25.5 22 C25.5 19.5 29 19.5 29 22 V27" />

              {/* Dedo anular plegado */}
              <path d="M29 25 C29 22.8 32.5 22.8 32.5 25 V29" />

              {/* Dedo meñique plegado */}
              <path d="M32.5 28 C32.5 26 36 26 36 28.5 V35" />

              {/* Borde exterior de la mano y palma */}
              <path d="M36 35 C36 40 32 44 26 44 H24 C19 44 16 41 16 36 V30" />

              {/* Pulgar plegado en el costado */}
              <path d="M16 30 C16 26.5 19 25 21 27 L22 28.5" />
            </svg>
          </div>
        </div>

        {/* Etiqueta minimalista para reforzar la comprensión */}
        <div className="mt-1 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="font-sans text-[9px] tracking-ultra-luxury text-white/90 uppercase font-semibold">
            DESLIZÁ
          </span>
        </div>

      </div>
    </div>
  )
}

export default ScrollHint
