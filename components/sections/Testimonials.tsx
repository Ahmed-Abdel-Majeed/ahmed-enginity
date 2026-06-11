import { t, type Locale } from '@/lib/i18n'

export default function Testimonials({ lang, testimonials }: { lang: Locale; testimonials: any[] }) {
  const tr = t[lang]
  const isAr = lang === 'ar'
  return (
    <section id="testimonials" className="py-24 px-8 md:px-20">
      <p className="font-mono text-xs tracking-[.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>{tr.testimonials.label}</p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: '-.02em' }}>{tr.testimonials.title}</h2>
      <p className="text-sm leading-relaxed mb-12 max-w-lg" style={{ color: 'var(--muted)' }}>{tr.testimonials.sub}</p>
      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t: any) => (
          <div key={t.id} className="glass-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-[rgba(0,212,255,.25)]" style={isAr ? { textAlign: 'right' } : {}}>
            <div className="text-amber-400 text-sm mb-3">{'★'.repeat(t.rating)}</div>
            <p className="text-xs leading-relaxed mb-5 italic" style={{ color: 'var(--muted)' }}>
              <span className="text-2xl not-italic leading-none align-sub mr-1 opacity-60" style={{ color: 'var(--accent)' }}>"</span>
              {isAr ? t.quoteAr : t.quote}
            </p>
            <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))' }}>
                {t.initials}
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{isAr ? t.nameAr : t.name}</div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>{isAr ? `${t.roleAr} · ${t.locationAr}` : `${t.role} · ${t.location}`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
