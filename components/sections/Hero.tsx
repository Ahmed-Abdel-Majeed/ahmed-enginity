'use client'
import { useEffect, useRef } from 'react'
import { t, type Locale } from '@/lib/i18n'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { TiltCard } from '@/components/ui/TiltCard'
import { Counter } from '@/components/ui/Counter'
import { MagneticButton } from '@/components/ui/MagneticButton'

export default function Hero({ lang, profile }: { lang: Locale; profile: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tr = t[lang]
  const isAr = lang === 'ar'
  const { scrollY } = useScroll()
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150])
  const ySpring = useSpring(yParallax, { stiffness: 400, damping: 90 })

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
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />

      {/* Floating nodes & Profile Image */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Profile Image Container */}
        <motion.div 
          style={{ y: ySpring }}
          className="absolute top-[20%] right-[10%] md:right-[15%] w-[320px] h-[400px] hidden lg:block group"
        >
          {/* Blurred shadow independent of TiltCard */}
          <motion.div 
            style={{ y: useTransform(ySpring, y => (y as number) * 0.4) }} 
            className="absolute -inset-4 bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)] rounded-[3rem] opacity-20 blur-3xl" 
          />
          
          <TiltCard intensity={25} className="w-full h-full rounded-3xl p-2 !shadow-none pointer-events-auto bg-transparent border-white/5 border backdrop-blur-md">
            <div className="h-full w-full rounded-2xl overflow-hidden relative">
               <img 
                src={profile.profileImage || "/images/profile-placeholder.jpg"} 
                alt={profile.name}
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent mix-blend-overlay" />
            </div>
            
            {/* Floating tags inside 3D space - Business Workflow Nodes */}
            <div className="animate-float absolute -top-10 -left-12 w-52 rounded-xl p-3 bg-white border border-slate-200 shadow-xl pointer-events-auto" style={{ transform: 'translateZ(40px)', animationDelay: '0s' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <div className="font-mono text-[10px] tracking-widest font-bold text-teal-600">WhatsApp AI Agent</div>
              </div>
              <p className="text-[11px] text-slate-700 font-medium leading-tight">Instant Inquiry &amp; Qualification</p>
              <div className="h-0.5 rounded mt-2 opacity-80" style={{ background: 'linear-gradient(90deg,#00A9D6,transparent)' }} />
            </div>
            
            <div className="animate-float absolute top-[40%] -right-12 w-48 rounded-xl p-3 bg-white border border-slate-200 shadow-xl pointer-events-auto" style={{ transform: 'translateZ(50px)', animationDelay: '-1.5s' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <div className="font-mono text-[10px] tracking-widest font-bold text-purple-600">CRM Auto-Sync</div>
              </div>
              <p className="text-[11px] text-slate-700 font-medium leading-tight">Lead Data &amp; Booking Pipeline</p>
              <div className="h-0.5 rounded mt-2 opacity-80" style={{ background: 'linear-gradient(90deg,#6D3AE8,transparent)' }} />
            </div>

            <div className="animate-float absolute -bottom-8 -left-8 w-44 rounded-xl p-3 bg-white border border-slate-200 shadow-xl pointer-events-auto" style={{ transform: 'translateZ(60px)', animationDelay: '-3s' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <div className="font-mono text-[10px] tracking-widest font-bold text-cyan-600">Voice &amp; Follow-up</div>
              </div>
              <p className="text-[11px] text-slate-700 font-medium leading-tight">24/7 Smart Appointment Call</p>
              <div className="h-0.5 rounded mt-2 opacity-80" style={{ background: 'linear-gradient(90deg,#00A9D6,transparent)' }} />
            </div>
          </TiltCard>
        </motion.div>
      </div>

      {/* Content */}
      <div className={`relative z-[2] max-w-5xl px-8 md:px-20 mt-20 ${isAr ? 'text-right' : ''}`}>
        {/* Badge / Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, rotateX: -15, y: -20 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono mb-7 pointer-events-auto`} 
          style={{ background: 'rgba(0,212,255,.07)', border: '1px solid rgba(0,212,255,.2)', color: 'var(--accent)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
          {tr.hero.eyebrow}
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, rotateX: -10, y: 30 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`font-extrabold leading-tight tracking-tight mb-4 text-[#0F172A] ${isAr ? 'font-arabic' : 'font-display'}`}
          style={{ fontSize: 'clamp(44px,6vw,76px)' }}
        >
          <span>{tr.hero.headline}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl leading-relaxed max-w-xl mt-4 mb-4 font-sans text-slate-700 font-medium"
        >
          {tr.hero.sub}
        </motion.p>

        {/* Capabilities Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="font-mono text-xs font-bold tracking-wider mb-8 text-[#0891B2]"
        >
          {tr.hero.capabilities}
        </motion.div>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`flex gap-4 flex-wrap pointer-events-auto items-center ${isAr ? 'flex-row-reverse' : ''}`}
        >
          <MagneticButton as="a" href="#contact" className="px-8 py-4 rounded-xl text-sm font-bold text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #06B6D4, #7C3AED)' }}>
            {tr.hero.cta1}
          </MagneticButton>
          <MagneticButton as="a" href="#projects" className="px-8 py-4 rounded-xl text-sm font-bold bg-white text-slate-800 border border-slate-300 shadow-sm transition-all hover:border-[#0891B2] hover:text-[#0891B2]">
            {tr.hero.cta2}
          </MagneticButton>
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-xs font-mono font-medium text-slate-500"
        >
          🔒 {tr.hero.trust}
        </motion.div>
      </div>
    </section>
  )
}
