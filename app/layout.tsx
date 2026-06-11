import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ahmed Abdelmajed — AI Automation Engineer',
  description: 'AI Automation Engineer specializing in n8n, AI Agents, WhatsApp Automation, and business automation systems.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
