import { useState } from 'react'
import eventConfig from '../config/eventData'

/**
 * Modal elegante de Datos Bancarios para la sección de Regalos
 */
const GiftModal = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState(null)
  const { bankDetails } = eventConfig

  if (!isOpen) return null

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    setTimeout(() => {
      setCopiedField(null)
    }, 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-dark-900 border border-white/20 p-6 sm:p-8 text-white shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
          aria-label="Cerrar modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Encabezado */}
        <div className="mb-6 space-y-1">
          <p className="font-sans text-[10px] tracking-ultra-luxury text-white/60 uppercase">DATOS BANCARIOS</p>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-white">
            TRANSFERENCIA
          </h3>
          <p className="font-sans text-xs text-white/70 pt-1 leading-relaxed">
            Agradezco de corazón tu gesto y cariño.
          </p>
        </div>

        {/* Detalles bancarios */}
        <div className="space-y-4 text-sm font-sans">
          {/* Titular */}
          <div className="p-3 bg-white/5 border border-white/10">
            <span className="block text-[10px] tracking-luxury text-white/50 uppercase">Titular</span>
            <span className="font-medium text-white text-sm">{bankDetails.holder}</span>
          </div>

          {/* Banco y Cuenta */}
          <div className="p-3 bg-white/5 border border-white/10">
            <span className="block text-[10px] tracking-luxury text-white/50 uppercase">Entidad y Tipo</span>
            <span className="font-medium text-white text-sm">{bankDetails.bank} • {bankDetails.accountType}</span>
          </div>

          {/* CBU */}
          <div className="p-3 bg-white/5 border border-white/10 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] tracking-luxury text-white/50 uppercase">CBU / CVU</span>
              <span className="font-mono text-xs sm:text-sm text-white truncate block">{bankDetails.cbu}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(bankDetails.cbu, 'cbu')}
              className="px-3 py-1.5 border border-white/20 text-xs font-sans tracking-wider uppercase hover:bg-white hover:text-black transition-all shrink-0 cursor-pointer"
            >
              {copiedField === 'cbu' ? '¡COPIADO!' : 'COPIAR'}
            </button>
          </div>

          {/* Alias */}
          <div className="p-3 bg-white/5 border border-white/10 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] tracking-luxury text-white/50 uppercase">ALIAS</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-white truncate block">{bankDetails.alias}</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(bankDetails.alias, 'alias')}
              className="px-3 py-1.5 border border-white/20 text-xs font-sans tracking-wider uppercase hover:bg-white hover:text-black transition-all shrink-0 cursor-pointer"
            >
              {copiedField === 'alias' ? '¡COPIADO!' : 'COPIAR'}
            </button>
          </div>
        </div>

        {/* Botón cerrar abajo */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 border border-white/30 text-xs tracking-ultra-luxury uppercase font-semibold text-white hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  )
}

export default GiftModal
