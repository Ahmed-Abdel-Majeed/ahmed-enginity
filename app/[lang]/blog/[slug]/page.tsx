import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost, getBlogPosts, getProfile, getSocials } from '@/lib/content'
import { buildMetadata, articleSchema } from '@/lib/seo'
import { type Locale, t } from '@/lib/i18n'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ChatWidget from '@/components/chat/ChatWidget'
import Cursor from '@/components/ui/Cursor'

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return ['en','ar'].flatMap(lang => posts.map((p: any) => ({ lang, slug: p.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params
  const post = getBlogPost(slug) as any as any
  return buildMetadata({ title: post.title, description: post.excerpt || '', path: `/blog/${slug}`, lang })
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params
  const post = getBlogPost(slug) as any
  if (!post) notFound()
  const [profile, socials] = [getProfile(), getSocials()]
  const tr = t[lang]
  const isAr = lang === 'ar'

  return (
    <>
      <Cursor />
      <Navbar lang={lang} socials={socials} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }} />
      <main className="min-h-screen pt-24 pb-20 px-8 md:px-20 max-w-3xl mx-auto">
        {/* Back */}
        <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-xs font-mono mb-8 transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--muted)' }}>
          {isAr ? '→ كل المقالات' : '← All Articles'}
        </Link>

        {/* Header */}
        <div className={`mb-10 ${isAr ? 'text-right' : ''}`}>
          <div className={`flex items-center gap-3 mb-4 text-xs font-mono ${isAr ? 'flex-row-reverse' : ''}`}>
            <span style={{ color: 'var(--accent)' }}>{post.category}</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>{post.readingTime} {tr.blog.minRead}</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>{new Date(post.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { year:'numeric', month:'long', day:'numeric' })}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4" style={{ letterSpacing: '-.02em' }}>
            {isAr && post.titleAr ? post.titleAr : post.title}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--muted)' }}>
            {isAr && post.excerptAr ? post.excerptAr : post.excerpt}
          </p>
          {/* Tags */}
          <div className={`flex flex-wrap gap-2 mt-5 ${isAr ? 'flex-row-reverse' : ''}`}>
            {(post.tags || []).map((tag: string) => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-mono" style={{ background: 'rgba(0,212,255,.06)', border: '1px solid rgba(0,212,255,.15)', color: 'var(--muted)' }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Content */}
        <article
          className={`prose prose-sm max-w-none ${isAr ? 'text-right' : ''}`}
          style={{
            '--tw-prose-body': 'var(--muted)',
            '--tw-prose-headings': 'var(--text)',
            '--tw-prose-code': 'var(--accent)',
            '--tw-prose-links': 'var(--accent)',
          } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: post.content
            .replace(/^# (.*)/gm, '<h1 class="text-2xl font-bold mt-8 mb-4" style="color:var(--text)">$1</h1>')
            .replace(/^## (.*)/gm, '<h2 class="text-xl font-semibold mt-7 mb-3" style="color:var(--text)">$2</h2>')
            .replace(/^### (.*)/gm, '<h3 class="text-lg font-semibold mt-5 mb-2" style="color:var(--text)">$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--text)">$1</strong>')
            .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded text-xs font-mono" style="background:rgba(0,212,255,.1);color:var(--accent)">$1</code>')
            .replace(/^- (.*)/gm, '<li class="ml-4 mb-1 text-sm" style="color:var(--muted)">$1</li>')
            .replace(/\n\n/g, '<br/><br/>')
          }}
        />

        {/* CTA */}
        <div className="glass-card rounded-2xl p-7 mt-14 text-center">
          <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
            {isAr ? 'هل تريد تطبيق هذا في عملك؟' : 'Want to apply this in your business?'}
          </p>
          <Link href={`/${lang}#contact`} className="inline-block px-7 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))' }}>
            {isAr ? 'تواصل معي ←' : 'Let\'s Talk →'}
          </Link>
        </div>
      </main>
      <Footer lang={lang} profile={profile} />
      <ChatWidget lang={lang} webhook={profile.n8nWebhook} />
    </>
  )
}
