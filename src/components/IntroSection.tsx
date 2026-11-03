import { motion } from 'motion/react';
import { Sparkles, Crown, Heart, Award } from 'lucide-react';
import { ATELIER_INFO } from '../data/atelierData';
import { Card3D } from './Card3D';

export function IntroSection() {
  const introImage = '/src/assets/images/bridal_intro_portrait_1793681581412.jpg';

  return (
    <section id="introduction" className="relative w-full bg-[#FAF7F2] py-28 md:py-36 overflow-hidden">
      {/* 3D Floating Ambient Orbs */}
      <div className="absolute top-10 right-20 w-80 h-80 bg-[#F3ECE2] rounded-full blur-3xl pointer-events-none animate-float-particle opacity-60" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#F9EFEA] rounded-full blur-3xl pointer-events-none animate-float-particle opacity-70" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Minimal Editorial Eyebrow */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C99583] font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Atelier Vision</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#201A18] tracking-[0.08em] font-light uppercase mt-3"
          >
            YOUR MOMENT. YOUR MAGIC.
          </motion.h2>

          <div className="w-16 h-[1px] bg-[#C99583] mt-5" />
        </div>

        {/* 3D Tilt Bridal Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="relative max-w-5xl mx-auto"
        >
          <Card3D intensity={10} glowColor="rgba(232, 197, 189, 0.4)">
            <div className="relative aspect-16/10 md:aspect-21/9 w-full rounded-3xl overflow-hidden shadow-2xl border border-[#EADBCE] bg-[#EFE8DF] group">
              <img
                src={introImage}
                alt="Editorial bridal portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[center_35%] transform transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1A1412]/80 via-transparent to-transparent" />

              {/* 3D Floating Quote Box */}
              <div className="absolute bottom-8 left-8 right-8 max-w-xl text-white">
                <p className="font-serif text-xl sm:text-2xl font-light italic leading-relaxed">
                  &ldquo;Our artistry does not mask—it unveils the timeless masterpiece already within you.&rdquo;
                </p>
                <span className="text-xs uppercase tracking-[0.25em] text-[#E8C5BD] mt-2 block font-light">
                  {ATELIER_INFO.founder} · Paris
                </span>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* 3 Minimal 3D Floating Feature Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {[
            { icon: Crown, title: 'Glass Skin Radiance', note: 'Porcelain hydration veil' },
            { icon: Heart, title: 'Bespoke Pigment', note: 'Formulated to your undertone' },
            { icon: Award, title: '18-Hour Wear', note: 'Tearproof emotion seal' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 bg-[#FAF7F2]/80 backdrop-blur-md rounded-2xl border border-[#EADBCE] shadow-sm hover:shadow-md hover:border-[#C99583] hover:-translate-y-1 transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[#C99583] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base uppercase text-[#201A18] tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8C8079] font-light mt-0.5">{item.note}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
