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
    { id: 1, gradient: 'from-rosa to-pupura', label: 'Preparativos', emoji: '💄' },
    { id: 2, gradient: 'from-pupura to-dorado', label: 'Vestido', emoji: '👗' },
    { id: 3, gradient: 'from-dorado to-rosa', label: 'Maquillaje', emoji: '💋' },
    { id: 4, gradient: 'from-rosa-claro to-pupura', label: 'Pelo', emoji: '💇‍♀️' },
    { id: 5, gradient: 'from-pupura to-rosa', label: 'Accesorios', emoji: '💎' },
    { id: 6, gradient: 'from-dorado to-rosa-claro', label: 'Familia', emoji: '👨‍👩‍👧' },
    { id: 7, gradient: 'from-rosa to-pupura', label: 'Amigas', emoji: '👯‍♀️' },
    { id: 8, gradient: 'from-pupura to-dorado', label: 'Momentos', emoji: '📸' },
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
              <div className={`w-full h-full bg-gradient-to-br ${photo.gradient} opacity-40 flex flex-col items-center justify-center transition-all duration-300 group-hover:opacity-60`}>
                <span className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">{photo.emoji}</span>
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
            <span className="font-body text-sm">Desliza</span>
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
