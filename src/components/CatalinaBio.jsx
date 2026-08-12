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

      // Bio text animation
      gsap.from(bioRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      })

      // Photos stagger animation
      photosRef.current.forEach((photo, index) => {
        if (!photo) return
        
        gsap.from(photo, {
          scale: 0.8,
          opacity: 0,
          rotation: index % 2 === 0 ? -5 : 5,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: photo,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        })

        // Hover effect
        photo.addEventListener('mouseenter', () => {
          gsap.to(photo, {
            scale: 1.05,
            rotation: 0,
            zIndex: 10,
            duration: 0.3,
            ease: 'power2.out'
          })
        })

        photo.addEventListener('mouseleave', () => {
          gsap.to(photo, {
            scale: 1,
            rotation: index % 2 === 0 ? -5 : 5,
            zIndex: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const photos = [
    { id: 1, src: '/assets/photos/catalina-01.jpg', alt: 'Catalina - Momento especial 1' },
    { id: 2, src: '/assets/photos/catalina-02.jpg', alt: 'Catalina - Momento especial 2' },
    { id: 3, src: '/assets/photos/catalina-03.jpg', alt: 'Catalina - Momento especial 3' },
    { id: 4, src: '/assets/photos/catalina-04.jpg', alt: 'Catalina - Momento especial 4' },
    { id: 5, src: '/assets/photos/catalina-05.jpg', alt: 'Catalina - Momento especial 5' },
    { id: 6, src: '/assets/photos/catalina-06.jpg', alt: 'Catalina - Momento especial 6' },
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-oscuro via-oscuro-claro to-oscuro" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="font-script text-2xl text-rosa-claro mb-4">Conoce a la</p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-gradient font-bold">
            Quinceañera
          </h2>
        </div>

        {/* Bio content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Main photo */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden glass p-2">
              <img 
                src="/assets/photos/catalina-main.jpg"
                alt="Foto principal de Catalina"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 text-4xl animate-float">✨</div>
            <div className="absolute -bottom-4 -left-4 text-3xl animate-float" style={{ animationDelay: '1s' }}>🌸</div>
          </div>

          {/* Bio text */}
          <div ref={bioRef}>
            <h3 className="font-display text-3xl md:text-4xl text-white mb-6">
              Hola, soy <span className="text-gradient">Catalina</span>
            </h3>
            
            <div className="space-y-4 font-body text-lg text-white/80 leading-relaxed">
              <p>
                Soy una chica apasionada por la vida, la música y los buenos momentos. 
                Me encanta pasar tiempo con mis amigos y familia, y siempre estoy 
                buscando nuevas aventuras.
              </p>
              <p>
                Mi pasión por la [música/arte/deporte] comenzó cuando era pequeña, 
                y desde entonces no he parado de explorar todo lo que el mundo tiene 
                para ofrecer.
              </p>
              <p>
                Estos 15 años son el comienzo de una nueva etapa llena de sueños 
                y posibilidades. ¡Los invito a celebrar conmigo!
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="glass px-4 py-2 rounded-full">
                <span className="text-dorado">🎵</span>
                <span className="ml-2 font-body text-white/80">Música</span>
              </div>
              <div className="glass px-4 py-2 rounded-full">
                <span className="text-dorado">📚</span>
                <span className="ml-2 font-body text-white/80">Lectura</span>
              </div>
              <div className="glass px-4 py-2 rounded-full">
                <span className="text-dorado">🎨</span>
                <span className="ml-2 font-body text-white/80">Arte</span>
              </div>
              <div className="glass px-4 py-2 rounded-full">
                <span className="text-dorado">✈️</span>
                <span className="ml-2 font-body text-white/80">Viajar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={el => photosRef.current[index] = el}
              className={`aspect-square rounded-xl overflow-hidden glass cursor-pointer transition-shadow hover:shadow-lg hover:shadow-rosa/20`}
            >
              <img 
                src={photo.src}
                alt={photo.alt}
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
