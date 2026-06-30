import { t, type Locale } from '@/lib/i18n'

export default function YouTube({ lang, videos }: { lang: Locale; videos: any[] }) {
  const tr = t[lang]
  const isAr = lang === 'ar'
  return (
    <section id="youtube" className="py-24 px-8 md:px-20" style={{ background: 'var(--bg2)' }}>
      <p className="font-mono text-xs tracking-[.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>{tr.youtube.label}</p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: '-.02em' }}>{tr.youtube.title}</h2>
      <p className="text-sm leading-relaxed mb-12 max-w-lg" style={{ color: 'var(--muted)' }}>{tr.youtube.sub}</p>
      <div className="grid md:grid-cols-3 gap-5">
        {videos.map((v: any) => (
          <a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer" className="glass-card rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:border-[rgba(255,0,0,.3)] group block" style={isAr ? { textAlign: 'right' } : {}}>
            <div className="relative aspect-video overflow-hidden" style={{ background: '#0a0a0a' }}>
              <img 
                src={v.thumbnail} 
                alt={isAr ? v.titleAr : v.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: 'rgba(255,0,0,.85)', boxShadow: '0 0 20px rgba(255,0,0,.4)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-mono" style={{ background: 'rgba(0,0,0,.8)', color: '#fff', backdropFilter: 'blur(4px)' }}>{v.duration}</div>
            </div>
            <div className="p-4">
              <div className={`flex items-center gap-2 mb-2 text-xs font-mono ${isAr ? 'flex-row-reverse' : ''}`}>
                <span style={{ color: 'var(--accent)' }}>{v.category}</span>
                <span style={{ color: 'var(--muted)' }}>· {v.views} views</span>
              </div>
              <h3 className="text-sm font-semibold leading-snug group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text)' }}>
                {isAr && v.titleAr ? v.titleAr : v.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
