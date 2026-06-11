import { t, type Locale } from '@/lib/i18n'

export default function Services({ lang, services }: { lang: Locale; services: any[] }) {
  const tr = t[lang]
  const isAr = lang === 'ar'
  return (
    <section id="services" className="py-24 px-8 md:px-20" style={{ background: 'var(--bg2)' }}>
      <p className="font-mono text-xs tracking-[.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>{tr.services.label}</p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: '-.02em' }}>{tr.services.title}</h2>
      <p className="text-sm leading-relaxed mb-12 max-w-lg" style={{ color: 'var(--muted)' }}>{tr.services.sub}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(s => (
          <div key={s.id} className="glass-card rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(0,212,255,.3)] relative overflow-hidden" style={isAr ? { textAlign: 'right' } : {}}>
            <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(90deg,transparent,var(--accent),transparent)' }} />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-5" style={{ background: 'rgba(0,212,255,.07)', border: '1px solid rgba(0,212,255,.14)' }}>{s.icon}</div>
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>{isAr ? s.titleAr : s.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>{isAr ? s.descAr : s.desc}</p>
            <div className="font-mono text-xs mt-4" style={{ color: 'var(--accent)' }}>{s.tag}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
