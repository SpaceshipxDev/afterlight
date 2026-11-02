"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createInvestorSlides } from "../investors/_shared/slides";

// --- SLIDE DATA ---
const slides = createInvestorSlides(
  {
    hook: ["/arjun-nike.jpg"],
    simplest: ["/pear-track.jpg", "/pear-tennis.jpg"],
    "tennis-focus": ["/arjun-apple.jpg"],
    "babies-pets": ["/baby-1.jpg", "/baby-2.jpg", "/baby-3.jpg"],
    "why-now": ["/pear-basketball.jpg"],
  },
  {
    proof: {
      title: "Early Proof",
      content: (
        <>
          <p className="mb-6 text-white font-semibold">
            $10K pilot signed with Balsam this month — $100K contract to follow after the pilot.
          </p>
          <p className="mb-6">
            5 paying customers across San Francisco and Melbourne.
          </p>
          <ul className="text-xl md:text-2xl text-neutral-400 space-y-2 mb-6 font-mono relative z-50">
            <li>
              - 300 hours saved in total –{" "}
              <a
                href="https://www.axiscrew.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all"
              >
                Axis Crew
              </a>{" "}
              <span className="text-neutral-600">(Founding)</span>
            </li>
            <li>
              - 30 hours saved last month –{" "}
              <a
                href="https://www.instagram.com/bigtimevtg/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all"
              >
                Big Time Vintage
              </a>
            </li>
            <li>
              - Listed 1000+ jeweler products –{" "}
              <a
                href="https://3k4wh1-ck.myshopify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all"
              >
                Cottage Industry
              </a>
            </li>
            <li>
              - 40 hours saved last month –{" "}
              <a
                href="https://www.stateofflux.shop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all"
              >
                State of Flux
              </a>
            </li>
            <li>
              - 20 hours saved last month –{" "}
              <a
                href="https://www.bobbylondonsf.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-all"
              >
                Bobby London SF
              </a>
            </li>
          </ul>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
            400 live products generated for Axis Crew. Left ShopTalk with 16 warm pilots including Gap, JR Cigars, and Behr. Onboarding Ledge Lounger and Baby Braithwaite.
          </p>
        </>
      ),
    },
  },
);

// --- MAIN COMPONENT ---
export default function Deck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const isScrolling = useRef(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") nextSlide();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      if (Math.abs(e.deltaY) > 40 || Math.abs(e.deltaX) > 40) {
        isScrolling.current = true;
        if (e.deltaY > 0 || e.deltaX > 0) nextSlide();
        else prevSlide();

        setTimeout(() => { isScrolling.current = false; }, 800);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextSlide, prevSlide]);

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

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 50) nextSlide();
        else if (deltaX < -50) prevSlide();
      } else {
        if (deltaY > 50) nextSlide();
        else if (deltaY < -50) prevSlide();
      }

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
  const hasText = !!(slide.title || slide.content);

  return (
    <main className={`fixed inset-0 bg-black text-white font-sans overflow-hidden flex flex-col justify-center items-center selection:bg-white selection:text-black ${hasText ? 'px-6 md:px-16 py-12' : ''}`}>

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
      <div className={`w-full ${hasText ? 'max-w-[1400px]' : 'h-full'} z-10`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={hasText
              ? `flex flex-col-reverse lg:flex-row w-full lg:items-center gap-8 lg:gap-24`
              : `absolute inset-0 w-full h-full flex items-center justify-center`}
          >
            {/* TEXT COLUMN */}
            {hasText && (
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

                {slide.content && (
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
                )}
              </div>
            )}

            {/* IMAGE COLUMN */}
            {hasImages && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: hasText ? 0.95 : 1.05 },
                  visible: { opacity: 1, scale: 1, transition: { delay: hasText ? 0.5 : 0, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, scale: hasText ? 0.95 : 1.05, transition: { duration: 0.4 } }
                }}
                className={hasText ? `lg:w-1/2 w-full flex items-center justify-center` : `w-full h-full`}
              >
                {slide.images!.length === 3 ? (
                  <div className="grid grid-cols-3 gap-2 md:gap-4 w-full">
                    {slide.images!.map((imgSrc, i) => (
                      <div key={i} className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/10 aspect-square">
                        <img src={imgSrc} alt="Generated Campaign Timeline" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : slide.images!.length === 2 ? (
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {slide.images!.map((imgSrc, i) => (
                      <div key={i} className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10 aspect-square">
                        <img src={imgSrc} alt="Generated Campaign" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={hasText ? `relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/10 w-full` : `w-full h-full`}>
                    <img src={slide.images![0]} alt="Generated Campaign" className={hasText ? `w-full h-auto max-h-[40vh] lg:max-h-[80vh] object-cover` : `w-full h-full object-cover`} />
                  </div>
                )}
              </motion.div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Invisible Navigation Click Zones */}
      <div className="hidden lg:block fixed top-0 left-0 w-1/4 h-full z-40 cursor-w-resize" onClick={prevSlide} />
      <div className="hidden lg:block fixed top-0 right-0 w-1/4 h-full z-40 cursor-e-resize" onClick={nextSlide} />

    </main>
  );
}
