import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

// Components
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import CatalinaBio from './components/CatalinaBio'
import PreviaGallery from './components/PreviaGallery'
import EventDetails from './components/EventDetails'
import MusicSuggestions from './components/MusicSuggestions'
import RSVP from './components/RSVP'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

function App() {
  const mainRef = useRef(null)
  const smoothRef = useRef(null)

  useEffect(() => {
    // Initialize ScrollSmoother for smooth scrolling
    const smoother = ScrollSmoother.create({
      wrapper: smoothRef.current,
      content: mainRef.current,
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    })

    // Refresh ScrollTrigger after everything is loaded
    ScrollTrigger.refresh()

    return () => {
      smoother.kill()
    }
  }, [])

  return (
    <div className="relative">
      {/* Grain overlay for texture */}
      <div className="grain-overlay" />
      
      {/* Smooth scroll wrapper */}
      <div ref={smoothRef} className="overflow-hidden">
        <main ref={mainRef}>
          <Hero />
          <Invitation />
          <CatalinaBio />
          <PreviaGallery />
          <EventDetails />
          <MusicSuggestions />
          <RSVP />
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default App
