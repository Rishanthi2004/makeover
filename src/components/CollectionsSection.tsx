import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { BRIDAL_LOOKS } from '../data/atelierData';
import { BridalLook } from '../types';
import { LookDetailModal } from './LookDetailModal';
import { Card3D } from './Card3D';

export function CollectionsSection({ onSelectLook }: { onSelectLook: (lookName: string) => void }) {
  const [activeModalLook, setActiveModalLook] = useState<BridalLook | null>(null);

  return (
    <section id="collections" className="w-full bg-[#FAF7F2] py-28 md:py-36 border-t border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Minimal Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C99583] font-medium">
            <span>Couture Aesthetics</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#201A18] tracking-[0.06em] font-light uppercase mt-3">
            Bridal Collections
          </h2>

          <div className="w-16 h-[1px] bg-[#C99583] mt-5" />
        </div>

        {/* 3 3D Interactive Tilt Editorial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BRIDAL_LOOKS.map((look, index) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              <Card3D
                intensity={14}
                onClick={() => setActiveModalLook(look)}
                className="cursor-pointer group"
              >
                <div className="relative bg-[#F5EFE8] rounded-3xl overflow-hidden border border-[#EADBCE] shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  {/* Editorial Image */}
                  <div className="relative aspect-3/4 w-full overflow-hidden bg-[#EAE2D8]">
                    <img
                      src={look.image}
                      alt={look.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#1C1614]/85 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                    {/* Top 3D Floating Pill */}
                    <div className="absolute top-5 left-5">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#FAF7F2] bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                        0{index + 1} · {look.category}
                      </span>
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="font-serif text-2xl sm:text-3xl font-light uppercase tracking-wide">
                        {look.title}
                      </h3>
                      <p className="text-xs text-[#E8C5BD] font-light mt-1 italic">
                        {look.subtitle}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-white/90">
                        <span>{look.paletteNotes.slice(0, 2).join(' · ')}</span>
                        <span className="inline-flex items-center gap-1 text-[#E8C5BD] uppercase tracking-wider font-medium">
                          <span>Inspect</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>

      <LookDetailModal
        look={activeModalLook}
        onClose={() => setActiveModalLook(null)}
        onBookLook={(name) => {
          onSelectLook(name);
          setActiveModalLook(null);
        }}
      />
    </section>
  );
}
