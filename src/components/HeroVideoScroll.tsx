import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { ATELIER_INFO } from '../data/atelierData';

gsap.registerPlugin(ScrollTrigger);

export function HeroVideoScroll({ onExploreClick }: { onExploreClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);

  // Handle Video Metadata & Loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setVideoDuration(video.duration);
        setVideoLoaded(true);
        video.currentTime = 0.001;
      }
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // GSAP ScrollTrigger Setup: Exactly 3 full scrolls (300vh scroll travel = 400vh container)
  useEffect(() => {
    if (!containerRef.current || !stickyRef.current) return;

    let targetTime = 0;
    let rafId: number;

    // Fast, direct frame updater to guarantee zero lag and instant response
    const renderLoop = () => {
      const video = videoRef.current;
      if (video && videoDuration > 0) {
        if (Math.abs(video.currentTime - targetTime) > 0.005) {
          video.currentTime = targetTime;
        }
      }
      rafId = requestAnimationFrame(renderLoop);
    };

    rafId = requestAnimationFrame(renderLoop);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true, // Direct, instant frame response to user scroll
        onUpdate: (self) => {
          if (videoDuration > 0) {
            const progress = self.progress;
            setCurrentProgress(progress);
            targetTime = Math.max(0, Math.min(videoDuration - 0.03, progress * videoDuration));
          }
        }
      });
    }, containerRef);

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [videoDuration]);

  // Determine which of the 3 scrolls the user is on:
  // Scroll 1: Open (0.00 - 0.33)
  // Scroll 2: Put brush (0.33 - 0.66)
  // Scroll 3: Take it (0.66 - 1.00)
  const currentStage =
    currentProgress < 0.33 ? 1 : currentProgress < 0.66 ? 2 : 3;

  // Jump to specific scroll stage
  const jumpToStage = (stageNum: number) => {
    if (!containerRef.current) return;
    const progressMap = [0.05, 0.45, 0.85];
    const targetPct = progressMap[stageNum - 1];
    const containerTop = containerRef.current.offsetTop;
    const scrollDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + targetPct * scrollDistance;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#120F0E] select-none"
      id="hero-scroll"
    >
      {/* Pinned Sticky Viewport (Pins for exactly 3 full viewport scrolls) */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between"
      >
        {/* Pure Cinematic Video Layer */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src="/assets/aistudio/Brush_applying_pink_makeup_powder_88fecafa_fb657849.mp4"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
            muted
            playsInline
            preload="auto"
            aria-label="Makeup compact opening, brush dipping, and powder taking video"
          />

          {/* Clean Subtle Contrast Vignette */}
          <div className="absolute inset-0 bg-linear-to-t from-[#120F0E] via-transparent to-black/40 pointer-events-none" />
        </div>

        {/* Loading Veil */}
        {!videoLoaded && (
          <div className="absolute inset-0 z-30 bg-[#120F0E] flex flex-col items-center justify-center gap-3 text-[#FAF7F2]">
            <div className="w-10 h-10 rounded-full border-2 border-[#C99583] border-t-transparent animate-spin" />
            <p className="font-serif text-xs tracking-[0.3em] uppercase text-[#E8C5BD]">
              Loading Video...
            </p>
          </div>
        )}

        {/* Minimal Quiet Top Header Cushion */}
        <div className="relative z-10 w-full pt-24 px-6 md:px-12 flex justify-between items-center pointer-events-none">
          <span className="font-serif text-sm tracking-[0.25em] uppercase text-white/80">
            {ATELIER_INFO.name}
          </span>

          {/* Clean Scroll Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-xs text-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C99583]" />
            <span className="font-mono text-[#E8C5BD]">
              Scroll {currentStage} of 3
            </span>
          </div>
        </div>

        {/* Elegant Center Title — Fades out naturally as user scrolls to let the pure video shine */}
        <div
          className="relative z-10 max-w-2xl mx-auto px-6 text-center my-auto flex flex-col items-center transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: Math.max(0, 1 - currentProgress * 4.5)
          }}
        >
          <span className="text-xs uppercase tracking-[0.35em] text-[#E8C5BD] font-medium mb-2">
            {ATELIER_INFO.heroSubtitle}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#FAF7F2] tracking-[0.06em] font-light uppercase leading-[1.05] drop-shadow-xl">
            {ATELIER_INFO.heroHeadline}
          </h1>

          <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
            <span>Scroll down to open</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#C99583] animate-bounce" />
          </div>
        </div>

        {/* 3-Scroll Milestone HUD: 1. Open | 2. Put Brush | 3. Take It */}
        <div className="relative z-10 w-full pb-8 px-6 md:px-12 bg-linear-to-t from-[#120F0E] via-[#120F0E]/70 to-transparent">
          <div className="max-w-xl mx-auto flex flex-col items-center">
            {/* The 3 Scroll Steps */}
            <div className="flex items-center justify-between w-full gap-2 sm:gap-4 mb-3">
              {[
                { stage: 1, label: '1. Open', desc: 'Compact Opens' },
                { stage: 2, label: '2. Put Brush', desc: 'Touch Powder' },
                { stage: 3, label: '3. Take It', desc: 'Lift & Glow' }
              ].map((item) => {
                const isActive = currentStage === item.stage;
                return (
                  <button
                    key={item.stage}
                    type="button"
                    onClick={() => jumpToStage(item.stage)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs tracking-[0.15em] uppercase transition-all duration-200 border text-center cursor-pointer ${
                      isActive
                        ? 'bg-white/20 border-[#C99583] text-[#FAF7F2] shadow-md font-medium'
                        : 'bg-black/30 border-white/10 text-white/40 hover:text-white/80'
                    }`}
                  >
                    <span className="block font-medium">{item.label}</span>
                    <span className="hidden sm:block text-[10px] text-[#E8C5BD] opacity-80 mt-0.5">
                      {item.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scrubber Progress Bar */}
            <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#E8C5BD] via-[#C99583] to-[#FAF7F2] rounded-full transition-all duration-75"
                style={{ width: `${Math.min(100, currentProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Feather transition into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-b from-transparent to-[#FAF7F2] pointer-events-none" />
      </div>
    </section>
  );
}
