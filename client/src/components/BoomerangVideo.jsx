import { useRef, useEffect } from 'react'

/**
 * Componente BoomerangVideo
 * Reproduce un video en bucle continuo:
 * - Si boomerang = true: Al llegar al final se reproduce en sentido inverso hasta el inicio, y repite indefinidamente.
 * - Si boomerang = false: Utiliza el bucle infinito tradicional (loop nativo de HTML5 hacia adelante).
 */
const BoomerangVideo = ({
  src,
  className = '',
  playbackSpeed = 1,
  style = {},
  boomerang = true
}) => {
  const videoRef = useRef(null)
  const isReversingRef = useRef(false)
  const isSeekingRef = useRef(false)
  const seekTimeoutRef = useRef(null)
  const animFrameRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Si boomerang está desactivado, reproducir en loop estándar nativo
    if (!boomerang) {
      video.loop = true
      isReversingRef.current = false
      isSeekingRef.current = false
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (seekTimeoutRef.current) clearTimeout(seekTimeoutRef.current)
      video.play().catch(() => {})
      return
    }

    video.loop = false
    isReversingRef.current = false
    isSeekingRef.current = false

    // Función para ejecutar el siguiente paso de retroceso
    const stepBackward = () => {
      if (!isReversingRef.current) return
      if (!video) return

      // Si ya llegamos al inicio, reiniciar marcha adelante
      if (video.currentTime <= 0.06) {
        video.currentTime = 0
        isReversingRef.current = false
        isSeekingRef.current = false
        if (seekTimeoutRef.current) clearTimeout(seekTimeoutRef.current)
        video.play().catch(() => {})
        return
      }

      // Evitar acumular seeks simultáneos
      if (isSeekingRef.current) return
      isSeekingRef.current = true

      // Paso de retroceso (aprox 30-40ms por cuadro según velocidad)
      const step = 0.045 * playbackSpeed
      const targetTime = Math.max(0, video.currentTime - step)

      try {
        video.currentTime = targetTime
      } catch (e) {
        isSeekingRef.current = false
      }

      // Timeout de seguridad en caso de que el navegador demore el evento seeked
      if (seekTimeoutRef.current) clearTimeout(seekTimeoutRef.current)
      seekTimeoutRef.current = setTimeout(() => {
        if (isReversingRef.current && isSeekingRef.current) {
          isSeekingRef.current = false
          stepBackward()
        }
      }, 70)
    }

    // Iniciar el ciclo de reversa
    const startRewind = () => {
      if (isReversingRef.current) return
      isReversingRef.current = true
      video.pause()
      isSeekingRef.current = false
      stepBackward()
    }

    // Al completarse el seek de un cuadro, el navegador ya lo pintó en pantalla.
    // Programamos el siguiente cuadro hacia atrás en el próximo ciclo de render.
    const handleSeeked = () => {
      if (!isReversingRef.current) return
      isSeekingRef.current = false
      if (seekTimeoutRef.current) clearTimeout(seekTimeoutRef.current)

      animFrameRef.current = requestAnimationFrame(() => {
        stepBackward()
      })
    }

    // Monitorear cuando se acerca al final del video
    const handleTimeUpdate = () => {
      if (isReversingRef.current) return
      if (video.duration && video.currentTime >= video.duration - 0.12) {
        startRewind()
      }
    }

    const handleEnded = () => {
      startRewind()
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('seeked', handleSeeked)

    // Iniciar reproducción hacia adelante
    video.play().catch(() => {})

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('seeked', handleSeeked)
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current)
      }
    }
  }, [src, playbackSpeed, boomerang])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop={!boomerang}
      playsInline
      preload="auto"
      className={className}
      style={style}
    />
  )
}

export default BoomerangVideo
