import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, type Locale, getDir } from '@/lib/i18n'
import { buildMetadata, personSchema, organizationSchema } from '@/lib/seo'
import './globals.css'

export async function generateStaticParams() {
  return locales.map(lang => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  return buildMetadata({
    title: lang === 'ar' ? 'أحمد عبد المجيد — مهندس أتمتة الذكاء الاصطناعي' : 'Ahmed Abdelmajed — AI Automation Engineer',
    description: lang === 'ar'
      ? 'مهندس أتمتة ذكاء اصطناعي متخصص في n8n ووكلاء AI وأتمتة الأعمال وأنظمة واتساب الذكية.'
      : 'AI Automation Engineer specializing in n8n, AI Agents, WhatsApp AI, and business automation systems.',
    lang,
  })
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = rawLang as Locale
  if (!locales.includes(lang)) notFound()
  const dir = getDir(lang)
  const isAr = lang === 'ar'

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`
        }} />
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
