import { useRef, useEffect } from 'react'

/**
 * Componente BoomerangVideo
 * Reproduce un video en bucle infinito tipo boomerang:
 * Al llegar al final, se reproduce en sentido inverso hasta el inicio, y repite indefinidamente.
 */
const BoomerangVideo = ({
  src,
  className = '',
  playbackSpeed = 1,
  style = {}
}) => {
  const videoRef = useRef(null)
  const isReversingRef = useRef(false)
  const animFrameRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let lastTimestamp = null

    // Función para rebobinar cuadro a cuadro a velocidad controlada
    const rewind = (timestamp) => {
      if (!isReversingRef.current) return

      if (lastTimestamp === null) {
        lastTimestamp = timestamp
      }

      const deltaSeconds = (timestamp - lastTimestamp) / 1000
      lastTimestamp = timestamp

      // Disminuir tiempo según el delta y la velocidad
      const newTime = video.currentTime - deltaSeconds * playbackSpeed

      if (newTime <= 0.05) {
        video.currentTime = 0
        isReversingRef.current = false
        lastTimestamp = null
        // Reanudar reproducción hacia adelante
        video.play().catch(() => {})
      } else {
        video.currentTime = newTime
        animFrameRef.current = requestAnimationFrame(rewind)
      }
    }

    const startRewind = () => {
      if (isReversingRef.current) return
      isReversingRef.current = true
      video.pause()
      lastTimestamp = null
      animFrameRef.current = requestAnimationFrame(rewind)
    }

    // Monitorear cuando se acerca al final del video
    const handleTimeUpdate = () => {
      if (isReversingRef.current) return
      if (video.duration && video.currentTime >= video.duration - 0.08) {
        startRewind()
      }
    }

    const handleEnded = () => {
      startRewind()
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    // Iniciar reproducción hacia adelante
    video.play().catch(() => {})

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [src, playbackSpeed])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={style}
    />
  )
}

export default BoomerangVideo
