import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PreviaGallery = () => {
  const sectionRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const titleRef = useRef(null)
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

      // Horizontal scroll animation
      const container = scrollContainerRef.current
      if (container) {
        const totalScroll = container.scrollWidth - container.clientWidth

        gsap.to(container, {
          scrollLeft: totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 30%',
            end: () => `+=${totalScroll}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })
      }

      // Photos entrance animation
      photosRef.current.forEach((photo, index) => {
        if (!photo) return

        gsap.from(photo, {
          scale: 0.8,
          opacity: 0,
          rotateY: 15,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: photo,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const photos = [
    { id: 1, src: '/assets/photos/previa-01-preparativos.jpg', label: 'Preparativos' },
    { id: 2, src: '/assets/photos/previa-02-vestido.jpg', label: 'Vestido' },
    { id: 3, src: '/assets/photos/previa-03-maquillaje.jpg', label: 'Maquillaje' },
    { id: 4, src: '/assets/photos/previa-04-pelo.jpg', label: 'Pelo' },
    { id: 5, src: '/assets/photos/previa-05-accesorios.jpg', label: 'Accesorios' },
    { id: 6, src: '/assets/photos/previa-06-familia.jpg', label: 'Familia' },
    { id: 7, src: '/assets/photos/previa-07-amigas.jpg', label: 'Amigas' },
    { id: 8, src: '/assets/photos/previa-08-momentos.jpg', label: 'Momentos' },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-oscuro via-oscuro-claro to-oscuro" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 text-rosa/10 text-8xl animate-float">✿</div>
      <div className="absolute bottom-1/4 right-10 text-pupura/10 text-6xl animate-float" style={{ animationDelay: '2s' }}>❀</div>

      <div className="relative z-10">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="font-script text-2xl text-rosa-claro mb-4">Una mirada a</p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-gradient font-bold">
            La Previa
          </h2>
          <p className="font-body text-lg text-white/60 mt-4 max-w-xl mx-auto">
            Un adelanto de los momentos previos a la gran fiesta
          </p>
        </div>

        {/* Horizontal scroll gallery */}
        <div
          ref={scrollContainerRef}
          className="horizontal-scroll gap-6 pb-8 px-8"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              ref={el => photosRef.current[index] = el}
              className="flex-shrink-0 w-72 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden glass cursor-pointer group"
            >
              <img
                src={photo.src}
                alt={photo.label}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {/* Label overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-oscuro/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="font-display text-xl text-white">{photo.label}</p>
              </div>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 text-white/50">
            <span className="font-body text-sm">Deslizá</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mt-6">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-rosa via-pupura to-dorado w-1/3 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PreviaGallery
