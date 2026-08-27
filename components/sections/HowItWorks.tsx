'use client'
import { t, type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'

export default function HowItWorks({ lang }: { lang: Locale }) {
  const tr = t[lang]
  const isAr = lang === 'ar'

  const steps = [
    {
      num: '01',
      title: isAr ? 'الاكتشاف' : 'Discover',
      desc: isAr ? 'نحدد الأماكن التي تضيع فيها شركتك الوقت، العملاء المحتملين، أو الكفاءة.' : 'We identify where your business is losing time, leads or efficiency.',
    },
    {
      num: '02',
      title: isAr ? 'التصميم' : 'Design',
      desc: isAr ? 'أقوم برسم مسار العمل وتحديد ما الذي يجب أتمتته وكيف سيعمل.' : 'I map the workflow and define what should be automated.',
    },
    {
      num: '03',
      title: isAr ? 'البناء' : 'Build',
      desc: isAr ? 'تطوير وكلاء AI، الأتمتة، الربط، وقواعد العمل في بيئة آمنة.' : 'AI agents, automations, integrations and business logic are implemented.',
    },
    {
      num: '04',
      title: isAr ? 'الإطلاق' : 'Launch',
      desc: isAr ? 'اختبار النظام ونشره بالكامل ليصبح جزءاً من مسار عملك اليومي.' : 'The system is tested and deployed into your real workflow.',
    },
    {
      num: '05',
      title: isAr ? 'التحسين' : 'Optimize',
      desc: isAr ? 'مراقبة النظام وتطويره باستمرار بناءً على الاستخدام الفعلي.' : 'The system is monitored and improved based on real usage.',
    },
  ]

  return (
    <section id="how-it-works" className="py-28 px-8 md:px-20 relative z-10" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[.2em] uppercase mb-3 text-center"
          style={{ color: 'var(--accent)' }}
        >
          {tr.howItWorks.label}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center ${isAr ? 'font-arabic' : 'font-display'}`}
          style={{ letterSpacing: '-.02em' }}
        >
          {tr.howItWorks.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm leading-relaxed mb-16 text-center max-w-xl mx-auto"
          style={{ color: 'var(--muted)' }}
        >
          {tr.howItWorks.sub}
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className={`glass-card p-6 rounded-2xl border border-white/5 relative flex flex-col justify-between ${isAr ? 'text-right' : ''}`}
            >
              <div>
                <div className="font-mono text-2xl font-bold mb-4" style={{ color: 'var(--accent)' }}>
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-sans">{step.title}</h3>
                <p className="text-xs leading-relaxed opacity-75 font-sans" style={{ color: 'var(--muted)' }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
