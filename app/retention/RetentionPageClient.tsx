'use client'

import { useState } from 'react'

const VIDEO_ID = 'kL-SCcIwXgQ'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function RetentionPageClient() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setErrorMessage(data?.error || 'Something went wrong. Try again.')
        setState('error')
        return
      }
      setState('success')
    } catch {
      setErrorMessage('Network error. Please try again.')
      setState('error')
    }
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-black selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <a href="/" className="font-semibold text-lg tracking-tight text-black">
            Afterlight
          </a>
          <a
            href="#schedule"
            className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
          >
            Schedule a call
          </a>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto px-6 md:px-12 pt-32 md:pt-44 pb-32">
        {/* Hero */}
        <section className="text-center max-w-4xl mx-auto mb-20 md:mb-28">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-black leading-[1.05] mb-8">
            Send personalized emails with{' '}
            <span className="bg-yellow-200/70 px-2 rounded-md box-decoration-clone">
              your customers wearing your new arrivals.
            </span>
          </h1>
        </section>

        {/* Video */}
        <section className="mb-24 md:mb-32">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/60 shadow-2xl shadow-neutral-200/60">
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
              title="Afterlight Retention demo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </section>

        {/* Three-line value prop */}
        <section className="mb-24 md:mb-32 grid md:grid-cols-3 gap-10 md:gap-12 max-w-5xl mx-auto">
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
              01
            </p>
            <p className="text-lg text-neutral-700 font-medium tracking-tight leading-snug">
              <span className="text-black font-semibold">Customers upload a photo.</span>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
              02
            </p>
            <p className="text-lg text-neutral-700 font-medium tracking-tight leading-snug">
              We render them <span className="text-black font-semibold">wearing your new arrivals.</span>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-3">
              03
            </p>
            <p className="text-lg text-neutral-700 font-medium tracking-tight leading-snug">
              Email hits. <span className="text-black font-semibold">They buy.</span>
            </p>
          </div>
        </section>

        {/* Schedule a call */}
        <section
          id="schedule"
          className="max-w-xl mx-auto text-center scroll-mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter text-black mb-4 leading-tight">
            Want to try it?
          </h2>
          <p className="text-base md:text-lg text-neutral-500 font-medium tracking-tight mb-8 leading-relaxed">
            Drop your email and we'll schedule a call to walk through it on your catalog.
          </p>

          {state !== 'success' ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbrand.com"
                required
                disabled={state === 'loading'}
                className="flex-1 bg-neutral-50 px-5 py-4 text-base rounded-xl border border-neutral-200 outline-none focus:border-neutral-400 transition-all placeholder:text-neutral-400 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={state === 'loading'}
                className="px-8 py-4 bg-black text-white rounded-xl font-medium hover:bg-neutral-800 transition-all duration-200 shadow-lg shadow-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {state === 'loading' ? 'Sending…' : 'Schedule a call'}
              </button>
            </form>
          ) : (
            <div className="py-5 px-6 bg-green-50 border border-green-100 rounded-xl">
              <p className="text-green-800 font-medium">
                Thanks. We'll reach out shortly to set up the call.
              </p>
            </div>
          )}

          {state === 'error' && errorMessage && (
            <p className="text-sm text-red-600 mt-4 font-medium">{errorMessage}</p>
          )}
        </section>
      </main>

      <footer className="border-t border-neutral-100 py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-semibold text-sm tracking-tight text-neutral-900">
            Afterlight © 2026
          </span>
          <p className="text-neutral-400 text-sm font-medium">
            Questions?{' '}
            <a
              href="mailto:founders@tryafterlight.com"
              className="text-black hover:underline transition-all"
            >
              Get in touch
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
