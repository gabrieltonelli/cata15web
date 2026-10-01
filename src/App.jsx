import { useRef } from 'react'

// Componentes refactorizados según la guía de diseño
import FixedBackground from './components/FixedBackground'
import WelcomeHero from './components/WelcomeHero'
import Countdown from './components/Countdown'
import InfoCards from './components/InfoCards'
import RSVP from './components/RSVP'
import Footer from './components/Footer'
import AudioPlayer from './components/AudioPlayer'

function App() {
  const audioPlayerRef = useRef(null)

  const handleEnterEvent = () => {
    // Al interactuar con el botón INGRESAR, activamos el audio ambiental
    if (audioPlayerRef.current) {
      audioPlayerRef.current.startAudio()
    }
  }

  return (
    <div className="relative min-h-screen bg-transparent text-white font-sans selection:bg-white selection:text-black">
      {/* Fondo Fijo (Fixed Background / Parallax) */}
      <FixedBackground />

      {/* Componente 1: Pantalla de Bienvenida (Hero Overlay) */}
      <WelcomeHero onEnter={handleEnterEvent} />

      {/* Contenido en scroll vertical continuo superpuesto */}
      <main className="relative z-10 w-full flex flex-col items-center">
        {/* Componente 2: Contador (Countdown) */}
        <Countdown />

        {/* Componente 3: Tarjetas de Información (Info Cards A, B, C, D) */}
        <InfoCards />

        {/* Componente 4: Formulario de Asistencia (RSVP) */}
        <RSVP />

        {/* Componente 5: Footer / Despedida */}
        <Footer />
      </main>

      {/* Reproductor de Audio Flotante y Discreto */}
      <AudioPlayer ref={audioPlayerRef} />
    </div>
  )
}

export default App
