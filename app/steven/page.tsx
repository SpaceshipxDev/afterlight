"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createInvestorSlides } from "../investors/_shared/slides";

// --- SLIDE DATA ---
const slides = createInvestorSlides({
  hook: ["/steven-basketball.jpg"],
  simplest: ["/steven-track.jpg", "/steven-tennis.jpg"],
  "tennis-focus": ["/steven-tennis.jpg"],
  "babies-pets": ["/baby-1.jpg", "/baby-2.jpg", "/baby-3.jpg"],
  "why-now": ["/steven-basketball.jpg"],
});

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
  const hasText = !!(slide.title || slide.content);

  return (
    <main className={`fixed inset-0 bg-black text-white font-sans overflow-hidden flex flex-col justify-center items-center selection:bg-white selection:text-black ${hasText ? "px-6 md:px-16 py-12" : ""}`}>

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
      <div className={`w-full ${hasText ? "max-w-[1400px]" : "h-full"} z-10`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={
              hasText
                ? "flex flex-col-reverse lg:flex-row w-full lg:items-center gap-8 lg:gap-24"
                : "absolute inset-0 w-full h-full flex items-center justify-center"
            }
          >
            {hasText && (
              <div className={`flex flex-col justify-center ${hasImages ? "lg:w-1/2 mt-4 lg:mt-0" : "w-full"} min-h-[30vh] lg:min-h-[50vh]`}>
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
            )}

            {hasImages && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: hasText ? 0.95 : 1.05 },
                  visible: { opacity: 1, scale: 1, transition: { delay: hasText ? 0.5 : 0, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  exit: { opacity: 0, scale: hasText ? 0.95 : 1.05, transition: { duration: 0.4 } }
                }}
                className={hasText ? "lg:w-1/2 w-full flex items-center justify-center" : "w-full h-full"}
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
                  <div className={hasText ? "relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/10 w-full" : "w-full h-full"}>
                    <img src={slide.images![0]} alt="Generated Campaign" className={hasText ? "w-full h-auto max-h-[40vh] lg:max-h-[70vh] object-cover" : "w-full h-full object-cover"} />
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
