"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- SLIDE DATA ---
const slides = [
  {
    id: "hook",
    title: "A Personalized Internet.",
    content: (
      <>
        <p className="text-neutral-400">Making information yours.</p>
      </>
    ),
    // The Cinematic Cold Open
    images: ["/steven-basketball.jpg"],
  },
  {
    id: "fossils",
    title: "The Internet Is For Passive Consumption",
    content: (
      <>
        <p className="mb-6">Most of what you see online was made for nobody in particular.</p>
        <p className="text-neutral-400">
          Articles, blogs, documentation written by someone else for someone else. You are a spectator of information, not a participant.
        </p>
      </>
    ),
  },
  {
    id: "next",
    title: "What Comes Next",
    content: (
      <>
        <p className="mb-6">In the next internet, everything is addressed directly to you.</p>
        <p className="text-neutral-400">
          Every page, image, and message will adapt to the person looking at it.
        </p>
      </>
    ),
  },
  {
    id: "simplest",
    title: "The Simplest Way to Think About It",
    content: (
      <>
        <p className="mb-6">Imagine walking into a Nike store and every product photo is <em>you</em>.</p>
        <p className="text-neutral-400 mb-6">You in the jacket. You in the shoes. You in the campaign.</p>
        <p className="text-white">You'd care way more. Obviously. You'd pay more. And Nike loves that.</p>
      </>
    ),
    // The Lookbook Grid
    images: ["/steven-track.jpg", "/steven-tennis.jpg"],
  },
  {
    id: "wedge",
    title: "Our Wedge",
    content: (
      <>
        <p className="mb-6">We're building the personalized storefront.</p>
        <p className="text-neutral-400 mb-6">Customers upload a photo. The store renders the product on them. The next email does it too.</p>
        <p className="text-neutral-400">Commerce stops being a generic catalog: It becomes a personal relationship customers actively participate in.</p>
      </>
    ),
  },
  {
    id: "babies-pets",
    title: "Why Babies and Pets First",
    content: (
      <>
        <p className="mb-6">The friction is zero.</p>
        <p className="text-neutral-400">
          Most adults don't have a camera roll full of selfies. But parents have thousands of photos of their kids. Pet owners have thousands of their dogs. The data, and the crazy buying intent are already there for a tool that drives 10x the conversion.
        </p>
      </>
    ),
  },
  {
    id: "today",
    title: "What We Do Today",
    content: (
      <>
        <p className="mb-6">Right now, we generate product photography for brands.</p>
        <p className="text-neutral-400">
          This gets us into merchant workflows, creates real value fast, and moves them from static images to dynamic ones. Our founding customer, Derek at <a href="https://www.axiscrew.com.au" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all relative z-50">Axis Crew</a>, already calls it 10x faster.
        </p>
      </>
    ),
  },
  {
    id: "proof",
    title: "Early Proof",
    content: (
      <>
        <p className="mb-8">5 paying customers across San Francisco and Melbourne.</p>
        <ul className="text-xl md:text-2xl text-neutral-400 space-y-2 mb-8 font-mono relative z-50">
          <li>- 750 AUD – <a href="https://www.axiscrew.com.au" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all">Axis Crew</a> <span className="text-neutral-600">(Founding)</span></li>
          <li>- $300/mo – <a href="https://www.instagram.com/bigtimevtg/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all">Big Time Vintage</a></li>
          <li>- $250/mo – <a href="https://3k4wh1-ck.myshopify.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all">Cottage Industry</a></li>
          <li>- $100/mo – <a href="https://www.stateofflux.shop" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all">State of Flux</a></li>
          <li>- $100/mo – <a href="https://www.bobbylondonsf.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all">Bobby London SF</a></li>
        </ul>
        <p className="text-lg md:text-xl text-neutral-300 mb-4 leading-relaxed relative z-50">
          We have generated <a href="https://www.axiscrew.com.au/products/eames-style-lounge-chair-and-ottoman" target="_blank" rel="noopener noreferrer" className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all">400 live products</a> (photos & text) for Axis Crew to date. That is 200 hours saved.
        </p>
        <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
          Last week I got into ShopTalk with no badge and left with 16 warm pilots including Gap, JR Cigars, and Behr. A paid scope with Balsam Hill is starting.
        </p>
      </>
    ),
  },
  {
    id: "why-me",
    title: "Why Me",
    content: (
      <>
        <p className="mb-4 text-neutral-400">At 16, I taught myself to code.</p>
        <p className="mb-4 text-neutral-400">At 17, I dropped out and flew to Hangzhou knowing nobody. I camped outside DeepSeek headquarters until I got introductions into factory networks — then sold AI ERP pilots across hundreds of seats.</p>
        <p className="mb-8 text-neutral-400">Three months ago, I flew to San Francisco knowing nobody. I walked into shops and closed paying customers.</p>
        <p className="text-white">I set the vector and force it to happen.</p>
      </>
    ),
  },
  {
    id: "why-now",
    title: "Why Now",
    content: (
      <>
        <p className="mb-6">Generation is good enough. Personal data is abundant enough.</p>
        <p className="text-neutral-400 mb-6">For the first time ever, we can make nike.com <em>you</em>.</p>
        <p className="text-neutral-400">The old internet was built for archiving. You were a spectator of digital content; now you will become a participant.</p>
      </>
    ),
    // Swapped image for this specific slide as requested
    images: ["/steven-basketball.jpg"],
  },
  {
    id: "vision",
    title: "The Vision",
    content: (
      <>
        <p className="mb-6">Today: a personalized storefront. <br/><span className="text-neutral-400">Eventually: a personalized internet.</span></p>
        <p className="text-neutral-400 mb-6">Not pages built once for everyone, but content generated live for each person.</p>
        <p className="text-neutral-400">Commerce is the beachhead. The real opportunity is much larger.</p>
      </>
    ),
  },
  {
    id: "ask",
    title: "The Ask",
    content: (
      <>
        <p className="mb-6 text-neutral-400">We have the vision, the wedge, and the early proof to get there.</p>
        <p className="text-white">We are raising to buy focus to shoot the billions.</p>
      </>
    ),
  }
];

// --- MAIN COMPONENT ---
export default function Deck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Refs for tracking touch and scroll to prevent rapid-fire skipping
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const isScrolling = useRef(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  // --- Keyboard Handling ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") nextSlide();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // --- Wheel / Trackpad Scrolling ---
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      // Threshold to ignore tiny trackpad movements
      if (Math.abs(e.deltaY) > 40 || Math.abs(e.deltaX) > 40) {
        isScrolling.current = true;
        if (e.deltaY > 0 || e.deltaX > 0) nextSlide();
        else prevSlide();

        // Cooldown timer to prevent zooming through multiple slides
        setTimeout(() => { isScrolling.current = false; }, 800);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextSlide, prevSlide]);

  // --- Mobile Swipe Handling ---
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartY.current && !touchStartX.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;

      const deltaY = touchStartY.current - touchEndY;
      const deltaX = touchStartX.current - touchEndX;

      // Determine if swipe was mostly vertical or horizontal
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal Swipe
        if (deltaX > 50) nextSlide(); // Swipe Left -> Next
        else if (deltaX < -50) prevSlide(); // Swipe Right -> Prev
      } else {
        // Vertical Swipe
        if (deltaY > 50) nextSlide(); // Swipe Up -> Next
        else if (deltaY < -50) prevSlide(); // Swipe Down -> Prev
      }

      // Reset
      touchStartY.current = 0;
      touchStartX.current = 0;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  const slide = slides[currentSlide];
  const hasImages = slide.images && slide.images.length > 0;

  return (
    <main className="fixed inset-0 bg-black text-white font-sans overflow-hidden flex flex-col justify-center items-center selection:bg-white selection:text-black px-6 md:px-16 py-12">

      {/* Subtle Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-white/20 w-full z-50">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Main Slide Content Layout */}
      <div className="w-full max-w-[1400px] z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            // Mobile: Stack vertically (reverse so image is on top). Desktop: side-by-side.
            className={`flex flex-col-reverse lg:flex-row w-full ${hasImages ? 'lg:items-center gap-8 lg:gap-24' : 'max-w-4xl mx-auto'}`}
          >
            {/* TEXT COLUMN */}
            <div className={`flex flex-col justify-center ${hasImages ? 'lg:w-1/2 mt-4 lg:mt-0' : 'w-full'} min-h-[30vh] lg:min-h-[50vh]`}>
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
                }}
                className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 lg:mb-12 leading-tight"
              >
                {slide.title}
              </motion.h1>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, y: -15, transition: { duration: 0.4 } }
                }}
                className="text-xl md:text-3xl lg:text-4xl leading-snug tracking-tight font-light"
              >
                {slide.content}
              </motion.div>
            </div>

            {/* IMAGE COLUMN (If images exist) */}
            {hasImages && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } }
                }}
                className="lg:w-1/2 w-full flex items-center justify-center"
              >
                {slide.images!.length === 2 ? (
                  // Grid for 2 images (Simplest Way slide)
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {slide.images!.map((imgSrc, i) => (
                      <div key={i} className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10 aspect-square">
                        <img src={imgSrc} alt="Generated Campaign" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  // Single cinematic image (LeBron Intro slide)
                  <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/10 w-full">
                    <img src={slide.images![0]} alt="Generated Campaign" className="w-full h-auto max-h-[40vh] lg:max-h-[70vh] object-cover" />
                  </div>
                )}
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Invisible Navigation Click Zones (Desktop Only so it doesn't mess with mobile swipe) */}
      <div className="hidden lg:block fixed top-0 left-0 w-1/4 h-full z-0 cursor-w-resize" onClick={prevSlide} />
      <div className="hidden lg:block fixed top-0 right-0 w-1/4 h-full z-0 cursor-e-resize" onClick={nextSlide} />

    </main>
  );
}