/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlideshow } from './components/HeroSlideshow';
import { IntroSection } from './components/IntroSection';
import { CollectionsSection } from './components/CollectionsSection';
import { TransformationSection } from './components/TransformationSection';
import { ArtistrySection } from './components/ArtistrySection';
import { BookingSection } from './components/BookingSection';
import { FloatingPowder3D } from './components/FloatingPowder3D';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<string>('The Celestial Bride');
  const [selectedLook, setSelectedLook] = useState<string>('Traditional Bridal');

  const scrollToBooking = () => {
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToIntroduction = () => {
    const introEl = document.getElementById('introduction');
    if (introEl) {
      introEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectLook = (lookName: string) => {
    setSelectedLook(lookName);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#201A18] font-sans antialiased selection:bg-[#E8C5BD] selection:text-[#1F1B1A]">
      {/* 3-Zone Sticky Navigation Bar */}
      <Navbar onBookClick={scrollToBooking} />

      {/* Real 3D Ambient Cosmetic Powder & Rose Gold Sparkle System */}
      <FloatingPowder3D />

      <main>
        {/* Section 1: Cinematic Bridal Slideshow & Video Reel Hero */}
        <HeroSlideshow onExploreClick={scrollToIntroduction} />

        {/* Section 2: Bridal Beauty Introduction (Full-width bridal portrait) */}
        <IntroSection />

        {/* Section 3: Bridal Makeup Collections (Traditional, Modern, Reception Glam) */}
        <CollectionsSection onSelectLook={handleSelectLook} />

        {/* Section 4: The Bridal Transformation (Interactive Before/After Drag Slider) */}
        <TransformationSection />

        {/* Section 5: Makeup Artistry (The Art of Every Detail - Macro Compositions) */}
        <ArtistrySection />

        {/* Section 6: Booking Experience (Enquiry Form & "BOOK YOUR LOOK" CTA) */}
        <BookingSection
          preselectedPackage={selectedPackage}
          preselectedLook={selectedLook}
        />
      </main>

      {/* Section 9: Luxury Minimal Footer */}
      <Footer />
    </div>
  );
}
