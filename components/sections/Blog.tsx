import Link from 'next/link'
import { t, type Locale } from '@/lib/i18n'

export default function Blog({ lang, posts }: { lang: Locale; posts: any[] }) {
  const tr = t[lang]
  const isAr = lang === 'ar'
  return (
    <section id="blog" className="py-24 px-8 md:px-20" style={{ background: 'var(--bg2)' }}>
      <p className="font-mono text-xs tracking-[.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>{tr.blog.label}</p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: '-.02em' }}>{tr.blog.title}</h2>
      <p className="text-sm leading-relaxed mb-12 max-w-lg" style={{ color: 'var(--muted)' }}>{tr.blog.sub}</p>
      <div className="grid md:grid-cols-3 gap-5">
        {posts.map((post: any) => (
          <Link key={post.slug} href={`/${lang}/blog/${post.slug}`} className="glass-card rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:border-[rgba(0,212,255,.3)] group block" style={isAr ? { textAlign: 'right' } : {}}>
            <div className="aspect-video bg-gradient-to-br from-[var(--bg3)] to-[var(--bg2)] flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#0a1628,#061020)' }}>
              <div className="text-3xl opacity-50">✍️</div>
            </div>
            <div className="p-5">
              <div className={`flex items-center gap-3 mb-3 text-xs font-mono ${isAr ? 'flex-row-reverse' : ''}`} style={{ color: 'var(--muted)' }}>
                <span style={{ color: 'var(--accent)' }}>{post.category}</span>
                <span>·</span>
                <span>{post.readingTime} {tr.blog.minRead}</span>
              </div>
              <h3 className="text-sm font-semibold leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text)' }}>
                {isAr && post.titleAr ? post.titleAr : post.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                {isAr && post.excerptAr ? post.excerptAr : post.excerpt}
              </p>
              <div className="mt-4 text-xs font-mono transition-colors" style={{ color: 'var(--accent)' }}>
                {tr.blog.readMore}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {posts.length > 0 && (
        <div className="mt-10 text-center">
          <Link href={`/${lang}/blog`} className="px-6 py-2.5 rounded-lg text-sm font-mono transition-all hover:bg-[rgba(0,212,255,.1)]" style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}>
            {isAr ? 'كل المقالات →' : 'All Articles →'}
          </Link>
        </div>
      )}
    </section>
  )
}
