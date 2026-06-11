import { type Locale } from '@/lib/i18n'
import { getProfile, getProjects, getServices, getTestimonials, getVideos, getCourses, getSocials, getBlogPosts } from '@/lib/content'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Projects from '@/components/sections/Projects'
import Blog from '@/components/sections/Blog'
import Courses from '@/components/sections/Courses'
import YouTube from '@/components/sections/YouTube'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import ChatWidget from '@/components/chat/ChatWidget'
import Cursor from '@/components/ui/Cursor'
import Analytics from '@/components/ui/Analytics'

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const [profile, projects, services, testimonials, videos, courses, socials, posts] = await Promise.all([
    getProfile(), getProjects(), getServices(), getTestimonials(),
    getVideos(), getCourses(), getSocials(), getBlogPosts(),
  ])

  return (
    <>
      <Cursor />
      <Analytics />
      <Navbar lang={lang} socials={socials} />
      <main>
        <Hero lang={lang} profile={profile} />
        <About lang={lang} profile={profile} />
        <Services lang={lang} services={services} />
        <Projects lang={lang} projects={projects} />
        <Blog lang={lang} posts={posts.slice(0, 3)} />
        <Courses lang={lang} courses={courses} />
        <YouTube lang={lang} videos={videos.slice(0, 6)} />
        <Testimonials lang={lang} testimonials={testimonials} />
        <Contact lang={lang} profile={profile} socials={socials} />
      </main>
      <Footer lang={lang} profile={profile} />
      <ChatWidget lang={lang} webhook={profile.n8nWebhook} />
    </>
  )
}
