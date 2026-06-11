'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { t, type Locale } from '@/lib/i18n'

export default function Navbar({ lang, socials }: { lang: Locale; socials: any }) {
  const [theme, setTheme] = useState<'dark'|'light'>('dark')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const tr = t[lang]

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark'|'light' || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  function toggleLang() {
    const next = lang === 'en' ? 'ar' : 'en'
    const path = window.location.pathname.replace(`/${lang}`, `/${next}`)
    window.location.href = path
  }

  const links = [
    { href: '#about', label: tr.nav.about },
    { href: '#services', label: tr.nav.services },
    { href: '#projects', label: tr.nav.projects },
    { href: '#blog', label: tr.nav.blog },
    { href: '#courses', label: tr.nav.courses },
    { href: '#youtube', label: tr.nav.youtube },
    { href: '#contact', label: tr.nav.contact },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 backdrop-blur-xl border-b' : 'py-4'
      }`}
      style={{ background: 'var(--nav-bg)', borderColor: 'var(--border)' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="font-mono text-sm tracking-widest" style={{ color: 'var(--accent)' }}>
          AHMED.DEV
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-xs tracking-wide transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--muted)' }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="ctl-btn w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-all" style={{ background:'rgba(128,128,128,.1)', border:'1px solid var(--border)', color:'var(--muted)' }}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button onClick={toggleLang} className="ctl-btn h-8 px-3 rounded-lg text-xs font-mono transition-all" style={{ background:'rgba(128,128,128,.1)', border:'1px solid var(--border)', color:'var(--muted)' }}>
            {tr.lang}
          </button>
          <a href="#contact" className="hidden sm:block px-4 py-2 rounded-lg text-xs font-mono transition-all" style={{ background:'rgba(0,212,255,.08)', border:'1px solid var(--accent)', color:'var(--accent)' }}>
            {tr.nav.bookCall}
          </a>
          {/* Mobile menu button */}
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ color: 'var(--muted)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden px-6 pb-4 mt-2 flex flex-col gap-3" style={{ borderTop: '1px solid var(--border)' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm py-1 transition-colors" style={{ color: 'var(--muted)' }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="text-center py-2 rounded-lg text-xs font-mono mt-2" style={{ background:'rgba(0,212,255,.08)', border:'1px solid var(--accent)', color:'var(--accent)' }}>
            {tr.nav.bookCall}
          </a>
        </div>
      )}
    </nav>
  )
}
