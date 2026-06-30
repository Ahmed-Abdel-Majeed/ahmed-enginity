import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, type, message, source, lang } = body

    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const webhook = process.env.N8N_WEBHOOK_URL || 'https://ahmed56963.app.n8n.cloud/webhook/ahmedportfolio'

    // Forward to n8n — n8n handles Telegram notify, Google Sheets, CRM
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, projectType: type, message, source: source || 'contact_form', lang, timestamp: new Date().toISOString() }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`n8n webhook failed with status ${res.status}:`, errorText)
      throw new Error(`n8n webhook failed: ${res.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Lead API error:', err.message)
    return NextResponse.json({ error: 'Failed to process lead', details: err.message }, { status: 500 })
  }
}
