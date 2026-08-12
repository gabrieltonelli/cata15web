import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => onComplete(), 500)
          }, 300)
          return 100
        }
        // Random increment for natural feel
        const increment = Math.random() * 15 + 5
        return Math.min(prev + increment, 100)
      })
    }, 150)

    return () => clearInterval(interval)
  }, [onComplete])

  // Preload critical assets
  useEffect(() => {
    const images = [
      '/assets/photos/catalina-main.jpg',
      '/assets/video/hero-bg.mp4'
    ]

    let loaded = 0
    const total = images.length

    images.forEach(src => {
      const img = new Image()
      img.onload = img.onerror = () => {
        loaded++
        const assetProgress = (loaded / total) * 30
        setProgress(prev => Math.min(prev + assetProgress, 90))
      }
      img.src = src
    })
  }, [])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-oscuro"
        >
          {/* Animated background circles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-rosa/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pupura/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-dorado/20 rounded-full blur-3xl"
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Animated hearts */}
            <div className="flex justify-center gap-2 mb-8">
              {['❤️', '💖', '💕', '💗', '💖', '❤️'].map((heart, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut'
                  }}
                  className="text-2xl md:text-3xl"
                >
                  {heart}
                </motion.span>
              ))}
            </div>

            {/* Title */}
            <motion.h1
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="font-display text-6xl md:text-8xl text-gradient font-bold mb-4"
            >
              15
            </motion.h1>

            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="font-script text-2xl md:text-3xl text-rosa-claro mb-12"
            >
              Preparando todo para ti...
            </motion.p>

            {/* Progress bar */}
            <div className="w-64 md:w-80 mx-auto">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-rosa via-pupura to-dorado rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <motion.p
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="font-body text-sm text-white/50 mt-3"
              >
                {progress < 100 ? 'Cargando...' : '¡Listo!'}
              </motion.p>
            </div>

            {/* Floating sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                animate={{
                  y: [0, -30, 0],
                  x: [0, (i % 2 === 0 ? 15 : -15), 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut'
                }}
                className="absolute text-dorado/60 text-xl pointer-events-none"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${30 + (i % 3) * 20}%`
                }}
              >
                ✦
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
