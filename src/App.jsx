import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'

import LoadingScreen from './components/LoadingScreen'
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import CatalinaBio from './components/CatalinaBio'
import ElBrillo from './components/ElBrillo'
import EventDetails from './components/EventDetails'
import MusicSuggestions from './components/MusicSuggestions'
import RSVP from './components/RSVP'
import PreviaGallery from './components/PreviaGallery'
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const lenisRef = useRef(null)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isLoading) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [isLoading])

  return (
    <div className="relative bg-fondo">
      <LoadingScreen onComplete={handleLoadingComplete} />

      {!isLoading && (
        <>
          {/* Disco grid floor */}
          <div className="disco-grid" aria-hidden="true" />

          {/* Grid sparkles */}
          <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="grid-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${40 + Math.random() * 55}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${2 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <main className="relative z-10">
            <Hero />
            <Invitation />
            <CatalinaBio />
            <ElBrillo />
            <EventDetails />
            <MusicSuggestions />
            <RSVP />
            <PreviaGallery />
            <Footer />
          </main>
        </>
      )}
    </div>
  )
}

export default App
