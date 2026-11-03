import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ATELIER_INFO } from '../data/atelierData';

export function Navbar({ onBookClick }: { onBookClick: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collections', href: '#collections' },
    { label: 'Transformation', href: '#transformation' },
    { label: 'Artistry', href: '#artistry' },
    { label: 'Concierge', href: '#booking' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E8DFD8]'
          : 'bg-linear-to-b from-black/50 via-black/20 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`font-serif text-xl md:text-2xl tracking-[0.2em] font-medium uppercase transition-colors whitespace-nowrap shrink-0 ${
            isScrolled ? 'text-[#201A18]' : 'text-white'
          }`}
        >
          {ATELIER_INFO.name}
        </a>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#C99583] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C99583] hover:after:w-full after:transition-all ${
                isScrolled ? 'text-[#5E544F]' : 'text-white/85'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onBookClick}
            className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase rounded-full transition-all duration-300 whitespace-nowrap shrink-0 ${
              isScrolled
                ? 'bg-[#201A18] text-[#FAF7F2] hover:bg-[#C99583] hover:text-white shadow-xs'
                : 'bg-white/90 text-[#201A18] hover:bg-white hover:shadow-lg backdrop-blur-xs'
            }`}
          >
            <span>Book Your Look</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-[#201A18] hover:bg-[#EFE7DE]' : 'text-white hover:bg-white/10'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E8DFD8] px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-sm font-medium tracking-[0.15em] uppercase text-[#3C3430]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="py-2 border-b border-[#F0E6DE] hover:text-[#C99583] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="mt-2 w-full py-3 bg-[#201A18] text-[#FAF7F2] text-xs font-medium tracking-[0.2em] uppercase rounded-full hover:bg-[#C99583] transition-colors flex items-center justify-center gap-2"
            >
              Book Your Look
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
