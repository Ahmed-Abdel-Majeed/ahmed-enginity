'use client'
import { useState } from 'react'
import Link from 'next/link'
import { t, type Locale } from '@/lib/i18n'

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

  return (
    <section id="projects" className="py-24 px-8 md:px-20">
      <p className="font-mono text-xs tracking-[.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>{tr.projects.label}</p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8" style={{ letterSpacing: '-.02em' }}>{tr.projects.title}</h2>

      {/* Filter tabs */}
      <div className={`flex flex-wrap gap-2 mb-10 ${isAr ? 'flex-row-reverse' : ''}`}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className="px-4 py-1.5 rounded-full text-xs font-mono transition-all"
            style={active === f
              ? { background: 'var(--accent)', color: '#000', border: '1px solid var(--accent)' }
              : { background: 'rgba(0,212,255,.05)', border: '1px solid rgba(0,212,255,.15)', color: 'var(--muted)' }
            }
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((p, i) => (
          <div key={p.id} className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(0,212,255,.3)]" style={isAr ? { textAlign: 'right' } : {}}>
            <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                {String(i + 1).padStart(2, '0')} / {p.category.toUpperCase()}
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>{isAr ? p.titleAr : p.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{isAr ? p.descriptionAr : p.description}</p>
            </div>
            <div className="p-5">
              <div className={`flex flex-wrap gap-1.5 mb-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                {p.technologies.map((tech: string) => (
                  <span key={tech} className="px-2 py-0.5 rounded-full text-[11px] font-mono" style={{ background: 'rgba(124,58,237,.09)', border: '1px solid rgba(124,58,237,.2)', color: '#a78bfa' }}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className={`flex items-center justify-between ${isAr ? 'flex-row-reverse' : ''}`}>
                <p className="text-xs font-mono" style={{ color: 'var(--accent3)' }}>→ {isAr ? p.resultAr : p.result}</p>
                <Link href={`/${lang}/case-studies/${p.slug}`} className="text-xs font-mono transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--muted)' }}>
                  {isAr ? 'عرض التفاصيل →' : 'View Case Study →'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
