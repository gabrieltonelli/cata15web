import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MusicSuggestions = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const listRef = useRef(null)

  const defaultSongs = [
    { id: 1, title: 'Flowers', artist: 'Miley Cyrus', votes: 12 },
    { id: 2, title: 'Anti-Hero', artist: 'Taylor Swift', votes: 10 },
    { id: 3, title: 'As It Was', artist: 'Harry Styles', votes: 8 },
    { id: 4, title: 'Levitating', artist: 'Dua Lipa', votes: 7 },
  ]

  const [songs, setSongs] = useState(() => {
    const saved = localStorage.getItem('music-suggestions')
    return saved ? JSON.parse(saved) : defaultSongs
  })
  const [newSong, setNewSong] = useState({ title: '', artist: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    localStorage.setItem('music-suggestions', JSON.stringify(songs))
  }, [songs])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(formRef.current, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(listRef.current, {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newSong.title || !newSong.artist) return
    setIsSubmitting(true)

    const entry = { id: Date.now(), title: newSong.title, artist: newSong.artist, votes: 1 }

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'music-suggestions',
          title: newSong.title,
          artist: newSong.artist,
        }).toString(),
      })
    } catch {}

    setSongs(prev => [entry, ...prev])
    setNewSong({ title: '', artist: '' })
    setIsSubmitting(false)
  }

  const handleVote = (id) => {
    setSongs(prev => prev.map(s => (s.id === id ? { ...s, votes: s.votes + 1 } : s)))
  }

  const sorted = [...songs].sort((a, b) => b.votes - a.votes)

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="mb-20">
          <p className="font-display text-sm tracking-[0.25em] uppercase text-gris mb-4">
            ¿Qué te gustaría
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-texto">
            Bailar?
          </h2>
          <p className="font-body text-base text-gris mt-4 max-w-md">
            Sugerí las canciones que no pueden faltar en la fiesta
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div ref={formRef}>
            <h3 className="font-display text-xl font-light text-texto mb-8">
              Sugerir canción
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              name="music-suggestions"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="music-suggestions" />
              <p className="hidden">
                <label>
                  No fill: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-gris mb-2">
                  Canción
                </label>
                <input
                  type="text"
                  value={newSong.title}
                  onChange={e => setNewSong(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-transparent border-b border-gris/30 px-0 py-3 font-body text-texto placeholder-gris/40 focus:outline-none focus:border-magenta transition-colors"
                  placeholder="Flowers"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-gris mb-2">
                  Artista
                </label>
                <input
                  type="text"
                  value={newSong.artist}
                  onChange={e => setNewSong(prev => ({ ...prev, artist: e.target.value }))}
                  className="w-full bg-transparent border-b border-gris/30 px-0 py-3 font-body text-texto placeholder-gris/40 focus:outline-none focus:border-magenta transition-colors"
                  placeholder="Miley Cyrus"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="font-mono text-xs tracking-widest uppercase text-magenta hover:text-texto transition-colors disabled:opacity-40"
              >
                {isSubmitting ? 'Enviando...' : 'Agregar canción'}
              </button>
            </form>
          </div>

          {/* List */}
          <div ref={listRef}>
            <h3 className="font-display text-xl font-light text-texto mb-8">
              Canciones sugeridas
            </h3>

            <div className="space-y-px">
              {sorted.map((song, i) => (
                <div
                  key={song.id}
                  className={`flex items-center gap-4 py-4 ${i === 0 ? 'border-l-2 border-magenta pl-4' : 'pl-4'}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-texto truncate">
                      {song.title}
                    </p>
                    <p className="font-body text-xs text-gris truncate">
                      {song.artist}
                    </p>
                  </div>
                  <button
                    onClick={() => handleVote(song.id)}
                    className="flex items-center gap-1.5 font-mono text-xs text-gris hover:text-magenta transition-colors"
                  >
                    <span className="text-[10px]">▲</span>
                    <span>{song.votes}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MusicSuggestions
