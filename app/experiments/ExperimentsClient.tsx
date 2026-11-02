'use client'

import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  PiTriangleBold,
  PiArrowUpRight,
  PiLightningFill,
  PiCameraSlashBold,
  PiWaveformBold,
  PiSparkleFill,
} from 'react-icons/pi'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const HERO_BG = '/frontdoor/IMG_3674.webp'

const BRAND_LOGOS = ['Dreamland', 'Mokibasa', 'Nix United', 'Behr', 'Blinds Galore', 'ChemImpex', 'Gap Labs', 'JR Atelier']

const REEL = [
  { src: '/john-tennis.jpg', label: 'Performance / Court' },
  { src: '/lorin-basketball.jpg', label: 'Lifestyle / Urban' },
  { src: '/arjun-apple.jpg', label: 'Editorial / Studio' },
  { src: '/brackin-tennis.jpg', label: 'Campaign / Motion' },
  { src: '/pear-basketball.jpg', label: 'Product / Soft Light' },
  { src: '/thiel-tennis.jpg', label: 'Runway / Clean' },
]

const TESTIMONIALS = [
  {
    quote: 'Replaced four shoot days with a single afternoon of prompts. The lookbook shipped before the budget review.',
    name: 'Amelia Ngata',
    role: 'Creative Director, Kilnhouse',
    portrait: '/guy-track.jpg',
  },
  {
    quote: 'Our drop cadence doubled. Nobody on the team can tell which frames were shot and which were generated.',
    name: 'Renata Okafor',
    role: 'Head of Content, Orbital Goods',
    portrait: '/girl-track.jpg',
  },
  {
    quote: 'We used to book talent three months out. Now we pitch six concepts in a morning and ship the winner same week.',
    name: 'Tobias Lind',
    role: 'VP Brand, Northstream',
    portrait: '/lorin-tennis.jpg',
  },
]

export default function ExperimentsClient() {
  const rootRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const pinSectionRef = useRef<HTMLDivElement>(null)
  const reelTrackRef = useRef<HTMLDivElement>(null)
  const scrubRef = useRef<HTMLParagraphElement>(null)
  const bentoRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.hero-line',
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: 'expo.out',
          delay: 0.1,
        }
      )
      gsap.fromTo(
        '.hero-after',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.6 }
      )

      if (pinSectionRef.current && reelTrackRef.current) {
        const track = reelTrackRef.current
        const distance = track.scrollWidth - window.innerWidth + 96
        gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: 'top top',
            end: () => `+=${distance}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }

      if (scrubRef.current) {
        const words = scrubRef.current.querySelectorAll('.word')
        gsap.fromTo(
          words,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: 'none',
            scrollTrigger: {
              trigger: scrubRef.current,
              start: 'top 80%',
              end: 'bottom 55%',
              scrub: true,
            },
          }
        )
      }

      gsap.utils.toArray<HTMLElement>('.scale-fade').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.82, opacity: 0.35, filter: 'blur(8px)' },
          {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 35%',
              scrub: 1,
            },
          }
        )
      })

      if (bentoRef.current) {
        gsap.fromTo(
          bentoRef.current.querySelectorAll('.bento-cell'),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bentoRef.current,
              start: 'top 75%',
            },
          }
        )
      }
    },
    { scope: rootRef }
  )

  const scrubText =
    "Every frame you ship teaches the system your grade, your gesture, your grain. The more you generate, the more distinctly yours it looks."

  return (
    <main
      ref={rootRef}
      className="relative w-full max-w-full overflow-x-hidden bg-[#0b0b0c] text-white antialiased"
      style={{ fontFamily: 'var(--font-geist-sans), ui-sans-serif, system-ui' }}
    >
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96vw,920px)]">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/55 px-5 py-2.5 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
            <PiTriangleBold className="w-4 h-4" />
            Afterlight
          </div>
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-white/65">
            <a href="#engine" className="hover:text-white transition-colors">Engine</a>
            <a href="#reel" className="hover:text-white transition-colors">Reel</a>
            <a href="#voices" className="hover:text-white transition-colors">Voices</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-black hover:bg-white/90 transition-colors"
          >
            Request access
            <PiArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      <section className="relative isolate min-h-screen flex flex-col items-center justify-center px-6 md:px-10 pt-40 pb-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={HERO_BG}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-110 opacity-55 contrast-[1.08] saturate-[0.82]"
            style={{ filter: 'grayscale(0.35)' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,11,12,0.15)_0%,rgba(11,11,12,0.75)_55%,#0b0b0c_95%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.55)_0%,rgba(11,11,12,0)_30%,rgba(11,11,12,0)_60%,#0b0b0c_100%)]" />
          <div
            className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
            }}
          />
        </div>

        <div ref={heroTextRef} className="relative z-10 mx-auto w-full max-w-6xl text-center">
          <h1
            className="font-medium tracking-[-0.035em] leading-[0.95] text-white"
            style={{ fontSize: 'clamp(3rem, 6.8vw, 6.25rem)' }}
          >
            <span className="block overflow-hidden">
              <span className="hero-line inline-flex items-baseline gap-[0.28em]">
                Skip the
                <span
                  className="hero-inline-pill relative inline-block h-[0.72em] w-[1.55em] align-[-0.08em] rounded-full bg-cover bg-center ring-1 ring-white/20"
                  style={{ backgroundImage: `url(/brackin-tennis.jpg)` }}
                />
                photoshoot.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line inline-block text-white/55">Ship the campaign.</span>
            </span>
          </h1>

          <p className="hero-after mx-auto mt-8 max-w-xl text-[17px] md:text-[18px] leading-[1.5] text-white/60 tracking-[-0.01em]">
            Afterlight is a generative studio for product and fashion brands. Direct a shoot in plain language. Ship editorial-grade frames in minutes.
          </p>

          <div className="hero-after mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-semibold text-black hover:bg-white/90 transition-colors"
            >
              Request access
              <PiArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#reel"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.03] px-6 py-3.5 text-[14.5px] font-semibold text-white hover:bg-white/[0.08] hover:border-white/40 transition-colors"
            >
              Watch the reel
            </a>
          </div>
        </div>

        <div className="hero-after absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/40">
          <span className="h-px w-10 bg-white/20" />
          Scroll to enter the engine
        </div>
      </section>

      <section className="relative border-y border-white/5 py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="relative flex gap-14 animate-[marquee_32s_linear_infinite] whitespace-nowrap will-change-transform">
          {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((name, i) => (
            <span
              key={i}
              className="text-[28px] md:text-[34px] font-semibold tracking-[-0.03em] text-white/35 hover:text-white/70 transition-colors"
            >
              {name} <span className="text-white/15 mx-6">//</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
      </section>

      <section id="engine" className="relative px-6 md:px-10 py-32 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2
              className="font-medium tracking-[-0.035em] leading-[0.95] max-w-4xl"
              style={{ fontSize: 'clamp(2.25rem, 4.6vw, 4.25rem)' }}
            >
              One engine. Every surface of the brand.
            </h2>
            <p className="max-w-sm text-[15px] leading-[1.55] text-white/55">
              Swap lens, lighting, location, and styling without swapping a single person on the crew. Afterlight composes frames that match your house grade on the first try.
            </p>
          </div>

          <div
            ref={bentoRef}
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]"
            style={{ gridAutoFlow: 'dense' }}
          >
            <article className="bento-cell group relative md:col-span-2 md:row-span-2 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900">
              <img
                src="/arjun-nike.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-between p-7 md:p-10">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
                  <PiCameraSlashBold className="w-3.5 h-3.5" />
                  Directed generation
                </div>
                <div>
                  <h3 className="text-3xl md:text-[40px] font-medium tracking-[-0.025em] leading-[1.02] mb-3">
                    Prompt the shot.<br />Not the artist.
                  </h3>
                  <p className="max-w-md text-[14px] leading-[1.55] text-white/70">
                    Describe the angle, the moment, the mood. Afterlight resolves a directable frame with your product sitting natively inside it.
                  </p>
                </div>
              </div>
            </article>

            <article className="bento-cell group relative md:col-span-2 overflow-hidden rounded-3xl border border-white/10 bg-[#111112] p-7 md:p-8 flex items-center">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/45 mb-4">
                  <PiLightningFill className="w-3.5 h-3.5" />
                  Throughput
                </div>
                <h3 className="text-2xl md:text-[30px] font-medium tracking-[-0.02em] leading-[1.08]">
                  Forty concepts before the kettle finishes boiling.
                </h3>
              </div>
              <div className="pointer-events-none absolute -right-10 -bottom-10 w-56 h-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_65%)]" />
            </article>

            <article className="bento-cell group relative md:col-span-2 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900">
              <img
                src="/john-basketball.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-7">
                <h3 className="text-xl md:text-[24px] font-medium tracking-[-0.015em] leading-[1.15] max-w-xs">
                  Your exact grade — baked in, not applied after.
                </h3>
              </div>
            </article>

            <article className="bento-cell group relative md:col-span-4 overflow-hidden rounded-3xl border border-white/10 bg-[#111112]">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-7 md:p-10">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <PiWaveformBold className="w-6 h-6 text-white/85" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-[26px] font-medium tracking-[-0.02em] leading-[1.15]">
                      Reference-to-campaign in a single conversation.
                    </h3>
                    <p className="mt-1 text-[13.5px] text-white/55 max-w-xl">
                      Drop a moodboard. Pin a palette. Lock a model reference. Every subsequent shot inherits the brief without restating it.
                    </p>
                  </div>
                </div>
                <a
                  href="#reel"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-white/[0.09] transition-colors"
                >
                  Study the reel
                  <PiArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        id="reel"
        ref={pinSectionRef}
        className="relative h-screen w-full overflow-hidden bg-[#070708]"
      >
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 md:px-14 pt-10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/40 mb-2">
              Campaign reel
            </div>
            <h2
              className="font-medium tracking-[-0.035em] leading-[0.95] max-w-2xl"
              style={{ fontSize: 'clamp(1.85rem, 3.6vw, 3.25rem)' }}
            >
              Six looks. One house grade.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/40">
            <span className="h-px w-8 bg-white/20" />
            Scroll horizontally
          </div>
        </div>

        <div ref={reelTrackRef} className="absolute top-0 left-0 h-full flex items-center gap-6 pl-8 md:pl-14 pr-24 will-change-transform">
          {REEL.map((item, i) => (
            <figure
              key={item.src}
              className="group relative h-[72vh] w-[56vw] md:w-[38vw] lg:w-[32vw] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900"
            >
              <img
                src={item.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-1">
                    Frame {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="text-[17px] md:text-[19px] font-medium tracking-[-0.015em]">
                    {item.label}
                  </div>
                </div>
                <PiArrowUpRight className="w-5 h-5 text-white/70 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="relative px-6 md:px-10 py-32 md:py-48">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/35 mb-10 justify-center">
            <PiSparkleFill className="w-3.5 h-3.5" />
            Philosophy
          </div>
          <p
            ref={scrubRef}
            className="text-center font-medium tracking-[-0.03em] leading-[1.12] text-white"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
          >
            {scrubText.split(' ').map((w, i) => (
              <span key={i} className="word inline-block mr-[0.22em]">
                {w}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section id="voices" className="relative px-6 md:px-10 py-32 md:py-48 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2
              className="font-medium tracking-[-0.035em] leading-[0.95] max-w-3xl"
              style={{ fontSize: 'clamp(2.25rem, 4.6vw, 4.25rem)' }}
            >
              The teams shipping at twice the cadence.
            </h2>
            <p className="max-w-xs text-[15px] leading-[1.55] text-white/55">
              Brand, commerce, and content leads who swapped the crew for the console.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {TESTIMONIALS.map((t, i) => (
              <article
                key={i}
                className="scale-fade group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111112] p-7 md:p-8 flex flex-col justify-between min-h-[340px]"
              >
                <p className="text-[17px] md:text-[18px] leading-[1.45] tracking-[-0.015em] text-white/85">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div
                    className="h-11 w-11 rounded-full bg-cover bg-center ring-1 ring-white/10 grayscale-[0.2]"
                    style={{ backgroundImage: `url(${t.portrait})` }}
                  />
                  <div className="leading-tight">
                    <div className="text-[14px] font-semibold tracking-[-0.01em]">{t.name}</div>
                    <div className="text-[12.5px] text-white/50">{t.role}</div>
                  </div>
                </div>
                <div className="pointer-events-none absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="relative px-6 md:px-10 py-32 md:py-48">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-white/10">
          <img
            src="/frontdoor/IMG_3658.webp"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-45 saturate-[0.85] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,255,255,0.18)_0%,transparent_55%),linear-gradient(180deg,rgba(11,11,12,0.72)_0%,rgba(11,11,12,0.92)_100%)]" />
          <div className="relative z-10 px-8 md:px-16 py-20 md:py-32 text-center">
            <h2
              className="mx-auto max-w-5xl font-medium tracking-[-0.035em] leading-[0.96]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
            >
              Step onto the set <span className="text-white/55">without leaving your desk.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-[16.5px] leading-[1.55] text-white/65">
              We are onboarding a small group of brand and commerce teams each week. Request access and we will tune the engine to your house grade before your first session.
            </p>
            <form className="mx-auto mt-10 flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-black/55 p-1.5 backdrop-blur-xl">
              <input
                type="email"
                placeholder="work@yourbrand.com"
                className="flex-1 bg-transparent px-5 py-3 text-[15px] text-white placeholder:text-white/40 outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-white px-5 py-3 text-[13.5px] font-semibold text-black hover:bg-white/90 transition-colors"
              >
                Request access
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="relative px-6 md:px-10 pt-24 pb-12 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
            <div className="flex items-center gap-2 text-[17px] font-semibold tracking-tight">
              <PiTriangleBold className="w-5 h-5" />
              Afterlight
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-4 text-[13.5px] text-white/55">
              <a href="#" className="hover:text-white transition-colors">Engine</a>
              <a href="#" className="hover:text-white transition-colors">Reel</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
              <a href="#" className="hover:text-white transition-colors">Docs</a>
              <a href="#" className="hover:text-white transition-colors">Changelog</a>
              <a href="#" className="hover:text-white transition-colors">Press</a>
              <a href="#" className="hover:text-white transition-colors">Careers</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          <div
            className="w-full text-center text-white/85 font-semibold tracking-[-0.05em] leading-none"
            style={{ fontSize: 'clamp(4rem, 18vw, 220px)' }}
          >
            Afterlight
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-[12.5px] text-white/40">
            <div>&copy; 2026 Afterlight Studio. All frames reserved.</div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white/75 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/75 transition-colors">Terms</a>
              <a href="#" className="hover:text-white/75 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
