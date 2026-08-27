'use client'
import { t, type Locale } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { TiltCard } from '@/components/ui/TiltCard'

export default function WhoIHelp({ lang }: { lang: Locale }) {
  const tr = t[lang]
  const isAr = lang === 'ar'

  const renderIcon = (id: string) => {
    switch (id) {
      case 'clinics':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        );
      case 'real-estate':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
          </svg>
        );
      case 'restaurants':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </svg>
        );
      case 'ecommerce':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        );
      case 'services':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        );
      default:
        return null;
    }
  };

  const industries = [
    {
      id: 'clinics',
      title: isAr ? 'العيادات والمراكز الطبية' : 'Clinics',
      desc: isAr ? 'أتمتة حجوزات واتساب، التذكيرات، التواصل مع المرضى ومتابعة تقارير الأطباء.' : 'Automate WhatsApp booking, reminders, patient communication and follow-ups.',
    },
    {
      id: 'real-estate',
      title: isAr ? 'الشركات العقارية' : 'Real Estate',
      desc: isAr ? 'تأهيل العملاء، الإجابة عن التفاصيل، حجز المعاينات وأتمتة المتابعات.' : 'Qualify leads, answer questions, schedule viewings and automate follow-ups.',
    },
    {
      id: 'restaurants',
      title: isAr ? 'المطاعم والكافيهات' : 'Restaurants',
      desc: isAr ? 'أتمتة الطلبات، حجز الطاولات، أسئلة القائمة ومحادثات ما سنجر وواتساب.' : 'Automate orders, reservations, customer questions and Messenger/WhatsApp conversations.',
    },
    {
      id: 'ecommerce',
      title: isAr ? 'التجارة الإلكترونية' : 'E-commerce',
      desc: isAr ? 'أتمتة خدمة العملاء، استعادة السلات المتروكة، إشعارات الطلبات والعمليات.' : 'Automate customer support, lead recovery, order communication and repetitive operations.',
    },
    {
      id: 'services',
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
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.15)] group-hover:scale-110 transition-transform">
                  {renderIcon(ind.id)}
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
