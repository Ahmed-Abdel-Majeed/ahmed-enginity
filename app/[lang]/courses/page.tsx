import { getCourses, getProfile, getSocials } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { type Locale, t } from '@/lib/i18n'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import ChatWidget from '@/components/chat/ChatWidget'
import Cursor from '@/components/ui/Cursor'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  return buildMetadata({ title: lang === 'ar' ? 'الكورسات' : 'Courses', description: 'Learn AI automation with Ahmed Abdelmajed. Arabic n8n, AI Agents, and automation courses.', path: '/courses', lang })
}

export default async function CoursesPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const courses = getCourses()
  const [profile, socials] = [getProfile(), getSocials()]
  const tr = t[lang]
  const isAr = lang === 'ar'

  return (
    <>
      <Cursor />
      <Navbar lang={lang} socials={socials} />
      <main className="min-h-screen pt-24 pb-20 px-8 md:px-20 max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-[.2em] uppercase mb-3" style={{ color: 'var(--accent)' }}>{tr.courses.label}</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: '-.02em' }}>{tr.courses.title}</h1>
        <p className="text-sm leading-relaxed mb-12 max-w-lg" style={{ color: 'var(--muted)' }}>{tr.courses.sub}</p>

        <div className="grid md:grid-cols-2 gap-7">
          {courses.map((c: any) => (
            <div key={c.id} className="glass-card rounded-2xl overflow-hidden" style={isAr ? { textAlign: 'right' } : {}}>
              <div className="h-52 flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg,#0a1628,#1a0a3a)' }}>
                <div className="text-7xl opacity-20">🎓</div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'rgba(124,58,237,.35)', border: '1px solid rgba(124,58,237,.5)', color: '#c4b5fd' }}>{c.platform}</span>
                  <span className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{c.price}</span>
                </div>
              </div>
              <div className="p-7">
                <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>{isAr ? c.titleAr : c.title}</h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>{isAr ? c.descriptionAr : c.description}</p>

                {/* Stats */}
                <div className={`grid grid-cols-4 gap-3 mb-6 text-center`}>
                  {[
                    { v: c.rating + '⭐', l: isAr ? 'تقييم' : 'Rating' },
                    { v: c.students.toLocaleString(), l: isAr ? 'طالب' : 'Students' },
                    { v: c.hours + 'h', l: isAr ? 'محتوى' : 'Content' },
                    { v: c.lectures, l: isAr ? 'درس' : 'Lectures' },
                  ].map(s => (
                    <div key={s.l} className="glass-card rounded-xl py-2">
                      <div className="text-sm font-bold font-mono" style={{ color: 'var(--accent)' }}>{s.v}</div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'var(--muted)' }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Curriculum */}
                <div className="mb-6">
                  <div className="font-mono text-xs tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
                    {isAr ? '// المحتوى' : '// Curriculum'}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {c.curriculum.map((sec: any) => (
                      <div key={sec.section} className={`flex items-center justify-between py-1.5 border-b ${isAr ? 'flex-row-reverse' : ''}`} style={{ borderColor: 'var(--border)' }}>
                        <span className="text-xs" style={{ color: 'var(--muted)' }}>{sec.section}</span>
                        <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>{sec.lessons} {isAr ? 'درس' : 'lessons'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a href={c.url} target="_blank" rel="noopener noreferrer" className="w-full block text-center py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg,var(--accent),var(--accent2))' }}>
                  {isAr ? `سجّل الآن — ${c.price}` : `Enroll Now — ${c.price}`}
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer lang={lang} profile={profile} />
      <ChatWidget lang={lang} webhook={profile.n8nWebhook} />
    </>
  )
}
