'use client'
import { t, type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { TiltCard } from '@/components/ui/TiltCard'

export default function About({ lang, profile }: { lang: Locale; profile: any }) {
  const tr = t[lang]
  const isAr = lang === 'ar'

  const containerParams = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  };

  return (
    <section id="about" className="py-24 px-8 md:px-20 relative overflow-hidden">
      <motion.p 
        {...containerParams}
        className="font-mono text-xs tracking-[.2em] uppercase mb-3" 
        style={{ color: 'var(--accent)' }}
      >
        {tr.about.label}
      </motion.p>
      
      <motion.h2 
        {...containerParams} transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-12 whitespace-pre-line ${isAr ? 'font-arabic' : 'font-display'}`} 
        style={{ letterSpacing: '-.02em' }}
      >
        {tr.about.title}
      </motion.h2>

      <div className={`flex flex-col lg:flex-row gap-16 items-start ${isAr ? 'direction-rtl' : ''}`}>
        {/* Text Area */}
        <motion.div 
          {...containerParams} transition={{ duration: 0.6, delay: 0.2 }}
          className={`lg:w-5/12 ${isAr ? 'text-right' : ''}`}
        >
          <div className="relative group aspect-square max-w-[280px] mb-10 hidden md:block">
             <div className="absolute inset-0 bg-[var(--accent)] opacity-10 blur-3xl group-hover:opacity-20 transition-opacity" />
             <TiltCard intensity={15} className="h-full w-full rounded-2xl border border-white/5 overflow-hidden p-3 bg-white/5 backdrop-blur-md">
                <img 
                  src={profile.profileImage || "/images/profile-placeholder.jpg"} 
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-xl transition-all duration-700"
                />
             </TiltCard>
          </div>
        
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
        </motion.div>

        {/* Bento Grid (Expertise & Skills) */}
        <div className={`lg:w-7/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full`}>
          {/* Main Expertise Matrix */}
          <TiltCard intensity={10} className="col-span-1 md:col-span-2 lg:col-span-3 p-7 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5">
            <div className="font-mono text-xs tracking-widest mb-6" style={{ color: 'var(--accent)' }}>
              // expertise_matrix
            </div>
            {profile.expertise.map((e: any, i: number) => (
              <div key={e.label} className={`flex items-center py-3 border-b last:border-0 ${isAr ? 'flex-row-reverse' : ''}`} style={{ borderColor: 'rgba(255,255,255,.05)' }}>
                <span className="text-xs min-w-[130px] font-sans" style={{ color: 'var(--muted)' }}>
                  {isAr ? e.labelAr : e.label}
                </span>
                <div className="flex-1 mx-4 h-1.5 rounded-full overflow-hidden relative" style={{ background: 'rgba(255,255,255,.06)' }}>
                  <motion.div
                    className="absolute top-0 h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg,var(--accent),var(--accent2))' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${e.value}%` }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1.5, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                  />
                </div>
                <span className="font-mono text-xs min-w-[36px] text-right" style={{ color: 'var(--text)' }}>
                  {e.value}%
                </span>
              </div>
            ))}
          </TiltCard>

          {/* Top Tool Badges */}
          {profile.skills.slice(0, 3).map((skill: string, i: number) => (
            <motion.div key={skill} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + (i * 0.1) }}>
              <TiltCard intensity={25} className="h-full p-6 flex flex-col justify-center items-center rounded-2xl border border-white/5 bg-gradient-to-br from-[var(--card)] to-transparent relative overflow-hidden group">
                <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <span className="font-bold text-lg font-sans tracking-tight block text-center" style={{ color: 'var(--text)' }}>{skill}</span>
              </TiltCard>
            </motion.div>
          ))}

          {/* Remaining Skills Pill Grid */}
          <TiltCard intensity={5} className="col-span-1 md:col-span-2 lg:col-span-3 p-6 bg-[var(--card)] rounded-2xl border border-white/5">
            <div className={`flex flex-wrap gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
              {profile.skills.slice(3).map((s: string) => (
                <span key={s} className="px-3 py-1.5 rounded-full text-xs font-mono transition-all hover:-translate-y-0.5 hover:shadow-md cursor-default" style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)', color: 'var(--muted)' }}>
                  {s}
                </span>
              ))}
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}
