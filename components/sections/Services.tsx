'use client'
import { t, type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { TiltCard } from '@/components/ui/TiltCard'

export default function Services({ lang, services }: { lang: Locale; services: any[] }) {
  const tr = t[lang]
  const isAr = lang === 'ar'

  const containerParams = {
    initial: { opacity: 0, scale: 0.95, rotateX: -10 },
    whileInView: { opacity: 1, scale: 1, rotateX: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  };

  return (
    <section id="services" className="py-24 px-8 md:px-20 relative" style={{ background: 'var(--bg2)' }}>
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--accent)] blur-[150px] opacity-20 rounded-full" />
      </div>

      <div className="relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[.2em] uppercase mb-3" 
          style={{ color: 'var(--accent)' }}
        >
          {tr.services.label}
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${isAr ? 'font-arabic' : 'font-display'}`} 
          style={{ letterSpacing: '-.02em' }}
        >
          {tr.services.title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm leading-relaxed mb-12 max-w-lg font-sans" 
          style={{ color: 'var(--muted)' }}
        >
          {tr.services.sub}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, index) => (
            <motion.div 
              key={s.id}
              {...containerParams}
              transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
            >
              <TiltCard intensity={15} className="group relative overflow-hidden h-full rounded-2xl bg-[var(--card)] border border-white/5 transition-all p-6 text-left" style={isAr ? { textAlign: 'right' } : {}}>
                {/* 3D Chip Icon */}
                <div className="mb-6 relative w-12 h-12">
                   {/* Blur under chip */}
                   <div className="absolute -inset-1 bg-[var(--accent)] opacity-20 blur-md rounded-full group-hover:opacity-40 transition-opacity" />
                   {/* Chip Body */}
                   <motion.div 
                     whileHover={{ scale: 1.1, rotate: 10 }}
                     transition={{ type: "spring", stiffness: 300, damping: 12 }}
                     className="relative w-full h-full rounded-[14px] flex items-center justify-center text-xl bg-gradient-to-b from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0.02)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_8px_16px_rgba(0,0,0,0.4)] backdrop-blur-md border border-t-white/20 border-b-black/40"
                   >
                     {s.icon}
                   </motion.div>
                </div>
                
                <h3 className="text-base font-semibold mb-2 font-sans tracking-tight" style={{ color: 'var(--text)' }}>
                  {isAr ? s.titleAr : s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {isAr ? s.descAr : s.desc}
                </p>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                  <div className="font-mono text-[11px] opacity-70 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }}>
                    // {s.tag}
                  </div>
                  <a href="#projects" className="text-xs font-mono text-[var(--accent)] hover:underline">
                    {tr.services.cta}
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
