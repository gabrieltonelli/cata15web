import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ElBrillo = () => {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const textsRef = useRef([])
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  // Video scrub text content
  const phrases = [
    'La pista es tuya',
    'Cada reflejo cuenta',
    'La noche recién empieza',
    'Brillá con todo',
    'El centro de todo',
  ]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Preload entire video
    video.preload = 'auto'

    const handleCanPlayThrough = () => {
      setVideoReady(true)
      // Show first frame as poster until scroll
      video.currentTime = 0
      video.pause()
    }

    video.addEventListener('canplaythrough', handleCanPlayThrough)

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlayThrough)
    }
  }, [])

  useEffect(() => {
    if (!videoReady) return

    const video = videoRef.current
    const section = sectionRef.current
    const container = containerRef.current

    // Scroll-driven video scrub: 300vh pinned
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: container,
      scrub: 0.5,
      onUpdate: (self) => {
        if (video && video.duration) {
          video.currentTime = self.progress * video.duration
        }
      },
    })

    // Text stagger animations
    textsRef.current.forEach((text, i) => {
      if (!text) return
      gsap.fromTo(
        text,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: `${(i + 1) * 15}% top`,
            end: `${(i + 2) * 15}% top`,
            scrub: 1,
          },
        }
      )
    })

    return () => {
      scrollTrigger.kill()
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars?.trigger === section) t.kill()
      })
    }
  }, [videoReady])

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '300vh' }}
    >
      {/* Pinned container */}
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/assets/video/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Poster fallback before video loads */}
        {!videoLoaded && (
          <img
            src="/assets/photos/bola-espejada-vertical.webp"
            alt="Bola espejada de discoteca"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-fondo/50 z-10" />

        {/* Texts */}
        <div className="relative z-20 text-center px-6">
          <p className="font-display text-sm tracking-[0.3em] uppercase text-gris mb-6">
            El brillo de la noche
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-texto mb-12">
            La bola gira
          </h2>

          <div className="space-y-8">
            {phrases.map((phrase, i) => (
              <p
                key={i}
                ref={el => (textsRef.current[i] = el)}
                className="font-display text-xl md:text-2xl font-light text-texto/80 opacity-0"
              >
                {phrase}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ElBrillo
