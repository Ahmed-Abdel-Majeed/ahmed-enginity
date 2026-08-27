import { type Locale } from '@/lib/i18n'
import { getProfile, getProjects, getServices, getTestimonials, getVideos, getCourses, getSocials, getBlogPosts } from '@/lib/content'
import CanvasShell from '@/components/ui/CanvasShell'

export default async function RootPage() {
  const lang: Locale = 'en'
  const [profile, projects, services, testimonials, videos, courses, socials, posts] = await Promise.all([
    getProfile(), getProjects(), getServices(), getTestimonials(),
    getVideos(), getCourses(), getSocials(), getBlogPosts(),
  ])

  return (
    <CanvasShell 
      lang={lang} 
      profile={profile} 
      projects={projects} 
      services={services} 
      testimonials={testimonials} 
      videos={videos} 
      courses={courses} 
      socials={socials} 
      posts={posts} 
    />
  )
}
