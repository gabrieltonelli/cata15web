import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const RSVP = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const particlesRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: null,
    guests: 1,
    dietary: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

      // Form animation
      gsap.from(formRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Create particles
      createParticles()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const createParticles = () => {
    const container = particlesRef.current
    if (!container) return

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'

      const size = Math.random() * 4 + 2
      const colors = ['#FF6B9D', '#C44DFF', '#FFD93D', '#FFB3CC']
      const color = colors[Math.floor(Math.random() * colors.length)]

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.4 + 0.1};
      `

      container.appendChild(particle)

      gsap.to(particle, {
        y: -window.innerHeight * 0.5,
        x: `random(-50, 50)`,
        duration: `random(10, 20)`,
        repeat: -1,
        delay: Math.random() * 5,
        ease: 'none'
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Success animation
      gsap.from(formRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
    }, 1500)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-oscuro via-oscuro-claro to-oscuro" />

      {/* Particles container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="font-script text-2xl text-rosa-claro mb-4">Confirmá tu</p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-gradient font-bold">
            Asistencia
          </h2>
          <p className="font-body text-lg text-white/60 mt-4 max-w-xl mx-auto">
            Haznos saber si podrás acompañarnos en este día tan especial
          </p>
        </div>

        {/* Form */}
        <div
          ref={formRef}
          className="glass rounded-2xl p-8 md:p-12"
        >
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="text-8xl mb-6 animate-float">🎉</div>
              <h3 className="font-display text-3xl text-white mb-4">
                ¡Gracias, {formData.name}!
              </h3>
              <p className="font-body text-lg text-white/80 max-w-md mx-auto">
                Hemos registrado tu respuesta. ¡Estamos emocionados de celebrar contigo!
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <div className="glass px-6 py-3 rounded-full">
                  <span className="text-dorado">✨</span>
                  <span className="ml-2 font-body text-white/80">Te esperamos</span>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div>
                <label className="block font-body text-sm text-white/60 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-white placeholder-white/30 focus:outline-none focus:border-rosa/50 transition-colors"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-body text-sm text-white/60 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-white placeholder-white/30 focus:outline-none focus:border-rosa/50 transition-colors"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              {/* Attending */}
              <div>
                <label className="block font-body text-sm text-white/60 mb-4">
                  ¿Podrás acompañarnos?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleChange('attending', true)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${formData.attending === true
                        ? 'border-rosa bg-rosa/20 text-white'
                        : 'border-white/10 hover:border-white/30 text-white/60'
                      }`}
                  >
                    <span className="text-3xl block mb-2">🎉</span>
                    <span className="font-body">¡Sí, allí estaré!</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('attending', false)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${formData.attending === false
                        ? 'border-pupura bg-pupura/20 text-white'
                        : 'border-white/10 hover:border-white/30 text-white/60'
                      }`}
                  >
                    <span className="text-3xl block mb-2">😢</span>
                    <span className="font-body">No podré ir</span>
                  </button>
                </div>
              </div>

              {/* Number of guests */}
              {formData.attending === true && (
                <div className="animate-fadeIn">
                  <label className="block font-body text-sm text-white/60 mb-2">
                    ¿Cuántos asistirán?
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleChange('guests', Math.max(1, formData.guests - 1))}
                      className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-display text-3xl text-white w-12 text-center">
                      {formData.guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleChange('guests', Math.min(5, formData.guests + 1))}
                      className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Dietary restrictions */}
              {formData.attending === true && (
                <div className="animate-fadeIn">
                  <label className="block font-body text-sm text-white/60 mb-2">
                    Restricciones alimentarias
                  </label>
                  <input
                    type="text"
                    value={formData.dietary}
                    onChange={(e) => handleChange('dietary', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-white placeholder-white/30 focus:outline-none focus:border-rosa/50 transition-colors"
                    placeholder="Ej: Vegetariano, sin gluten..."
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block font-body text-sm text-white/60 mb-2">
                  Mensaje para Catalina (opcional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-white placeholder-white/30 focus:outline-none focus:border-rosa/50 transition-colors resize-none"
                  placeholder="Escribe un mensaje de felicitación..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || formData.attending === null}
                className="w-full bg-gradient-to-r from-rosa to-pupura text-white font-body font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <span>💌</span>
                    Confirmar asistencia
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default RSVP
