'use client'
import { useState } from 'react'
import { t, type Locale } from '@/lib/i18n'

export default function Contact({ lang, profile, socials }: { lang: Locale; profile: any; socials: any }) {
  const tr = t[lang]
  const isAr = lang === 'ar'
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(profile.n8nWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'portfolio_contact', lang, timestamp: new Date().toISOString() }),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) setForm({ name: '', email: '', type: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const links = [
    { href: socials.whatsapp, icon: '💬', label: isAr ? 'واتساب' : 'WhatsApp', sub: tr.contact.fastest, bg: 'rgba(37,211,102,.1)' },
    { href: `mailto:${profile.email}`, icon: '📧', label: 'Email', sub: profile.email, bg: 'rgba(0,212,255,.1)' },
    { href: socials.linkedin, icon: '💼', label: 'LinkedIn', sub: tr.contact.professional, bg: 'rgba(10,102,194,.1)' },
    { href: socials.youtube, icon: '▶️', label: 'YouTube', sub: tr.contact.freeTutorials, bg: 'rgba(255,0,0,.1)' },
  ]

  return (
    <section id="contact" className="py-24 px-8 md:px-20" style={{ background: 'var(--bg2)' }}>
      <p className="font-mono text-xs tracking-[.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>{tr.contact.label}</p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 whitespace-pre-line" style={{ letterSpacing: '-.02em' }}>{tr.contact.title}</h2>
      <p className="text-sm leading-relaxed mb-12 max-w-lg" style={{ color: 'var(--muted)' }}>{tr.contact.sub}</p>

      <div className={`grid md:grid-cols-2 gap-16 items-start ${isAr ? 'direction-rtl' : ''}`}>
        {/* Links */}
        <div className={isAr ? 'text-right' : ''}>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
            {tr.contact.sub}
          </p>
          <div className="flex flex-col gap-3">
            {links.map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-4 glass-card p-4 rounded-xl transition-all hover:border-[var(--accent)] hover:bg-[rgba(0,212,255,.04)] ${isAr ? 'flex-row-reverse hover:translate-x-[-4px]' : 'hover:translate-x-1'}`}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: l.bg }}>{l.icon}</div>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>{l.label}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{l.sub}</div>
                </div>
              </a>
            ))}
          </div>
          {/* Calendly CTA */}
          {profile.calendlyUrl && (
            <a href={profile.calendlyUrl} target="_blank" rel="noopener noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,var(--accent2),var(--accent))' }}>
              📅 {isAr ? 'احجز مكالمة مجانية على Calendly' : 'Book a Free Call on Calendly'}
            </a>
          )}
        </div>

        {/* Form */}
        <div className="glass-card rounded-2xl p-8" style={isAr ? { textAlign: 'right' } : {}}>
          <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text)' }}>{tr.contact.formTitle}</h3>
          {status === 'sent' ? (
            <div className="py-12 text-center">
              <div className="text-4xl mb-4">✅</div>
              <div className="text-base font-semibold mb-2" style={{ color: 'var(--accent3)' }}>
                {isAr ? 'تم الإرسال بنجاح!' : 'Message Sent!'}
              </div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>
                {isAr ? 'سأرد عليك في أقرب وقت.' : "I'll get back to you shortly."}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {[
                { id: 'name', label: tr.contact.name, type: 'text', placeholder: isAr ? 'اسمك' : 'Your name' },
                { id: 'email', label: tr.contact.email, type: 'email', placeholder: isAr ? 'بريدك الإلكتروني' : 'your@email.com' },
                { id: 'type', label: tr.contact.type, type: 'text', placeholder: isAr ? 'مثال: واتساب AI، أتمتة CRM' : 'e.g. WhatsApp AI, CRM Automation' },
              ].map(f => (
                <div key={f.id}>
                  <label className="block font-mono text-xs tracking-widest mb-2" style={{ color: 'var(--muted)' }}>{f.label}</label>
                  <input
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.id as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                    dir={isAr ? 'rtl' : 'ltr'}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                  />
                </div>
              ))}
              <div>
                <label className="block font-mono text-xs tracking-widest mb-2" style={{ color: 'var(--muted)' }}>{tr.contact.message}</label>
                <textarea
                  rows={4}
                  required
                  placeholder={isAr ? 'أخبرني عن مشروعك…' : 'Tell me about your project…'}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  dir={isAr ? 'rtl' : 'ltr'}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                  style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
                />
              </div>
              {status === 'error' && (
                <p className="text-xs text-red-400">{isAr ? '⚠️ حدث خطأ، حاول مرة أخرى.' : '⚠️ Something went wrong. Please try again.'}</p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))' }}
              >
                {status === 'sending' ? (isAr ? 'جارٍ الإرسال…' : 'Sending…') : tr.contact.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
