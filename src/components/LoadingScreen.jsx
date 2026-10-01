import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(() => onComplete(), 600)
          }, 400)
          return 100
        }
        const increment = Math.random() * 18 + 4
        return Math.min(prev + increment, 100)
      })
    }, 120)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-fondo"
        >
          {/* Subtle magenta glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-magenta/10 rounded-full blur-[120px]"
            />
          </div>

          <div className="relative z-10 text-center">
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="font-display text-sm tracking-[0.3em] uppercase text-gris mb-8"
            >
              Catalina
            </motion.p>

            <motion.h1
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="font-display text-7xl md:text-9xl font-light text-texto mb-8"
            >
              15
            </motion.h1>

            {/* Progress bar */}
            <div className="w-48 mx-auto">
              <div className="h-px bg-gris/20 overflow-hidden">
                <motion.div
                  className="h-full bg-magenta"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </div>
              <motion.p
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="font-mono text-[10px] text-gris mt-4 tracking-widest"
              >
                {progress < 100 ? 'Cargando' : 'Listo'}
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
