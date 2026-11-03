import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { ARTISTRY_DETAILS } from '../data/atelierData';
import { Card3D } from './Card3D';

export function ArtistrySection() {
  return (
    <section id="artistry" className="w-full bg-[#FAF7F2] py-28 md:py-36 border-t border-[#E8DFD8]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Minimal Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C99583] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Macro Craftsmanship</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#201A18] tracking-[0.06em] font-light uppercase mt-3">
            THE ART OF EVERY DETAIL.
          </h2>

          <div className="w-16 h-[1px] bg-[#C99583] mt-5" />
        </div>

        {/* 3 Macro Compositions with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTISTRY_DETAILS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              <Card3D intensity={12} className="h-full">
                <div className="bg-[#FAF7F2] rounded-3xl overflow-hidden border border-[#E8DFD8] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group">
                  {/* Macro Photography Frame */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#EFE8DF]">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/90 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        Detail 0{index + 1}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8C5BD] block">
                        {item.subtitle}
                      </span>
                      <h3 className="font-serif text-xl uppercase font-light mt-0.5">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Minimal 1-line Footer */}
                  <div className="p-5 flex items-center justify-between text-xs text-[#726863] border-t border-[#EFE7DE] bg-[#FAF7F2]">
                    <span className="text-[#C99583] font-mono text-[11px] uppercase tracking-wider">
                      {item.metrics.split('·')[0].trim()}
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-[#201A18] font-medium">
                      Atelier Certified
                    </span>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
