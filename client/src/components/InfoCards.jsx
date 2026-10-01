import { useState } from 'react'
import eventConfig from '../config/eventData'
import GiftModal from './GiftModal'
import BoomerangVideo from './BoomerangVideo'
import ScrollReveal from './ScrollReveal'

/**
 * Componente 3: Tarjetas de Información (Info Cards)
 * Orden:
 * 1. Tarjeta A: Fecha y Horario (¿Cuándo?)
 * 2. Transición: Una Noche Inolvidable (Video Boomerang) [Sin márgenes ni bordes]
 * 3. Tarjeta B: Ubicación (¿Dónde?)
 * 4. Tarjeta C: Regalos [Sin márgenes ni bordes]
 * 5. Tarjeta D: Dress Code [Sin márgenes ni bordes]
 * 
 * Cada bloque cuenta con ScrollReveal para una aparición fluida y sofisticada.
 */
const InfoCards = () => {
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)

  return (
    <div className="relative z-10 w-full flex flex-col">
      {/* ========================================================= */}
      {/* TARJETA A: FECHA Y HORA (¿CUÁNDO?) */}
      {/* ========================================================= */}
      <section className="w-full bg-white text-dark-950 py-16 sm:py-24 px-6 sm:px-12 shadow-md">
        <ScrollReveal className="max-w-2xl mx-auto text-center space-y-6">
          {/* Icono de calendario minimalista */}
          <div className="flex justify-center">
            <div className="w-14 h-14 border border-dark-900/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="0" strokeWidth="1.25" />
                <path strokeLinecap="round" strokeWidth="1.25" d="M16 2v4M8 2v4M3 10h18" />
                <circle cx="8" cy="14" r="1" fill="currentColor" />
                <circle cx="12" cy="14" r="1" fill="currentColor" />
                <circle cx="16" cy="14" r="1" fill="currentColor" />
                <circle cx="8" cy="18" r="1" fill="currentColor" />
                <circle cx="12" cy="18" r="1" fill="currentColor" />
                <circle cx="16" cy="18" r="1" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-sans text-[11px] tracking-ultra-luxury uppercase text-dark-600 font-semibold">
              FECHA Y HORARIO
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-[0.15em] text-dark-950">
              {eventConfig.dateTitle}
            </h2>
          </div>

          <div className="space-y-2 py-2">
            <p className="font-serif text-2xl sm:text-3xl text-dark-900">
              {eventConfig.dateText}
            </p>
            <p className="font-sans text-sm sm:text-base tracking-widest text-dark-700 font-medium">
              {eventConfig.timeText}
            </p>
          </div>

          <div className="pt-2">
            <a
              href={eventConfig.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-dark-900 text-dark-950 font-sans text-xs tracking-luxury uppercase font-semibold transition-all duration-300 hover:bg-dark-950 hover:text-white"
            >
              <svg className="mr-2 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              AGENDAR FECHA
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* SECCIÓN TRANSICIÓN: UNA NOCHE INOLVIDABLE (LUEGO DE CUANDO) */}
      {/* Sin márgenes (m-0) ni bordes (border-none) */}
      {/* ========================================================= */}
      <section className="relative w-full py-28 sm:py-36 px-6 flex items-center justify-center overflow-hidden m-0 border-none shadow-none">
        {/* Video en loop boomerang con clase propia y filtro CSS específico */}
        <BoomerangVideo
          src={eventConfig.transitionVideo}
          className="video-noche-inolvidable absolute inset-0 w-full h-full object-cover -z-10"
        />

        {/* Overlay oscuro sutil para alto contraste y elegancia */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-950/50 to-dark-950/85 -z-10" />

        <ScrollReveal className="relative z-10 max-w-xl mx-auto text-center space-y-4 text-white">
          <div className="flex items-center justify-center gap-3 text-white/50">
            <span className="w-10 h-px bg-white/40" />
            <span className="text-xs">✦</span>
            <span className="w-10 h-px bg-white/40" />
          </div>
          <p className="font-cinzel text-2xl sm:text-3xl md:text-5xl tracking-[0.2em] font-light text-white uppercase drop-shadow-lg">
            UNA NOCHE INOLVIDABLE
          </p>
          <p className="font-sans text-[11px] sm:text-xs tracking-ultra-luxury text-white/80 uppercase font-medium">
            CELEBREMOS JUNTOS
          </p>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* TARJETA B: UBICACIÓN (¿DÓNDE?) */}
      {/* ========================================================= */}
      <section className="w-full bg-white text-dark-950 py-16 sm:py-24 px-6 sm:px-12 shadow-md">
        <ScrollReveal className="max-w-2xl mx-auto text-center space-y-6">
          {/* Icono de pin / ubicación */}
          <div className="flex justify-center">
            <div className="w-14 h-14 border border-dark-900/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-sans text-[11px] tracking-ultra-luxury uppercase text-dark-600 font-semibold">
              LOCALIZACIÓN
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-[0.15em] text-dark-950">
              {eventConfig.locationTitle}
            </h2>
          </div>

          <div className="space-y-2 py-2">
            <p className="font-serif text-2xl sm:text-3xl text-dark-900">
              {eventConfig.venueName}
            </p>
            <p className="font-sans text-sm sm:text-base tracking-wider text-dark-700">
              {eventConfig.address}
            </p>
          </div>

          <div className="pt-2">
            <a
              href={eventConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-dark-900 text-dark-950 font-sans text-xs tracking-luxury uppercase font-semibold transition-all duration-300 hover:bg-dark-950 hover:text-white"
            >
              <span>CÓMO LLEGAR</span>
              <svg className="ml-2 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ========================================================= */}
      {/* TARJETA C: REGALOS */}
      {/* Sin márgenes (m-0) ni bordes (border-none) */}
      {/* ========================================================= */}
      <section className="w-full bg-[#0A0A0A] text-white py-16 sm:py-24 px-6 sm:px-12 m-0 border-none shadow-none">
        <ScrollReveal className="max-w-2xl mx-auto text-center space-y-6">
          {/* Icono de caja de regalo minimalista */}
          <div className="flex justify-center">
            <div className="w-14 h-14 border border-white/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-sans text-[11px] tracking-ultra-luxury uppercase text-white/50 font-semibold">
              PRESENTE
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-[0.15em] text-white">
              {eventConfig.giftsTitle}
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
            {eventConfig.giftsText}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsGiftModalOpen(true)}
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-white font-sans text-xs tracking-luxury uppercase font-semibold transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
            >
              HACER REGALO
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* Modal de Regalos */}
      <GiftModal isOpen={isGiftModalOpen} onClose={() => setIsGiftModalOpen(false)} />

      {/* ========================================================= */}
      {/* TARJETA D: DRESS CODE */}
      {/* Sin márgenes (m-0) ni bordes (border-none) */}
      {/* ========================================================= */}
      <section className="w-full bg-white text-dark-950 py-16 sm:py-24 px-6 sm:px-12 m-0 border-none shadow-none">
        <ScrollReveal className="max-w-2xl mx-auto text-center space-y-6">
          {/* Icono de diamante / percha */}
          <div className="flex justify-center">
            <div className="w-14 h-14 border border-dark-900/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M6 3h12l4 6-10 13L2 9l4-6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M2 9h20M12 22l4-13M12 22l-4-13M6 3l6 6 6-6" />
              </svg>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-sans text-[11px] tracking-ultra-luxury uppercase text-dark-600 font-semibold">
              CÓDIGO DE VESTIMENTA
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-[0.15em] text-dark-950">
              {eventConfig.dressCodeTitle}
            </h2>
          </div>

          <div className="space-y-2 py-2">
            <p className="font-serif text-2xl sm:text-3xl text-dark-900 uppercase tracking-widest">
              {eventConfig.dressCodeValue}
            </p>
            <p className="font-sans text-sm sm:text-base tracking-wider text-dark-600 max-w-md mx-auto">
              {eventConfig.dressCodeDetails}
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}

export default InfoCards
