'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error caught:', error)
  }, [error])

  return (
    <html>
      <body className="bg-slate-900 text-white min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center shadow-2xl">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2 text-white">Something went wrong</h2>
          <p className="text-sm text-slate-400 mb-6 font-mono break-all">
            {error?.message || 'A runtime error occurred during rendering.'}
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
