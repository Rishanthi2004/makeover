import { ArrowUp } from 'lucide-react';
import { ATELIER_INFO } from '../data/atelierData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#181311] text-[#E8DFD8] pt-20 pb-12 border-t border-[#2C2421]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#2C2421]">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <span className="font-serif text-2xl tracking-[0.2em] font-light uppercase text-[#FAF7F2] block">
              {ATELIER_INFO.name}
            </span>
            <p className="text-xs uppercase tracking-[0.25em] text-[#C99583] mt-2 font-medium">
              {ATELIER_INFO.tagline}
            </p>
            <p className="text-xs text-[#A89D96] max-w-sm mt-4 leading-relaxed font-light">
              Haute couture bridal makeup artistry, editorial wedding aesthetics, and private international appointments for discerning brides worldwide.
            </p>
          </div>

          {/* Concierge & Contact */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#FAF7F2] font-medium block mb-4">
              Private Concierge
            </span>
            <ul className="space-y-2.5 text-xs text-[#B5A8A0] font-light">
              <li>
                <a
                  href={`tel:${ATELIER_INFO.contactPhone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-[#C99583] transition-colors"
                >
                  {ATELIER_INFO.contactPhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ATELIER_INFO.contactEmail}`}
                  className="hover:text-[#C99583] transition-colors"
                >
                  {ATELIER_INFO.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C99583] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <span className="text-[#C99583]">{ATELIER_INFO.instagram}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Atelier Locations */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#FAF7F2] font-medium block mb-4">
              Atelier Presences
            </span>
            <ul className="space-y-2.5 text-xs text-[#B5A8A0] font-light">
              {ATELIER_INFO.locations.map((loc) => (
                <li key={loc} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#C99583]" />
                  <span>{loc} Atelier & Destination Travel</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C8079]">
          <p>© {new Date().getFullYear()} {ATELIER_INFO.name}. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-[#FAF7F2] transition-colors uppercase tracking-[0.15em] text-[11px]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C99583]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
