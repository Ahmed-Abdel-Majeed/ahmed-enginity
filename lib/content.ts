import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export function getProfile() {
  return JSON.parse(fs.readFileSync(path.join(contentDir, 'profile.json'), 'utf8'))
}

export function getProjects(): any[] {
  return JSON.parse(fs.readFileSync(path.join(contentDir, 'projects.json'), 'utf8'))
}

export function getProject(slug: string): any {
  const projects = getProjects()
  return projects.find((p: any) => p.slug === slug) || null
}

export function getServices() {
  return JSON.parse(fs.readFileSync(path.join(contentDir, 'services.json'), 'utf8'))
}

export function getTestimonials() {
  return JSON.parse(fs.readFileSync(path.join(contentDir, 'testimonials.json'), 'utf8'))
}

export function getVideos() {
  return JSON.parse(fs.readFileSync(path.join(contentDir, 'videos.json'), 'utf8'))
}

export function getCourses() {
  return JSON.parse(fs.readFileSync(path.join(contentDir, 'courses.json'), 'utf8'))
}

export function getSocials() {
  return JSON.parse(fs.readFileSync(path.join(contentDir, 'socials.json'), 'utf8'))
}

export function getBlogPosts(): any[] {
  const blogDir = path.join(contentDir, 'blog')
  if (!fs.existsSync(blogDir)) return []
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))
  return files.map(file => {
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf8')
    const { data, content } = matter(raw)
    const words = content.split(/\s+/).length
    return { ...data, readingTime: Math.ceil(words / 200), slug: data.slug || file.replace('.md', ''), content }
  }).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): any {
  const posts = getBlogPosts()
  return posts.find((p: any) => p.slug === slug) || null
}
