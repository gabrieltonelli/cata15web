import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EventDetails = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const detailsRef = useRef(null)
  const countdownRef = useRef(null)
  const mapRef = useRef(null)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const target = new Date('2026-11-20T20:00:00')

    const update = () => {
      const diff = target - new Date()
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        })
      }
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(countdownRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: countdownRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      const items = detailsRef.current?.children
      if (items) {
        gsap.from(Array.from(items), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: detailsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      gsap.from(mapRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const CountdownBlock = ({ value, label }) => (
    <div className="text-center">
      <div className="countdown-digit text-4xl md:text-6xl font-light text-texto mb-2">
        {String(value).padStart(2, '0')}
      </div>
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-gris">
        {label}
      </div>
    </div>
  )

  const details = [
    { label: 'Fecha', value: '20 de Noviembre 2026', sub: 'Sábado' },
    { label: 'Horario', value: '20:00 hs', sub: 'Puertas 19:30' },
    { label: 'Lugar', value: 'Quintana 30', sub: 'Chacabuco, Buenos Aires' },
    { label: ' Dress Code', value: 'Elegante', sub: 'Colores libre' },
  ]

  const mapLat = -34.63026033819848
  const mapLng = -60.451379309634284

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="mb-20">
          <p className="font-display text-sm tracking-[0.25em] uppercase text-gris mb-4">
            Los detalles del
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-texto">
            Evento
          </h2>
        </div>

        {/* Countdown */}
        <div ref={countdownRef} className="mb-24">
          <p className="text-center font-body text-sm text-gris mb-8 tracking-widest uppercase">
            Faltan
          </p>
          <div className="flex justify-center gap-4 sm:gap-6 md:gap-12">
            <CountdownBlock value={timeLeft.days} label="Días" />
            <div className="text-gris/30 text-3xl font-light self-start mt-2">:</div>
            <CountdownBlock value={timeLeft.hours} label="Horas" />
            <div className="text-gris/30 text-3xl font-light self-start mt-2">:</div>
            <CountdownBlock value={timeLeft.minutes} label="Min" />
            <div className="text-gris/30 text-3xl font-light self-start mt-2">:</div>
            <CountdownBlock value={timeLeft.seconds} label="Seg" />
          </div>
        </div>

        {/* Details */}
        <div
          ref={detailsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gris/10 mb-16"
        >
          {details.map((d, i) => (
            <div key={i} className="bg-fondo p-8">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gris mb-3">
                {d.label}
              </p>
              <p className="font-display text-xl md:text-2xl font-light text-texto mb-1">
                {d.value}
              </p>
              <p className="font-body text-sm text-gris">{d.sub}</p>
            </div>
          ))}
        </div>

        {/* Map */}
        <div ref={mapRef}>
          <div className="aspect-video bg-gris/5 overflow-hidden relative">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.5!2d${mapLng}!3d${mapLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sQuintana+30,+Chacabuco,+Buenos+Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar`}
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', inset: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del evento"
            />
          </div>
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="font-display text-lg text-texto">Quintana 30</p>
              <p className="font-body text-sm text-gris">Chacabuco, Buenos Aires, Argentina</p>
            </div>
            <a
              href={`https://www.google.com/maps?q=${mapLat},${mapLng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest uppercase text-magenta hover:text-texto transition-colors"
            >
              Abrir en Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventDetails
