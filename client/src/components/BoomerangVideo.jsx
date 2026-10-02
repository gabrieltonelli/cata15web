import { useRef, useEffect } from 'react'
import eventConfig from '../config/eventData'

/**
 * Componente BoomerangVideo (Reproductor de Video Optimizado para Móviles)
 * 
 * Optimizaciones de rendimiento clave:
 * 1. Reproducción en bucle nativa HTML5 con aceleración por hardware (MediaCodec / AVPlayer).
 *    Elimina el overhead de JavaScript (sin timeupdate, sin seeking manual hacia atrás).
 * 2. Auto-pausa inteligente mediante IntersectionObserver:
 *    Si el video no está visible en el viewport, se pausa automáticamente para liberar la GPU,
 *    la RAM y el decodificador de video de smartphones de pocos recursos.
 * 3. Composición en capa de hardware dedicada (GPU layer: translateZ(0), will-change: transform).
 * 4. Control de filtros CSS pesados mediante VITE_VIDEO_CSS_FILTERS.
 */
const BoomerangVideo = ({
  src,
  className = '',
  style = {},
  boomerang = false
}) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    // Si autoPause está desactivado, simplemente reproducir en bucle continuo
    if (!eventConfig.videoAutoPause) {
      video.play().catch(() => {})
      return
    }

    // IntersectionObserver para pausar cuando no está visible en pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // El video está visible: reanudar reproducción
            video.play().catch(() => {})
          } else {
            // El video salió de la pantalla: pausar para ahorrar recursos críticos
            video.pause()
          }
        })
      },
      {
        threshold: 0.05,
        rootMargin: '100px 0px 100px 0px', // Precargar 100px antes de entrar
      }
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [src])

  // Estilos de aceleración por hardware dedicados
  const hardwareAcceleratedStyle = {
    transform: 'translateZ(0)',
    WebkitTransform: 'translateZ(0)',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    ...style,
  }

  // Si los filtros CSS están desactivados para ahorrar GPU, limpiar el filter
  if (eventConfig.videoCssFilters === false && hardwareAcceleratedStyle.filter) {
    delete hardwareAcceleratedStyle.filter
  }

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
      style={hardwareAcceleratedStyle}
    />
  )
}

export default BoomerangVideo
