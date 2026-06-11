'use client'
import { useEffect, useRef } from 'react'
import { t, type Locale } from '@/lib/i18n'

export default function About({ lang, profile }: { lang: Locale; profile: any }) {
  const tr = t[lang]
  const isAr = lang === 'ar'
  const barsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll<HTMLDivElement>('[data-width]').forEach(bar => {
            bar.style.width = bar.dataset.width + '%'
          })
        }
      })
    }, { threshold: 0.2 })
    if (barsRef.current) observer.observe(barsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-24 px-8 md:px-20">
      <p className="font-mono text-xs tracking-[.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
        {tr.about.label}
      </p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-12 whitespace-pre-line" style={{ letterSpacing: '-.02em' }}>
        {tr.about.title}
      </h2>

      <div className={`grid md:grid-cols-2 gap-16 items-start ${isAr ? 'direction-rtl' : ''}`}>
        {/* Text */}
        <div className={isAr ? 'text-right' : ''}>
          <p className="text-sm leading-loose mb-5" style={{ color: 'var(--muted)' }}>
            {isAr ? "أنا " : "I'm an "}<span className="font-semibold" style={{ color: 'var(--text)' }}>{isAr ? profile.titleAr : profile.title}</span>
            {isAr ? " متخصص في بناء أنظمة أتمتة وعملاء AI للشركات في منطقة الشرق الأوسط وشمال أفريقيا وعلى مستوى العالم." : " specializing in building production-grade automation systems and AI agents for businesses across the MENA region and globally."}
          </p>
          <p className="text-sm leading-loose mb-5" style={{ color: 'var(--muted)' }}>
            {isAr ? "يركز عملي على تحويل العمليات التجارية المعقدة إلى " : "My work focuses on turning complex business processes into "}
            <span className="font-semibold" style={{ color: 'var(--text)' }}>{isAr ? "مسارات عمل ذكية تلقائية" : "intelligent, automated workflows"}</span>
            {isAr ? " — من وكلاء واتساب AI يتعاملون مع خدمة العملاء على مدار الساعة، إلى أتمتة CRM تُغلق الصفقات بدون تدخل بشري." : " — from WhatsApp AI agents that handle customer service 24/7, to CRM automations that close deals without human intervention."}
          </p>
          <p className="text-sm leading-loose mb-8" style={{ color: 'var(--muted)' }}>
            {isAr ? "بخبرة عميقة في " : "With deep expertise in "}
            <span className="font-semibold" style={{ color: 'var(--text)' }}>n8n, OpenAI, LangChain, and Supabase</span>
            {isAr ? "، أصمم أنظمة لا تُؤتمت فقط — بل تفكّر." : ", I architect systems that don't just automate — they think."}
          </p>

          {/* Skills cloud */}
          <div className={`flex flex-wrap gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
            {profile.skills.map((s: string) => (
              <span key={s} className="px-3 py-1 rounded-full text-xs font-mono transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-default" style={{ background: 'rgba(0,212,255,.05)', border: '1px solid rgba(0,212,255,.15)', color: 'var(--muted)' }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Media / Expertise */}
        <div className="space-y-8">
          {/* Profile Image (About) */}
          <div className="relative group aspect-square max-w-[400px] mx-auto md:mx-0">
             <div className="absolute inset-0 bg-[var(--accent)] opacity-10 blur-3xl group-hover:opacity-20 transition-opacity" />
             <div className="relative h-full w-full rounded-2xl border border-white/5 overflow-hidden glass-card p-3">
                <img 
                  src={profile.profileImage || "/images/profile-placeholder.jpg"} 
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700"
                />
             </div>
          </div>

          {/* Expertise bars */}
          <div ref={barsRef} className="glass-card rounded-2xl p-7">
            <div className="font-mono text-xs tracking-widest mb-6" style={{ color: 'var(--accent)' }}>
              // expertise_matrix.json
            </div>
            {profile.expertise.map((e: any) => (
              <div key={e.label} className={`flex items-center py-3 border-b last:border-0 ${isAr ? 'flex-row-reverse' : ''}`} style={{ borderColor: 'rgba(255,255,255,.05)' }}>
                <span className="text-xs min-w-[130px]" style={{ color: 'var(--muted)' }}>
                  {isAr ? e.labelAr : e.label}
                </span>
                <div className="flex-1 mx-4 h-1 rounded overflow-hidden" style={{ background: 'rgba(255,255,255,.06)' }}>
                  <div
                    className="h-full rounded transition-all duration-[1400ms] ease-out"
                    style={{ background: 'linear-gradient(90deg,var(--accent),var(--accent2))', width: 0 }}
                    data-width={e.value}
                  />
                </div>
                <span className="font-mono text-xs min-w-[36px] text-right" style={{ color: 'var(--text)' }}>
                  {e.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
