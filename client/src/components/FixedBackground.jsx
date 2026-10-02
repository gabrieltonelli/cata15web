/**
 * Fondo fijo base (Fixed Background)
 * Permanece fijo en la pantalla detrás del contenido.
 * Optimizado para rendimiento en móviles: evita renderizar videos duplicados en segundo plano.
 */
const FixedBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none bg-dark-950">
      {/* Capa de contraste y gradiente sutil para garantizar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-950/50 to-dark-950/90" />
      
      {/* Textura sutil de micro-puntos */}
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
