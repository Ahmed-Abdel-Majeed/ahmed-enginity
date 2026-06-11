import { MetadataRoute } from 'next'
import { getProjects, getBlogPosts } from '@/lib/content'

const BASE = 'https://ahmed-abdelmajed.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjects()
  const posts = getBlogPosts()
  const now = new Date()

  const staticPages = ['', '/blog', '/courses', '/youtube'].flatMap(path =>
    ['en', 'ar'].map(lang => ({
      url: `${BASE}/${lang}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1.0 : 0.8,
    }))
  )

  const projectPages = projects.flatMap((p: any) =>
    ['en', 'ar'].map(lang => ({
      url: `${BASE}/${lang}/case-studies/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  const blogPages = posts.flatMap((p: any) =>
    ['en', 'ar'].map(lang => ({
      url: `${BASE}/${lang}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  return [...staticPages, ...projectPages, ...blogPages]
}
