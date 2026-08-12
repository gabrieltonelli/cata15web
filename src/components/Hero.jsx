import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const dateRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const particlesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline({ delay: 0.5 })

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6')
      .from(dateRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=0.4')
      .from(scrollIndicatorRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.2')

      // Parallax effect on scroll
      gsap.to(titleRef.current, {
        y: -150,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })

      gsap.to(subtitleRef.current, {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })

      // Create floating particles
      createParticles()
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const createParticles = () => {
    const container = particlesRef.current
    if (!container) return

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      
      const size = Math.random() * 6 + 2
      const colors = ['#FF6B9D', '#C44DFF', '#FFD93D', '#FFB3CC']
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
      `
      
      container.appendChild(particle)

      gsap.to(particle, {
        y: -window.innerHeight,
        x: `random(-100, 100)`,
        duration: `random(8, 15)`,
        repeat: -1,
        delay: Math.random() * 5,
        ease: 'none'
      })
    }
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-oscuro via-oscuro-claro to-oscuro" />
      
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rosa/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pupura/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-dorado/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Particles container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <p className="font-script text-2xl md:text-3xl text-rosa-claro mb-4 animate-float">
          ¡Celebramos los
        </p>
        
        <h1 
          ref={titleRef}
          className="font-display text-8xl md:text-9xl lg:text-[12rem] font-bold text-gradient leading-none mb-6"
        >
          15
        </h1>
        
        <p 
          ref={subtitleRef}
          className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-8 text-glow"
        >
          años de <span className="text-gradient font-bold">Catalina</span>
        </p>
        
        <div 
          ref={dateRef}
          className="glass inline-block px-8 py-4 rounded-full mb-12"
        >
          <p className="font-body text-xl md:text-2xl text-dorado tracking-widest">
            NOVIEMBRE 2026
          </p>
        </div>

        <p className="font-script text-3xl md:text-4xl text-rosa-claro mb-8">
          Acompáñanos en este día tan especial
        </p>
      </div>

      {/* Scroll indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <p className="font-body text-sm text-white/60 mb-2 tracking-widest">DESCUBRE MÁS</p>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-rosa rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

export default Hero
