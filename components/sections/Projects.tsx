'use client'
import { useState } from 'react'
import Link from 'next/link'
import { t, type Locale } from '@/lib/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import { TiltCard } from '@/components/ui/TiltCard'

import ProjectWorkflowDiagram from '@/components/ui/ProjectWorkflowDiagram'

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
              <TiltCard intensity={5} className="group h-full rounded-2xl overflow-hidden bg-[var(--card)] border border-white/5 p-2 flex flex-col" style={isAr ? { textAlign: 'right' } : {}}>
                {/* HTML / CSS Workflow Diagram Container */}
                <div className="relative h-60 w-full rounded-xl overflow-hidden mb-4 p-1">
                  <ProjectWorkflowDiagram projectId={p.id} isAr={isAr} />
                </div>

                <div className="px-4 pb-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest mb-1.5" style={{ color: 'var(--accent)' }}>
                      // {p.category.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-bold mb-2 leading-tight font-sans text-white">{isAr ? p.titleAr : p.title}</h3>

                    {/* High-Impact Result Badge */}
                    {p.result && (
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-4 flex items-center gap-3">
                        <span className="text-xl">📈</span>
                        <div>
                          <div className="font-mono text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                            {tr.projects.resultLabel}
                          </div>
                          <div className="text-sm font-bold text-emerald-300">
                            {isAr ? p.resultAr : p.result}
                          </div>
                        </div>
                      </div>
                    )}

                    <p className="text-xs leading-relaxed mb-4 text-white/70">{isAr ? p.descriptionAr : p.description}</p>
                    
                    {/* Problem / Built Summary */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3 mb-4 space-y-1.5">
                      {p.problem && (
                        <div className="text-xs">
                          <span className="font-mono text-amber-400 font-semibold">{isAr ? 'المشكلة:' : 'PROBLEM:'} </span>
                          <span className="text-white/70">{isAr ? p.problemAr : p.problem}</span>
                        </div>
                      )}
                      {p.solution && (
                        <div className="text-xs">
                          <span className="font-mono text-[var(--accent)] font-semibold">{tr.projects.builtLabel} </span>
                          <span className="text-white/90">{isAr ? p.solutionAr : p.solution}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className={`flex flex-wrap gap-1.5 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                      {p.technologies.slice(0, 4).map((tech: string) => (
                        <span key={tech} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-white/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className={`flex items-center justify-between pt-3 border-t border-white/5 ${isAr ? 'flex-row-reverse' : ''}`}>
                      <Link href={`/${lang}/case-studies/${p.slug}`} className="text-xs font-mono transition-colors hover:text-[var(--accent)] text-[var(--accent)] font-bold flex items-center gap-1">
                        {tr.projects.viewCaseStudy} →
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
