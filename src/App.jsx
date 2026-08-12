import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

// Components
import LoadingScreen from './components/LoadingScreen'
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import CatalinaBio from './components/CatalinaBio'
import EventDetails from './components/EventDetails'
import MusicSuggestions from './components/MusicSuggestions'
import RSVP from './components/RSVP'
import PreviaGallery from './components/PreviaGallery'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

function App() {
  const mainRef = useRef(null)
  const smoothRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [smoother, setSmoother] = useState(null)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading && mainRef.current && smoothRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const sm = ScrollSmoother.create({
          wrapper: smoothRef.current,
          content: mainRef.current,
          smooth: 1.5,
          effects: true,
          smoothTouch: 0.1,
        })
        setSmoother(sm)

        // Refresh ScrollTrigger after everything is loaded
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
      }, 100)

      return () => {
        clearTimeout(timer)
        if (smoother) {
          smoother.kill()
        }
      }
    }
  }, [isLoading])

  return (
    <div className="relative">
      {/* Loading Screen */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      {/* Main content - only rendered after loading */}
      {!isLoading && (
        <>
          {/* Grain overlay for texture */}
          <div className="grain-overlay" />
          
          {/* Smooth scroll wrapper */}
          <div ref={smoothRef} className="overflow-hidden">
            <main ref={mainRef}>
              <Hero />
              <Invitation />
              <CatalinaBio />
              <EventDetails />
              <MusicSuggestions />
              <RSVP />
              <PreviaGallery />
              <Footer />
            </main>
          </div>
        </>
      )}
    </div>
  )
}

export default App
