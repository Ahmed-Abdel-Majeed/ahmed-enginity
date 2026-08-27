import type { Metadata } from 'next'
import './[lang]/globals.css'

export const metadata: Metadata = {
  title: 'Ahmed Abdelmajed — AI Automation Engineer',
  description: 'AI Automation Engineer specializing in n8n, AI Agents, WhatsApp Automation, and business automation systems.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
