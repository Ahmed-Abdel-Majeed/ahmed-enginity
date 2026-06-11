import { getVideos, getProfile, getSocials } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { type Locale, t } from '@/lib/i18n'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ChatWidget from '@/components/chat/ChatWidget'
import Cursor from '@/components/ui/Cursor'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  return buildMetadata({ title: lang === 'ar' ? 'قناة يوتيوب' : 'YouTube Channel', description: 'Free AI automation tutorials in Arabic. n8n, AI Agents, WhatsApp bots, and more.', path: '/youtube', lang })
}

export default async function YouTubePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const videos = getVideos()
  const [profile, socials] = [getProfile(), getSocials()]
  const tr = t[lang]
  const isAr = lang === 'ar'
  const categories = ['All', ...Array.from(new Set(videos.map((v: any) => v.category)))] as string[]

  return (
    <>
      <Cursor />
      <Navbar lang={lang} socials={socials} />
      <main className="min-h-screen pt-24 pb-20 px-8 md:px-20 max-w-7xl mx-auto">
        <p className="font-mono text-xs tracking-[.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>{tr.youtube.label}</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: '-.02em' }}>{tr.youtube.title}</h1>
        <p className="text-sm leading-relaxed mb-12 max-w-lg" style={{ color: 'var(--muted)' }}>{tr.youtube.sub}</p>

        {/* Channel CTA */}
        <a href={socials.youtube} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl mb-12 text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: 'rgba(255,0,0,.85)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          {isAr ? 'اشترك في القناة' : 'Subscribe to Channel'}
        </a>

        <div className="grid md:grid-cols-3 gap-5">
          {videos.map((v: any) => (
            <a key={v.id} href={v.url} target="_blank" rel="noopener noreferrer"
              className="glass-card rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:border-[rgba(255,0,0,.3)] group block"
              style={isAr ? { textAlign: 'right' } : {}}>
              <div className="relative aspect-video flex items-center justify-center" style={{ background: '#0a0a0a' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: 'rgba(255,0,0,.85)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-mono" style={{ background: 'rgba(0,0,0,.85)', color: '#fff' }}>{v.duration}</div>
              </div>
              <div className="p-5">
                <div className={`flex items-center gap-2 mb-2 text-xs font-mono ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span style={{ color: 'var(--accent)' }}>{v.category}</span>
                  <span style={{ color: 'var(--muted)' }}>· {v.views} {isAr ? 'مشاهدة' : 'views'}</span>
                </div>
                <h3 className="text-sm font-semibold leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text)' }}>
                  {isAr && v.titleAr ? v.titleAr : v.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {isAr && v.descriptionAr ? v.descriptionAr.substring(0,100) + '…' : v.description.substring(0,100) + '…'}
                </p>
              </div>
            </a>
          ))}
        </div>
      </main>
      <Footer lang={lang} profile={profile} />
      <ChatWidget lang={lang} webhook={profile.n8nWebhook} />
    </>
  )
}
