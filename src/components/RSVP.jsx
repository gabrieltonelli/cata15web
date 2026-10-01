import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const RSVP = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const flashRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    guests: 1,
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

      gsap.from(formRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const triggerFlash = () => {
    const flash = flashRef.current
    if (!flash) return

    // Create 4 color layers
    flash.innerHTML = ''
    const colors = ['flash-magenta', 'flash-azul', 'flash-violeta', 'flash-plata']
    colors.forEach(cls => {
      const div = document.createElement('div')
      div.className = `absolute inset-0 ${cls}`
      flash.appendChild(div)
    })

    // Remove after animation
    setTimeout(() => {
      flash.innerHTML = ''
    }, 1500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'rsvp',
          name: formData.name,
          guests: String(formData.guests),
          message: formData.message,
        }).toString(),
      })
    } catch {}

    // localStorage backup
    const submissions = JSON.parse(localStorage.getItem('rsvp-submissions') || '[]')
    submissions.push({ ...formData, timestamp: new Date().toISOString() })
    localStorage.setItem('rsvp-submissions', JSON.stringify(submissions))

    triggerFlash()
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      {/* Flash overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="mb-20">
          <p className="font-display text-sm tracking-[0.25em] uppercase text-gris mb-4">
            Confirmá tu
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-texto">
            Asistencia
          </h2>
        </div>

        {/* Form */}
        <div ref={formRef}>
          {isSubmitted ? (
            <div className="py-16 text-center">
              <h3 className="font-display text-3xl md:text-4xl font-light text-texto mb-4">
                Gracias, {formData.name}
              </h3>
              <p className="font-body text-base text-gris">
                Hemos registrado tu respuesta. Te esperamos.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-10"
              name="rsvp"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="rsvp" />
              <p className="hidden">
                <label>
                  No fill: <input name="bot-field" />
                </label>
              </p>

              {/* Name */}
              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-gris mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className="w-full bg-transparent border-b border-gris/30 px-0 py-3 font-body text-texto placeholder-gris/40 focus:outline-none focus:border-magenta transition-colors"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              {/* Guests */}
              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-gris mb-3">
                  Cantidad de personas
                </label>
                <div className="flex items-center gap-6">
                  <button
                    type="button"
                    onClick={() => handleChange('guests', Math.max(1, formData.guests - 1))}
                    className="w-10 h-10 border border-gris/30 flex items-center justify-center text-gris hover:text-texto hover:border-texto transition-colors font-mono text-lg"
                  >
                    −
                  </button>
                  <span className="font-mono text-2xl text-texto w-8 text-center">
                    {formData.guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleChange('guests', Math.min(10, formData.guests + 1))}
                    className="w-10 h-10 border border-gris/30 flex items-center justify-center text-gris hover:text-texto hover:border-texto transition-colors font-mono text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-gris mb-2">
                  Mensaje (opcional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={e => handleChange('message', e.target.value)}
                  rows={3}
                  className="w-full bg-transparent border-b border-gris/30 px-0 py-3 font-body text-texto placeholder-gris/40 focus:outline-none focus:border-magenta transition-colors resize-none"
                  placeholder="Un mensaje para Catalina..."
                />
              </div>

              {/* Submit — the only button text on the whole page */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-mono text-xs tracking-[0.2em] uppercase text-magenta hover:text-texto transition-colors disabled:opacity-40"
              >
                {isSubmitting ? 'Enviando...' : 'Confirmar asistencia'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default RSVP
