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
    seconds: 0
  })

  useEffect(() => {
    // Calculate countdown to November 20, 2026 at 20:00
    const targetDate = new Date('2026-11-20T20:00:00')

    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Details cards stagger
      const cards = detailsRef.current?.children
      if (cards) {
        gsap.from(Array.from(cards), {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: detailsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        })
      }

      // Countdown animation
      gsap.from(countdownRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: countdownRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Map animation
      gsap.from(mapRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const CountdownBox = ({ value, label }) => (
    <div className="glass p-4 md:p-6 rounded-xl text-center min-w-[80px] md:min-w-[100px]">
      <div className="font-display text-4xl md:text-5xl text-gradient font-bold mb-2">
        {String(value).padStart(2, '0')}
      </div>
      <div className="font-body text-xs md:text-sm text-white/60 uppercase tracking-wider">
        {label}
      </div>
    </div>
  )

  const details = [
    {
      icon: '📅',
      title: 'Fecha',
      content: '20 de Noviembre 2026',
      subtext: 'Sábado'
    },
    {
      icon: '🕗',
      title: 'Horario',
      content: '20:00 hs',
      subtext: 'Abrimos puertas a las 19:30'
    },
    {
      icon: '📍',
      title: 'Lugar',
      content: 'Quintana 30',
      subtext: 'Chacabuco, Buenos Aires'
    },
    {
      icon: '👗',
      title: 'Dress Code',
      content: 'Elegante',
      subtext: 'Colores pasteles bienvenidos'
    }
  ]

  // Google Maps embed URL with custom marker
  const mapLat = -34.63026033819848
  const mapLng = -60.451379309634284
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.5!2d${mapLng}!3d${mapLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sQuintana+30%2C+Chacabuco!5e0!3m2!1ses!2sar!4v1234567890`
  const mapStaticUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${mapLat},${mapLng}&zoom=16&size=800x400&maptype=roadmap&markers=color:red%7Clabel:C%7C${mapLat},${mapLng}&key=`

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-oscuro via-oscuro-claro to-oscuro" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 text-dorado/10 text-9xl animate-float">✦</div>
      <div className="absolute bottom-20 left-20 text-rosa/10 text-7xl animate-float" style={{ animationDelay: '3s' }}>✦</div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="font-script text-2xl text-rosa-claro mb-4">Los detalles del</p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-gradient font-bold">
            Evento
          </h2>
        </div>

        {/* Countdown */}
        <div
          ref={countdownRef}
          className="mb-16"
        >
          <p className="text-center font-body text-lg text-white/60 mb-6">
            Faltan
          </p>
          <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
            <CountdownBox value={timeLeft.days} label="Días" />
            <CountdownBox value={timeLeft.hours} label="Horas" />
            <CountdownBox value={timeLeft.minutes} label="Minutos" />
            <CountdownBox value={timeLeft.seconds} label="Segundos" />
          </div>
        </div>

        {/* Event details grid */}
        <div
          ref={detailsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {details.map((detail, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-rosa/10 transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {detail.icon}
              </div>
              <h3 className="font-display text-xl text-white mb-2">
                {detail.title}
              </h3>
              <p className="font-body text-lg text-gradient font-semibold mb-2">
                {detail.content}
              </p>
              <p className="font-body text-sm text-white/50">
                {detail.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Google Maps */}
        <div ref={mapRef} className="glass rounded-2xl p-4 md:p-6">
          <div className="aspect-video rounded-xl overflow-hidden relative">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.5!2d${mapLng}!3d${mapLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sQuintana+30,+Chacabuco,+Buenos+Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar`}
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', inset: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del evento - Quintana 30, Chacabuco"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="font-display text-lg text-white">
              📍 Quintana 30, Chacabuco
            </p>
            <p className="font-body text-sm text-white/50 mt-1">
              Buenos Aires, Argentina
            </p>
            <a
              href={`https://www.google.com/maps?q=${mapLat},${mapLng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-6 py-2 glass rounded-full font-body text-sm text-rosa hover:bg-rosa/20 transition-colors"
            >
              Abrir en Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventDetails
