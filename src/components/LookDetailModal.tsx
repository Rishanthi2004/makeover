import { X, Sparkles, Clock, Check, ArrowRight } from 'lucide-react';
import { BridalLook } from '../types';

interface LookDetailModalProps {
  look: BridalLook | null;
  onClose: () => void;
  onBookLook: (lookName: string) => void;
}

export function LookDetailModal({ look, onClose, onBookLook }: LookDetailModalProps) {
  if (!look) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl border border-[#E8DFD8] flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#201A18] flex items-center justify-center transition-colors shadow-md"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Editorial Photo */}
        <div className="w-full md:w-1/2 relative bg-[#EFE8DF] min-h-[300px] md:min-h-full">
          <img
            src={look.image}
            alt={look.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent md:hidden" />
          <div className="absolute bottom-4 left-4 text-white md:hidden">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8C5BD]">
              {look.category} Collection
            </span>
            <h3 className="font-serif text-2xl uppercase">{look.title}</h3>
          </div>
        </div>

        {/* Right Artistry Specifications */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C99583] font-medium mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{look.category} Signature Look</span>
            </div>

            <h3 className="hidden md:block font-serif text-3xl text-[#201A18] tracking-wide uppercase font-light">
              {look.title}
            </h3>

            <p className="text-xs uppercase tracking-[0.15em] text-[#C99583] mt-1 font-medium">
              {look.subtitle}
            </p>

            {/* Specifications Matrix */}
            <div className="mt-6 space-y-3.5 border-t border-b border-[#E8DFD8] py-4 text-xs">
              <div>
                <span className="font-medium text-[#201A18] uppercase tracking-[0.1em] block">
                  Skin Finish:
                </span>
                <span className="text-[#726863] mt-0.5 block">{look.skinFinish}</span>
              </div>

              <div>
                <span className="font-medium text-[#201A18] uppercase tracking-[0.1em] block">
                  Eye Artistry:
                </span>
                <span className="text-[#726863] mt-0.5 block">{look.eyeFocus}</span>
              </div>

              <div>
                <span className="font-medium text-[#201A18] uppercase tracking-[0.1em] block">
                  Lip Profile:
                </span>
                <span className="text-[#726863] mt-0.5 block">{look.lipProfile}</span>
              </div>

              <div className="flex items-center gap-2 text-[#726863] pt-1">
                <Clock className="w-3.5 h-3.5 text-[#C99583]" />
                <span>Application Duration: {look.duration}</span>
              </div>
            </div>

            {/* Curated Color Swatches */}
            <div className="mt-4">
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#726863] block mb-2 font-medium">
                Harmonic Palette Notes:
              </span>
              <div className="flex flex-wrap gap-2">
                {look.paletteNotes.map((note) => (
                  <span
                    key={note}
                    className="text-xs px-2.5 py-1 bg-[#F3ECE2] text-[#4F4540] rounded-sm border border-[#E5DAD0]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Book Action */}
          <div className="mt-8 pt-4">
            <button
              onClick={() => {
                onBookLook(look.title);
                onClose();
              }}
              className="w-full py-3.5 bg-[#201A18] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-[#C99583] transition-colors flex items-center justify-center gap-2 shadow-md group"
            >
              <span>Enquire for {look.title}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
