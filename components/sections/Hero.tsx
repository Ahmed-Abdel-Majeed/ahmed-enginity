'use client'
import { useEffect, useRef } from 'react'
import { t, type Locale } from '@/lib/i18n'

export default function Hero({ lang, profile }: { lang: Locale; profile: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tr = t[lang]
  const isAr = lang === 'ar'

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
      r: Math.random() * 1.4 + .5
    }))
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    let raf: number
    function draw() {
      ctx.clearRect(0, 0, W, H)
      const dark = document.documentElement.getAttribute('data-theme') !== 'light'
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = dark ? 'rgba(0,212,255,0.45)' : 'rgba(0,85,204,0.3)'
        ctx.fill()
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
            const a = .07 * (1 - d / 120)
            ctx.strokeStyle = dark ? `rgba(0,212,255,${a})` : `rgba(0,85,204,${a})`
            ctx.lineWidth = .5; ctx.stroke()
          }
        }
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf) }
  }, [])

  const stats = profile.stats

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg z-0" />
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Floating nodes & Profile Image */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Profile Image Container */}
        <div className="absolute top-[20%] right-[10%] md:right-[15%] w-[320px] h-[400px] hidden lg:block group">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] rounded-3xl opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700" />
          <div className="relative h-full w-full rounded-3xl border border-white/10 overflow-hidden glass-card p-2 transform rotate-2 group-hover:rotate-0 transition-transform duration-700">
            <div className="h-full w-full rounded-2xl overflow-hidden relative grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700">
               <img 
                src={profile.profileImage || "/images/profile-placeholder.jpg"} 
                alt={profile.name}
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
          
          {/* Floating tags around image */}
          <div className="animate-float absolute -top-10 -left-10 w-48 rounded-xl p-3 glass-card pointer-events-auto" style={{ animationDelay: '0s' }}>
            <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: 'var(--accent)' }}>WhatsApp AI Agent</div>
            <div className="h-1 rounded mb-1.5" style={{ background: 'linear-gradient(90deg,var(--accent),transparent)', width: '92%' }} />
            <div className="flex gap-1.5 mt-2"><div className="w-2 h-2 rounded-full bg-emerald-400"/><div className="w-2 h-2 rounded-full" style={{background:'var(--accent)'}}/></div>
          </div>
          
          <div className="animate-float absolute -bottom-8 -right-8 w-40 rounded-xl p-3 glass-card pointer-events-auto" style={{ animationDelay: '-2s', borderColor: 'rgba(124,58,237,.25)' }}>
            <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: 'var(--accent2)' }}>n8n Workflow</div>
            <div className="h-1 rounded mb-1.5" style={{ background: 'linear-gradient(90deg,var(--accent2),transparent)', width: '90%' }} />
            <div className="flex gap-1.5 mt-2"><div className="w-2 h-2 rounded-full" style={{background:'var(--accent2)'}}/><div className="w-2 h-2 rounded-full" style={{background:'var(--accent)'}}/></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`relative z-[2] max-w-5xl px-8 md:px-20 mt-20 ${isAr ? 'text-right' : ''}`}>
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-7`} style={{ background: 'rgba(0,212,255,.07)', border: '1px solid rgba(0,212,255,.2)', color: 'var(--accent)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          {tr.hero.badge}
        </div>

        {/* Name */}
        <h1 className="font-bold leading-none tracking-tight mb-3" style={{ fontSize: 'clamp(44px,6.5vw,82px)' }}>
          <span className="block gradient-text">{profile.name}</span>
          <span className="block text-[0.52em] font-light mt-2" style={{ color: 'var(--muted)' }}>
            {isAr ? profile.titleAr : profile.title}
          </span>
        </h1>

        {/* Desc */}
        <p className="text-base leading-relaxed max-w-xl mt-6 mb-10" style={{ color: 'var(--muted)' }}>
          {isAr ? profile.taglineAr : profile.tagline}
        </p>

        {/* CTAs */}
        <div className={`flex gap-4 flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}>
          <a href="#projects" className="px-7 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))', boxShadow: '0 4px 20px rgba(0,212,255,.2)' }}>
            {tr.hero.cta1}
          </a>
          <a href="#contact" className="px-7 py-3 rounded-lg text-sm transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]" style={{ border: '1px solid var(--border)', color: 'var(--text)' }}>
            {tr.hero.cta2}
          </a>
        </div>

        {/* Stats */}
        <div className={`flex gap-12 mt-16 pt-8 flex-wrap ${isAr ? 'flex-row-reverse' : ''}`} style={{ borderTop: '1px solid var(--border)' }}>
          {stats.map((s: any) => (
            <div key={s.value}>
              <div className="text-3xl font-bold font-mono" style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {s.value}
              </div>
              <div className="text-xs tracking-wide mt-1" style={{ color: 'var(--muted)' }}>
                {isAr ? s.labelAr : s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
