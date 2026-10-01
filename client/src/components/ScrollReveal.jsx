import { useEffect, useRef, useState } from 'react'

/**
 * Componente ScrollReveal
 * Aplica un sutil y sofisticado efecto de entrada (Fade In + Slide sutil)
 * al ingresar en el campo de visión del usuario (Viewport).
 * 
 * Diseñado con curva cubic-bezier de desaceleración editorial de lujo
 * para lograr una aparición orgánica, fluida y nada brusca.
 */
const ScrollReveal = ({
  children,
  className = '',
  delay = 200,
  threshold = 0.12,
  yOffset = 24
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el) // Una sola vez para no distraer con animaciones repetitivas
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [threshold])

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: '1950ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`transition-all will-change-transform ${isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-7 scale-[0.985]'
        } ${className}`}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
