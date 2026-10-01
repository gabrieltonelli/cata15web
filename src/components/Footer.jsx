import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative py-20 px-6 border-t border-gris/10"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Quote */}
        <p className="font-display text-xl md:text-2xl font-light italic text-gris leading-relaxed max-w-lg mx-auto">
          La vida no se mide por las veces que respiras, sino por los momentos
          que te dejan sin aliento
        </p>

        {/* Signature */}
        <div>
          <p className="font-body text-sm text-gris mb-1">Con amor,</p>
          <p className="font-display text-2xl font-light text-texto">Catalina</p>
        </div>

        {/* Contact */}
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="mailto:contacto@cata15.com"
            className="font-mono text-xs tracking-widest uppercase text-gris hover:text-magenta transition-colors"
          >
            contacto@cata15.com
          </a>
          <a
            href="tel:+541234567890"
            className="font-mono text-xs tracking-widest uppercase text-gris hover:text-magenta transition-colors"
          >
            +54 123 456 7890
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gris/10">
          <p className="font-mono text-[10px] tracking-widest text-gris/50">
            © 2026 Catalina · XV Años
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
