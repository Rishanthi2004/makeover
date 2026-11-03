import { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronsLeftRight } from 'lucide-react';
import { Card3D } from './Card3D';

export function TransformationSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const beforeImage = '/assets/images/bridal_before_makeup_1793681584008.jpg';
  const afterImage = '/assets/images/bridal_after_makeup_1793681618178.jpg';

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPct);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="transformation" className="w-full bg-[#F5EFE8] py-28 md:py-36 border-t border-[#E8DFD8] select-none">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Minimal Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C99583] font-medium">
            <span>Interactive Alchemy</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#201A18] tracking-[0.06em] font-light uppercase mt-3">
            The Bridal Transformation
          </h2>

          <div className="w-16 h-[1px] bg-[#C99583] mt-5" />

          {/* Quick preset selector buttons */}
          <div className="mt-8 inline-flex p-1 bg-[#EAE2D8] rounded-full border border-[#D8CEBF]">
            <button
              type="button"
              onClick={() => setSliderPosition(100)}
              className={`px-4 py-1.5 text-xs font-medium tracking-[0.1em] uppercase rounded-full transition-all cursor-pointer ${
                sliderPosition >= 90
                  ? 'bg-[#201A18] text-[#FAF7F2] shadow-xs'
                  : 'text-[#665D58] hover:text-[#201A18]'
              }`}
            >
              Bare Canvas
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(50)}
              className={`px-4 py-1.5 text-xs font-medium tracking-[0.1em] uppercase rounded-full transition-all cursor-pointer ${
                sliderPosition > 25 && sliderPosition < 75
                  ? 'bg-[#201A18] text-[#FAF7F2] shadow-xs'
                  : 'text-[#665D58] hover:text-[#201A18]'
              }`}
            >
              50 / 50 Split
            </button>
            <button
              type="button"
              onClick={() => setSliderPosition(0)}
              className={`px-4 py-1.5 text-xs font-medium tracking-[0.1em] uppercase rounded-full transition-all cursor-pointer ${
                sliderPosition <= 10
                  ? 'bg-[#201A18] text-[#FAF7F2] shadow-xs'
                  : 'text-[#665D58] hover:text-[#201A18]'
              }`}
            >
              Atelier Radiance
            </button>
          </div>
        </div>

        {/* 3D Floating Interactive Comparison Slider */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <Card3D intensity={6} glowColor="rgba(201, 149, 131, 0.3)">
              <div
                ref={containerRef}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                onTouchMove={handleTouchMove}
                className="relative aspect-4/3 sm:aspect-16/10 w-full rounded-3xl overflow-hidden shadow-2xl border border-[#D8CEBF] cursor-ew-resize bg-[#201A18]"
              >
                {/* Background Image: AFTER */}
                <img
                  src={afterImage}
                  alt="Bride after makeup"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                />

                {/* Foreground Clipped Image: BEFORE */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={beforeImage}
                    alt="Bride before makeup"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                    style={{
                      width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                      height: containerRef.current ? `${containerRef.current.clientHeight}px` : '100%'
                    }}
                  />
                </div>

                {/* Split Divider Line & Floating Rose Gold Handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#FAF7F2] shadow-[0_0_15px_rgba(201,149,131,0.8)] z-20 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#FAF7F2] border-2 border-[#C99583] shadow-2xl flex items-center justify-center text-[#201A18] hover:scale-110 transition-transform">
                    <ChevronsLeftRight className="w-5 h-5 text-[#201A18]" />
                  </div>
                </div>

                {/* Minimal Overlay Badges */}
                <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                    Natural Canvas
                  </span>
                </div>

                <div className="absolute bottom-6 right-6 z-10 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                    Élégance Radiance
                  </span>
                </div>
              </div>
            </Card3D>
          </motion.div>

          {/* 3 Minimal 3D Metric Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { step: '01', title: 'Botanical Moisture', desc: 'Cold-pressed squalane hydration' },
              { step: '02', title: 'Micro-Calibration', desc: 'Targeted skin tone balancing' },
              { step: '03', title: '18H Velvet Lock', desc: 'Rose-gold setting elixir' }
            ].map((s) => (
              <div
                key={s.step}
                className="p-4 bg-[#FAF7F2]/80 backdrop-blur-xs rounded-xl border border-[#EADBCE] text-center"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#C99583] block">
                  Step {s.step}
                </span>
                <h4 className="font-serif text-sm uppercase text-[#201A18] mt-0.5">{s.title}</h4>
                <p className="text-[11px] text-[#8C8079] font-light mt-0.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
