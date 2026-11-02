'use client'

import { useEffect, useState } from 'react'
import { type CatalogProduct } from '@/lib/catalog'
import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  Mail,
  Sparkles,
  UploadCloud,
  X,
} from 'lucide-react'

type ProductPageViewProps = {
  product: CatalogProduct
}

type TryOnState = 'idle' | 'details' | 'uploading' | 'processing' | 'done'

type TryOnExperienceResponse = {
  image: {
    dataUrl: string
    mimeType: string
    model: string
  }
}

type FollowUpExperienceResponse = {
  babyProfile: {
    ageLabel: string
    ageMonths: number
    ageSource: 'provided' | 'visible_text' | 'estimated_from_photo' | 'unknown'
    name: string | null
  }
  emailPlan: {
    body: string
    preview: string
    sendInMonths: number
    sendOn: string
    subject: string
    timingReason: string
  }
  recommendedProduct: {
    futureAgeLabel: string
    futureAgeMonths: number
    product: CatalogProduct
    reason: string
    tryOnImage: {
      dataUrl: string
      mimeType: string
      model: string
    }
  }
}

function formatSendDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`)

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(date)
}

function getAgeSourceLabel(source: FollowUpExperienceResponse['babyProfile']['ageSource']) {
  switch (source) {
    case 'provided':
      return 'Provided'
    case 'visible_text':
      return 'Read from photo'
    case 'estimated_from_photo':
      return 'Estimated from photo'
    default:
      return 'AI inferred'
  }
}

export function ProductPageView({ product }: ProductPageViewProps) {
  const [tryOnState, setTryOnState] = useState<TryOnState>('idle')
  const [babyName, setBabyName] = useState('')
  const [babyAge, setBabyAge] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [followUpErrorMessage, setFollowUpErrorMessage] = useState<string | null>(null)
  const [currentTryOnResult, setCurrentTryOnResult] = useState<TryOnExperienceResponse | null>(null)
  const [followUpResult, setFollowUpResult] = useState<FollowUpExperienceResponse | null>(null)
  const [isFollowUpLoading, setIsFollowUpLoading] = useState(false)
  const [isMailDialogOpen, setIsMailDialogOpen] = useState(false)
  const [fileInputKey, setFileInputKey] = useState(0)

  useEffect(() => {
    if (!isMailDialogOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMailDialogOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isMailDialogOpen])

  useEffect(() => {
    if (currentTryOnResult && followUpResult) {
      setIsMailDialogOpen(true)
    }
  }, [currentTryOnResult, followUpResult])

  const openFilePicker = () => {
    const input = document.getElementById('baby-photo-input') as HTMLInputElement | null
    input?.click()
  }

  const handleTryOnUpload = async (file: File) => {
    const hadExistingResult = Boolean(currentTryOnResult)

    setErrorMessage(null)
    setFollowUpErrorMessage(null)
    setIsMailDialogOpen(false)
    setTryOnState('processing')
    setIsFollowUpLoading(true)
    setFollowUpResult(null)

    const buildFormData = () => {
      const formData = new FormData()
      formData.set('productSlug', product.slug)
      formData.set('babyPhoto', file)

      if (babyName.trim()) {
        formData.set('babyName', babyName.trim())
      }

      if (babyAge.trim()) {
        formData.set('babyAge', babyAge.trim())
      }

      return formData
    }

    const parseJsonOrThrow = async <T,>(
      response: Response,
      fallbackMessage: string,
    ): Promise<T> => {
      if (!response.ok) {
        const contentType = response.headers.get('content-type') ?? ''

        if (contentType.includes('application/json')) {
          const data = (await response.json()) as { error?: string }
          throw new Error(data.error || fallbackMessage)
        }

        throw new Error(fallbackMessage)
      }

      return (await response.json()) as T
    }

    const currentTryOnPromise = fetch('/api/try-on', {
      method: 'POST',
      body: buildFormData(),
    }).then((response) =>
      parseJsonOrThrow<TryOnExperienceResponse>(response, 'The try-on preview could not be generated.'),
    )

    const followUpPromise = fetch('/api/try-on/follow-up', {
      method: 'POST',
      body: buildFormData(),
    }).then((response) =>
      parseJsonOrThrow<FollowUpExperienceResponse>(
        response,
        'The follow-up email preview could not be generated.',
      ),
    )

    followUpPromise
      .then((data) => {
        setFollowUpResult(data)
        setIsFollowUpLoading(false)
      })
      .catch((error: unknown) => {
        setFollowUpErrorMessage(
          error instanceof Error
            ? error.message
            : 'The follow-up email preview could not be generated.',
        )
        setIsFollowUpLoading(false)
      })

    try {
      const data = await currentTryOnPromise

      setCurrentTryOnResult(data)
      setTryOnState('done')
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'The try-on preview could not be generated.',
      )
      setTryOnState(hadExistingResult ? 'done' : 'uploading')
    } finally {
      setFileInputKey((current) => current + 1)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      await handleTryOnUpload(file)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()

    const file = e.dataTransfer.files?.[0]

    if (file) {
      await handleTryOnUpload(file)
    }
  }

  const heroImageSrc = currentTryOnResult?.image.dataUrl ?? product.image.src
  const heroImageAlt = currentTryOnResult
    ? `AI try-on preview of a baby styled in ${product.title}`
    : product.image.alt

  return (
    <>
      <section className="mx-auto grid max-w-[1800px] grid-cols-1 gap-10 px-6 pb-12 pt-6 md:px-10 xl:grid-cols-[minmax(0,1fr)_520px] xl:gap-12 xl:px-14 xl:pb-0">
        <div className="order-1">
          <div className="relative flex min-h-[760px] w-full items-center justify-center overflow-hidden bg-[#f7f6f3] md:min-h-[860px] xl:min-h-[980px]">
            <img
              src={heroImageSrc}
              alt={heroImageAlt}
              className={`relative z-10 w-auto object-contain transition-all duration-700 ease-out ${
                currentTryOnResult
                  ? 'max-h-[820px] max-w-[88%] rounded-[28px] shadow-[0_25px_90px_rgba(42,39,37,0.16)] xl:max-h-[940px]'
                  : 'max-h-[760px] max-w-[76%] xl:max-h-[920px]'
              }`}
            />

            {currentTryOnResult ? (
              <div className="pointer-events-none absolute left-6 top-6 z-20 rounded-full bg-white/90 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.22em] text-[#6a6e18] shadow-sm">
                AI Try-On Preview
              </div>
            ) : null}

            {tryOnState === 'processing' ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#f7f6f3]/72 backdrop-blur-sm">
                <div className="flex max-w-[360px] flex-col items-center gap-4 rounded-[22px] border border-[#d7e71c]/30 bg-white/80 px-8 py-8 text-center shadow-[0_18px_55px_rgba(42,39,37,0.08)]">
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 animate-ping rounded-full bg-[#d7e71c]/35" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#fbfdf0] text-[#a3b115] shadow-[0_0_30px_rgba(215,231,28,0.38)]">
                      <Sparkles className="h-7 w-7 animate-pulse" />
                    </div>
                  </div>
                  <div className="text-[19px] font-medium tracking-[-0.02em] text-[#2f2b27]">
                    Building the try-on and follow-up plan...
                  </div>
                  <div className="text-[15px] text-[#6d6964]">
                    We&apos;re reading the photo, matching the next product, drafting the email,
                    and generating the second preview.
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="order-2 pt-2 xl:pt-16">
          <div className="flex flex-wrap items-center gap-3 text-[14px] uppercase tracking-[0.16em] text-[#7a756f]">
            <span>{product.category}</span>
            <span className="h-1 w-1 rounded-full bg-current" />
            <span>{product.releaseYear ?? 'Archive release'}</span>
          </div>

          <h1 className="mt-8 max-w-[420px] font-editorial text-[60px] leading-[0.9] tracking-[-0.05em] text-[#2a2622] md:text-[74px]">
            {product.title}
          </h1>

          <p className="mt-8 text-[20px] leading-[1.35] tracking-[-0.02em] text-[#5f5a55]">
            {product.description}
          </p>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border border-black/8 bg-white/45 px-5 py-5">
              <div className="text-[14px] uppercase tracking-[0.16em] text-[#8a857f]">Category</div>
              <div className="mt-2 text-[22px] tracking-[-0.03em] text-[#2f2b27]">{product.category}</div>
            </div>
            <div className="border border-black/8 bg-white/45 px-5 py-5">
              <div className="text-[14px] uppercase tracking-[0.16em] text-[#8a857f]">Collection</div>
              <div className="mt-2 text-[22px] tracking-[-0.03em] text-[#2f2b27]">
                {product.releaseYear ?? 'Archive'}
              </div>
            </div>
            <div className="border border-black/8 bg-white/45 px-5 py-5">
              <div className="text-[14px] uppercase tracking-[0.16em] text-[#8a857f]">Asset</div>
              <div className="mt-2 break-all text-[15px] leading-[1.4] text-[#5b5752]">
                {product.fileName}
              </div>
            </div>
          </div>

          <div className="mt-10">
            {tryOnState === 'idle' && (
              <button
                onClick={() => setTryOnState('details')}
                className="group relative flex w-full items-center justify-between overflow-hidden rounded-[16px] border border-[#d7e71c]/30 bg-[#fbfdf0] px-7 py-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f6facc] hover:shadow-[0_8px_30px_rgba(215,231,28,0.15)]"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d7e71c]/20 text-[#828c0b] transition-colors group-hover:bg-[#d7e71c] group-hover:text-[#2a2622]">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-[19px] font-medium tracking-[-0.02em] text-[#2c2825]">
                      Try on with your baby
                    </div>
                    <div className="mt-0.5 text-[15px] text-[#6b6762]">
                      Generate the preview and a future follow-up email
                    </div>
                  </div>
                </div>
                <div className="text-[20px] text-[#a3b115] transition-transform group-hover:translate-x-1">
                  <ChevronRight className="h-6 w-6" />
                </div>
              </button>
            )}

            {tryOnState === 'details' && (
              <div className="animate-in slide-in-from-bottom-2 fade-in rounded-[16px] border border-[#d1cec7]/60 bg-[#fdfdff] p-7 shadow-sm transition-all duration-300">
                <h3 className="text-[20px] font-medium text-[#302c28]">Who are we styling?</h3>
                <p className="mt-1.5 text-[15px] text-[#7a756f]">
                  Add optional details or leave them blank and let AI estimate the age from the
                  uploaded photo. If the name isn&apos;t visible or provided, it won&apos;t invent one.
                </p>

                <div className="mt-8 space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Baby's Name"
                      value={babyName}
                      onChange={(e) => setBabyName(e.target.value)}
                      className="w-full appearance-none rounded-none border-0 border-b border-[#d1cec7] bg-transparent px-0 py-2.5 text-[18px] text-[#2c2825] placeholder:font-light placeholder:text-[#a09c96] transition-all duration-300 focus:border-[#a3b115] focus:shadow-[0_1px_0_0_#a3b115] focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Age"
                      value={babyAge}
                      onChange={(e) => setBabyAge(e.target.value)}
                      className="w-full appearance-none rounded-none border-0 border-b border-[#d1cec7] bg-transparent px-0 py-2.5 text-[18px] text-[#2c2825] placeholder:font-light placeholder:text-[#a09c96] transition-all duration-300 focus:border-[#a3b115] focus:shadow-[0_1px_0_0_#a3b115] focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between pt-2">
                  <button
                    onClick={() => setTryOnState('uploading')}
                    className="text-[16px] font-medium text-[#8a857f] transition-colors hover:text-[#2c2825]"
                  >
                    Skip
                  </button>
                  <button
                    onClick={() => setTryOnState('uploading')}
                    className="rounded-full bg-[#2a2725] px-7 py-3 text-[15px] font-medium tracking-wide text-white transition-opacity hover:opacity-90"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {tryOnState === 'uploading' && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={openFilePicker}
                className="animate-in zoom-in-95 fade-in group cursor-pointer rounded-[16px] border-2 border-dashed border-[#d1cec7] bg-[#fdfdff] px-6 py-12 text-center transition-all duration-300 hover:border-[#a3b115] hover:bg-[#fbfdf0]"
              >
                <input
                  id="baby-photo-input"
                  key={fileInputKey}
                  type="file"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f0efe9] text-[#8a857f] transition-colors group-hover:bg-[#d7e71c]/20 group-hover:text-[#a3b115]">
                  <UploadCloud className="h-7 w-7" />
                </div>
                <div className="mt-5 text-[19px] font-medium text-[#302c28]">Drop a photo here</div>
                <div className="mt-1.5 text-[16px] text-[#7a756f]">
                  or click to browse your files
                </div>
                <div className="mt-3 text-[13px] uppercase tracking-[0.16em] text-[#9a958f]">
                  JPG, PNG, or WEBP up to 10MB
                </div>
              </div>
            )}

            {tryOnState === 'processing' && (
              <div className="animate-in zoom-in-95 fade-in flex flex-col items-center justify-center rounded-[16px] border border-[#d1cec7]/40 bg-[#fdfdff] px-6 py-14 text-center shadow-[inset_0_2px_15px_rgba(0,0,0,0.02)]">
                <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
                  <div className="absolute inset-0 animate-ping rounded-full bg-[#d7e71c]/30 opacity-75 duration-1000" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#fbfdf0] shadow-[0_0_25px_rgba(215,231,28,0.4)]">
                    <Sparkles className="h-7 w-7 animate-pulse text-[#a3b115]" />
                  </div>
                </div>

                <div className="text-[19px] font-medium tracking-[-0.01em] text-[#302c28]">
                  Reading the photo and planning the next message...
                </div>
                <div className="mt-2 max-w-[320px] text-[15px] text-[#7a756f]">
                  This generates the current try-on, the next-product recommendation, the send
                  timing, and the follow-up preview image.
                </div>
              </div>
            )}

            {tryOnState === 'done' && currentTryOnResult && (
              <div className="animate-in slide-in-from-bottom-2 fade-in rounded-[16px] border border-[#d7e71c]/50 bg-[#fbfdf0] px-6 py-8 shadow-sm">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 h-11 w-11 shrink-0 text-[#a3b115]" />
                  <div className="min-w-0">
                    <div className="text-[20px] font-medium text-[#2c2825]">
                      Try-on preview ready
                    </div>
                    <div className="mt-1.5 text-[15px] text-[#6b6762]">
                      The current product preview is live in the hero now.
                      {isFollowUpLoading
                        ? ' The email plan and promotional image are still generating.'
                        : followUpResult
                          ? ` The follow-up email is ready for ${followUpResult.recommendedProduct.product.title.toLowerCase()}.`
                          : ''}
                    </div>
                  </div>
                </div>

                {followUpResult ? (
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-[14px] border border-[#d7e71c]/40 bg-white/70 px-4 py-4">
                      <div className="text-[12px] uppercase tracking-[0.18em] text-[#8a857f]">
                        Baby Profile
                      </div>
                      <div className="mt-2 text-[17px] text-[#2f2b27]">
                        {followUpResult.babyProfile.name || 'Name not detected'}
                      </div>
                      <div className="mt-1 text-[14px] text-[#66615b]">
                        {followUpResult.babyProfile.ageLabel} •{' '}
                        {getAgeSourceLabel(followUpResult.babyProfile.ageSource)}
                      </div>
                    </div>
                    <div className="rounded-[14px] border border-[#d7e71c]/40 bg-white/70 px-4 py-4">
                      <div className="text-[12px] uppercase tracking-[0.18em] text-[#8a857f]">
                        Planned Send
                      </div>
                      <div className="mt-2 text-[17px] text-[#2f2b27]">
                        {formatSendDate(followUpResult.emailPlan.sendOn)}
                      </div>
                      <div className="mt-1 text-[14px] text-[#66615b]">
                        {followUpResult.emailPlan.timingReason}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {followUpResult ? (
                    <button
                      onClick={() => setIsMailDialogOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#2a2725] px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
                    >
                      <Mail className="h-4 w-4" />
                      Review email popup
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#d7e71c] bg-white/70 px-5 py-2.5 text-[15px] font-medium text-[#6d740d]">
                      <Sparkles className="h-4 w-4 animate-pulse" />
                      {isFollowUpLoading ? 'Preparing email popup...' : 'Email popup unavailable'}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setErrorMessage(null)
                      setFollowUpErrorMessage(null)
                      setTryOnState('uploading')
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#d7e71c] px-5 py-2.5 text-[15px] font-medium text-[#828c0b] transition-colors hover:bg-[#d7e71c] hover:text-[#2a2622]"
                  >
                    <UploadCloud className="h-4 w-4" />
                    Try another photo
                  </button>
                </div>
              </div>
            )}

            {errorMessage ? (
              <div className="mt-4 rounded-[16px] border border-[#e0b6a6] bg-[#fff6f1] px-5 py-4 text-[15px] text-[#8f4c36]">
                {errorMessage}
              </div>
            ) : null}

            {followUpErrorMessage ? (
              <div className="mt-4 rounded-[16px] border border-[#ead7ba] bg-[#fffaf1] px-5 py-4 text-[15px] text-[#886337]">
                {followUpErrorMessage}
              </div>
            ) : null}
          </div>

          <button className="mt-5 flex h-[82px] w-full items-center justify-center bg-[#2a2725] text-[24px] font-medium tracking-[-0.02em] text-white transition-opacity hover:opacity-90">
            Add to bag
          </button>
        </aside>
      </section>

      <section className="mx-auto flex max-w-[1800px] items-end justify-between px-6 pb-14 pt-8 text-[#2e2a27] md:px-10 xl:px-14">
        <h3 className="font-editorial text-[42px] tracking-[-0.04em]">YOU&apos;LL LOVE IT</h3>
        <button className="text-[44px] font-light leading-none">+</button>
      </section>

      {isMailDialogOpen && followUpResult ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#211d19]/38 px-4 py-8 backdrop-blur-[2px]"
          onClick={() => setIsMailDialogOpen(false)}
        >
          <div
            className="relative flex h-[min(88vh,820px)] w-full max-w-[980px] flex-col overflow-hidden rounded-[18px] border border-[#d7dce1] bg-white shadow-[0_28px_90px_rgba(32,33,36,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-12 items-center justify-between bg-[#f2f6fc] px-4 text-[#3c4043]">
              <div className="text-[14px] font-medium">New Message</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-[#5f6368] transition-colors hover:bg-[#e8eaed]"
                  aria-label="Minimize draft"
                >
                  <span className="mt-2 block h-px w-3 bg-current" />
                </button>
                <button
                  onClick={() => setIsMailDialogOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-[#5f6368] transition-colors hover:bg-[#e8eaed]"
                  aria-label="Close mail preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <div className="border-b border-[#e0e0e0] px-5 py-3">
                <div className="flex items-center gap-4 text-[14px] text-[#5f6368]">
                  <span className="w-12 shrink-0">From</span>
                  <span className="text-[#202124]">Dreamland Baby &lt;hello@dreamlandbabyco.com&gt;</span>
                </div>
              </div>

              <div className="border-b border-[#e0e0e0] px-5 py-3">
                <div className="flex items-center gap-4 text-[14px] text-[#5f6368]">
                  <span className="w-12 shrink-0">To</span>
                  <span className="text-[#202124]">Customer</span>
                </div>
              </div>

              <div className="border-b border-[#e0e0e0] px-5 py-3">
                <div className="flex items-center gap-4 text-[14px] text-[#5f6368]">
                  <span className="w-12 shrink-0">Subject</span>
                  <span className="text-[#202124]">{followUpResult.emailPlan.subject}</span>
                </div>
              </div>

              <div className="border-b border-[#e0e0e0] bg-[#fafbfd] px-5 py-2.5 text-[12px] text-[#5f6368]">
                Scheduled to send on {formatSendDate(followUpResult.emailPlan.sendOn)}.
                {' '}
                {followUpResult.emailPlan.timingReason}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
                <div className="max-w-[720px] text-[15px] leading-[1.65] text-[#202124]">
                  {followUpResult.emailPlan.body.split('\n\n').map((paragraph, index) => (
                    <p key={`${paragraph}-${index}`} className={index === 0 ? '' : 'mt-4'}>
                      {paragraph}
                    </p>
                  ))}

                  <div className="mt-6 overflow-hidden rounded-[16px] border border-[#dadce0] bg-white">
                    <img
                      src={followUpResult.recommendedProduct.tryOnImage.dataUrl}
                      alt={`AI follow-up try-on preview for ${followUpResult.recommendedProduct.product.title}`}
                      className="w-full object-cover"
                    />
                  </div>

                  <div className="mt-5 rounded-[16px] border border-[#dadce0] bg-[#f8f9fa] p-4">
                    <div className="text-[14px] font-medium text-[#202124]">
                      {followUpResult.recommendedProduct.product.title}
                    </div>
                    <div className="mt-1 text-[13px] text-[#5f6368]">
                      {followUpResult.recommendedProduct.product.description}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {followUpResult.recommendedProduct.product.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full bg-white px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#5f6368] shadow-[inset_0_0_0_1px_rgba(95,99,104,0.18)]"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <a
                        href={`/product?slug=${followUpResult.recommendedProduct.product.slug}`}
                        className="inline-flex items-center rounded-full bg-[#1a73e8] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#1765cc]"
                      >
                        View product
                      </a>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[12px] border border-[#dadce0] bg-[#f8f9fa] px-4 py-3 text-[13px] text-[#5f6368]">
                    <div className="flex items-center gap-2 font-medium text-[#3c4043]">
                      <Clock3 className="h-4 w-4" />
                      Follow-up plan
                    </div>
                    <div className="mt-2">
                      Recommended for {followUpResult.recommendedProduct.futureAgeLabel}.
                    </div>
                    <div className="mt-1">{followUpResult.recommendedProduct.reason}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#e0e0e0] px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="rounded-full bg-[#1a73e8] px-5 py-2 text-[14px] font-medium text-white"
                  >
                    Send
                  </button>
                  <span className="text-[12px] text-[#5f6368]">
                    Draft preview only
                  </span>
                </div>
                <div className="text-[12px] text-[#5f6368]">
                  Gmail-style preview
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
