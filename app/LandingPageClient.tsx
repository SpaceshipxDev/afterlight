'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import ParticleWave from './ParticleWave'

type Locale = 'en' | 'zh-CN'

const COPY: Record<
  Locale,
  {
    headline: string
    subhead: string
    emailPlaceholder: string
    saving: string
    getAccess: string
    success: string
    errors: {
      generic: string
      network: string
    }
  }
> = {
  en: {
    headline: 'Skip your next photoshoot.',
    subhead: "Generate product photos in your brand's style, instantly.",
    emailPlaceholder: 'Enter your email address',
    saving: 'Saving...',
    getAccess: 'Request access',
    success: "Thanks! We'll be in touch soon.",
    errors: {
      generic: 'Something went wrong. Please try again.',
      network: 'Network error. Please try again.',
    },
  },
  'zh-CN': {
    headline: '下次拍摄，直接跳过。',
    subhead: '按你的品牌风格生成高级产品图。',
    emailPlaceholder: '输入你的邮箱',
    saving: '提交中...',
    getAccess: '申请试用',
    success: '已收到，我们会尽快联系你。',
    errors: {
      generic: '出了点问题，请重试。',
      network: '网络异常，请重试。',
    },
  },
}

function localizeServerError(error: string | undefined, locale: Locale, fallback: string) {
  if (!error) return fallback
  return error
}

export default function LandingPageClient({ locale }: { locale: Locale }) {
  const copy = COPY[locale]

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Before/after drag slider
  const [sliderPos, setSliderPos] = useState(75)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100))
    setSliderPos(pct)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setSubmitError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null
        setSubmitError(localizeServerError(payload?.error, locale, copy.errors.generic))
        return
      }

      setSubmitted(true)
      setEmail('')
    } catch {
      setSubmitError(copy.errors.network)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen text-black font-sans flex flex-col relative overflow-x-hidden selection:bg-neutral-200 selection:text-black">

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" aria-label="Afterlight home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/afterlight-wordmark.svg"
              alt="Afterlight"
              width={919}
              height={193}
              className="h-6 w-auto select-none"
            />
          </Link>

          <div className="hidden md:flex items-center gap-7 text-[15px] font-medium text-neutral-600">
            <Link href="/use-cases" className="hover:text-black transition-colors">Use Cases</Link>
            <Link href="/pricing" className="hover:text-black transition-colors">Pricing</Link>
            <Link href="/api" className="hover:text-black transition-colors">API</Link>
            <Link href="/cdrp" className="hover:text-black transition-colors">Trust</Link>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-neutral-700 border border-neutral-200 rounded-full px-5 py-2 text-[14px] font-medium hover:text-black hover:border-black hover:bg-neutral-50 transition-all"
          >
            Login
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </nav>

      <main className="flex-1 w-full relative flex flex-col items-center pt-32 lg:pt-40 pb-20">

        {/* Particle background */}
        <div className="absolute inset-0 top-0 h-[110vh] pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, white 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, white 50%, transparent 100%)' }}>
          <ParticleWave />
        </div>

        <div className="relative z-10 text-center px-6 md:px-12 w-full max-w-[1400px]">

          {/* Eyebrow removed to feel more direct and competent */}

          <h1 className="text-[52px] md:text-[68px] lg:text-[76px] xl:text-[84px] font-medium tracking-[-0.03em] text-neutral-900 leading-[1.04] max-w-5xl mx-auto mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {copy.headline}
          </h1>

          <p className="text-xl md:text-2xl text-neutral-400 font-normal tracking-[-0.01em] mb-12 max-w-xl mx-auto leading-snug animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            {copy.subhead}
          </p>

          {/* Unified pill form */}
          <div className="flex justify-center pointer-events-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 relative z-20">
            <div className="w-full max-w-[480px]">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="relative flex items-center w-full bg-white rounded-full border border-neutral-200 shadow-sm transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-neutral-900 focus-within:border-neutral-900">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.emailPlaceholder}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-transparent pl-6 pr-[130px] py-4 text-[16px] text-neutral-900 placeholder:text-neutral-400 outline-none rounded-full"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-black text-white rounded-full px-6 text-[14px] font-semibold tracking-tight hover:bg-neutral-800 transition-colors flex items-center justify-center shadow-sm disabled:opacity-50 whitespace-nowrap active:scale-[0.98]"
                  >
                    {isSubmitting ? copy.saving : copy.getAccess}
                  </button>
                  {submitError && <p className="absolute -bottom-8 left-6 text-[13px] text-red-500 font-medium">{submitError}</p>}
                </form>
              ) : (
                <p className="text-[15px] text-neutral-500 font-normal py-4">{copy.success}</p>
              )}
            </div>
          </div>

          {/* Modular credibility grid — bordered cells, equal weight, Interact-style */}
          <div className="mt-20 animate-in fade-in duration-700 delay-[600ms]">
            <p className="text-center text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400 mb-7">
              Trusted by
            </p>
            <div className="max-w-[980px] mx-auto rounded-2xl border border-neutral-200 bg-white overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                {[
                  { src: '/logos/gap.svg', alt: 'Gap', h: 32 },
                  { src: '/logos/behr.svg', alt: 'Behr', h: 22 },
                  { src: '/logos/balsam-hill.png', alt: 'Balsam Hill', h: 26 },
                  { src: '/logos/dreamland-baby.png', alt: 'Dreamland Baby', h: 24 },
                  { src: '/logos/blindsgalore.svg', alt: 'Blindsgalore', h: 18 },
                ].map((b) => (
                  <div
                    key={b.alt}
                    className="flex items-center justify-center h-[96px] md:h-[112px] px-5 md:px-6 border-l border-t border-neutral-200 -ml-px -mt-px"
                  >
                    <img
                      src={b.src}
                      alt={b.alt}
                      style={{ height: b.h, width: 'auto', filter: 'grayscale(1) brightness(0.5)' }}
                      className="opacity-75 select-none max-w-full"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Live pilots — Gap & Behr */}
      <section id="work" className="bg-white pt-28 md:pt-36 pb-16 md:pb-20 relative z-10">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12">
          <p className="text-center text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-4">
            Live Pilots
          </p>
          <h2 className="text-center text-[26px] md:text-[36px] font-medium tracking-[-0.025em] text-neutral-900 leading-[1.15] max-w-2xl mx-auto mb-14 md:mb-20">
            Active sprints with Gap and Behr.
          </h2>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {[
              {
                href: '/demos/gap',
                brand: 'Gap',
                logo: '/logos/gap.svg',
                logoH: 64,
                title: 'Reshot in four days.',
                meta: '3 SKUs · 6 campaign frames · brand-true aesthetic',
              },
              {
                href: '/demos/behr',
                brand: 'Behr',
                logo: '/logos/behr.svg',
                logoH: 36,
                title: 'Restyled without a reshoot.',
                meta: '3 room scenes · real Behr palette · zero studio time',
              },
            ].map((c) => (
              <a
                key={c.brand}
                href={c.href}
                className="group block rounded-[24px] bg-neutral-50 hover:bg-neutral-100 transition-colors duration-300 p-8 md:p-10"
              >
                {/* Logo lockup */}
                <div className="flex items-center justify-center h-28 md:h-36 mb-8 md:mb-10">
                  <img
                    src={c.logo}
                    alt={c.brand}
                    style={{ height: c.logoH, width: 'auto' }}
                    className="opacity-90"
                    draggable={false}
                  />
                </div>

                <h3 className="text-[24px] md:text-[28px] font-medium tracking-[-0.02em] text-neutral-900 leading-[1.15]">
                  {c.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-neutral-500 mt-3 tracking-[-0.005em] leading-relaxed">
                  {c.meta}
                </p>

                <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-neutral-900 mt-7 transition-[gap] duration-300 group-hover:gap-2.5">
                  View pilot
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Try it — interactive before/after */}
      <section className="bg-white pt-20 md:pt-28 pb-28 md:pb-36 relative z-10">
        <div className="max-w-[1180px] mx-auto px-6 md:px-12">
          <p className="text-center text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mb-4">
            Try it
          </p>
          <h2 className="text-center text-[26px] md:text-[36px] font-medium tracking-[-0.025em] text-neutral-900 leading-[1.15] max-w-2xl mx-auto mb-12 md:mb-16">
            See it for yourself.
          </h2>

          <div className="flex flex-col items-center gap-5">
            <div
              ref={containerRef}
              className="relative w-full max-w-[440px] aspect-[3/4] rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-neutral-900/[0.08] cursor-col-resize select-none"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={(e) => { if (isDragging) handlePointerMove(e.clientX) }}
              onTouchStart={(e) => { setIsDragging(true); handlePointerMove(e.touches[0].clientX) }}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
            >
              <img
                src="/frontdoor/IMG_3674.webp"
                alt="After: AI-generated lifestyle campaign photo"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />

              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src="/frontdoor/IMG_3658.webp"
                  alt="Before: product flat lay"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
              </div>

              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white shadow-sm pointer-events-none z-20"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.08] flex items-center justify-center gap-[3px] z-30 cursor-col-resize">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-neutral-700">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-neutral-700">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 z-30 bg-black/75 backdrop-blur-sm text-white text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-md pointer-events-none">
                Before
              </div>
              <div className="absolute bottom-4 right-4 z-30 bg-black/75 backdrop-blur-sm text-white text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-md pointer-events-none">
                After
              </div>
            </div>

            <p className="text-[12px] text-neutral-400 tracking-[-0.01em] mt-2">Drag to compare</p>
          </div>
        </div>
      </section>

      <footer className="bg-white pt-24 pb-10 mt-auto border-t border-neutral-100 z-10 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="w-full flex justify-center items-center pt-2 pb-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/afterlight-wordmark.svg"
              alt="Afterlight"
              width={919}
              height={193}
              className="h-auto w-[clamp(260px,62vw,820px)] select-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-neutral-100">
            <Link href="/" aria-label="Afterlight home" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/afterlight-wordmark.svg"
                alt="Afterlight"
                width={919}
                height={193}
                className="h-6 w-auto select-none"
              />
            </Link>
            <div className="flex flex-col items-center gap-2.5">
              <div className="flex flex-wrap items-center justify-center gap-6 text-[13px] font-medium text-neutral-500">
                <Link href="/use-cases" className="hover:text-neutral-900 transition-colors">Use Cases</Link>
                <Link href="/pricing" className="hover:text-neutral-900 transition-colors">Pricing</Link>
                <Link href="/api" className="hover:text-neutral-900 transition-colors">API</Link>
                <Link href="/login" className="hover:text-neutral-900 transition-colors">Login</Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-5 text-[12px] text-neutral-400">
                <Link href="/terms" className="hover:text-neutral-700 transition-colors">Brand Terms</Link>
                <Link href="/influencer-agreement" className="hover:text-neutral-700 transition-colors">Influencer Terms</Link>
                <Link href="/privacy" className="hover:text-neutral-700 transition-colors">Privacy</Link>
                <Link href="/cdrp" className="hover:text-neutral-700 transition-colors">Trust</Link>
              </div>
            </div>
            <p className="text-[12px] text-neutral-400">&copy; {new Date().getFullYear()} Afterlight, Inc.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
