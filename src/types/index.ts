export interface BridalLook {
  id: string;
  title: string;
  subtitle: string;
  category: 'traditional' | 'modern' | 'reception';
  image: string;
  description: string;
  skinFinish: string;
  eyeFocus: string;
  lipProfile: string;
  duration: string;
  idealFor: string;
  paletteNotes: string[];
}

export interface BridalPackage {
  id: string;
  name: string;
  tier: string;
  tagline: string;
  pricing: string;
  idealFor: string;
  highlights: string[];
  features: string[];
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: 'portrait' | 'square' | 'landscape';
  caption: string;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  weddingDate: string;
  packageType: string;
  makeupPreference: string;
  location: string;
  notes: string;
}
