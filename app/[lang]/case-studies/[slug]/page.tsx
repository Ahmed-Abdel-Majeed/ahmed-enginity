import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProject, getProjects } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { type Locale } from '@/lib/i18n'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ChatWidget from '@/components/chat/ChatWidget'
import Cursor from '@/components/ui/Cursor'
import { getProfile, getSocials } from '@/lib/content'

export async function generateStaticParams() {
  const projects = getProjects()
  const locales = ['en', 'ar']
  return locales.flatMap(lang => projects.map((p: any) => ({ lang, slug: p.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return buildMetadata({ title: project.title, description: project.description, path: `/case-studies/${slug}`, lang })
}

export default async function CaseStudyPage({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const [profile, socials] = [getProfile(), getSocials()]
  const isAr = lang === 'ar'

  return (
    <>
      <Cursor />
      <Navbar lang={lang} socials={socials} />
      <main className="min-h-screen pt-24 pb-20 px-8 md:px-20 max-w-5xl mx-auto">
        {/* Back */}
        <Link href={`/${lang}#projects`} className="inline-flex items-center gap-2 text-xs font-mono mb-8 transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--muted)' }}>
          {isAr ? '→ العودة للمشاريع' : '← Back to Projects'}
        </Link>

        {/* Header */}
        <div className={`mb-12 ${isAr ? 'text-right' : ''}`}>
          <div className="font-mono text-xs tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            {project.category.toUpperCase()} / CASE STUDY
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: '-.02em' }}>
            {isAr ? project.titleAr : project.title}
          </h1>
          <p className="text-base leading-relaxed max-w-2xl" style={{ color: 'var(--muted)' }}>
            {isAr ? project.descriptionAr : project.description}
          </p>
          <div className={`flex flex-wrap gap-2 mt-5 ${isAr ? 'flex-row-reverse' : ''}`}>
            {project.technologies.map((t: string) => (
              <span key={t} className="px-2.5 py-1 rounded-full text-xs font-mono" style={{ background: 'rgba(124,58,237,.09)', border: '1px solid rgba(124,58,237,.2)', color: '#a78bfa' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {project.metrics.map((m: any) => (
            <div key={m.label} className="glass-card rounded-2xl p-5 text-center">
              <div className="text-2xl mb-1">{m.icon}</div>
              <div className="text-2xl font-bold font-mono mb-1" style={{ color: 'var(--accent)' }}>{m.value}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Problem / Solution */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <div className="glass-card rounded-2xl p-7" style={isAr ? { textAlign: 'right' } : {}}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🔴</span>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>{isAr ? 'المشكلة' : 'The Problem'}</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{isAr ? project.problemAr : project.problem}</p>
          </div>
          <div className="glass-card rounded-2xl p-7" style={isAr ? { textAlign: 'right' } : {}}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">✅</span>
              <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>{isAr ? 'الحل' : 'The Solution'}</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{isAr ? project.solutionAr : project.solution}</p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="glass-card rounded-2xl p-7 mb-14" style={isAr ? { textAlign: 'right' } : {}}>
          <h2 className="text-lg font-semibold mb-5" style={{ color: 'var(--text)' }}>{isAr ? 'التقنيات المستخدمة' : 'Technologies Used'}</h2>
          <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${isAr ? 'text-right' : ''}`}>
            {project.technologies.map((tech: string) => (
              <div key={tech} className={`flex items-center gap-2 p-3 rounded-xl ${isAr ? 'flex-row-reverse' : ''}`} style={{ background: 'rgba(0,212,255,.04)', border: '1px solid var(--border)' }}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)' }} />
                <span className="text-sm font-mono" style={{ color: 'var(--text)' }}>{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>
            {isAr ? 'هل تريد نظاماً مشابهاً؟' : 'Want a Similar System?'}
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            {isAr ? 'تواصل معي وسنبني الأتمتة المناسبة لعملك.' : "Let's discuss your automation needs and build something that works."}
          </p>
          <Link href={`/${lang}#contact`} className="inline-block px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))' }}>
            {isAr ? 'تواصل معي ←' : 'Get in Touch →'}
          </Link>
        </div>
      </main>
      <Footer lang={lang} profile={profile} />
      <ChatWidget lang={lang} webhook={profile.n8nWebhook} />
    </>
  )
}
