import { BridalLook, BridalPackage, GalleryItem } from '../types';

export const ATELIER_INFO = {
  name: 'ÉLÉGANCE',
  tagline: 'Where Beauty Meets Elegance',
  heroHeadline: 'BEAUTY, REIMAGINED.',
  heroSubtitle: 'The Art of Bridal Beauty',
  quote: 'Every bride possesses an innate, transcendent luminosity. Our artistry does not mask—it unveils the timeless masterpiece already within you.',
  founder: 'Élégance Atelier',
  role: 'Haute Bridal Couturier & Principal Makeup Artist',
  founded: 'Est. 2018',
  locations: ['Paris', 'London', 'New York', 'Mumbai'],
  contactPhone: '+1 (800) 492-7489',
  contactEmail: 'concierge@elegancebridal.com',
  instagram: '@elegance.bridal.atelier'
};

export const BRIDAL_LOOKS: BridalLook[] = [
  {
    id: 'traditional-bridal',
    title: 'Traditional Bridal',
    subtitle: 'Regal Heritage & Majestic Radiance',
    category: 'traditional',
    image: '/assets/images/bridal_traditional_look_1793681582782.jpg',
    description:
      'A breathtaking union of imperial grandeur and velvet skin perfection. Crafted for ceremonial splendor, featuring warm antique gold-leaf highlights, sculpted rose-petal velvet lips, and eyes framed by heritage opulence.',
    skinFinish: 'Velvet luminous satin, high-longevity humidity-proof base',
    eyeFocus: 'Subtle 24K gold foil wash, seamless winged definition, feathered silk lashes',
    lipProfile: 'Rich royal rose with custom satin finish and contour definition',
    duration: '3.5 Hours',
    idealFor: 'Traditional rituals, temple ceremonies, Anand Karaj, and heritage wedding vows',
    paletteNotes: ['Antique Gold', 'Crimson Velvet', 'Warm Sandstone', 'Rosewood']
  },
  {
    id: 'modern-bridal',
    title: 'Modern Bridal',
    subtitle: 'Glass-Skin Elegance & Parisian Chic',
    category: 'modern',
    image: '/assets/images/bridal_modern_look_1793681583712.jpg',
    description:
      'Effortless haute-couture minimalism. Centered around translucent, porcelain glass skin, feathered natural brows, and a monochrome wash of soft nude-peach tones that mirror natural morning luminescence.',
    skinFinish: 'Dewy glass skin, ultra-sheer weightless water-infused veil',
    eyeFocus: 'Soft champagne light reflection, invisible lash line, brushed lamination brow',
    lipProfile: 'Pouty nude-peach with organic peptide gloss glaze',
    duration: '2.5 Hours',
    idealFor: 'Contemporary chateau ceremonies, modern minimalist gowns, and editorial destination weddings',
    paletteNotes: ['Nude Peach', 'Champagne Pearl', 'Soft Alabaster', 'Warm Cashmere']
  },
  {
    id: 'reception-glam',
    title: 'Reception Glam',
    subtitle: 'Candlelight Shimmer & Black-Tie Drama',
    category: 'reception',
    image: '/assets/images/bridal_reception_glam_1793681584455.jpg',
    description:
      'Designed to mesmerize beneath grand chandeliers and candlelight. Features multidimensional bronze-champagne micro-pigments, sculpted cheekbone architecture, and a luscious couture nude pout.',
    skinFinish: 'Sculpted candlelight glow with soft-focus diamond diffuse setting',
    eyeFocus: 'Smoky champagne shimmer, dimensional cut crease, cat-eye lash flare',
    lipProfile: 'Caramel nude with high-shine lacquer glaze and warm undertones',
    duration: '2.5 Hours',
    idealFor: 'Evening receptions, black-tie galas, sangeet night celebrations, and after-parties',
    paletteNotes: ['Champagne Bronze', 'Warm Cocoa', 'Diamond Shimmer', 'Honey Nude']
  }
];

export const ARTISTRY_DETAILS = [
  {
    id: 'complexion',
    title: 'Poreless Luminescence',
    subtitle: 'Skin Chemistry & Micro-Milled Radiance',
    description:
      'We tailor custom botanical emulsions and microscopic light-refracting pigments directly to your skin’s biological undertones, ensuring a radiant, breathable finish that photographs impeccably in high definition 8K.',
    image: '/assets/images/makeup_detail_complexion_1793681618673.jpg',
    metrics: '18-Hour Wear · Flashback-Free'
  },
  {
    id: 'eyes',
    title: 'Subtle Shimmer & Soul',
    subtitle: 'Dimensional Eye Architecture',
    description:
      'Each eye look is a delicate interplay of champagne pigments, hand-placed single silk fibers, and seamless gradients designed to accentuate the natural cadence of your gaze without heavy weight.',
    image: '/assets/images/makeup_detail_eyeshadow_1793681618560.jpg',
    metrics: 'Custom Mink & Silk Lashes · Waterproof'
  },
  {
    id: 'lips',
    title: 'Sculpted Satin Lips',
    subtitle: 'Hyaluronic Infusion & Bespoke Pigment',
    description:
      'Custom blended pigments pressed with botanical emollients and peptides create a pillow-soft, kiss-proof satin finish that retains hydration through emotional vows, champagne toasts, and midnight dancing.',
    image: '/assets/images/makeup_detail_lips_1793681618415.jpg',
    metrics: 'Transfer-Resistant · Peptide Plumped'
  }
];

export const BRIDAL_PACKAGES: BridalPackage[] = [
  {
    id: 'package-celestial',
    name: 'The Celestial Bride',
    tier: 'Signature Wedding Day Experience',
    tagline: 'Flawless single-day couture makeup crafted exclusively for your ceremony and reception.',
    pricing: '$1,850',
    idealFor: 'Single-day weddings, elegant chateau vows, and destination brides',
    popular: true,
    highlights: [
      'Comprehensive in-studio luxury trial & digital look blueprint',
      'Full bespoke wedding day makeup with customized skincare prep',
      'Handcrafted silk lashes & Veil / Dupatta draping assistance',
      'Emergency bridal touchup vanity case with full-size lip product'
    ],
    features: [
      'Dedicated lead artist on-site for 4 hours',
      'Diamond powder setting & 18-hour setting elixir',
      'Collarbone & décolletage body radiance glow',
      'Complimentary mini-facial prep mask session'
    ]
  },
  {
    id: 'package-royal',
    name: 'The Royal Heirloom',
    tier: 'Multi-Event Bridal Retinue',
    tagline: 'An all-encompassing bridal beauty journey spanning every celebration of your wedding weekend.',
    pricing: '$3,950',
    idealFor: 'Traditional, multi-day weddings, Sangeet & Reception weekends',
    highlights: [
      'Coverage for 3 key events (e.g. Sangeet / Mehendi, Ceremony, Reception)',
      'Two complete trials exploring daytime vs. evening aesthetics',
      'Mother-of-the-bride or Maid-of-Honor signature look included',
      'All-day touchup artist on standby during photography sessions'
    ],
    features: [
      'Unrestricted look changes between ceremony and reception',
      'Hair adornment and jewelry placement styling',
      '24/7 bridal concierge coordination in the weeks prior',
      'Luxury bridal robe and silk vanity gift set'
    ]
  },
  {
    id: 'package-intimate',
    name: 'The Modern Intimate',
    tier: 'Minimalist & Elopement Couture',
    tagline: 'Concentrated luxury designed for intimate weddings, elopements, and micro-ceremonies.',
    pricing: '$1,250',
    idealFor: 'City hall nuptials, sunrise elopements, and private family vows',
    highlights: [
      'Full bridal skin preparation and signature dewy finish',
      'Feathered lash extension accents & bespoke lip blend',
      'Express pre-wedding virtual consultation & skin prep guide',
      'Compact touchup kit with blotting papers and satin gloss'
    ],
    features: [
      'On-location service within 30 miles',
      'Transfer-proof waterproof seal for emotional vows',
      'Fast 90-minute perfected execution',
      'High-resolution polaroid keepsake shot'
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: 'The Cathedral Reverie',
    category: 'Ceremony',
    image: '/assets/images/bridal_gallery_veil_1793681619249.jpg',
    aspect: 'portrait',
    caption: 'Lace embroidery and morning sunbeams inside a Parisian salon.'
  },
  {
    id: 'gallery-2',
    title: 'Velvet Heritage',
    category: 'Traditional',
    image: '/assets/images/bridal_traditional_look_1793681582782.jpg',
    aspect: 'portrait',
    caption: 'Antique gold filigree and regal velvet rose makeup.'
  },
  {
    id: 'gallery-3',
    title: 'Chateau Luminescence',
    category: 'Editorial',
    image: '/assets/images/bridal_intro_portrait_1793681581412.jpg',
    aspect: 'landscape',
    caption: 'Full-length bridal portrait with romantic peony bouquet and lace veil.'
  },
  {
    id: 'gallery-4',
    title: 'Minimalist Splendor',
    category: 'Modern',
    image: '/assets/images/bridal_modern_look_1793681583712.jpg',
    aspect: 'portrait',
    caption: 'Contemporary square-neck gown with sculpted luminous glass skin.'
  },
  {
    id: 'gallery-5',
    title: 'Gilded Starlight',
    category: 'Reception',
    image: '/assets/images/bridal_reception_glam_1793681584455.jpg',
    aspect: 'portrait',
    caption: 'Chandelier illumination and champagne smoky eye artistry.'
  },
  {
    id: 'gallery-6',
    title: 'The Golden Hour Gaze',
    category: 'Details',
    image: '/assets/images/makeup_detail_eyeshadow_1793681618560.jpg',
    aspect: 'square',
    caption: 'Delicate micro-glitter pigments catching the amber sunset.'
  }
];
