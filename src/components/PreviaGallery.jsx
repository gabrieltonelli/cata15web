import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PreviaGallery = () => {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  const titleRef = useRef(null)
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

      photosRef.current.forEach((photo, i) => {
        if (!photo) return
        gsap.from(photo, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: photo,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Horizontal wheel scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleWheel = (e) => {
      const atStart = el.scrollLeft <= 0
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1

      if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  const photos = [
    { src: '/assets/photos/previa-01-preparativos.jpg', label: 'Preparativos' },
    { src: '/assets/photos/previa-02-vestido.jpg', label: 'Vestido' },
    { src: '/assets/photos/previa-03-maquillaje.jpg', label: 'Maquillaje' },
    { src: '/assets/photos/previa-04-pelo.jpg', label: 'Pelo' },
    { src: '/assets/photos/previa-05-accesorios.jpg', label: 'Accesorios' },
    { src: '/assets/photos/previa-06-familia.jpg', label: 'Familia' },
    { src: '/assets/photos/previa-07-amigas.jpg', label: 'Amigas' },
    { src: '/assets/photos/previa-08-momentos.jpg', label: 'Momentos' },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div ref={titleRef}>
          <p className="font-display text-sm tracking-[0.25em] uppercase text-gris mb-4">
            Una mirada a
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-texto">
            La Previa
          </h2>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-8 px-6 scrollbar-hide snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            ref={el => (photosRef.current[i] = el)}
            className="flex-shrink-0 w-64 md:w-72 aspect-[3/4] bg-gris/5 overflow-hidden snap-start group relative"
          >
            <img
              src={photo.src}
              alt={photo.label}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-fondo/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-body text-sm text-texto">{photo.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PreviaGallery
