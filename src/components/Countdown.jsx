import { useState, useEffect } from 'react'
import eventConfig from '../config/eventData'

/**
 * Componente 2: Contador (Countdown)
 * Fondo transparente sobre el video dinámico.
 * Muestra Días, Horas, Minutos y Segundos restantes.
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
    <section className="relative z-10 w-full min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
      <div className="max-w-4xl mx-auto w-full text-center space-y-10">
        
        {/* Encabezado sutil */}
        <div className="space-y-2">
          <p className="font-sans text-[11px] sm:text-xs tracking-ultra-luxury uppercase text-white/70 font-medium">
            CUENTA REGRESIVA
          </p>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-white tracking-[0.15em] font-medium">
            EL EVENTO COMIENZA EN
          </h2>
        </div>

        {/* Bloque de números */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {timeUnits.map((unit, index) => (
            <div
              key={index}
              className="relative p-6 sm:p-8 rounded-none border border-white/10 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300 hover:border-white/30"
            >
              <span className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-widest tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="mt-3 font-sans text-[10px] sm:text-xs tracking-luxury text-white/60 font-medium">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Fecha y recordatorio sutil */}
        <p className="font-serif italic text-sm sm:text-base text-white/50 tracking-wider">
          {eventConfig.dateText}
        </p>
      </div>
    </section>
  )
}

export default Countdown
