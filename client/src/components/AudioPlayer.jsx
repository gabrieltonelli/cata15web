import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import eventConfig from '../config/eventData'

/**
 * Control flotante y discreto para música ambiental (AudioPlayer)
 * Ubicado en la parte inferior de la pantalla.
 */
const AudioPlayer = forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef(null)

  // Exponer método play() al padre (ej. cuando hace clic en INGRESAR)
  useImperativeHandle(ref, () => ({
    startAudio: () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
            setHasInteracted(true)
          })
          .catch((err) => {
            console.log('Autoplay prevent or blocked:', err)
          })
      }
    }
  }))

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setHasInteracted(true)
        })
        .catch((err) => {
          console.warn('Playback error:', err)
        })
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Elemento de audio nativo */}
      <audio
        ref={audioRef}
        src={eventConfig.audioUrl}
        loop
        preload="auto"
      />

      {/* Botón flotante discreto */}
      <button
        type="button"
        onClick={togglePlay}
        title={isPlaying ? 'Pausar música ambiental' : 'Reproducir música ambiental'}
        className="group flex items-center gap-2.5 px-3.5 py-2.5 bg-black/75 hover:bg-black text-white border border-white/20 hover:border-white/50 backdrop-blur-md rounded-full shadow-2xl transition-all duration-300 cursor-pointer"
        aria-label={isPlaying ? 'Silenciar música' : 'Activar música'}
      >
        {/* Icono animado de ondas / notas */}
        <div className="w-4 h-4 flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3.5">
              <span className="w-[2px] bg-white animate-[bounce_0.8s_ease-in-out_infinite] h-2" />
              <span className="w-[2px] bg-white animate-[bounce_1.1s_ease-in-out_infinite_0.2s] h-3.5" />
              <span className="w-[2px] bg-white animate-[bounce_0.9s_ease-in-out_infinite_0.4s] h-1.5" />
            </div>
          ) : (
            <svg className="w-4 h-4 text-white/70 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          )}
        </div>

        <span className="font-sans text-[10px] tracking-widest uppercase font-medium text-white/80 group-hover:text-white hidden sm:inline">
          {isPlaying ? 'MÚSICA ON' : 'MÚSICA'}
        </span>
      </button>
    </div>
  )
})

AudioPlayer.displayName = 'AudioPlayer'

export default AudioPlayer
