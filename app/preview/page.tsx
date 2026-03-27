'use client'

import { useState, useEffect, useRef } from 'react'

// Demo Mock Data
const DEMO_ITEMS = [
  {
    id: 1,
    name: "Silk Blouse",
    before: "/api/placeholder/400/533",
    after: "/api/placeholder/400/533",
    listing: "A lightweight, softly crinkled red blouse with an easy, relaxed silhouette. Designed with a gathered neckline and a V-neck finished in contrast trim..."
  },
  {
    id: 2,
    name: "Linen Trousers",
    before: "/api/placeholder/400/533",
    after: "/api/placeholder/400/533",
    listing: "Breathable linen trousers in natural oatmeal. High-waisted cut with a tapered leg and organic button details for a refined summer staple..."
  },
  {
    id: 3,
    name: "Ceramic Vase",
    before: "/api/placeholder/400/533",
    after: "/api/placeholder/400/533",
    listing: "Hand-thrown ceramic vase with a matte speckled glaze. Minimalist organic shape perfect for dried floral arrangements and modern tabletops..."
  }
]

const DEMO_METADATA = {
  heroDemo: {
    before: '/ass_blue1.png',
    after: '/ass_blue2.png',
  },
  brandLogos: [
    { id: 1, name: 'Brand One', src: '/brand_logo_1.png' },
    { id: 2, name: 'Brand Two', src: '/brand_logo_2.png' },
    { id: 3, name: 'Brand Three', src: '/brand_logo_3.png' },
  ],
}

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [activeDemoId, setActiveDemoId] = useState(1)
  const activeItem = DEMO_ITEMS.find(i => i.id === activeDemoId) || DEMO_ITEMS[0]

  // Mobile Flip State for HERO
  const [isFlipped, setIsFlipped] = useState(false)
  const mobileCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsFlipped(true), 800)
        }
      },
      { threshold: 0.5 }
    )
    if (mobileCardRef.current) observer.observe(mobileCardRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setSubmitted(true)
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
          
          {/* LEFT COLUMN: Sticky Content */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 mb-20 lg:mb-0 z-10">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-black mb-8 leading-[1.05]">
              Stop hiring photographers.
            </h1>
            <p className="text-xl text-neutral-500 font-medium tracking-tight mb-10 max-w-md leading-relaxed">
              Generate product photos and listings in your brand's style.
            </p>

            <div className="w-full max-w-sm mb-16">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-neutral-50 px-5 py-4 text-base rounded-xl border border-neutral-200 outline-none focus:border-neutral-400 focus:ring-0 transition-all placeholder:text-neutral-400"
                    />
                    <button
                      type="submit"
                      className="mt-3 w-full px-8 py-4 bg-black text-white rounded-xl font-medium hover:bg-neutral-800 transition-all duration-200 shadow-lg shadow-neutral-200"
                    >
                      Get Access
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-4 px-6 bg-green-50 border border-green-100 rounded-xl inline-block">
                  <p className="text-green-800 font-medium text-sm">Thanks! We'll be in touch soon.</p>
                </div>
              )}
            </div>
            
            <div className="border-t border-neutral-100 pt-8">
              <p className="text-xs font-semibold text-neutral-400 mb-6 uppercase tracking-widest">
                Trusted by
              </p>
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
                <div className={`relative w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                  <div className="absolute inset-0 w-full h-full backface-hidden">
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full z-10 shadow-sm">
                       <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Before: Phone</span>
                    </div>
                    <div className="w-full h-full bg-neutral-100 rounded-3xl overflow-hidden shadow-sm border border-neutral-200">
                      <img
                        src={DEMO_METADATA.heroDemo.before}
                        alt="Raw"
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                    <div className="absolute top-4 left-4 bg-blue-50/90 backdrop-blur px-3 py-1 rounded-full z-10 shadow-sm border border-blue-100">
                       <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">After: Professional</span>
                    </div>
                    <div className="w-full h-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-100">
                      <img src={DEMO_METADATA.heroDemo.after} alt="Generated" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`mt-8 transition-opacity duration-1000 delay-500 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                 <p className="text-sm text-neutral-600 leading-relaxed font-medium bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                    <span className="font-semibold text-black block mb-1">Generated listing</span> 
                    A lightweight, softly crinkled red blouse with an easy, relaxed silhouette...
                  </p>
              </div>
            </div>

            {/* --- DESKTOP VIEW: Masonry Layout --- */}
            <div className="hidden lg:block relative">
              <div className="grid grid-cols-2 gap-8 items-start">
                <div className="mt-24">
                   <div className="aspect-[3/4] bg-neutral-100 rounded-2xl overflow-hidden opacity-70">
                      <img src={DEMO_METADATA.heroDemo.before} className="w-full h-full object-cover" />
                   </div>
                </div>
                <div>
                   <div className="aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 relative z-10">
                      <img src={DEMO_METADATA.heroDemo.after} className="w-full h-full object-cover" />
                   </div>
                   <div className="mt-6 p-6 bg-white rounded-xl border border-neutral-100 shadow-sm">
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        <span className="font-semibold text-black block mb-1">Generated listing</span> 
                        A lightweight, softly crinkled red blouse with an easy, relaxed silhouette.
                      </p>
                   </div>
                </div>
              </div>
            </div>

            {/* --- NEW INTERACTIVE DEMO SECTION --- */}
            <div className="w-full pb-20">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-black mb-2">Try it yourself</h2>
                <p className="text-neutral-500 font-medium">Click any product to see the generated photo and listing</p>
              </div>
              
              <div className="bg-white rounded-[2.5rem] border border-neutral-200/60 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md">
                
                {/* MOBILE DEMO: Instagram Style */}
                <div className="block lg:hidden">
                  <div className="flex gap-5 overflow-x-auto no-scrollbar py-6 px-6 border-b border-neutral-100">
                    {DEMO_ITEMS.map((item) => (
                      <button key={item.id} onClick={() => setActiveDemoId(item.id)} className="flex-shrink-0 flex flex-col items-center gap-2 group transition-all">
                        <div className={`w-16 h-16 rounded-full p-1 border-2 transition-all ${activeDemoId === item.id ? 'border-black scale-105' : 'border-transparent'}`}>
                          <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100">
                            <img src={item.before} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${activeDemoId === item.id ? 'text-black' : 'text-neutral-400'}`}>{item.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="p-6 min-h-[480px] animate-in fade-in duration-500">
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100"><img src={activeItem.before} className="w-full h-full object-cover" /></div>
                      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-lg border border-neutral-100 animate-in slide-in-from-right-4 duration-500"><img src={activeItem.after} className="w-full h-full object-cover" /></div>
                    </div>
                    <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-100"><p className="text-sm text-neutral-600 leading-relaxed font-medium"><span className="font-semibold text-black">Generated:</span> {activeItem.listing}</p></div>
                  </div>
                </div>

                {/* PC DEMO: Side Selection Method */}
                <div className="hidden lg:grid lg:grid-cols-12 min-h-[500px]">
                  <div className="col-span-4 bg-neutral-50/50 p-8 border-r border-neutral-100 flex flex-col gap-4">
                    {DEMO_ITEMS.map((item) => (
                      <button key={item.id} onClick={() => setActiveDemoId(item.id)} className={`flex items-center gap-4 p-3 rounded-2xl transition-all ${activeDemoId === item.id ? 'bg-white shadow-sm border border-neutral-200 ring-1 ring-black/5' : 'hover:bg-neutral-100 border border-transparent opacity-60'}`}>
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-neutral-200 shrink-0"><img src={item.before} className="w-full h-full object-cover" /></div>
                        <span className="font-semibold text-sm tracking-tight">{item.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="col-span-8 p-10 flex flex-col animate-in fade-in duration-700">
                    <div className="flex gap-8 mb-8 h-full items-center">
                       <div className="w-1/3 aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 shrink-0"><img src={activeItem.before} className="w-full h-full object-cover" /></div>
                       <div className="flex-1 flex flex-col gap-6">
                          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-neutral-100 transition-all duration-700 transform"><img src={activeItem.after} className="w-full h-full object-cover" /></div>
                          <div className="bg-neutral-50/50 p-6 rounded-2xl border border-neutral-100"><p className="text-sm text-neutral-600 leading-relaxed font-medium leading-relaxed"><span className="font-semibold text-black block mb-1 underline decoration-neutral-200 underline-offset-4">Professional Listing</span> {activeItem.listing}</p></div>
                       </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-100 py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
           <span className="font-semibold text-sm tracking-tight text-neutral-900">Afterlight © 2026</span>
           <p className="text-neutral-400 text-sm font-medium">Questions? <a href="mailto:your@email.com" className="text-black hover:underline transition-all">Get in touch</a></p>
        </div>
      </footer>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
