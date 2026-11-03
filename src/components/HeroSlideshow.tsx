import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, ChevronDown } from 'lucide-react';
import { ATELIER_INFO } from '../data/atelierData';

interface Slide {
  id: string;
  type: 'video' | 'image';
  src: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  tag: string;
}

const SLIDES: Slide[] = [
  {
    id: 'video-reel',
    type: 'video',
    src: '/assets/aistudio/Brush_applying_pink_makeup_powder_88fecafa_fb657849.mp4',
    eyebrow: 'Cinematic Beauty Reel',
    title: 'THE ART OF BRIDAL BEAUTY',
    subtitle: 'Where pure rose-gold pigments meet haute couture craftsmanship.',
    tag: '01 · Video Master'
  },
  {
    id: 'traditional-heritage',
    type: 'image',
    src: '/src/assets/images/bridal_traditional_look_1793681582782.jpg',
    eyebrow: 'Heritage Collection',
    title: 'REGAL OPULENCE & 24K GOLD',
    subtitle: 'Sculpted rose velvet lips and imperial bridal splendor.',
    tag: '02 · Traditional'
  },
  {
    id: 'modern-parisian',
    type: 'image',
    src: '/src/assets/images/bridal_intro_portrait_1793681581412.jpg',
    eyebrow: 'Modern Atelier',
    title: 'TIMELESS CHATEAU RADIANCE',
    subtitle: 'Porcelain glass-skin finish and delicate silk veil styling.',
    tag: '03 · Modern'
  },
  {
    id: 'reception-glamour',
    type: 'image',
    src: '/src/assets/images/bridal_reception_glam_1793681584455.jpg',
    eyebrow: 'Evening Couture',
    title: 'CANDLELIGHT RECEPTION GLAM',
    subtitle: 'Shimmering champagne smoky gaze for grand ballroom evenings.',
    tag: '04 · Reception'
  }
];

export function HeroSlideshow({ onExploreClick }: { onExploreClick: () => void }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const SLIDE_DURATION = 6500; // ms per slide

  // Auto-slide Timer Loop
  useEffect(() => {
    if (!isPlaying) return;

    setProgress(0);
    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlideIndex((curr) => (curr + 1) % SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentSlideIndex, isPlaying]);

  // Restart video playback when slide changes to video
  useEffect(() => {
    if (SLIDES[currentSlideIndex].type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [currentSlideIndex]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  };

  const goToSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
    setProgress(0);
  };

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#120F0E] select-none flex flex-col justify-between">
      {/* Background Slideshow Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {currentSlide.type === 'video' ? (
            <motion.div
              key="slide-video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                ref={videoRef}
                src={currentSlide.src}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Cinematic bridal makeup brush video"
              />
            </motion.div>
          ) : (
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentSlide.src}
                alt={currentSlide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-transform duration-10000 scale-100 animate-pulse-slow"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Luxury Gradient Scrims & Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#120F0E]/40 to-[#120F0E]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-[#120F0E] via-black/20 to-black/50 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C99583]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Cushion */}
      <div className="relative z-10 w-full pt-20 pointer-events-none" />

      {/* Center Cinematic Typography */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center my-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 mb-3 text-[#E8C5BD] text-xs font-medium tracking-[0.35em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C99583]" />
              <span>{ATELIER_INFO.heroSubtitle}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF7F2] tracking-[0.06em] font-light uppercase leading-[1.05] drop-shadow-2xl text-balance">
              {currentSlide.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 max-w-lg mt-3 font-light leading-relaxed">
              {currentSlide.subtitle}
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-8 py-3.5 bg-[#FAF7F2] text-[#201A18] text-xs font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-[#E8C5BD] hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-2 cursor-pointer"
              >
                <span>Explore The Atelier</span>
                <ChevronDown className="w-4 h-4 text-[#C99583]" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Slideshow Navigation Strip */}
      <div className="relative z-10 w-full pb-8 px-6 md:px-12 bg-linear-to-t from-[#120F0E] via-[#120F0E]/70 to-transparent">
        <div className="max-w-4xl mx-auto">
          {/* Slideshow Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {SLIDES.map((slide, idx) => {
              const isActive = currentSlideIndex === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`py-2 px-3 rounded-xl text-xs uppercase tracking-[0.1em] font-medium transition-all duration-300 border text-left flex flex-col cursor-pointer ${
                    isActive
                      ? 'bg-white/20 border-[#C99583] text-[#FAF7F2] shadow-md'
                      : 'bg-black/30 border-white/10 text-white/50 hover:text-white/90 hover:bg-black/50'
                  }`}
                >
                  <span className="font-mono text-[9px] text-[#C99583]">{slide.tag}</span>
                  <span className="truncate text-[11px] mt-0.5">{slide.eyebrow}</span>
                </button>
              );
            })}
          </div>

          {/* Progress Bar & Arrow Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Timer Progress Track */}
            <div className="flex-1 h-1 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#E8C5BD] via-[#C99583] to-[#FAF7F2] rounded-full transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Feather transition into Section 2 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-b from-transparent to-[#FAF7F2] pointer-events-none" />
    </section>
  );
}
