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
            <div className="h-48 relative overflow-hidden bg-gradient-to-br from-[#061020] via-[#091730] to-[#0d0722]">
              {/* CSS/SVG Background Grid fallback */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              <img 
                src={c.thumbnail || `/images/courses/${c.id}.jpg`} 
                alt={isAr ? c.titleAr : c.title}
                loading="lazy"
                onError={(e) => {
                  // Graceful fallback to CSS gradient visual if local file not found
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a12] via-transparent to-transparent z-20" />
              <div className="absolute inset-0 flex items-end p-5 z-30">
                <div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md" style={{ background: 'rgba(124,58,237,.25)', border: '1px solid rgba(124,58,237,.4)', color: '#c4b5fd', backdropFilter: 'blur(6px)' }}>{c.platform}</span>
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
      {courses.length > 0 && (
        <div className="mt-10 text-center">
          <a href="https://www.udemy.com/user/ahmed-33706/" target="_blank" rel="noopener noreferrer" className="px-7 py-3 rounded-xl text-xs font-mono transition-all hover:bg-[rgba(0,212,255,.1)] inline-block" style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}>
            {tr.courses.cta}
          </a>
        </div>
      )}
    </section>
  )
}
