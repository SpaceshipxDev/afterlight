'use client'

import { useState, useEffect, useRef } from 'react'

type Locale = 'en' | 'zh-CN'

type DemoItem = {
  id: number
  name: string
  before: string
  after: string
  listings: Record<Locale, string>
}

const DEMO_ITEMS: DemoItem[] = [
  {
    id: 1,
    name: '',
    before: 'ass_blue1.png',
    after: 'ass_blue2.png',
    listings: {
      en: 'Lightweight cotton tunic with a relaxed silhouette. Finished with tonal floral embroidery and a softly gathered V-neckline.',
      'zh-CN': '轻薄棉质上衣，版型宽松。以同色花卉刺绣点缀，搭配柔和抽褶 V 领。',
    },
  },
  {
    id: 2,
    name: '',
    before: 'ass_dress1.png',
    after: 'ass_dress2.png',
    listings: {
      en: 'Midi dress with an all-over floral print. Straight cut with a buttoned front and an easy, fluid drape.',
      'zh-CN': '满版花卉印花中长连衣裙。直筒剪裁与前排扣设计，垂坠自然、穿着轻松。',
    },
  },
  {
    id: 3,
    name: '',
    before: 'ass_swamp1.png',
    after: 'ass_swamp2.png',
    listings: {
      en: 'Relaxed shirt dress in a muted floral pattern. Lightweight feel with dropped shoulders and a soft, washed finish.',
      'zh-CN': '低饱和花纹衬衫裙，整体廓形松弛。轻盈面料配落肩设计，呈现柔和水洗质感。',
    },
  },
]

const DEMO_METADATA = {
  heroDemo: {
    before: '/ass_red1.png',
    after: '/ass_red2.png',
  },
  brandLogos: [
    { id: 1, name: 'Brand One', src: '/brand_logo_1.png' },
    { id: 2, name: 'Brand Two', src: '/brand_logo_2.png' },
    { id: 3, name: 'Brand Three', src: '/brand_logo_3.png' },
  ],
}

const COPY: Record<
  Locale,
  {
    headline: string
    subhead: string
    emailPlaceholder: string
    saving: string
    getAccess: string
    success: string
    trustedBy: string
    before: string
    after: string
    beforePhone: string
    afterProfessional: string
    generatedListing: string
    heroListingMobile: string
    heroListingDesktop: string
    tryItYourself: string
    tryDescription: string
    generate: string
    generating: string
    generateHintIdle: string
    generateHintLoading: string
    sourcePhoto: string
    generatedPhoto: string
    generatedWillAppear: string
    generated: string
    questions: string
    getInTouch: string
    errors: {
      generic: string
      network: string
    }
  }
> = {
  en: {
    headline: 'Skip your next photoshoot.',
    subhead: "Generate product photos and listings in your brand's style.",
    emailPlaceholder: 'Enter your email',
    saving: 'Saving...',
    getAccess: 'Get Access',
    success: "Thanks! We'll be in touch soon.",
    trustedBy: 'Trusted by',
    before: 'Before:',
    after: 'After:',
    beforePhone: 'Before: Phone',
    afterProfessional: 'After: Professional',
    generatedListing: 'Generated listing',
    heroListingMobile:
      'A lightweight, softly crinkled red blouse with an easy, relaxed silhouette. Designed with a gathered neckline...',
    heroListingDesktop:
      'A lightweight, softly crinkled red blouse with an easy, relaxed silhouette. Designed with a gathered neckline and a V-neck finished in contrast trim...',
    tryItYourself: 'Try it yourself',
    tryDescription: 'Click any product to see the generated photo and listing',
    generate: 'Generate',
    generating: 'Generating...',
    generateHintIdle: 'Pick a product and generate',
    generateHintLoading: 'AI is generating visuals and copy',
    sourcePhoto: 'Source photo',
    generatedPhoto: 'Generated photo',
    generatedWillAppear: 'Generated image and listing will appear here.',
    generated: 'Generated:',
    questions: 'Questions?',
    getInTouch: 'Get in touch',
    errors: {
      generic: 'Something went wrong. Please try again.',
      network: 'Network error. Please try again.',
    },
  },
  'zh-CN': {
    headline: '下次拍摄，直接跳过。',
    subhead: '按你的品牌风格生成产品图和商品上架文案。',
    emailPlaceholder: '输入你的邮箱',
    saving: '提交中...',
    getAccess: '获取内测',
    success: '已收到，我们会尽快联系你。',
    trustedBy: '受以下品牌信赖',
    before: '之前：',
    after: '之后：',
    beforePhone: '之前：手机拍摄',
    afterProfessional: '之后：专业成片',
    generatedListing: '生成文案',
    heroListingMobile: '轻盈微皱红色上衣，版型自然宽松。抽褶领口，日常好搭。',
    heroListingDesktop: '轻盈微皱红色上衣，版型自然宽松。抽褶领口搭配对比滚边 V 领，质感更完整。',
    tryItYourself: '亲自试试',
    tryDescription: '点击任一商品查看生成图片和文案',
    generate: '生成',
    generating: '生成中...',
    generateHintIdle: '选一个商品并点击生成',
    generateHintLoading: 'AI 正在生成图片和文案',
    sourcePhoto: '原图',
    generatedPhoto: '生成图',
    generatedWillAppear: '生成图片与文案将在这里显示。',
    generated: '生成：',
    questions: '有问题？',
    getInTouch: '联系我们',
    errors: {
      generic: '出了点问题，请重试。',
      network: '网络异常，请重试。',
    },
  },
}

const ZH_SERVER_ERROR_MAP: Record<string, string> = {
  'Please enter a valid email address.': '请输入有效的邮箱地址。',
  'Waitlist is not configured on the server.': '服务端暂未配置候补名单，请稍后重试。',
  'This email is already on the waitlist.': '这个邮箱已在候补名单中。',
  'Unable to save your email right now.': '暂时无法保存你的邮箱，请稍后重试。',
}

function localizeServerError(error: string | undefined, locale: Locale, fallback: string) {
  if (!error) return fallback
  if (locale === 'zh-CN') return ZH_SERVER_ERROR_MAP[error] ?? fallback
  return error
}

export default function LandingPageClient({ locale }: { locale: Locale }) {
  const GENERATE_DELAY_MS = 1650

  const copy = COPY[locale]

  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Demo State
  const [activeDemoId, setActiveDemoId] = useState(1)
  const [generatedByDemoId, setGeneratedByDemoId] = useState<Record<number, boolean>>({})
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false)
  const activeItem = DEMO_ITEMS.find((i) => i.id === activeDemoId) || DEMO_ITEMS[0]
  const isActiveDemoGenerated = Boolean(generatedByDemoId[activeDemoId])
  const generateTimeoutRef = useRef<number | null>(null)

  // Mobile Flip State
  const [flipProgress, setFlipProgress] = useState(0)
  const mobileCardRef = useRef<HTMLDivElement>(null)
  const flipProgressRef = useRef(0)
  const flipRafRef = useRef<number | null>(null)
  const flipArmedRef = useRef(false)
  const lastScrollYRef = useRef(0)

  // Keep the front image visible first, then map scroll to a continuous flip.
  useEffect(() => {
    const el = mobileCardRef.current
    if (!el) return

    lastScrollYRef.current = window.scrollY

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

    const updateFlipProgress = () => {
      const rect = el.getBoundingClientRect()
      const viewportHeight = Math.max(window.innerHeight, 1)
      const visiblePixels = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0))
      const visibleRatio = rect.height > 0 ? visiblePixels / rect.height : 0
      const maxVisibleRatio = Math.min(1, viewportHeight / Math.max(rect.height, 1))
      const minVisibleToStart = Math.max(0.8, Math.min(0.94, maxVisibleRatio * 0.92))
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY >= lastScrollYRef.current
      lastScrollYRef.current = currentScrollY

      // Hold the original image while the section settles in view, then complete
      // the full flip before the section exits the viewport.
      const flipStartLine = viewportHeight * 0.48
      const flipEndLine = viewportHeight * 0.14

      if (rect.top > viewportHeight * 0.9) {
        flipArmedRef.current = false
      } else if (visibleRatio >= minVisibleToStart && rect.top <= flipStartLine) {
        flipArmedRef.current = true
      }

      const rawProgress = flipArmedRef.current ? (flipStartLine - rect.top) / (flipStartLine - flipEndLine) : 0
      const positionProgress = clamp(rawProgress, 0, 1)
      const nextProgress = isScrollingDown ? Math.max(flipProgressRef.current, positionProgress) : positionProgress

      if (Math.abs(nextProgress - flipProgressRef.current) < 0.003) return

      flipProgressRef.current = nextProgress
      setFlipProgress(nextProgress)
    }

    const queueFlipUpdate = () => {
      if (flipRafRef.current !== null) return
      flipRafRef.current = window.requestAnimationFrame(() => {
        flipRafRef.current = null
        updateFlipProgress()
      })
    }

    updateFlipProgress()
    window.addEventListener('scroll', queueFlipUpdate, { passive: true })
    window.addEventListener('resize', queueFlipUpdate)

    return () => {
      window.removeEventListener('scroll', queueFlipUpdate)
      window.removeEventListener('resize', queueFlipUpdate)
      if (flipRafRef.current !== null) {
        window.cancelAnimationFrame(flipRafRef.current)
        flipRafRef.current = null
      }
    }
  }, [])

  const flipAngle = flipProgress * 180
  const listingReveal = Math.min(1, Math.max(0, (flipProgress - 0.52) / 0.36))

  useEffect(() => {
    return () => {
      if (generateTimeoutRef.current !== null) {
        window.clearTimeout(generateTimeoutRef.current)
        generateTimeoutRef.current = null
      }
    }
  }, [])

  const handleSelectDemo = (demoId: number) => {
    setActiveDemoId(demoId)

    if (generateTimeoutRef.current !== null) {
      window.clearTimeout(generateTimeoutRef.current)
      generateTimeoutRef.current = null
    }

    setIsGeneratingDemo(false)
  }

  const handleGenerateDemo = () => {
    if (isGeneratingDemo) return

    const demoId = activeDemoId
    setIsGeneratingDemo(true)
    setGeneratedByDemoId((prev) => ({ ...prev, [demoId]: false }))

    if (generateTimeoutRef.current !== null) {
      window.clearTimeout(generateTimeoutRef.current)
    }

    generateTimeoutRef.current = window.setTimeout(() => {
      setGeneratedByDemoId((prev) => ({ ...prev, [demoId]: true }))
      setIsGeneratingDemo(false)
      generateTimeoutRef.current = null
    }, GENERATE_DELAY_MS)
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
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-black selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center">
          <span className="font-semibold text-lg tracking-tight text-black">Afterlight</span>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 md:pt-48 pb-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-24 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 mb-28 lg:mb-0 z-10">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-black mb-8 leading-[1.05]">
              {copy.headline}
            </h1>
            <p className="text-xl text-neutral-500 font-medium tracking-tight mb-10 max-w-md leading-relaxed">{copy.subhead}</p>

            {/* CTA Form */}
            <div className="w-full max-w-sm mb-16">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={copy.emailPlaceholder}
                      required
                      disabled={isSubmitting}
                      className="w-full bg-neutral-50 px-5 py-4 text-base rounded-xl border border-neutral-200 outline-none focus:border-neutral-400 focus:ring-0 transition-all placeholder:text-neutral-400"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-3 w-full px-8 py-4 bg-black text-white rounded-xl font-medium hover:bg-neutral-800 transition-all duration-200 shadow-lg shadow-neutral-200"
                    >
                      {isSubmitting ? copy.saving : copy.getAccess}
                    </button>
                  </div>
                  {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}
                </form>
              ) : (
                <div className="py-4 px-6 bg-green-50 border border-green-100 rounded-xl inline-block">
                  <p className="text-green-800 font-medium text-sm">{copy.success}</p>
                </div>
              )}
            </div>

            {/* Trusted By - Desktop only */}
            <div className="hidden lg:block border-t border-neutral-100 pt-8">
              <p className="text-xs font-semibold text-neutral-400 mb-6 uppercase tracking-widest">{copy.trustedBy}</p>
              <div className="flex gap-8">
                {DEMO_METADATA.brandLogos.map((logo) => (
                  <div key={logo.id} className="h-6 w-20 rounded-sm overflow-hidden bg-neutral-100">
                    <img src={logo.src} alt={`${logo.name} logo`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visuals */}
          <div className="lg:col-span-7 flex flex-col gap-32">
            {/* --- MOBILE VIEW: Scroll-Triggered Flip Card --- */}
            <div className="block lg:hidden min-h-[500px]" ref={mobileCardRef}>
              <div className="relative w-full aspect-[3/4] perspective-1000">
                <div
                  className="relative w-full h-full transform-style-3d will-change-transform"
                  style={{ transform: `rotateY(${flipAngle}deg)` }}
                >
                  {/* FRONT: Before Image */}
                  <div className="absolute inset-0 w-full h-full backface-hidden">
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full z-10 shadow-sm">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{copy.before}</span>
                    </div>
                    <div className="w-full h-full bg-neutral-100 rounded-3xl overflow-hidden shadow-sm border border-neutral-200">
                      <img
                        src={DEMO_METADATA.heroDemo.before}
                        alt="Raw phone photo"
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                  </div>

                  {/* BACK: After Image */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                    <div className="absolute top-4 left-4 bg-blue-50/90 backdrop-blur px-3 py-1 rounded-full z-10 shadow-sm border border-blue-100">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{copy.after}</span>
                    </div>
                    <div className="w-full h-full bg-white rounded-3xl overflow-hidden shadow-2xl shadow-neutral-200/50 border border-neutral-100">
                      <img
                        src={DEMO_METADATA.heroDemo.after}
                        alt="Generated professional photo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Context Text appears smoothly below */}
              <div
                className="mt-8"
                style={{
                  opacity: listingReveal,
                  transform: `translateY(${(1 - listingReveal) * 12}px)`,
                }}
              >
                <p className="text-sm text-neutral-600 leading-relaxed font-medium bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                  <span className="font-semibold text-black block mb-1">{copy.generatedListing}</span>
                  {copy.heroListingMobile}
                </p>
              </div>
            </div>

            {/* --- DESKTOP VIEW: Masonry Layout (Hidden on Mobile) --- */}
            <div className="hidden lg:block relative">
              <div className="grid grid-cols-2 gap-8 items-start">
                {/* Before Image */}
                <div className="mt-24">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{copy.beforePhone}</p>
                  </div>
                  <div className="aspect-[3/4] bg-neutral-100 rounded-2xl overflow-hidden opacity-70 transition-all hover:opacity-100 duration-500">
                    <img src={DEMO_METADATA.heroDemo.before} alt="Raw phone photo" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* After Image */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <p className="text-xs font-bold text-neutral-900 uppercase tracking-widest">{copy.afterProfessional}</p>
                  </div>
                  <div className="aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] border border-neutral-100 relative z-10 transform transition-transform hover:-translate-y-1 duration-500">
                    <img
                      src={DEMO_METADATA.heroDemo.after}
                      alt="Generated professional photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-6 p-6 bg-white rounded-xl border border-neutral-100 shadow-sm">
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      <span className="font-semibold text-black block mb-1">{copy.generatedListing}</span>
                      {copy.heroListingDesktop}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Try it yourself (Instagram UI for BOTH mobile + desktop) */}
            <div className="w-full pb-20">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-black mb-2">{copy.tryItYourself}</h2>
                <p className="text-neutral-500 font-medium">{copy.tryDescription}</p>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-neutral-200/60 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md">
                {/* Stories row (Instagram-style) */}
                <div className="flex gap-5 overflow-x-auto no-scrollbar py-6 px-6 border-b border-neutral-100">
                  {DEMO_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectDemo(item.id)}
                      className="flex-shrink-0 flex flex-col items-center gap-2 group transition-all"
                    >
                      <div
                        className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full p-1 border-2 transition-all ${
                          activeDemoId === item.id ? 'border-black scale-105' : 'border-transparent'
                        }`}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100">
                          <img src={item.before} alt={copy.sourcePhoto} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest ${
                          activeDemoId === item.id ? 'text-black' : 'text-neutral-400'
                        }`}
                      >
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Content (same IG-style structure, just scales up on desktop) */}
                <div className="p-6 lg:p-10 min-h-[480px] lg:min-h-[540px]">
                  <div className="flex justify-center mb-4 lg:mb-5">
                    <button
                      type="button"
                      onClick={handleGenerateDemo}
                      disabled={isGeneratingDemo}
                      className="inline-flex items-center justify-center gap-2 h-12 min-w-[148px] px-7 rounded-full bg-black text-white text-sm font-semibold tracking-tight hover:bg-neutral-800 disabled:opacity-80 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.7)]"
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${isGeneratingDemo ? 'bg-emerald-400 animate-pulse' : 'bg-white'}`}
                        aria-hidden
                      />
                      {isGeneratingDemo ? copy.generating : copy.generate}
                    </button>
                  </div>
                  {isGeneratingDemo ? (
                    <p className="text-[11px] lg:text-xs text-center font-semibold tracking-[0.16em] uppercase text-neutral-400 mb-6 lg:mb-8">
                      {copy.generateHintLoading}
                    </p>
                  ) : (
                    <div className="mb-6 lg:mb-8" />
                  )}

                  <div className="grid grid-cols-2 gap-3 lg:gap-6 mb-6 lg:mb-8">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">{copy.sourcePhoto}</p>
                      <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-50 relative transition-all duration-500">
                        <img
                          src={activeItem.before}
                          alt={copy.sourcePhoto}
                          className="w-full h-full object-cover transition-opacity duration-500 opacity-100"
                        />
                        {isGeneratingDemo ? (
                          <div className="absolute inset-0 bg-white/45 backdrop-blur-[1px] animate-pulse" aria-hidden />
                        ) : null}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">{copy.generatedPhoto}</p>
                      <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-neutral-200/80 bg-white relative transition-all duration-500">
                        {isActiveDemoGenerated ? (
                          <img
                            src={activeItem.after}
                            alt={copy.generatedPhoto}
                            className="w-full h-full object-cover transition-opacity duration-500 opacity-100"
                          />
                        ) : (
                          <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,#fafafa_0%,#f1f1f1_45%,#e8e8e8_100%)]" />
                        )}
                        {isGeneratingDemo ? (
                          <div className="absolute inset-0 bg-white/45 backdrop-blur-[1px] animate-pulse" aria-hidden />
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-50 p-5 lg:p-6 rounded-2xl border border-neutral-100 min-h-[120px] flex items-center transition-all duration-500">
                    {isActiveDemoGenerated ? (
                      <p className="text-sm lg:text-[15px] text-neutral-600 leading-relaxed font-medium">
                        <span className="font-semibold text-black">{copy.generated}</span> {activeItem.listings[locale]}
                      </p>
                    ) : (
                      <p className="text-sm lg:text-[15px] text-neutral-400 leading-relaxed font-medium">
                        {isGeneratingDemo ? copy.generateHintLoading : copy.generatedWillAppear}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trusted By - Mobile only, bottom of page */}
      <div className="block lg:hidden border-t border-neutral-100 py-16">
        <p className="text-xs font-semibold text-neutral-400 mb-6 uppercase tracking-widest text-center">{copy.trustedBy}</p>
        <div className="flex justify-center gap-8">
          {DEMO_METADATA.brandLogos.map((logo) => (
            <div key={logo.id} className="h-6 w-20 rounded-sm overflow-hidden bg-neutral-100">
              <img src={logo.src} alt={`${logo.name} logo`} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-100 py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-semibold text-sm tracking-tight text-neutral-900">Afterlight © 2026</span>
          <p className="text-neutral-400 text-sm font-medium">
            {copy.questions}{' '}
            <a href="mailto:your@email.com" className="text-black hover:underline transition-all">
              {copy.getInTouch}
            </a>
          </p>
        </div>
      </footer>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
