'use client'
import { t, type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'

export default function FinalCta({ lang }: { lang: Locale }) {
  const tr = t[lang]
  const isAr = lang === 'ar'

  return (
    <section className="py-24 px-8 md:px-20 relative overflow-hidden z-10" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at 50% 50%, var(--accent) 0%, transparent 60%)' }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white ${isAr ? 'font-arabic' : 'font-display'}`}
        >
          {tr.finalCta.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          style={{ color: 'var(--muted)' }}
        >
          {tr.finalCta.sub}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`flex gap-4 justify-center flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}
        >
          <MagneticButton
            as="a"
            href="#contact"
            className="px-8 py-4 rounded-xl text-sm font-bold text-white transition-all shadow-lg"
            style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))', boxShadow: '0 4px 20px rgba(0,212,255,.25)' }}
          >
            {tr.finalCta.cta1}
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            className="px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
            style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            {tr.finalCta.cta2}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
