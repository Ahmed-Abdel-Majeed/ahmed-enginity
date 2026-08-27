'use client'
import { t, type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'

export default function ProofStrip({ lang }: { lang: Locale }) {
  const tr = t[lang]
  const isAr = lang === 'ar'

  const proofItems = [
    { value: '50+', label: isAr ? 'نظام إنتاجي' : 'Production Systems', href: '#projects' },
    { value: '30+', label: isAr ? 'وكيل ذكاء اصطناعي' : 'AI Agents Built', href: '#projects' },
    { value: '5+', label: isAr ? 'سنوات خبرة' : 'Years Experience', href: '#about' },
    { value: '100K+', label: isAr ? 'مجتمع يوتيوب' : 'YouTube Community', href: '#youtube' },
  ]

  return (
    <section className="py-10 px-8 md:px-20 border-y relative z-10" style={{ background: 'var(--bg2)', borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className={`text-center md:text-left ${isAr ? 'md:text-right' : ''}`}>
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>// PROOF & IMPACT</span>
          <h3 className="text-base font-bold tracking-tight text-white mt-1">
            {tr.proof.title}
          </h3>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-8 md:gap-12 ${isAr ? 'flex-row-reverse' : ''}`}>
          {proofItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center transition-all hover:scale-105"
            >
              <span
                className="font-mono text-2xl md:text-3xl font-bold tracking-tight"
                style={{
                  background: 'linear-gradient(135deg,var(--accent),var(--accent2))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {item.value}
              </span>
              <span className="text-xs font-sans mt-0.5 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--muted)' }}>
                {item.label} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
