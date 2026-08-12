import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MusicSuggestions = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const suggestionsRef = useRef(null)

  const [suggestions, setSuggestions] = useState([
    { id: 1, title: 'Flowers', artist: 'Miley Cyrus', votes: 12 },
    { id: 2, title: 'Anti-Hero', artist: 'Taylor Swift', votes: 10 },
    { id: 3, title: 'As It Was', artist: 'Harry Styles', votes: 8 },
    { id: 4, title: 'Levitating', artist: 'Dua Lipa', votes: 7 },
  ])

  const [newSong, setNewSong] = useState({ title: '', artist: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Form animation
      gsap.from(formRef.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

      // Suggestions list animation
      gsap.from(suggestionsRef.current, {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: suggestionsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newSong.title || !newSong.artist) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setSuggestions(prev => [
        { id: Date.now(), title: newSong.title, artist: newSong.artist, votes: 1 },
        ...prev
      ])
      setNewSong({ title: '', artist: '' })
      setIsSubmitting(false)

      // Animate new item
      gsap.from(suggestionsRef.current?.firstChild, {
        scale: 0.8,
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
    }, 500)
  }

  const handleVote = (id) => {
    setSuggestions(prev =>
      prev.map(s => s.id === id ? { ...s, votes: s.votes + 1 } : s)
    )

    // Animate vote
    const element = suggestionsRef.current?.querySelector(`[data-id="${id}"]`)
    if (element) {
      gsap.from(element, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  const sortedSuggestions = [...suggestions].sort((a, b) => b.votes - a.votes)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-oscuro via-oscuro-claro to-oscuro" />

      {/* Music notes decoration */}
      <div className="absolute top-20 left-10 text-rosa/10 text-8xl animate-float">♪</div>
      <div className="absolute top-40 right-20 text-pupura/10 text-6xl animate-float" style={{ animationDelay: '1s' }}>♫</div>
      <div className="absolute bottom-20 left-20 text-dorado/10 text-7xl animate-float" style={{ animationDelay: '2s' }}>♩</div>
      <div className="absolute bottom-40 right-10 text-rosa/10 text-5xl animate-float" style={{ animationDelay: '3s' }}>♬</div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <p className="font-script text-2xl text-rosa-claro mb-4">¿Qué te gustaría </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-gradient font-bold">
            Bailar?
          </h2>
          <p className="font-body text-lg text-white/60 mt-4 max-w-xl mx-auto">
            Sugerí las canciones que no pueden faltar en la fiesta
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Suggestion form */}
          <div ref={formRef}>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display text-2xl text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🎤</span>
                Sugerir canción
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-body text-sm text-white/60 mb-2">
                    Nombre de la canción
                  </label>
                  <input
                    type="text"
                    value={newSong.title}
                    onChange={(e) => setNewSong(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-white placeholder-white/30 focus:outline-none focus:border-rosa/50 transition-colors"
                    placeholder="Ej: Flowers"
                    required
                  />
                </div>

                <div>
                  <label className="block font-body text-sm text-white/60 mb-2">
                    Artista / Grupo
                  </label>
                  <input
                    type="text"
                    value={newSong.artist}
                    onChange={(e) => setNewSong(prev => ({ ...prev, artist: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-white placeholder-white/30 focus:outline-none focus:border-rosa/50 transition-colors"
                    placeholder="Ej: Miley Cyrus"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rosa to-pupura text-white font-body font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <span>🎵</span>
                      Agregar canción
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Suggestions list */}
          <div ref={suggestionsRef}>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-display text-2xl text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🎶</span>
                Canciones sugeridas
              </h3>

              <div className="space-y-3">
                {sortedSuggestions.map((song, index) => (
                  <div
                    key={song.id}
                    data-id={song.id}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/5 ${index === 0 ? 'bg-dorado/10 border border-dorado/30' : ''
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-lg ${index === 0 ? 'bg-dorado text-oscuro' :
                      index === 1 ? 'bg-white/20 text-white' :
                        index === 2 ? 'bg-rosa/30 text-rosa' : 'bg-white/10 text-white/60'
                      }`}>
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-body font-semibold text-white truncate">
                        {song.title}
                      </p>
                      <p className="font-body text-sm text-white/50 truncate">
                        {song.artist}
                      </p>
                    </div>

                    <button
                      onClick={() => handleVote(song.id)}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 hover:bg-rosa/20 transition-colors"
                    >
                      <span className="text-sm">❤️</span>
                      <span className="font-body text-sm text-white/80">{song.votes}</span>
                    </button>
                  </div>
                ))}
              </div>

              {suggestions.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎵</div>
                  <p className="font-body text-white/50">
                    Sé el primero en sugerir una canción
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MusicSuggestions
