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

        {/* Consulting Philosophy Principles Grid */}
        <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {[
            { num: '01', title: isAr ? 'الأولوية للأعمال' : 'Business-First Architecture', desc: isAr ? 'نبدأ من الهدف المالي أو التشغيلي للشركة، وليس بالتقنيات أو الأدوات.' : 'We start with the business ROI and operational goal, not raw software tools.' },
            { num: '02', title: isAr ? 'جاهزة للإنتاج' : 'Production-Ready Reliability', desc: isAr ? 'أنظمة أتمتة موثوقة ذات نسبة تشغيل 99.9% مع إمكانية المراقبة المستمرة.' : 'Battle-tested systems built for 99.9% uptime with full error handling.' },
            { num: '03', title: isAr ? 'التصعيد البشري' : 'Human-Aware Integration', desc: isAr ? 'الذكاء الاصطناعي يُكمل الفريق البشري وينقل المهام المعقدة بسلاسة.' : 'AI agents seamlessly escalate complex cases to your staff when needed.' },
            { num: '04', title: isAr ? 'أثر قابل للقياس' : 'Measurable Impact', desc: isAr ? 'توفير ساعات العمل، تقليل تكلفة الدعم، وزيادة سرعة الاستجابة.' : 'Clear metrics on saved hours, reduced support load, and faster response rates.' }
          ].map((principle) => (
            <TiltCard key={principle.num} intensity={8} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[var(--accent)]/30 transition-all">
              <div className="font-mono text-xs font-bold text-[var(--accent)] mb-2">{principle.num} // PRINCIPLE</div>
              <h4 className="text-base font-bold text-white mb-2 font-sans">{principle.title}</h4>
              <p className="text-xs text-white/70 leading-relaxed font-sans">{principle.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
