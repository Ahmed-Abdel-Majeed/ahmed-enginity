import type { Metadata } from 'next'

const BASE_URL = 'https://ahmed-abdelmajed.dev'

export function buildMetadata({
  title,
  description,
  path = '',
  lang = 'en',
  image = '/images/og-image.jpg',
}: {
  title: string
  description: string
  path?: string
  lang?: string
  image?: string
}): Metadata {
  const url = `${BASE_URL}/${lang}${path}`
  const fullTitle = `${title} | Ahmed Abdelmajed`

  return {
    title: fullTitle,
    description,
    keywords: [
      'Ahmed Abdelmajed', 'Ahmed Flow', 'AI Automation Engineer',
      'n8n Expert', 'AI Agent Developer', 'WhatsApp AI Agent Developer',
      'Automation Consultant', 'AI Automation Egypt', 'n8n Developer',
      'n8n Freelancer', 'Workflow Automation Expert', 'AI Systems Engineer',
    ],
    authors: [{ name: 'Ahmed Abdelmajed', url: BASE_URL }],
    creator: 'Ahmed Abdelmajed',
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: url, languages: { en: `${BASE_URL}/en${path}`, ar: `${BASE_URL}/ar${path}` } },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Ahmed Abdelmajed — AI Automation Engineer',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: lang === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@ahmed_enginity',
      images: [image],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    verification: {
      google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    },
  }
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ahmed Abdelmajed',
    alternateName: 'Ahmed Flow',
    url: BASE_URL,
    jobTitle: 'AI Automation Engineer',
    description: 'AI Automation Engineer specializing in n8n, AI Agents, WhatsApp AI, and business automation systems.',
    address: { '@type': 'PostalAddress', addressCountry: 'EG' },
    sameAs: [
      'https://www.linkedin.com/in/ahmed-abdelmaged-44ab58314',
      'https://www.youtube.com/@ahmed_abdelmajed',
      'https://github.com/Ahmed-Abdel-Majeed',
    ],
    knowsAbout: ['n8n', 'AI Agents', 'WhatsApp Automation', 'LangChain', 'RAG', 'OpenAI', 'Business Automation'],
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Enginity',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    founder: { '@type': 'Person', name: 'Ahmed Abdelmajed' },
    description: 'AI Automation Engineering company building intelligent systems for businesses.',
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'enginity2@gmail.com' },
  }
}

export function serviceSchema(service: { title: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@type': 'Person', name: 'Ahmed Abdelmajed' },
    areaServed: 'Worldwide',
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function articleSchema(post: { title: string; description: string; date: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Ahmed Abdelmajed' },
    url: `${BASE_URL}/en/blog/${post.slug}`,
  }
}
