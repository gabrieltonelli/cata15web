import React from 'react'

/**
 * Fondo fijo en loop (Fixed Background / Parallax)
 * Permanece fijo en la pantalla mientras el usuario se desplaza.
 */
const FixedBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
      {/* Video de fondo en loop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover scale-105"
        style={{ filter: 'brightness(0.42) contrast(1.1)' }}
      >
        <source src="/assets/video/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Capa de contraste y gradiente sutil para garantizar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-950/50 to-dark-950/90" />
      
      {/* Textura sutil */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  )
}

export default FixedBackground
