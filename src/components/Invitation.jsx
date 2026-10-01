import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Invitation = () => {
  const sectionRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const dividerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = [line1Ref, line2Ref, line3Ref, dividerRef]

      lines.forEach((ref, i) => {
        gsap.from(ref.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          delay: i * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-32"
    >
      <div className="max-w-3xl mx-auto text-center">
        <p
          ref={line1Ref}
          className="font-display text-lg md:text-xl tracking-[0.2em] uppercase text-gris mb-12"
        >
          Estás cordialmente invitado/a
        </p>

        <h2
          ref={line2Ref}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-tight text-texto mb-12"
        >
          A celebrar mis{' '}
          <span className="font-medium text-magenta">15 años</span>
        </h2>

        <div ref={dividerRef} className="flex items-center justify-center gap-4 mb-12">
          <div className="w-16 h-px bg-gris/30" />
          <div className="w-1.5 h-1.5 bg-magenta rotate-45" />
          <div className="w-16 h-px bg-gris/30" />
        </div>

        <p
          ref={line3Ref}
          className="font-body text-lg md:text-xl text-gris leading-relaxed max-w-xl mx-auto"
        >
          Es mi deseo compartir con vos este momento tan especial de mi vida.
          Tu presencia hará este día aún más inolvidable.
        </p>
      </div>
    </section>
  )
}

export default Invitation
