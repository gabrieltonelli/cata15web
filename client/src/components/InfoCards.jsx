import { useState } from 'react'
import eventConfig from '../config/eventData'
import GiftModal from './GiftModal'
import BoomerangVideo from './BoomerangVideo'
import ScrollReveal from './ScrollReveal'
import {
  CalendarSectionIcon,
  LocationSectionIcon,
  GiftSectionIcon,
  DressCodeSectionIcon
} from './AnimatedSectionIcons'

/**
 * Componente 3: Tarjetas de Información (Info Cards)
 * Orden:
 * 1. Tarjeta A: Fecha y Horario (¿Cuándo?)
 * 2. Transición: Una Noche Inolvidable (Video Boomerang) [Sin márgenes ni bordes]
 * 3. Tarjeta B: Ubicación (¿Dónde?)
 * 4. Tarjeta C: Regalos [Sin márgenes ni bordes]
 * 5. Tarjeta D: Dress Code [Sin márgenes ni bordes]
 * 
 * Cada bloque cuenta con ScrollReveal para una aparición fluida y sofisticada,
 * y los iconos realizan una micro-animación elegante one-shot tras su aparición.
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
          {/* Icono animado de calendario */}
          <div className="flex justify-center">
            <CalendarSectionIcon />
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
          {/* Icono animado de ubicación */}
          <div className="flex justify-center">
            <LocationSectionIcon />
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
          {/* Icono animado de caja de regalo */}
          <div className="flex justify-center">
            <GiftSectionIcon />
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
          {/* Icono animado de diamante / dress code */}
          <div className="flex justify-center">
            <DressCodeSectionIcon />
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
