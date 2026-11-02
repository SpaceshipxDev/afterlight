'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ParticleWave from '../ParticleWave'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Mode = 'hero' | 'form' | 'done'

type FormData = {
  email: string
  tiktok: string
  instagram: string
  brands: string
}

const TOTAL_STEPS = 3

/* ---------- Small inline icons ---------- */

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function Chevron({ dir }: { dir: 'up' | 'down' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'up' ? <path d="m18 15-6-6-6 6" /> : <path d="m6 9 6 6 6-6" />}
    </svg>
  )
}

function EnterKey() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block -mt-0.5">
      <polyline points="9 10 4 15 9 20" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  )
}

/* ---------- Typeform-style OK button ---------- */

function OkButton({
  label,
  onClick,
  loading,
}: {
  label: string
  onClick: () => void
  loading?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-[10px] bg-neutral-900 px-5 py-2.5 text-[16px] font-semibold text-white shadow-[0_2px_10px_rgba(0,0,0,0.18)] transition-all hover:bg-black active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? 'Submitting…' : label}
        {!loading && <CheckIcon />}
      </button>
      <span className="hidden text-[13px] text-neutral-400 sm:inline">
        press <span className="font-semibold text-neutral-500">Enter</span> <EnterKey />
      </span>
    </div>
  )
}

/* ---------- Step definitions ---------- */

type StepKey = 'email' | 'socials' | 'brands'

const STEPS: { key: StepKey; question: string; description: string; cta: string }[] = [
  {
    key: 'email',
    question: "What's your email?",
    description: "We'll only use it to reach out about paid campaigns.",
    cta: 'OK',
  },
  {
    key: 'socials',
    question: 'Where can people find you?',
    description: 'Drop your TikTok and Instagram — either is fine.',
    cta: 'OK',
  },
  {
    key: 'brands',
    question: 'Which brands do you work with — or want to?',
    description: 'List a few. It helps us match you to the right campaigns.',
    cta: 'Submit',
  },
]

export default function JoinClient() {
  const [mode, setMode] = useState<Mode>('hero')
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>({ email: '', tiktok: '', instagram: '', brands: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const firstInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  const startForm = useCallback(() => {
    setMode('form')
    setStep(0)
    setError('')
  }, [])

  // Autofocus the active step's first input after the transition begins.
  useEffect(() => {
    if (mode !== 'form') return
    const t = setTimeout(() => firstInputRef.current?.focus(), 80)
    return () => clearTimeout(t)
  }, [mode, step])

  const submit = useCallback(async () => {
    if (submitting) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null
        setError(payload?.error ?? 'Something went wrong. Please try again.')
        return
      }
      setMode('done')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }, [data, submitting])

  const goNext = useCallback(() => {
    setError('')
    const current = STEPS[step]

    if (current.key === 'email') {
      if (!EMAIL_REGEX.test(data.email.trim())) {
        setError('Please enter a valid email address.')
        return
      }
    }

    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1)
    } else {
      void submit()
    }
  }, [step, data.email, submit])

  const goBack = useCallback(() => {
    setError('')
    if (step === 0) {
      setMode('hero')
      return
    }
    setStep((s) => s - 1)
  }, [step])

  // Keyboard: Enter advances; Shift+Enter is a newline inside the textarea.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      goNext()
    }
  }

  /* ---------------- HERO ---------------- */
  if (mode === 'hero') {
    return (
      <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white font-sans text-black selection:bg-neutral-200 selection:text-black">
        <nav className="fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-12">
            <Link href="/" aria-label="Afterlight home" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/afterlight-wordmark.svg" alt="Afterlight" width={919} height={193} className="h-6 w-auto select-none" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2 text-[14px] font-medium text-neutral-700 transition-all hover:border-black hover:bg-neutral-50 hover:text-black"
            >
              Login
              <ArrowRight size={14} />
            </Link>
          </div>
        </nav>

        <main className="relative flex w-full flex-1 flex-col items-center justify-center px-6 pb-24 pt-32 md:px-12 lg:pt-40">
          {/* Particle background */}
          <div
            className="pointer-events-none absolute inset-0 top-0 h-[110vh]"
            style={{
              maskImage: 'linear-gradient(to bottom, white 55%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, white 55%, transparent 100%)',
            }}
          >
            <ParticleWave />
          </div>

          <div className="relative z-10 w-full max-w-[1100px] text-center">
            <h1 className="tf-fade-up mx-auto mb-6 max-w-[15ch] text-[44px] font-medium leading-[1.05] tracking-[-0.03em] text-neutral-900 md:text-[64px] lg:text-[76px]">
              Get paid for campaigns without filming 
            </h1>

            <p
              className="tf-fade-up mx-auto mb-12 max-w-xl text-lg font-normal leading-snug tracking-[-0.01em] text-neutral-400 md:text-2xl"
              style={{ animationDelay: '0.1s' }}
            >
              Generate AI versions of yourself that sell products without you having to film.
            </p>

            <div className="tf-fade-up flex flex-col items-center gap-4" style={{ animationDelay: '0.2s' }}>
              <button
                type="button"
                onClick={startForm}
                className="inline-flex items-center gap-2.5 rounded-[12px] bg-neutral-900 px-9 py-4 text-[17px] font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.22)] transition-all hover:bg-black hover:shadow-[0_6px_26px_rgba(0,0,0,0.28)] active:scale-[0.98]"
              >
                Join
                <ArrowRight size={17} />
              </button>
              <p className="text-[13px] text-neutral-400">Takes 30 seconds · no portfolio needed</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  /* ---------------- DONE ---------------- */
  if (mode === 'done') {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 font-sans text-black">
        <div className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ maskImage: 'radial-gradient(circle at 50% 40%, white, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle at 50% 40%, white, transparent 70%)' }}>
          <ParticleWave />
        </div>
        <div className="tf-step-in relative z-10 max-w-lg text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-white">
            <CheckIcon />
          </div>
          <h1 className="mb-4 text-[34px] font-medium leading-[1.1] tracking-[-0.03em] text-neutral-900 md:text-[44px]">
            You&rsquo;re on the list.
          </h1>
          <p className="mx-auto mb-10 max-w-md text-[17px] leading-relaxed text-neutral-500">
            We&rsquo;ll be in touch about your first paid campaign soon. No filming required.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[10px] border border-neutral-200 bg-white px-6 py-3 text-[15px] font-medium text-neutral-700 transition-all hover:border-black hover:text-black"
          >
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  /* ---------------- FORM (Typeform-style) ---------------- */
  const current = STEPS[step]
  const progress = ((step + (mode === 'form' ? 0 : 1)) / TOTAL_STEPS) * 100

  return (
    <div className="relative flex min-h-screen flex-col bg-white font-sans text-black selection:bg-neutral-200 selection:text-black">
      {/* Progress bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-neutral-100">
        <div
          className="h-full bg-neutral-900 transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top bar: logo */}
      <div className="fixed left-0 right-0 top-0 z-40 px-6 pt-6 md:px-12">
        <Link href="/" aria-label="Afterlight home" className="inline-flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/afterlight-wordmark.svg" alt="Afterlight" width={919} height={193} className="h-5 w-auto select-none" />
        </Link>
      </div>

      <main className="flex flex-1 items-center px-6 md:px-12">
        <div className="mx-auto w-full max-w-[680px] py-24">
          <div key={step} className="tf-step-in" onKeyDown={handleKeyDown}>
            {/* Question number */}
            <div className="mb-3 flex items-center gap-1.5 text-[15px] font-medium text-neutral-400">
              <span>{step + 1}</span>
              <ArrowRight size={13} />
            </div>

            {/* Question */}
            <h2 className="mb-2 text-[26px] font-medium leading-[1.2] tracking-[-0.02em] text-neutral-900 md:text-[32px]">
              {current.question}
            </h2>
            <p className="mb-8 text-[15px] text-neutral-400 md:text-[16px]">{current.description}</p>

            {/* Inputs */}
            {current.key === 'email' && (
              <input
                ref={(el) => {
                  firstInputRef.current = el
                }}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                placeholder="name@email.com"
                className="w-full border-b border-neutral-300 bg-transparent pb-3 text-[22px] text-neutral-900 caret-neutral-900 outline-none transition-colors placeholder:text-neutral-300 focus:border-neutral-900 md:text-[28px]"
              />
            )}

            {current.key === 'socials' && (
              <div className="space-y-7">
                <label className="block">
                  <span className="mb-2 block text-[13px] font-medium uppercase tracking-[0.12em] text-neutral-400">TikTok</span>
                  <div className="flex items-center border-b border-neutral-300 transition-colors focus-within:border-neutral-900">
                    <span className="pb-3 pr-1 text-[22px] text-neutral-300 md:text-[26px]">@</span>
                    <input
                      ref={(el) => {
                        firstInputRef.current = el
                      }}
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      value={data.tiktok}
                      onChange={(e) => setData((d) => ({ ...d, tiktok: e.target.value }))}
                      placeholder="yourhandle"
                      className="w-full bg-transparent pb-3 text-[22px] text-neutral-900 caret-neutral-900 outline-none placeholder:text-neutral-300 md:text-[26px]"
                    />
                  </div>
                </label>
                <label className="block">
                  <span className="mb-2 block text-[13px] font-medium uppercase tracking-[0.12em] text-neutral-400">Instagram</span>
                  <div className="flex items-center border-b border-neutral-300 transition-colors focus-within:border-neutral-900">
                    <span className="pb-3 pr-1 text-[22px] text-neutral-300 md:text-[26px]">@</span>
                    <input
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      value={data.instagram}
                      onChange={(e) => setData((d) => ({ ...d, instagram: e.target.value }))}
                      placeholder="yourhandle"
                      className="w-full bg-transparent pb-3 text-[22px] text-neutral-900 caret-neutral-900 outline-none placeholder:text-neutral-300 md:text-[26px]"
                    />
                  </div>
                </label>
              </div>
            )}

            {current.key === 'brands' && (
              <textarea
                ref={(el) => {
                  firstInputRef.current = el
                }}
                rows={2}
                value={data.brands}
                onChange={(e) => setData((d) => ({ ...d, brands: e.target.value }))}
                placeholder="e.g. Nike, Glossier, that skincare brand you love…"
                className="w-full resize-none border-b border-neutral-300 bg-transparent pb-3 text-[22px] leading-snug text-neutral-900 caret-neutral-900 outline-none transition-colors placeholder:text-neutral-300 focus:border-neutral-900 md:text-[26px]"
              />
            )}

            {error && <p className="mt-4 text-[14px] font-medium text-red-500">{error}</p>}

            {/* CTA */}
            <div className="mt-9">
              <OkButton label={current.cta} onClick={goNext} loading={submitting && step === TOTAL_STEPS - 1} />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom-right Typeform-style navigation */}
      <div className="fixed bottom-6 right-6 z-40 flex overflow-hidden rounded-[10px] border border-neutral-200 shadow-sm">
        <button
          type="button"
          onClick={goBack}
          aria-label="Previous"
          className="flex h-10 w-11 items-center justify-center bg-neutral-900 text-white transition-colors hover:bg-black"
        >
          <Chevron dir="up" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next"
          className="flex h-10 w-11 items-center justify-center border-l border-white/15 bg-neutral-900 text-white transition-colors hover:bg-black"
        >
          <Chevron dir="down" />
        </button>
      </div>
    </div>
  )
}
