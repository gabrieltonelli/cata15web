import { useState } from 'react'
import eventConfig from '../config/eventData'
import ScrollReveal from './ScrollReveal'

/**
 * Componente 4: Formulario de Asistencia (RSVP)
 * Fondo negro/oscuro de alto contraste con entrada suave ScrollReveal.
 * Campos condicionales según asistencia (si marca 'No podré asistir', oculta requerimientos y música).
 * Incluye campo de comentarios u observaciones encima del botón de envío.
 */
const RSVP = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    attending: 'yes', // 'yes' | 'no'
    dietary: 'Ninguno',
    musicSuggestion: '',
    comments: ''
  })

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setStatus(prev => ({ ...prev, error: 'Por favor complete su nombre y apellido.' }))
      return
    }

    setStatus({ submitting: true, submitted: false, error: null })

    const isAttending = formData.attending === 'yes'

    const payload = {
      'form-name': 'rsvp',
      nombre: formData.firstName.trim(),
      apellido: formData.lastName.trim(),
      asistencia: isAttending ? 'Confirma asistencia' : 'No asistirá',
      requerimientoAlimenticio: isAttending ? formData.dietary : 'No aplica',
      cancionSugerida: isAttending ? (formData.musicSuggestion.trim() || 'Sin sugerencia') : 'No aplica',
      comentarios: formData.comments.trim() || 'Sin comentarios',
      fechaEnvio: new Date().toISOString()
    }

    try {
      let success = false
      let responseData = null

      // Intentar enviar al endpoint configurado (/api/rsvp)
      const primaryUrl = eventConfig.rsvpEndpoint || '/api/rsvp'
      
      const sendRequest = async (url) => {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        const rawText = await res.text()
        let parsed = null
        try {
          parsed = JSON.parse(rawText)
        } catch (e) {
          // No es JSON
        }

        if (!res.ok) {
          const errMsg = parsed?.error || parsed?.details || rawText || `Error HTTP ${res.status}`
          throw new Error(errMsg)
        }

        if (parsed && parsed.success === false) {
          throw new Error(parsed.error || 'No se pudo guardar la confirmación en Google Sheets.')
        }

        return parsed || { success: true }
      }

      try {
        responseData = await sendRequest(primaryUrl)
        success = true
      } catch (primaryErr) {
        console.warn(`[RSVP] Falló envío a ${primaryUrl}:`, primaryErr.message)
        // Si falló en /api/rsvp y estamos en Netlify, intentar la ruta directa /.netlify/functions/api/rsvp
        if (primaryUrl === '/api/rsvp') {
          console.log('[RSVP] Reintentando con endpoint directo /.netlify/functions/api/rsvp...')
          responseData = await sendRequest('/.netlify/functions/api/rsvp')
          success = true
        } else {
          throw primaryErr
        }
      }

      // Guardado de respaldo en localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('rsvp_records') || '[]')
        stored.push({ ...payload, syncStatus: 'synced_to_server' })
        localStorage.setItem('rsvp_records', JSON.stringify(stored))
      } catch (storageErr) {
        console.warn('LocalStorage error:', storageErr)
      }

      setStatus({ submitting: false, submitted: true, error: null })
    } catch (err) {
      console.error('[RSVP Error definitivo]:', err)
      // Guardado de respaldo local ante caída total de red
      try {
        const stored = JSON.parse(localStorage.getItem('rsvp_records') || '[]')
        stored.push({ ...payload, syncStatus: 'pending_sync' })
        localStorage.setItem('rsvp_records', JSON.stringify(stored))
      } catch (e) {}

      setStatus({
        submitting: false,
        submitted: false,
        error: err.message || 'Hubo un inconveniente al conectar con el servidor. Por favor intentá nuevamente.'
      })
    }
  }

  return (
    <section className="relative z-10 w-full bg-[#0A0A0A] text-white py-20 sm:py-28 px-6 sm:px-12 border-t border-white/10">
      <ScrollReveal className="max-w-xl mx-auto w-full">
        {/* Encabezado */}
        <div className="text-center space-y-3 mb-12">
          <span className="font-sans text-[11px] tracking-ultra-luxury uppercase text-white/50 font-semibold">
            R.S.V.P.
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.15em] text-white">
            {eventConfig.rsvpTitle}
          </h2>
          <p className="font-sans text-xs sm:text-sm tracking-wider text-white/60 pt-1">
            {eventConfig.rsvpDeadline}
          </p>
        </div>

        {/* Estado Éxito */}
        {status.submitted ? (
          <div className="p-8 sm:p-12 border border-white/20 bg-white/5 text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 mx-auto border border-white flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-cinzel text-2xl font-bold tracking-wider text-white">
              ¡RESPUESTA REGISTRADA!
            </h3>
            <p className="font-sans text-sm text-white/70 leading-relaxed max-w-sm mx-auto">
              Muchas gracias, <span className="font-semibold text-white">{formData.firstName} {formData.lastName}</span>.
              {formData.attending === 'yes'
                ? ' ¡Me emociona mucho contar con tu presencia!'
                : ' Agradezco que me hayas avisado.'}
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    firstName: '',
                    lastName: '',
                    attending: 'yes',
                    dietary: 'Ninguno',
                    musicSuggestion: '',
                    comments: ''
                  })
                  setStatus({ submitting: false, submitted: false, error: null })
                }}
                className="text-xs font-sans tracking-luxury uppercase text-white/60 hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Enviar otra respuesta
              </button>
            </div>
          </div>
        ) : (
          /* Formulario */
          <form
            onSubmit={handleSubmit}
            name="rsvp"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="rsvp" />
            <div className="hidden">
              <label>No completar: <input name="bot-field" /></label>
            </div>

            {/* Error banner si ocurre */}
            {status.error && (
              <div className="p-4 border border-red-500/50 bg-red-950/30 text-xs font-sans text-red-200">
                {status.error}
              </div>
            )}

            {/* Nombre y Apellido */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-sans text-[11px] tracking-luxury uppercase text-white/70">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-sans text-[11px] tracking-luxury uppercase text-white/70">
                  Apellido *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder="Tu apellido"
                  className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            {/* ¿Asistirás? */}
            <div className="space-y-2 pt-2">
              <label className="block font-sans text-[11px] tracking-luxury uppercase text-white/70">
                ¿Asistirás? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleChange('attending', 'yes')}
                  className={`py-3 px-4 border text-xs sm:text-sm font-sans tracking-wider uppercase transition-all cursor-pointer ${formData.attending === 'yes'
                    ? 'border-white bg-white text-black font-semibold shadow-md'
                    : 'border-white/15 bg-white/5 text-white/60 hover:border-white/40'
                    }`}
                >
                  ¡SÍ, CONFIRMO!
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('attending', 'no')}
                  className={`py-3 px-4 border text-xs sm:text-sm font-sans tracking-wider uppercase transition-all cursor-pointer ${formData.attending === 'no'
                    ? 'border-white bg-white text-black font-semibold shadow-md'
                    : 'border-white/15 bg-white/5 text-white/60 hover:border-white/40'
                    }`}
                >
                  NO PODRÉ ASISTIR
                </button>
              </div>
            </div>

            {/* Campos condicionales (Solo si confirma asistencia) */}
            {formData.attending === 'yes' && (
              <div className="space-y-6 pt-1 animate-fade-in">
                {/* Requerimientos alimenticios */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-[11px] tracking-luxury uppercase text-white/70">
                    Requerimiento alimentario
                  </label>
                  <select
                    value={formData.dietary}
                    onChange={(e) => handleChange('dietary', e.target.value)}
                    className="w-full bg-[#121212] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                  >
                    <option value="Ninguno">Ninguno (Menú tradicional)</option>
                    <option value="Celíaco (Sin TACC)">Celíaco (Sin TACC)</option>
                    <option value="Vegetariano">Vegetariano</option>
                    <option value="Vegano">Vegano</option>
                    <option value="Hipertenso / Sin sal">Hipertenso / Sin sal</option>
                    <option value="Diabético">Diabético</option>
                    <option value="Otro">Otro requerimiento específico</option>
                  </select>
                </div>

                {/* Sugerencia Musical */}
                <div className="space-y-1.5">
                  <label className="block font-sans text-[11px] tracking-luxury uppercase text-white/70">
                    Sugerencia Musical
                  </label>
                  <input
                    type="text"
                    value={formData.musicSuggestion}
                    onChange={(e) => handleChange('musicSuggestion', e.target.value)}
                    placeholder="¿Qué canción no puede faltar en la fiesta?"
                    className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Campo de Comentarios u observaciones (encima del botón enviar) */}
            <div className="space-y-1.5 pt-2">
              <label className="block font-sans text-[11px] tracking-luxury uppercase text-white/70">
                Comentarios u observaciones
              </label>
              <textarea
                rows={3}
                value={formData.comments}
                onChange={(e) => handleChange('comments', e.target.value)}
                placeholder="Mensaje, felicitación o aclaración adicional..."
                className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none"
              />
            </div>

            {/* Botón de envío */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status.submitting}
                className="w-full py-4 border border-white bg-white text-dark-950 font-sans text-xs tracking-ultra-luxury uppercase font-bold transition-all duration-300 hover:bg-transparent hover:text-white disabled:opacity-50 flex items-center justify-center cursor-pointer shadow-lg"
              >
                {status.submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    CONFIRMANDO...
                  </span>
                ) : (
                  <span>CONFIRMAR RESPUESTA</span>
                )}
              </button>
            </div>
          </form>
        )}
      </ScrollReveal>
    </section>
  )
}

export default RSVP
