'use client'
import { useState, useRef, useEffect } from 'react'
import { t, type Locale } from '@/lib/i18n'

interface Message { text: string; isBot: boolean }

const BOT_ICON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
  </svg>
)

export default function ChatWidget({ lang, webhook }: { lang: Locale; webhook: string }) {
  const tr = t[lang]
  const isAr = lang === 'ar'
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Message[]>([{ text: tr.chat.welcome, isBot: true }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const msgsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset chat when lang changes
  useEffect(() => {
    setMsgs([{ text: tr.chat.welcome, isBot: true }])
  }, [lang])

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [msgs, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 320)
  }, [open])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setMsgs(p => [...p, { text, isBot: false }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang, source: 'portfolio_chat' }),
      })
      if (res.ok) {
        const raw = await res.json()
        const d = Array.isArray(raw) && raw.length ? raw[0] : raw
        const reply = d.output ?? d.reply ?? d.message ?? d.text ?? (isAr ? 'عذراً، لم أفهم الرد.' : 'Sorry, could not parse response.')
        setMsgs(p => [...p, { text: String(reply), isBot: true }])
      } else {
        setMsgs(p => [...p, { text: isAr ? '⚠️ حدث خطأ في الاتصال.' : '⚠️ Connection error, please try again.', isBot: true }])
      }
    } catch {
      setMsgs(p => [...p, { text: isAr ? '⚠️ تعذر الاتصال بالـ Webhook.' : '⚠️ Could not reach the Webhook.', isBot: true }])
    }
    setLoading(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[500] flex flex-col items-end gap-3">
      {/* Window */}
      <div
        className="flex flex-col rounded-3xl overflow-hidden transition-all duration-300 origin-bottom-right"
        style={{
          width: 352, height: 492,
          background: 'var(--chatbg, #0d1b2e)',
          border: '1px solid rgba(0,212,255,.28)',
          boxShadow: '0 20px 60px rgba(0,0,0,.5)',
          transform: open ? 'scale(1)' : 'scale(0)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: 'linear-gradient(135deg,#0a1628 0%,#0e7e68 100%)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,212,255,.2)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white">{tr.chat.title}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,.65)' }}>{tr.chat.status}</span>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'rgba(255,255,255,.1)', color: '#fff' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={msgsRef} className="flex-1 overflow-y-auto flex flex-col gap-0 p-3" style={{ background: 'var(--chatbg,#0d1b2e)' }}>
          {msgs.map((m, i) => (
            <div key={i} className={`flex items-end gap-2 mb-2.5 ${m.isBot ? '' : 'flex-row-reverse'}`}>
              {m.isBot && (
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#0a1628' }}>
                  {BOT_ICON}
                </div>
              )}
              <div
                className="max-w-[230px] px-3 py-2.5 rounded-2xl text-[13px] leading-snug whitespace-pre-wrap break-words"
                style={m.isBot
                  ? { background: 'var(--bbot,#1a2535)', color: 'var(--bbott,#e0e8f0)', borderBottomLeftRadius: 4 }
                  : { background: 'var(--buser,#0a1628)', color: '#fff', borderBottomRightRadius: 4 }
                }
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-end gap-2 mb-2.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#0a1628' }}>
                {BOT_ICON}
              </div>
              <div className="flex gap-1.5 px-4 py-3 rounded-2xl" style={{ background: 'var(--bbot,#1a2535)', borderBottomLeftRadius: 4 }}>
                {[0,1,2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full bg-emerald-400 inline-block" style={{ animation: `typing-bounce 1.2s infinite`, animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3 py-3 flex-shrink-0" style={{ borderTop: '1px solid var(--border)', background: 'var(--chatfoot,#0a1628)' }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
            placeholder={tr.chat.placeholder}
            dir={isAr ? 'rtl' : 'ltr'}
            className="flex-1 rounded-xl px-3 py-2 text-[13px] outline-none transition-colors"
            style={{ background: 'var(--chatfield,#061020)', border: '1px solid var(--input-border,rgba(255,255,255,.08))', color: 'var(--text,#f0f4f8)' }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--input-border,rgba(255,255,255,.08))'}
          />
          <button
            onClick={send}
            disabled={loading}
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-110 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg,#0a1628,#0e7e68)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: 'linear-gradient(135deg,#0a1628,#0e7e68)',
          animation: open ? 'none' : 'fab-pulse 2.2s ease-in-out infinite',
          boxShadow: open ? '0 4px 20px rgba(0,212,255,.3)' : undefined,
        }}
      >
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>
        }
      </button>
    </div>
  )
}
