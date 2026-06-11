import { t, type Locale } from '@/lib/i18n'

export default function Courses({ lang, courses }: { lang: Locale; courses: any[] }) {
  const tr = t[lang]
  const isAr = lang === 'ar'
  return (
    <section id="courses" className="py-24 px-8 md:px-20">
      <p className="font-mono text-xs tracking-[.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>{tr.courses.label}</p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: '-.02em' }}>{tr.courses.title}</h2>
      <p className="text-sm leading-relaxed mb-12 max-w-lg" style={{ color: 'var(--muted)' }}>{tr.courses.sub}</p>
      <div className="grid md:grid-cols-2 gap-6">
        {courses.map((c: any) => (
          <div key={c.id} className="glass-card rounded-2xl overflow-hidden" style={isAr ? { textAlign: 'right' } : {}}>
            <div className="h-48 flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0a1628 0%,#1a0a3a 100%)' }}>
              <div className="text-6xl opacity-30">🎓</div>
              <div className="absolute inset-0 flex items-end p-5">
                <div>
                  <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'rgba(124,58,237,.3)', border: '1px solid rgba(124,58,237,.4)', color: '#c4b5fd' }}>{c.platform}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)' }}>{isAr ? c.titleAr : c.title}</h3>
              <p className="text-xs leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>{isAr ? c.descriptionAr : c.description}</p>
              <div className={`flex items-center gap-5 mb-5 flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="text-center">
                  <div className="text-lg font-bold font-mono" style={{ color: 'var(--accent)' }}>{c.rating}⭐</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{isAr ? 'التقييم' : 'Rating'}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold font-mono" style={{ color: 'var(--accent)' }}>{c.students.toLocaleString()}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{isAr ? 'طالب' : 'Students'}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold font-mono" style={{ color: 'var(--accent)' }}>{c.hours}h</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{isAr ? 'محتوى' : 'Content'}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold font-mono" style={{ color: 'var(--accent)' }}>{c.lectures}</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>{isAr ? 'درس' : 'Lectures'}</div>
                </div>
              </div>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="w-full block text-center py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))' }}>
                {isAr ? `سجّل الآن — ${c.price}` : `Enroll Now — ${c.price}`}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
