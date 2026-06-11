import Link from 'next/link'
import { getBlogPosts, getProfile, getSocials } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { type Locale, t } from '@/lib/i18n'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ChatWidget from '@/components/chat/ChatWidget'
import Cursor from '@/components/ui/Cursor'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  return buildMetadata({ title: lang === 'ar' ? 'المدونة' : 'Blog', description: 'AI automation tutorials, n8n guides, and workflow engineering insights.', path: '/blog', lang })
}

export default async function BlogPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const posts = getBlogPosts()
  const [profile, socials] = [getProfile(), getSocials()]
  const tr = t[lang]
  const isAr = lang === 'ar'
  const categories = ['All', ...Array.from(new Set(posts.map((p: any) => p.category)))]

  return (
    <>
      <Cursor />
      <Navbar lang={lang} socials={socials} />
      <main className="min-h-screen pt-24 pb-20 px-8 md:px-20 max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-[.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>{tr.blog.label}</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: '-.02em' }}>{tr.blog.title}</h1>
        <p className="text-sm leading-relaxed mb-12 max-w-lg" style={{ color: 'var(--muted)' }}>{tr.blog.sub}</p>

        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/${lang}/blog/${post.slug}`} className="glass-card rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:border-[rgba(0,212,255,.3)] group block" style={isAr ? { textAlign: 'right' } : {}}>
              <div className="aspect-video flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#0a1628,#061020)' }}>
                <span className="text-4xl opacity-40">✍️</span>
              </div>
              <div className="p-5">
                <div className={`flex items-center gap-2 mb-3 text-xs font-mono ${isAr ? 'flex-row-reverse' : ''}`}>
                  <span style={{ color: 'var(--accent)' }}>{post.category}</span>
                  <span style={{ color: 'var(--muted)' }}>· {post.readingTime} {tr.blog.minRead}</span>
                </div>
                <h2 className="text-sm font-semibold leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text)' }}>
                  {isAr && post.titleAr ? post.titleAr : post.title}
                </h2>
                <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                  {isAr && post.excerptAr ? post.excerptAr : post.excerpt}
                </p>
                <div className={`flex flex-wrap gap-1.5 ${isAr ? 'flex-row-reverse' : ''}`}>
                  {(post.tags || []).slice(0, 3).map((tag: string) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-mono" style={{ background: 'rgba(0,212,255,.06)', border: '1px solid rgba(0,212,255,.12)', color: 'var(--muted)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20" style={{ color: 'var(--muted)' }}>
            <div className="text-5xl mb-4">📝</div>
            <p>{isAr ? 'قريباً…' : 'Coming soon…'}</p>
          </div>
        )}
      </main>
      <Footer lang={lang} profile={profile} />
      <ChatWidget lang={lang} webhook={profile.n8nWebhook} />
    </>
  )
}
