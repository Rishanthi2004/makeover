import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface ImageLightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export function ImageLightboxModal({
  item,
  items,
  onClose,
  onNavigate
}: ImageLightboxModalProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        const currIdx = items.findIndex((i) => i.id === item.id);
        const nextIdx = (currIdx + 1) % items.length;
        onNavigate(items[nextIdx]);
      }
      if (e.key === 'ArrowLeft') {
        const currIdx = items.findIndex((i) => i.id === item.id);
        const prevIdx = (currIdx - 1 + items.length) % items.length;
        onNavigate(items[prevIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items, onClose, onNavigate]);

  if (!item) return null;

  const currIdx = items.findIndex((i) => i.id === item.id);
  const nextItem = items[(currIdx + 1) % items.length];
  const prevItem = items[(currIdx - 1 + items.length) % items.length];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
        aria-label="Close image preview"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev / Next buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(prevItem);
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white hidden sm:flex items-center justify-center transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(nextItem);
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white hidden sm:flex items-center justify-center transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-xl shadow-2xl max-h-[75vh]">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-auto h-auto max-h-[75vh] object-contain rounded-xl"
          />
        </div>

        {/* Caption bar */}
        <div className="mt-4 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-[#E8C5BD] font-mono">
            {item.category}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-light tracking-wide uppercase mt-1">
            {item.title}
          </h3>
          <p className="text-xs text-white/70 max-w-lg mt-1 font-light">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
