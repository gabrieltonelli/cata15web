import { useState, useEffect } from 'react'
import eventConfig from '../config/eventData'
import BoomerangVideo from './BoomerangVideo'

/**
 * Sección Hero Principal con Contador (Countdown)
 * Fondo: Imagen de bolas espejadas en escala de grises con alto contraste.
 * Título principal: "MIS XV CATALINA" en letras mayúsculas, blancas y de gran tamaño.
 * Contador dinámico reducido un 30% en escala para mantener la preponderancia en el título.
 */
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false
  })

  useEffect(() => {
    const target = new Date(eventConfig.targetDate).getTime()

    const calculateTime = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isFinished: false
      })
    }

    calculateTime()
    const timer = setInterval(calculateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MINUTOS', value: timeLeft.minutes },
    { label: 'SEGUNDOS', value: timeLeft.seconds }
  ]

  return (
    <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-24 px-6 overflow-hidden shadow-2xl">
      {/* Video de fondo con efecto de escala de grises y alto contraste, configurable con efecto boomerang */}
      <BoomerangVideo
        src={eventConfig.heroVideo}
        boomerang={eventConfig.heroVideoBoomerang}
        className="absolute inset-0 w-full h-full object-cover -z-10"
        style={{
          filter: 'grayscale(100%) contrast(150%)'
        }}
      />

      {/* Overlay oscuro sutil para asegurar 100% de legibilidad en texto y contador */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-950/50 to-dark-950/85 -z-10" />

      {/* Contenido centrado */}
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-12">
        
        {/* Título Principal de Gran Tamaño requerido: "MIS XV CATALINA" */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-white/50">
            <span className="w-8 h-px bg-white/40" />
            <span className="font-sans text-[11px] sm:text-xs tracking-ultra-luxury uppercase text-white/70 font-semibold">
              BIENVENIDOS
            </span>
            <span className="w-8 h-px bg-white/40" />
          </div>

          <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.16em] text-white uppercase drop-shadow-2xl leading-none">
            {eventConfig.mainTitle}
          </h1>

          <p className="font-sans text-xs sm:text-sm tracking-luxury text-white/80 uppercase font-medium pt-2">
            {eventConfig.dateText} • {eventConfig.timeText}
          </p>
        </div>

        {/* Separador ornamental fino */}
        <div className="flex items-center justify-center gap-3 text-white/40">
          <div className="w-16 h-px bg-white/20" />
          <span className="text-xs">✦</span>
          <div className="w-16 h-px bg-white/20" />
        </div>

        {/* Subtítulo de cuenta regresiva */}
        <div className="space-y-4">
          <p className="font-sans text-[11px] tracking-ultra-luxury uppercase text-white/60 font-medium">
            FALTAN
          </p>

          {/* Bloque de números reducido un 30% en tamaño para no opacar el título */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto">
            {timeUnits.map((unit, index) => (
              <div
                key={index}
                className="relative py-4 px-3 sm:py-5 sm:px-4 border border-white/20 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300 hover:border-white/50 hover:bg-black/75 shadow-lg"
              >
                {/* Números reducidos 30% */}
                <span className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-widest tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </span>
                {/* Etiquetas compactas */}
                <span className="mt-2 font-sans text-[9px] sm:text-[10px] tracking-luxury text-white/70 font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Indicador sutil de scroll hacia abajo */}
        <div className="pt-8 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <span className="font-sans text-[10px] tracking-ultra-luxury uppercase text-white/60">
            DESCUBRIR MÁS
          </span>
          <div className="w-4 h-7 border border-white/40 rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Countdown
