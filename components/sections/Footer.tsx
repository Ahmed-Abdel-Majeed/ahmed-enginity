import Link from 'next/link'
import { t, type Locale } from '@/lib/i18n'

export default function Footer({ lang, profile }: { lang: Locale; profile: any }) {
  const tr = t[lang]
  const isAr = lang === 'ar'

  const navLinks = [
    { href: '#about', label: tr.nav.about },
    { href: '#services', label: tr.nav.services },
    { href: '#projects', label: tr.nav.projects },
    { href: '#blog', label: tr.nav.blog },
    { href: '#courses', label: tr.nav.courses },
    { href: '#youtube', label: tr.nav.youtube },
    { href: '#contact', label: tr.nav.contact },
  ]

  return (
    <footer className="py-14 px-8 md:px-20" style={{ borderTop: '1px solid var(--border)' }}>
      <div className={`flex flex-col md:flex-row justify-between gap-10 ${isAr ? 'md:flex-row-reverse text-right' : ''}`}>
        {/* Brand */}
        <div className="max-w-xs">
          <div className="font-mono text-sm tracking-widest mb-3" style={{ color: 'var(--accent)' }}>AHMED.DEV</div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
            {isAr ? profile.taglineAr : profile.tagline}
          </p>
          <div className={`flex gap-3 mt-5 ${isAr ? 'flex-row-reverse' : ''}`}>
            {['💬','📧','💼','▶️','📱'].map((icon, i) => (
              <a key={i} href="#contact" className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all hover:border-[var(--accent)] hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)' }}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <div className="font-mono text-xs tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
            {isAr ? 'روابط سريعة' : 'QUICK LINKS'}
          </div>
          <div className="flex flex-col gap-2">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-xs transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--muted)' }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="font-mono text-xs tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
            {isAr ? 'الخدمات' : 'SERVICES'}
          </div>
          <div className="flex flex-col gap-2">
            {[
              isAr ? 'تطوير وكلاء AI' : 'AI Agents',
              isAr ? 'أتمتة واتساب' : 'WhatsApp AI',
              isAr ? 'أتمتة الأعمال' : 'Business Automation',
              isAr ? 'الذكاء الصوتي' : 'Voice AI',
              isAr ? 'تكاملات API' : 'API Integrations',
              isAr ? 'أنظمة RAG' : 'RAG Systems',
            ].map(s => (
              <span key={s} className="text-xs" style={{ color: 'var(--muted)' }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="font-mono text-xs tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
            {isAr ? 'تواصل' : 'CONTACT'}
          </div>
          <div className="flex flex-col gap-2">
            <a href={`mailto:${profile.email}`} className="text-xs transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--muted)' }}>{profile.email}</a>
            <a href={`https://wa.me/${profile.whatsapp}`} className="text-xs transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--muted)' }}>WhatsApp</a>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>{isAr ? 'مصر 🇪🇬' : 'Egypt 🇪🇬'}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 ${isAr ? 'sm:flex-row-reverse' : ''}`} style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{tr.footer.copy}</p>
        <div className={`flex gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
          <Link href={`/en`} className="text-xs font-mono transition-colors hover:text-[var(--accent)]" style={{ color: lang === 'en' ? 'var(--accent)' : 'var(--muted)' }}>EN</Link>
          <Link href={`/ar`} className="text-xs font-mono transition-colors hover:text-[var(--accent)]" style={{ color: lang === 'ar' ? 'var(--accent)' : 'var(--muted)' }}>AR</Link>
        </div>
      </div>
    </footer>
  )
}
