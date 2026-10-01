import { useEffect, useRef, useState } from 'react'

/**
 * Hook para disparar la animación una única vez tras ingresar al viewport.
 * @param {number} delay Retardo en milisegundos tras entrar al viewport.
 */
function useAnimateOnView(delay = 350) {
  const [isAnimated, setIsAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el) // Una sola vez para no repetir
          setTimeout(() => {
            setIsAnimated(true)
          }, delay)
        }
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -20px 0px'
      }
    )

    observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [delay])

  return [ref, isAnimated]
}

/**
 * Icono animado para Sección ¿CUÁNDO? (Fecha y Horario)
 * Trazo dinámico del marco del calendario y aparición escalonada de los días en cascada.
 */
export const CalendarSectionIcon = ({ className = 'text-dark-900', containerBorder = 'border-dark-900/30' }) => {
  const [containerRef, isAnimated] = useAnimateOnView(350)

  return (
    <div
      ref={containerRef}
      className={`w-14 h-14 border ${containerBorder} flex items-center justify-center transition-all ${
        isAnimated ? 'anim-frame-pop' : 'opacity-90'
      }`}
    >
      <svg
        className={`w-7 h-7 ${className}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {/* Marco del calendario */}
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="0"
          strokeWidth="1.25"
          className={isAnimated ? 'anim-draw-stroke' : ''}
        />
        {/* Ganchos y línea horizontal */}
        <path
          strokeLinecap="round"
          strokeWidth="1.25"
          d="M16 2v4M8 2v4M3 10h18"
          className={isAnimated ? 'anim-draw-stroke' : ''}
        />
        {/* Días en cascada armónica (staggered delay) */}
        <circle
          cx="8"
          cy="14"
          r="1"
          fill="currentColor"
          style={{ animationDelay: '300ms' }}
          className={isAnimated ? 'anim-dot-pop' : 'opacity-0'}
        />
        <circle
          cx="12"
          cy="14"
          r="1"
          fill="currentColor"
          style={{ animationDelay: '380ms' }}
          className={isAnimated ? 'anim-dot-pop' : 'opacity-0'}
        />
        <circle
          cx="16"
          cy="14"
          r="1"
          fill="currentColor"
          style={{ animationDelay: '460ms' }}
          className={isAnimated ? 'anim-dot-pop' : 'opacity-0'}
        />
        <circle
          cx="8"
          cy="18"
          r="1"
          fill="currentColor"
          style={{ animationDelay: '540ms' }}
          className={isAnimated ? 'anim-dot-pop' : 'opacity-0'}
        />
        <circle
          cx="12"
          cy="18"
          r="1"
          fill="currentColor"
          style={{ animationDelay: '620ms' }}
          className={isAnimated ? 'anim-dot-pop' : 'opacity-0'}
        />
        <circle
          cx="16"
          cy="18"
          r="1"
          fill="currentColor"
          style={{ animationDelay: '700ms' }}
          className={isAnimated ? 'anim-dot-pop' : 'opacity-0'}
        />
      </svg>
    </div>
  )
}

/**
 * Icono animado para Sección ¿DÓNDE? (Ubicación)
 * Descenso elástico suave del pin de mapa con onda sonar concéntrica al asentarse.
 */
export const LocationSectionIcon = ({ className = 'text-dark-900', containerBorder = 'border-dark-900/30' }) => {
  const [containerRef, isAnimated] = useAnimateOnView(350)

  return (
    <div
      ref={containerRef}
      className={`relative w-14 h-14 border ${containerBorder} flex items-center justify-center overflow-hidden transition-all ${
        isAnimated ? 'anim-frame-pop' : 'opacity-90'
      }`}
    >
      {/* Onda sonar concéntrica que emana en la base una única vez */}
      {isAnimated && (
        <span
          style={{ animationDelay: '450ms' }}
          className="absolute bottom-2.5 w-6 h-3 rounded-full border border-dark-900/40 anim-sonar-wave pointer-events-none"
        />
      )}

      <svg
        className={`w-7 h-7 ${className} ${isAnimated ? 'anim-pin-drop' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.25}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.25}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          className={isAnimated ? 'anim-dot-pop' : ''}
          style={{ animationDelay: '400ms' }}
        />
      </svg>
    </div>
  )
}

/**
 * Icono animado para Sección REGALOS (Presentes)
 * Apertura sutil de tapa y moño con destello sutil de cinta sobre fondo oscuro.
 */
export const GiftSectionIcon = ({ className = 'text-white', containerBorder = 'border-white/20' }) => {
  const [containerRef, isAnimated] = useAnimateOnView(350)

  return (
    <div
      ref={containerRef}
      className={`w-14 h-14 border ${containerBorder} flex items-center justify-center transition-all ${
        isAnimated ? 'anim-frame-pop-dark' : 'opacity-90'
      }`}
    >
      <svg
        className={`w-7 h-7 ${className}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {/* Cuerpo de la caja (fijo en la base) */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.25}
          d="M20 12v10H4V12M12 22V12"
          className={isAnimated ? 'anim-gift-gleam' : ''}
        />
        {/* Tapa y Moño animado (hace un despegue grácil y se asienta) */}
        <g className={isAnimated ? 'anim-gift-lid' : ''}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.25}
            d="M2 7h20v5H2zM12 12V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"
          />
        </g>
      </svg>
    </div>
  )
}

/**
 * Icono animado para Sección DRESS CODE (Código de Vestimenta)
 * Trazado de diamante facetado de alta costura con barrido de destello (shimmer sweep) único.
 */
export const DressCodeSectionIcon = ({ className = 'text-dark-900', containerBorder = 'border-dark-900/30' }) => {
  const [containerRef, isAnimated] = useAnimateOnView(350)

  return (
    <div
      ref={containerRef}
      className={`relative w-14 h-14 border ${containerBorder} flex items-center justify-center overflow-hidden transition-all ${
        isAnimated ? 'anim-frame-pop' : 'opacity-90'
      }`}
    >
      {/* Destello sutil de brillo en ángulo que cruza una única vez */}
      {isAnimated && (
        <span
          style={{ animationDelay: '400ms' }}
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-dark-900/15 to-transparent anim-shimmer-sweep pointer-events-none"
        />
      )}

      <svg
        className={`w-7 h-7 ${className}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.25}
          d="M6 3h12l4 6-10 13L2 9l4-6z"
          className={isAnimated ? 'anim-diamond-draw' : ''}
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.25}
          d="M2 9h20M12 22l4-13M12 22l-4-13M6 3l6 6 6-6"
          className={isAnimated ? 'anim-diamond-draw' : ''}
        />
      </svg>
    </div>
  )
}
