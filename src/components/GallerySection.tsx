import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/atelierData';
import { GalleryItem } from '../types';
import { ImageLightboxModal } from './ImageLightboxModal';
import { Card3D } from './Card3D';

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Ceremony', 'Traditional', 'Modern', 'Reception', 'Details'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="w-full bg-[#FAF7F2] py-28 md:py-36 border-t border-[#E8DFD8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Minimal Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C99583] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editorial Archives</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#201A18] tracking-[0.06em] font-light uppercase mt-2">
              Bridal Gallery
            </h2>
          </div>

          {/* Interactive Filter Control Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFE8DF] rounded-full border border-[#DFD5C8]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-medium tracking-[0.1em] uppercase rounded-full transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#201A18] text-[#FAF7F2] shadow-xs'
                    : 'text-[#665D58] hover:text-[#201A18]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Tilt Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {filteredItems.map((item, index) => {
            const isWide = item.aspect === 'landscape';
            const isTall = item.aspect === 'portrait';

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={isWide ? 'lg:col-span-2' : ''}
              >
                <Card3D
                  intensity={10}
                  onClick={() => setSelectedItem(item)}
                  className="cursor-pointer group"
                >
                  <div
                    className={`relative w-full ${
                      isWide ? 'aspect-16/9' : isTall ? 'aspect-3/4' : 'aspect-square'
                    } rounded-3xl overflow-hidden border border-[#EADBCE] shadow-lg group-hover:shadow-2xl transition-all duration-500 bg-[#EFE8DF]`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#E8C5BD]">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-light uppercase tracking-wide mt-0.5">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ImageLightboxModal
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onNavigate={(newItem) => setSelectedItem(newItem)}
      />
    </section>
  );
}
