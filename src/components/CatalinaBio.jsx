import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CatalinaBio = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const bioRef = useRef(null)
  const photosRef = useRef([])

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

      gsap.from(bioRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bioRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      photosRef.current.forEach((photo, i) => {
        if (!photo) return
        gsap.from(photo, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: photo,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const photos = [
    '/assets/photos/catalina-01.jpg',
    '/assets/photos/catalina-02.jpg',
    '/assets/photos/catalina-03.jpg',
    '/assets/photos/catalina-04.jpg',
    '/assets/photos/catalina-05.jpg',
    '/assets/photos/catalina-06.jpg',
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="mb-20">
          <p className="font-display text-sm tracking-[0.25em] uppercase text-gris mb-4">
            Algo sobre mí
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-texto">
            Catalina
          </h2>
        </div>

        {/* Bio + main photo */}
        <div
          ref={bioRef}
          className="grid md:grid-cols-2 gap-16 items-center mb-20"
        >
          {/* Main photo */}
          <div className="order-2 md:order-1">
            <div className="aspect-[3/4] bg-gris/5 overflow-hidden">
              <img
                src="/assets/photos/catalina-main.jpg"
                alt="Catalina"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bio text */}
          <div className="order-1 md:order-2">
            <h3 className="font-display text-2xl md:text-3xl font-light text-texto mb-8">
              Hola, soy{' '}
              <span className="font-medium text-magenta">Catalina</span>
            </h3>

            <div className="space-y-5 font-body text-base text-gris leading-relaxed">
              <p>
                Soy una chica apasionada por la vida, la música y los buenos
                momentos. Me encanta pasar tiempo con mis amigos y familia, y
                siempre estoy buscando nuevas aventuras.
              </p>
              <p>
                Estos 15 años son el comienzo de una nueva etapa llena de sueños
                y posibilidades. Los invito a celebrar conmigo.
              </p>
            </div>
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {photos.map((src, i) => (
            <div
              key={i}
              ref={el => (photosRef.current[i] = el)}
              className="aspect-square bg-gris/5 overflow-hidden"
            >
              <img
                src={src}
                alt={`Catalina ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CatalinaBio
