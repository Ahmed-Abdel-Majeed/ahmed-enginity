'use client'
import { t, type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { TiltCard } from '@/components/ui/TiltCard'

export default function WhoIHelp({ lang }: { lang: Locale }) {
  const tr = t[lang]
  const isAr = lang === 'ar'

  const industries = [
    {
      id: 'clinics',
      icon: '🏥',
      title: isAr ? 'العيادات والمراكز الطبية' : 'Clinics',
      desc: isAr ? 'أتمتة حجوزات واتساب، التذكيرات، التواصل مع المرضى ومتابعة تقارير الأطباء.' : 'Automate WhatsApp booking, reminders, patient communication and follow-ups.',
    },
    {
      id: 'real-estate',
      icon: '🏢',
      title: isAr ? 'الشركات العقارية' : 'Real Estate',
      desc: isAr ? 'تأهيل العملاء، الإجابة عن التفاصيل، حجز المعاينات وأتمتة المتابعات.' : 'Qualify leads, answer questions, schedule viewings and automate follow-ups.',
    },
    {
      id: 'restaurants',
      icon: '🍽️',
      title: isAr ? 'المطاعم والكافيهات' : 'Restaurants',
      desc: isAr ? 'أتمتة الطلبات، حجز الطاولات، أسئلة القائمة ومحادثات ما سنجر وواتساب.' : 'Automate orders, reservations, customer questions and Messenger/WhatsApp conversations.',
    },
    {
      id: 'ecommerce',
      icon: '🛍️',
      title: isAr ? 'التجارة الإلكترونية' : 'E-commerce',
      desc: isAr ? 'أتمتة خدمة العملاء، استعادة السلات المتروكة، إشعارات الطلبات والعمليات.' : 'Automate customer support, lead recovery, order communication and repetitive operations.',
    },
    {
      id: 'services',
      icon: '💼',
      title: isAr ? 'الشركات الخدمية و B2B' : 'Service Businesses',
      desc: isAr ? 'أتمتة تأهيل العملاء المحتملين، مسارات عمل CRM، المتابعات والعمليات الداخلية.' : 'Automate lead qualification, CRM workflows, follow-ups and internal processes.',
    },
  ]

  return (
    <section id="who-i-help" className="py-28 px-8 md:px-20 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[.2em] uppercase mb-3 text-center"
          style={{ color: 'var(--accent)' }}
        >
          // TARGET AUDIENCE & USE CASES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center ${isAr ? 'font-arabic' : 'font-display'}`}
          style={{ letterSpacing: '-.02em' }}
        >
          {tr.whoIHelp.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm leading-relaxed mb-16 text-center max-w-xl mx-auto"
          style={{ color: 'var(--muted)' }}
        >
          {tr.whoIHelp.sub}
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
            >
              <TiltCard
                intensity={10}
                className={`h-full p-7 rounded-2xl bg-[var(--card)] border border-white/5 hover:border-[var(--accent)]/30 transition-all group ${isAr ? 'text-right' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {ind.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white font-sans">{ind.title}</h3>
                <p className="text-xs leading-relaxed opacity-75 font-sans" style={{ color: 'var(--muted)' }}>
                  {ind.desc}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
