import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Phone, User, Mail, MapPin, CheckCircle } from 'lucide-react';
import { BookingFormData } from '../types';
import { BRIDAL_PACKAGES } from '../data/atelierData';

interface BookingSectionProps {
  preselectedPackage?: string;
  preselectedLook?: string;
}

export function BookingSection({ preselectedPackage, preselectedLook }: BookingSectionProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    weddingDate: '',
    packageType: preselectedPackage || 'The Celestial Bride',
    makeupPreference: preselectedLook || 'Traditional Bridal',
    location: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  useEffect(() => {
    if (preselectedPackage) {
      setFormData((prev) => ({ ...prev, packageType: preselectedPackage }));
    }
  }, [preselectedPackage]);

  useEffect(() => {
    if (preselectedLook) {
      setFormData((prev) => ({ ...prev, makeupPreference: preselectedLook }));
    }
  }, [preselectedLook]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.weddingDate) return;

    const randomCode = `RS-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(randomCode);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      weddingDate: '',
      packageType: 'The Celestial Bride',
      makeupPreference: 'Traditional Bridal',
      location: '',
      notes: ''
    });
  };

  return (
    <section id="booking" className="w-full bg-[#FAF7F2] py-28 md:py-36 border-t border-[#E8DFD8]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Minimal Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C99583] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Concierge</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#201A18] tracking-[0.06em] font-light uppercase mt-3">
            YOUR BRIDAL MOMENT STARTS HERE.
          </h2>

          <div className="w-16 h-[1px] bg-[#C99583] mt-5" />
        </div>

        {/* Form Container with 3D Shadow Depth */}
        <div className="bg-[#FAF7F2] border border-[#EADBCE] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#F3ECE2] rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 flex flex-col items-center text-center max-w-lg mx-auto"
            >
              <div className="w-14 h-14 rounded-full bg-[#F3ECE2] text-[#C99583] flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7" />
              </div>

              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#C99583]">
                Reservation #{confirmationCode}
              </span>

              <h3 className="font-serif text-3xl text-[#201A18] uppercase font-light mt-1">
                Thank You, {formData.fullName.split(' ')[0]}
              </h3>

              <p className="text-xs sm:text-sm text-[#726863] mt-3 leading-relaxed font-light">
                Your wedding date (<strong className="text-[#201A18]">{formData.weddingDate}</strong>) has been reserved. Our bridal concierge will reach out to <strong className="text-[#201A18]">{formData.phone}</strong> within 24 hours.
              </p>

              <div className="w-full bg-[#F5EFE8] rounded-xl p-5 mt-6 border border-[#E5DAD0] text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-[#EFE7DE] pb-2">
                  <span className="text-[#8C8079]">Package:</span>
                  <span className="font-medium text-[#201A18]">{formData.packageType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8C8079]">Aesthetic:</span>
                  <span className="font-medium text-[#201A18]">{formData.makeupPreference}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-6 px-7 py-3 bg-[#201A18] text-[#FAF7F2] text-xs font-medium tracking-[0.2em] uppercase rounded-full hover:bg-[#C99583] transition-colors cursor-pointer"
              >
                New Reservation
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-medium text-[#201A18] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Elena Rostova"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#D8CEBF] rounded-xl text-sm text-[#201A18] focus:outline-hidden focus:border-[#C99583] transition-colors"
                  />
                  <User className="absolute right-3.5 top-3 w-4 h-4 text-[#A89D96]" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-medium text-[#201A18] mb-1.5">
                  Contact Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#D8CEBF] rounded-xl text-sm text-[#201A18] focus:outline-hidden focus:border-[#C99583] transition-colors"
                  />
                  <Phone className="absolute right-3.5 top-3 w-4 h-4 text-[#A89D96]" />
                </div>
              </div>

              {/* Wedding Date */}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-medium text-[#201A18] mb-1.5">
                  Wedding Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.weddingDate}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#D8CEBF] rounded-xl text-sm text-[#201A18] focus:outline-hidden focus:border-[#C99583] transition-colors"
                />
              </div>

              {/* Makeup Preference */}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-medium text-[#201A18] mb-1.5">
                  Makeup Preference
                </label>
                <select
                  value={formData.makeupPreference}
                  onChange={(e) => setFormData({ ...formData, makeupPreference: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#D8CEBF] rounded-xl text-sm text-[#201A18] focus:outline-hidden focus:border-[#C99583] transition-colors"
                >
                  <option value="Traditional Bridal">Traditional Bridal (Gold & Rose)</option>
                  <option value="Modern Bridal">Modern Bridal (Dewy Glass Skin)</option>
                  <option value="Reception Glam">Reception Glam (Smoky Shimmer)</option>
                </select>
              </div>

              {/* Package Selection */}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-medium text-[#201A18] mb-1.5">
                  Package
                </label>
                <select
                  value={formData.packageType}
                  onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#D8CEBF] rounded-xl text-sm text-[#201A18] focus:outline-hidden focus:border-[#C99583] transition-colors"
                >
                  {BRIDAL_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.name}>
                      {pkg.name} ({pkg.pricing})
                    </option>
                  ))}
                </select>
              </div>

              {/* City / Venue */}
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] font-medium text-[#201A18] mb-1.5">
                  City / Venue
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Paris · Lake Como · New York"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#D8CEBF] rounded-xl text-sm text-[#201A18] focus:outline-hidden focus:border-[#C99583] transition-colors"
                  />
                  <MapPin className="absolute right-3.5 top-3 w-4 h-4 text-[#A89D96]" />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#201A18] text-[#FAF7F2] text-xs font-semibold tracking-[0.25em] uppercase rounded-full hover:bg-[#C99583] hover:scale-[1.01] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C99583]" />
                  <span>BOOK YOUR LOOK</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
