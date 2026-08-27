'use client'
import { useState, useCallback } from 'react'
import { t, type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Testimonials({ lang, testimonials }: { lang: Locale; testimonials: any[] }) {
  const tr = t[lang]
  const isAr = lang === 'ar'
  const [activeIdx, setActiveIdx] = useState(Math.floor(testimonials.length / 2))

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }, [testimonials.length])

  return (
    <section id="testimonials" className="py-24 px-8 md:px-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-mono text-xs tracking-[.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}
        >
          {tr.testimonials.label}
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${isAr ? 'font-arabic' : 'font-display'}`} style={{ letterSpacing: '-.02em' }}
        >
          {tr.testimonials.title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="text-sm leading-relaxed mb-12 max-w-lg font-sans" style={{ color: 'var(--muted)' }}
        >
          {tr.testimonials.sub}
        </motion.p>

        {/* Coverflow Container */}
        <div className="relative h-[360px] md:h-[400px] flex items-center justify-center perspective-[1200px] mb-8">
          {testimonials.map((t: any, i: number) => {
            const offset = (i - activeIdx)
            // handle wrap-around visuals if desired, but for simplicity we rely on actual offset.
            // If they want infinite loop, we need to adjust offset math. Here we assume finite list. 
            let normalizedOffset = offset
            if (activeIdx === testimonials.length - 1 && i === 0) normalizedOffset = 1
            if (activeIdx === 0 && i === testimonials.length - 1) normalizedOffset = -1

            const isActive = normalizedOffset === 0
            const absOffset = Math.abs(normalizedOffset)
            const isVisible = absOffset <= 2 // only show immediate neighbors

            return (
              <motion.div
                key={t.id}
                onClick={() => setActiveIdx(i)}
                initial={false}
                animate={{
                  x: `${normalizedOffset * (isAr ? -110 : 110)}%`,
                  scale: isActive ? 1 : 0.85 - (absOffset * 0.1),
                  rotateY: isActive ? 0 : normalizedOffset > 0 ? (isAr ? 25 : -25) : (isAr ? -25 : 25),
                  z: isActive ? 50 : -100 * absOffset,
                  opacity: isActive ? 1 : isVisible ? 0.4 : 0,
                  pointerEvents: isVisible ? 'auto' : 'none'
                }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="absolute w-[90%] md:w-[400px] cursor-pointer"
                style={{ 
                  zIndex: testimonials.length - absOffset,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className={`glass-card rounded-2xl p-8 h-full bg-[var(--card)] border ${isActive ? 'border-[var(--accent)]' : 'border-white/5 shadow-none'} transition-colors duration-500`} style={isAr ? { textAlign: 'right' } : {}}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-amber-400 text-sm tracking-widest bg-amber-400/10 px-3 py-1 rounded-full">
                      {'★'.repeat(t.rating)}
                    </div>
                    {isActive && (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10" style={{ color: 'var(--accent)' }}>
                        <span className="text-xl leading-none">"</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm leading-loose mb-8 font-sans" style={{ color: 'var(--text)' }}>
                    {isAr ? t.quoteAr : t.quote}
                  </p>
                  
                  <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold font-sans tracking-tight" style={{ color: 'var(--text)' }}>{isAr ? t.nameAr : t.name}</div>
                      <div className="text-xs mt-0.5 opacity-60" style={{ color: 'var(--muted)' }}>{isAr ? `${t.roleAr} · ${t.locationAr}` : `${t.role} · ${t.location}`}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Controls */}
        <div className={`flex justify-center gap-4 mt-6 ${isAr ? 'flex-row-reverse' : ''}`}>
          <button 
            onClick={handlePrev}
            className="w-10 h-10 rounded-full flex items-center justify-center glass-card hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full flex items-center justify-center glass-card hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
