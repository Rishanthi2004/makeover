import { motion } from 'motion/react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { BRIDAL_PACKAGES } from '../data/atelierData';
import { BridalPackage } from '../types';
import { Card3D } from './Card3D';

export function PackagesSection({ onSelectPackage }: { onSelectPackage: (packageName: string) => void }) {
  return (
    <section id="packages" className="w-full bg-[#FAF7F2] py-28 md:py-36 border-t border-[#E8DFD8]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Minimal Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C99583] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Investments</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#201A18] tracking-[0.06em] font-light uppercase mt-3">
            Bridal Packages
          </h2>

          <div className="w-16 h-[1px] bg-[#C99583] mt-5" />
        </div>

        {/* 3 3D Tilt Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {BRIDAL_PACKAGES.map((pkg: BridalPackage, index) => {
            const isPopular = pkg.popular;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="h-full"
              >
                <Card3D intensity={12} className="h-full">
                  <div
                    className={`h-full rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                      isPopular
                        ? 'bg-[#F5EFE8] border-2 border-[#C99583] shadow-2xl'
                        : 'bg-[#FAF7F2] border border-[#E8DFD8] shadow-lg hover:shadow-2xl'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="bg-[#201A18] text-[#FAF7F2] text-[10px] uppercase tracking-[0.2em] font-medium px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                          Signature Choice
                        </span>
                      </div>
                    )}

                    <div>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#C99583] font-medium block">
                        {pkg.tier.split(' ')[0]} Edition
                      </span>

                      <h3 className="font-serif text-2xl sm:text-3xl text-[#201A18] tracking-wide uppercase font-light mt-1">
                        {pkg.name}
                      </h3>

                      {/* Pricing */}
                      <div className="mt-5 pb-5 border-b border-[#E8DFD8] flex items-baseline gap-2">
                        <span className="font-serif text-4xl text-[#201A18] font-light tracking-tight tabular-nums">
                          {pkg.pricing}
                        </span>
                        <span className="text-xs uppercase tracking-[0.1em] text-[#8C8079]">
                          / Curation
                        </span>
                      </div>

                      {/* Minimal 3 Inclusions */}
                      <div className="mt-6 space-y-3">
                        {pkg.highlights.slice(0, 3).map((h, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-[#544B46]">
                            <div className="w-4 h-4 rounded-full bg-[#EAE2D8] flex items-center justify-center shrink-0 mt-0.5 text-[#C99583]">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="leading-snug">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-4">
                      <button
                        onClick={() => onSelectPackage(pkg.name)}
                        className={`w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group ${
                          isPopular
                            ? 'bg-[#201A18] text-[#FAF7F2] hover:bg-[#C99583] hover:text-white shadow-md'
                            : 'bg-[#EAE2D8] text-[#201A18] hover:bg-[#201A18] hover:text-[#FAF7F2]'
                        }`}
                      >
                        <span>Reserve Package</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
