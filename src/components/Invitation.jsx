import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Invitation = () => {
  const sectionRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const ornamentRef = useRef(null)
  const envelopeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Envelope animation
      gsap.from(envelopeRef.current, {
        scale: 0.5,
        opacity: 0,
        rotation: -10,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Line by line reveal
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current]

      lines.forEach((line, index) => {
        gsap.from(line, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: index * 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        })
      })

      // Ornament spin
      gsap.from(ornamentRef.current, {
        scale: 0,
        rotation: 180,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Parallax on scroll
      gsap.to(envelopeRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center section-padding overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-oscuro via-transparent to-oscuro opacity-50" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-rosa/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-pupura/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Envelope icon */}
        <div
          ref={envelopeRef}
          className="mb-12"
        >
          <div className="inline-block p-8 glass rounded-full">
            <svg
              className="w-20 h-20 text-dorado"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Invitation text */}
        <div className="space-y-8">
          <p
            ref={line1Ref}
            className="font-script text-3xl md:text-4xl text-rosa-claro"
          >
            Estás cordialmente invitado/a
          </p>

          <h2
            ref={line2Ref}
            className="font-display text-4xl md:text-6xl lg:text-7xl text-white leading-tight"
          >
            A celebrar mis{' '}
            <span className="text-gradient font-bold">15 años</span>

          </h2>

          {/* Ornament */}
          <div ref={ornamentRef} className="flex justify-center my-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-rosa" />
              <div className="text-dorado text-3xl">✦</div>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-rosa" />
            </div>
          </div>

          <p
            ref={line3Ref}
            className="font-body text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Es mi deseo compartir con vos este momento tan especial de mi vida.
            Tu presencia hará este día aún más mágico.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 text-rosa/20 text-6xl font-display animate-float">
          ✦
        </div>
        <div className="absolute bottom-20 right-10 text-pupura/20 text-4xl font-display animate-float" style={{ animationDelay: '1s' }}>
          ✦
        </div>
        <div className="absolute top-1/2 left-5 text-dorado/20 text-5xl font-display animate-float" style={{ animationDelay: '2s' }}>
          ✦
        </div>
      </div>
    </section>
  )
}

export default Invitation
