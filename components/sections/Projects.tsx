'use client'
import { useState } from 'react'
import Link from 'next/link'
import { t, type Locale } from '@/lib/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import { TiltCard } from '@/components/ui/TiltCard'

const FILTERS = ['All','AI Agents','n8n','WhatsApp','Voice AI','CRM','Automation']

export default function Projects({ lang, projects }: { lang: Locale; projects: any[] }) {
  const tr = t[lang]
  const isAr = lang === 'ar'
  const [active, setActive] = useState('All')

  const filterLabels: Record<string, string> = {
    'All': tr.projects.filterAll, 'AI Agents': tr.projects.filterAI,
    'n8n': tr.projects.filterN8n, 'WhatsApp': tr.projects.filterWA,
    'Voice AI': tr.projects.filterVoice, 'CRM': tr.projects.filterCRM,
    'Automation': tr.projects.filterAuto,
  }

  const filtered = active === 'All' ? projects : projects.filter(p =>
    p.category === active || (p.tags && p.tags.includes(active))
  )

  const containerParams = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
  };

  return (
    <section id="projects" className="py-32 px-8 md:px-20 relative z-10">
      <motion.p 
        {...containerParams}
        className="font-mono text-xs tracking-[.2em] uppercase mb-3" 
        style={{ color: 'var(--accent)' }}
      >
        {tr.projects.label}
      </motion.p>
      
      <motion.h2 
        {...containerParams} transition={{ delay: 0.1 }}
        className={`text-4xl md:text-5xl font-bold tracking-tight mb-8 ${isAr ? 'font-arabic' : 'font-display'}`} 
        style={{ letterSpacing: '-.02em' }}
      >
        {tr.projects.title}
      </motion.h2>

      {/* Filter tabs */}
      <motion.div 
        {...containerParams} transition={{ delay: 0.2 }}
        className={`flex flex-wrap gap-2 mb-12 ${isAr ? 'flex-row-reverse' : ''}`}
      >
        {FILTERS.map(f => {
          const isActive = active === f;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="relative px-5 py-2 text-xs font-mono transition-colors rounded-full"
              style={{
                color: isActive ? '#000' : 'var(--muted)',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 rounded-full bg-[var(--accent)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  style={{ zIndex: 0 }}
                />
              )}
              {/* Fallback bg for inactive */}
              {!isActive && (
                <div className="absolute inset-0 rounded-full bg-white/[0.03] border border-white/10" style={{ zIndex: 0 }} />
              )}
              <span className="relative z-10">{filterLabels[f]}</span>
            </button>
          )
        })}
      </motion.div>

      <motion.div layout className="grid md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div 
              key={p.id} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <TiltCard intensity={8} className="group h-full rounded-2xl overflow-hidden bg-[var(--card)] border border-white/5 p-2 flex flex-col" style={isAr ? { textAlign: 'right' } : {}}>
                {/* Isometric Mockup Area */}
                <div 
                  className="relative h-56 w-full rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-6 perspective-[1000px]"
                >
                   {/* Background Glow */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--accent)] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                   
                   {/* The "Device" Mockup */}
                   <div 
                     className="w-full h-full rounded-lg bg-black/60 border border-white/10 overflow-hidden shadow-2xl relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                     style={{
                        transform: 'rotateX(15deg) rotateY(-10deg) scale(0.95)',
                        transformStyle: 'preserve-3d'
                     }}
                   >
                      {/* Straighten on parent hover via global CSS override or inline group-hover in tailwind */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                      
                      {/* Placeholder UI pattern since we don't have images */}
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)', backgroundSize: '20px 20px', transform: 'translateZ(-1px)' }} />
                      
                      {/* Project Title overlay inside device */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 text-center font-bold text-white/50 text-xl font-mono" style={{ transform: 'translateZ(10px)' }}>
                        {p.category.toUpperCase()}
                      </div>

                      {/* Hover Overlay 'View Case Study' */}
                      <div className="absolute inset-0 bg-[var(--accent)]/90 backdrop-blur-md z-20 flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                         <span className="text-black font-bold text-lg mb-2 font-arabic">{isAr ? 'عرض دراسة الحالة' : 'View Case Study'}</span>
                         <div className="flex gap-2 flex-wrap justify-center px-4">
                           {p.technologies.slice(0,3).map((tech: string) => (
                             <span key={tech} className="text-[10px] font-mono text-black/70 bg-black/10 px-2 py-1 rounded-md">{tech}</span>
                           ))}
                         </div>
                      </div>
                   </div>
                   
                   {/* We add a style tag to apply hover transform to the device since group-hover with arbitrary transform is tricky in pure TW 4 */}
                   <style>{`
                      .group:hover .perspective-\\[1000px\\] > div:nth-child(2) {
                        transform: rotateX(0deg) rotateY(0deg) scale(1) !important;
                      }
                   `}</style>
                </div>

                <div className="px-4 pb-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                      // {p.category.toUpperCase()}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 leading-tight font-sans text-white">{isAr ? p.titleAr : p.title}</h3>
                    <p className="text-xs leading-relaxed mb-4 text-white/70">{isAr ? p.descriptionAr : p.description}</p>
                    
                    {/* Problem / Solution summary */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 mb-4 space-y-2">
                      {p.solution && (
                        <div className="text-xs">
                          <span className="font-mono text-[var(--accent)] font-semibold">{tr.projects.builtLabel} </span>
                          <span className="text-white/80">{isAr ? p.solutionAr : p.solution}</span>
                        </div>
                      )}
                      {p.result && (
                        <div className="text-xs">
                          <span className="font-mono text-emerald-400 font-semibold">{tr.projects.resultLabel} </span>
                          <span className="text-emerald-300 font-medium">{isAr ? p.resultAr : p.result}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className={`flex flex-wrap gap-1.5 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                      {p.technologies.map((tech: string) => (
                        <span key={tech} className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white/5 border border-white/10" style={{ color: '#a78bfa' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className={`flex items-center justify-between pt-3 border-t border-white/5 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <Link href={`/${lang}/case-studies/${p.slug}`} className="text-xs font-mono transition-colors hover:text-[var(--accent)] text-[var(--accent)] font-semibold flex items-center gap-1">
                        {tr.projects.viewCaseStudy}
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
