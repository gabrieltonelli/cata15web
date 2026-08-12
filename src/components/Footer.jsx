import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef(null)
  const heartsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hearts animation
      heartsRef.current.forEach((heart, index) => {
        if (!heart) return
        
        gsap.from(heart, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        })
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-oscuro via-oscuro-claro to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* Hearts */}
        <div className="flex justify-center gap-4 mb-8">
          {['❤️', '💖', '💕', '💗', '💖', '❤️'].map((heart, index) => (
            <span 
              key={index}
              ref={el => heartsRef.current[index] = el}
              className="text-2xl md:text-3xl"
            >
              {heart}
            </span>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="mb-8">
          <p className="font-script text-2xl md:text-3xl text-rosa-claro italic">
            "La vida no se mide por las veces que respiras, 
            sino por los momentos que te dejan sin aliento"
          </p>
        </blockquote>

        {/* Names */}
        <div className="mb-8">
          <p className="font-body text-white/60 mb-2">Con amor,</p>
          <p className="font-display text-2xl text-white">
            La familia de <span className="text-gradient">Catalina</span>
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <a 
            href="mailto:contacto@cata15.com" 
            className="glass px-6 py-3 rounded-full font-body text-white/80 hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <span>📧</span>
            <span>contacto@cata15.com</span>
          </a>
          <a 
            href="tel:+541234567890" 
            className="glass px-6 py-3 rounded-full font-body text-white/80 hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <span>📱</span>
            <span>+54 123 456 7890</span>
          </a>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-4 mb-8">
          <a 
            href="#" 
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:bg-white/10 transition-colors"
          >
            📷
          </a>
          <a 
            href="#" 
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:bg-white/10 transition-colors"
          >
            📱
          </a>
          <a 
            href="#" 
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:bg-white/10 transition-colors"
          >
            💬
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8">
          <p className="font-body text-sm text-white/40">
            © 2026 Catalina's XV | Diseñado con ❤️
          </p>
          <p className="font-body text-xs text-white/30 mt-2">
            #Cata15 #QuinceañeraCatalina
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
