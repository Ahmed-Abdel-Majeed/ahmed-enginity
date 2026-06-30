'use client'
import { useEffect, useRef, useState } from 'react'
import { t, type Locale } from '@/lib/i18n'

const FEATURES = [
  { icon: '🤖', en: 'AI Agents', ar: 'وكلاء ذكاء اصطناعي' },
  { icon: '⚡', en: 'n8n Automations', ar: 'أتمتة n8n' },
  { icon: '💬', en: 'WhatsApp Systems', ar: 'أنظمة واتساب' },
  { icon: '🎙️', en: 'Voice AI', ar: 'ذكاء صوتي' },
  { icon: '📊', en: 'CRM Integrations', ar: 'تكاملات CRM' },
  { icon: '🔗', en: 'API Workflows', ar: 'مسارات API' },
]

export default function Enginity({ lang }: { lang: Locale }) {
  const tr = t[lang]
  const isAr = lang === 'ar'
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="enginity"
      ref={sectionRef}
      className="py-28 px-8 md:px-20 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Engraved top rule */}
      <div className="flex items-center gap-4 mb-14">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
        <span
          className="font-mono text-[10px] tracking-[.35em] uppercase px-5 py-2 rounded-full"
          style={{
            color: 'var(--accent)',
            border: '1px solid rgba(0,212,255,.18)',
            background: 'rgba(0,212,255,.04)',
          }}
        >
          {isAr ? '// شركتي' : '// My Startup'}
        </span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
      </div>

      {/* Main card — engraved plate */}
      <div
        className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{
          background: 'linear-gradient(145deg, rgba(0,212,255,0.04) 0%, rgba(6,20,40,0.9) 40%, rgba(124,58,237,0.05) 100%)',
          border: '1px solid rgba(0,212,255,.14)',
          boxShadow: 'inset 0 1px 0 rgba(0,212,255,.1), inset 0 -1px 0 rgba(0,0,0,.5), 0 0 60px rgba(0,212,255,.05)',
        }}
      >
        {/* Engraved grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className={`relative z-10 grid lg:grid-cols-2 gap-0 ${isAr ? 'direction-rtl' : ''}`}>

          {/* ── Left: Brand + Description ── */}
          <div className={`p-10 md:p-14 border-b lg:border-b-0 ${isAr ? 'lg:border-l' : 'lg:border-r'} flex flex-col justify-center`}
            style={{ borderColor: 'rgba(0,212,255,.1)' }}>

            {/* Logo mark + wordmark */}
            <div className={`flex items-center gap-4 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
              {/* Engraved logo box */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,212,255,.12), rgba(124,58,237,.12))',
                  border: '1px solid rgba(0,212,255,.25)',
                  boxShadow: 'inset 0 2px 0 rgba(0,212,255,.15), inset 0 -2px 0 rgba(0,0,0,.4)',
                }}
              >
                {/* Stylized 'E' letterform in SVG */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="4" width="5" height="24" rx="1.5" fill="url(#eg)" />
                  <rect x="4" y="4" width="20" height="5" rx="1.5" fill="url(#eg)" />
                  <rect x="4" y="13.5" width="15" height="4" rx="1.5" fill="url(#eg)" />
                  <rect x="4" y="23" width="20" height="5" rx="1.5" fill="url(#eg)" />
                  <defs>
                    <linearGradient id="eg" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                      <stop stopColor="#00d4ff" />
                      <stop offset="1" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className={isAr ? 'text-right' : ''}>
                {/* Engraved wordmark */}
                <h2
                  className="font-bold tracking-wider"
                  style={{
                    fontSize: 'clamp(28px,3.5vw,46px)',
                    fontFamily: 'var(--font-mono)',
                    background: 'linear-gradient(135deg, #fff 0%, var(--accent) 50%, var(--accent2) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.08em',
                    textShadow: 'none',
                    filter: 'drop-shadow(0 0 12px rgba(0,212,255,0.3))',
                  }}
                >
                  ENGINITY
                </h2>
                <p
                  className="font-mono text-[10px] tracking-[.3em] uppercase mt-1"
                  style={{ color: 'rgba(0,212,255,.55)' }}
                >
                  {isAr ? 'بنية تحتية للذكاء الاصطناعي' : 'AI Infrastructure · SaaS'}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-8 max-w-md ${isAr ? 'text-right' : ''}`} style={{ color: 'var(--muted)' }}>
              {isAr
                ? 'Enginity هي منصتي لبناء وتشغيل أنظمة ذكاء اصطناعي وأتمتة للشركات — من وكلاء واتساب إلى مسارات n8n الكاملة. بنيت على تجربة حقيقية مع أكثر من ٥٠ نظاماً إنتاجياً.'
                : 'Enginity is my platform for building and running AI automation systems for businesses — from WhatsApp AI agents to full n8n workflow pipelines. Built on real-world experience across 50+ production deployments.'}
            </p>

            {/* CTA buttons */}
            <div className={`flex gap-3 flex-wrap ${isAr ? 'flex-row-reverse' : ''}`}>
              <a
                href="https://socialmedia-mangment.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,212,255,.25)]"
                style={{
                  background: 'linear-gradient(135deg,var(--accent),var(--accent2))',
                  color: '#fff',
                  boxShadow: '0 4px 15px rgba(0,212,255,.2)',
                }}
              >
                <span>{isAr ? 'زيارة الموقع' : 'Visit Enginity'}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              >
                {isAr ? 'اعمل معنا' : 'Work With Us'}
              </a>
            </div>
          </div>

          {/* ── Right: Features grid ── */}
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <p
              className={`font-mono text-[10px] tracking-[.25em] uppercase mb-8 ${isAr ? 'text-right' : ''}`}
              style={{ color: 'rgba(0,212,255,.5)' }}
            >
              {isAr ? '// ما نبنيه' : '// What We Build'}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map((f, i) => (
                <div
                  key={f.en}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group ${isAr ? 'flex-row-reverse' : ''}`}
                  style={{
                    background: 'rgba(0,212,255,.03)',
                    border: '1px solid rgba(0,212,255,.08)',
                    transitionDelay: `${i * 60}ms`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity .5s ease ${i * 80}ms, transform .5s ease ${i * 80}ms`,
                  }}
                >
                  <span className="text-xl leading-none flex-shrink-0 group-hover:scale-110 transition-transform duration-200">{f.icon}</span>
                  <span
                    className={`text-xs font-mono ${isAr ? 'text-right' : ''}`}
                    style={{ color: 'var(--muted)' }}
                  >
                    {isAr ? f.ar : f.en}
                  </span>
                </div>
              ))}
            </div>

            {/* Status pill */}
            <div
              className={`inline-flex items-center gap-2 mt-8 px-4 py-2 rounded-full w-fit ${isAr ? 'self-end' : ''}`}
              style={{
                background: 'rgba(16,185,129,.08)',
                border: '1px solid rgba(16,185,129,.2)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="font-mono text-[10px] tracking-widest" style={{ color: '#10b981' }}>
                {isAr ? 'نظام مباشر · 50+ عميل' : 'LIVE · 50+ Clients Served'}
              </span>
            </div>
          </div>
        </div>

        {/* Engraved bottom strip */}
        <div
          className={`px-10 md:px-14 py-5 flex items-center justify-between border-t flex-wrap gap-4 ${isAr ? 'flex-row-reverse' : ''}`}
          style={{ borderColor: 'rgba(0,212,255,.08)', background: 'rgba(0,0,0,.2)' }}
        >
          {[
            { val: '50+', label: isAr ? 'نظام إنتاجي' : 'Production Systems', },
            { val: '100K+', label: isAr ? 'مجتمع يوتيوب' : 'YouTube Community', },
            { val: '5+', label: isAr ? 'سنوات خبرة' : 'Years Experience', },
            { val: '24/7', label: isAr ? 'أنظمة تعمل' : 'Systems Online', },
          ].map((stat) => (
            <div key={stat.val} className={`text-center ${isAr ? 'text-right' : ''}`}>
              <div
                className="font-mono font-bold text-lg"
                style={{
                  background: 'linear-gradient(135deg,var(--accent),var(--accent2))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.val}
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase mt-0.5" style={{ color: 'rgba(0,212,255,.4)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
