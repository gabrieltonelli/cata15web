import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const ballRef = useRef(null)
  const textRef = useRef(null)
  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseCurrent = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    const ball = ballRef.current
    const text = textRef.current

    // Parallax: background slow, ball medium
    gsap.to(bg, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    gsap.to(ball, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    })

    gsap.to(text, {
      yPercent: -10,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '60% top',
        scrub: 1,
      },
    })

    // Mouse parallax on ball
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      mouseTarget.current.x = ((e.clientX / innerWidth) - 0.5) * 20
      mouseTarget.current.y = ((e.clientY / innerHeight) - 0.5) * 20
    }

    window.addEventListener('mousemove', handleMouseMove)

    let raf
    const animate = () => {
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.08
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.08

      if (ball) {
        ball.style.transform = `translate(${mouseCurrent.current.x}px, ${mouseCurrent.current.y}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Background layer: ball photo 16:9, darkened + blurred */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-fondo/70 z-10" />
        <img
          src="/assets/photos/bola-espejada-16-9.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(2px)' }}
        />
      </div>

      {/* Foreground layer: ball cutout, sharp */}
      <div
        ref={ballRef}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
      >
        <img
          src="/assets/photos/bola-espejada-cutout.webp"
          alt="Bola espejada de discoteca"
          className="w-[200px] h-[300px] sm:w-[280px] sm:h-[420px] md:w-[350px] md:h-[520px] lg:w-[400px] lg:h-[600px] object-contain"
        />
      </div>

      {/* Text content */}
      <div
        ref={textRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4"
      >
        <p className="font-display text-lg md:text-xl tracking-[0.2em] uppercase text-gris mb-4">
          Celebramos mis
        </p>
        <h1 className="font-display text-[7rem] md:text-[10rem] lg:text-[13rem] font-light leading-none text-texto mb-4">
          15
        </h1>
        <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light text-texto mb-8">
          años
        </p>
        <p className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-magenta">
          20 · 11 · 2026
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-fondo to-transparent z-40" />
    </section>
  )
}

export default Hero
