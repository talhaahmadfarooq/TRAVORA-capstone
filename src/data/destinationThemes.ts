import React from 'react';
import * as TitleAssets from '../components/destinations/TitleAssets';

export type TitleMode = 'font' | 'svg' | 'image';

export type DestinationTheme = {
  id: string;
  displayFont: string;
  secondaryFont: string;
  bodyFont: string;
  titleMode: TitleMode;
  TitleComponent?: React.FC<any>;
  colorGrade: {
    pageBackground: string;
    overlayGradient: string;
    glassBackground: string;
    glassBorder: string;
    glassBlur: string;
  };
  palette: {
    textPrimary: string;
    textSecondary: string;
    accent: string;
  };
  heroStyle: {
    alignment: 'left' | 'center' | 'asymmetric';
    imageTreatment: string;
    titleWidth: string; // To control the SVG width
  };
  texture: string;
};

export const DESTINATION_THEMES: Record<string, DestinationTheme> = {
  tokyo: {
    id: 'tokyo',
    displayFont: '"Permanent Marker", cursive',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    titleMode: 'svg',
    TitleComponent: TitleAssets.TokyoTitle,
    colorGrade: {
      pageBackground: '#020202', // Deep blacks
      overlayGradient: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 45%, transparent 100%), linear-gradient(to top, #020202 0%, transparent 35%)',
      glassBackground: 'rgba(10, 10, 15, 0.4)', // Cool urban shadows
      glassBorder: 'rgba(255, 42, 95, 0.1)', // Restrained red/neon accent in border
      glassBlur: '12px',
    },
    palette: {
      textPrimary: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      accent: '#ff2a5f',
    },
    heroStyle: {
      alignment: 'left',
      imageTreatment: 'contrast(1.1) brightness(0.9) saturate(1.2)',
      titleWidth: '600px',
    },
    texture: 'none',
  },
  kyoto: {
    id: 'kyoto',
    displayFont: '"Shippori Mincho", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    titleMode: 'svg',
    TitleComponent: TitleAssets.KyotoTitle,
    colorGrade: {
      pageBackground: '#0d1110', // Muted charcoal
      overlayGradient: 'linear-gradient(to right, rgba(13,17,16,0.9) 0%, rgba(13,17,16,0.4) 40%, transparent 100%), linear-gradient(to top, #0d1110 0%, transparent 40%)',
      glassBackground: 'rgba(20, 25, 22, 0.5)', 
      glassBorder: 'rgba(232, 211, 179, 0.1)', // Warm wood tone
      glassBlur: '16px',
    },
    palette: {
      textPrimary: '#f4f4f4',
      textSecondary: 'rgba(244, 244, 244, 0.65)',
      accent: '#e8d3b3',
    },
    heroStyle: {
      alignment: 'left',
      imageTreatment: 'sepia(0.1) contrast(1.05) brightness(0.95)',
      titleWidth: '500px',
    },
    texture: 'none',
  },
  lahore: {
    id: 'lahore',
    displayFont: '"Playfair Display", serif',
    secondaryFont: '"Cormorant Garamond", serif',
    bodyFont: '"Inter", sans-serif',
    titleMode: 'svg',
    TitleComponent: TitleAssets.LahoreTitle,
    colorGrade: {
      pageBackground: '#130d08', // Warm sandstone / dark brown
      overlayGradient: 'linear-gradient(to right, rgba(19,13,8,0.95) 0%, rgba(19,13,8,0.5) 45%, transparent 100%), linear-gradient(to top, #130d08 0%, transparent 35%)',
      glassBackground: 'rgba(30, 22, 15, 0.45)', // Golden evening light
      glassBorder: 'rgba(216, 164, 127, 0.15)', 
      glassBlur: '16px',
    },
    palette: {
      textPrimary: '#f8eedc',
      textSecondary: 'rgba(248, 238, 220, 0.7)',
      accent: '#d8a47f',
    },
    heroStyle: {
      alignment: 'left',
      imageTreatment: 'sepia(0.25) contrast(1.1) brightness(0.9)',
      titleWidth: '550px',
    },
    texture: 'url("/textures/subtle-noise.png")', // Example texture
  },
  amsterdam: {
    id: 'amsterdam',
    displayFont: '"Playfair Display", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    titleMode: 'svg',
    TitleComponent: TitleAssets.AmsterdamTitle,
    colorGrade: {
      pageBackground: '#0b1219', // Cool blue-gray
      overlayGradient: 'linear-gradient(to top, #0b1219 0%, rgba(11,18,25,0.4) 60%, transparent 100%)',
      glassBackground: 'rgba(15, 25, 35, 0.5)',
      glassBorder: 'rgba(255, 255, 255, 0.08)',
      glassBlur: '16px',
    },
    palette: {
      textPrimary: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      accent: '#d96c5b', // Restrained orange/red
    },
    heroStyle: {
      alignment: 'center',
      imageTreatment: 'contrast(1.1) brightness(0.85) saturate(0.9)',
      titleWidth: '800px',
    },
    texture: 'none',
  },
  marrakech: {
    id: 'marrakech',
    displayFont: '"Cinzel Decorative", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    titleMode: 'svg',
    TitleComponent: TitleAssets.MarrakechTitle,
    colorGrade: {
      pageBackground: '#1c1008', // Terracotta shadow
      overlayGradient: 'linear-gradient(to right, rgba(28,16,8,0.95) 0%, rgba(28,16,8,0.4) 45%, transparent 100%), linear-gradient(to top, #1c1008 0%, transparent 40%)',
      glassBackground: 'rgba(40, 20, 10, 0.4)', // Warm sand
      glassBorder: 'rgba(209, 122, 69, 0.2)',
      glassBlur: '12px',
    },
    palette: {
      textPrimary: '#f8e5c0',
      textSecondary: 'rgba(248, 229, 192, 0.7)',
      accent: '#d17a45',
    },
    heroStyle: {
      alignment: 'left',
      imageTreatment: 'sepia(0.2) contrast(1.15) brightness(0.85) saturate(1.2)',
      titleWidth: '600px',
    },
    texture: 'none',
  },
  paris: {
    id: 'paris',
    displayFont: '"Great Vibes", cursive',
    secondaryFont: '"Cormorant Garamond", serif',
    bodyFont: '"Inter", sans-serif',
    titleMode: 'svg',
    TitleComponent: TitleAssets.ParisTitle,
    colorGrade: {
      pageBackground: '#0d0d0f', // Monochrome/cream base
      overlayGradient: 'linear-gradient(to right, rgba(13,13,15,0.9) 0%, rgba(13,13,15,0.3) 45%, transparent 100%), linear-gradient(to top, #0d0d0f 0%, transparent 30%)',
      glassBackground: 'rgba(20, 20, 22, 0.35)', 
      glassBorder: 'rgba(230, 200, 166, 0.15)', // Warm champagne
      glassBlur: '16px',
    },
    palette: {
      textPrimary: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.75)',
      accent: '#e6c8a6',
    },
    heroStyle: {
      alignment: 'left',
      imageTreatment: 'sepia(0.1) contrast(1.1) brightness(0.9) grayscale(0.2)', // Fashion editorial contrast
      titleWidth: '550px',
    },
    texture: 'none',
  },
  venice: {
    id: 'venice',
    displayFont: '"Playfair Display", serif',
    secondaryFont: '"Cormorant Garamond", serif',
    bodyFont: '"Inter", sans-serif',
    titleMode: 'svg',
    TitleComponent: TitleAssets.VeniceTitle,
    colorGrade: {
      pageBackground: '#120f0c',
      overlayGradient: 'linear-gradient(to top, #120f0c 0%, rgba(18,15,12,0.3) 50%, transparent 100%)',
      glassBackground: 'rgba(26, 20, 18, 0.5)',
      glassBorder: 'rgba(212, 175, 55, 0.1)',
      glassBlur: '16px',
    },
    palette: {
      textPrimary: '#f8f4ec',
      textSecondary: 'rgba(248, 244, 236, 0.7)',
      accent: '#d4af37',
    },
    heroStyle: {
      alignment: 'center',
      imageTreatment: 'sepia(0.2) contrast(1.05) brightness(0.95)',
      titleWidth: '600px',
    },
    texture: 'none',
  },
  istanbul: {
    id: 'istanbul',
    displayFont: '"Cinzel", serif',
    secondaryFont: '"Cormorant Garamond", serif',
    bodyFont: '"Inter", sans-serif',
    titleMode: 'svg',
    TitleComponent: TitleAssets.IstanbulTitle,
    colorGrade: {
      pageBackground: '#121110',
      overlayGradient: 'linear-gradient(to right, #121110 0%, rgba(18,17,16,0.6) 40%, transparent 100%)',
      glassBackground: 'rgba(40, 35, 33, 0.5)',
      glassBorder: 'rgba(232, 228, 219, 0.08)',
      glassBlur: '16px',
    },
    palette: {
      textPrimary: '#e8e4db',
      textSecondary: 'rgba(232, 228, 219, 0.7)',
      accent: '#7f9ebf',
    },
    heroStyle: {
      alignment: 'left',
      imageTreatment: 'sepia(0.1) contrast(0.95) brightness(0.9)',
      titleWidth: '600px',
    },
    texture: 'none',
  },
  santorini: {
    id: 'santorini',
    displayFont: '"Cinzel Decorative", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    titleMode: 'svg',
    TitleComponent: TitleAssets.SantoriniTitle,
    colorGrade: {
      pageBackground: '#0a1219',
      overlayGradient: 'linear-gradient(to top, #0a1219 0%, transparent 60%)',
      glassBackground: 'rgba(15, 30, 45, 0.5)',
      glassBorder: 'rgba(255, 255, 255, 0.1)',
      glassBlur: '16px',
    },
    palette: {
      textPrimary: '#f2f8fa',
      textSecondary: 'rgba(242, 248, 250, 0.7)',
      accent: '#65c4d9',
    },
    heroStyle: {
      alignment: 'center',
      imageTreatment: 'brightness(0.9) contrast(1.1)',
      titleWidth: '700px',
    },
    texture: 'none',
  },
  newyork: {
    id: 'newyork',
    displayFont: '"Anton", sans-serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    titleMode: 'svg',
    TitleComponent: TitleAssets.NewYorkTitle,
    colorGrade: {
      pageBackground: '#050505',
      overlayGradient: 'linear-gradient(to right, #050505 0%, rgba(5,5,5,0.8) 35%, transparent 100%), linear-gradient(to top, #050505 0%, transparent 30%)',
      glassBackground: 'rgba(15, 15, 15, 0.5)',
      glassBorder: 'rgba(255, 255, 255, 0.1)',
      glassBlur: '12px',
    },
    palette: {
      textPrimary: '#ffffff',
      textSecondary: '#a0a0a0',
      accent: '#f3c300',
    },
    heroStyle: {
      alignment: 'left',
      imageTreatment: 'grayscale(0.8) contrast(1.2) brightness(0.9)',
      titleWidth: '700px',
    },
    texture: 'none',
  },
  bali: {
    id: 'bali',
    displayFont: '"Caveat", cursive',
    secondaryFont: '"Playfair Display", serif',
    bodyFont: '"Inter", sans-serif',
    titleMode: 'svg',
    TitleComponent: TitleAssets.BaliTitle,
    colorGrade: {
      pageBackground: '#080d09',
      overlayGradient: 'linear-gradient(to top, #080d09 0%, rgba(8,13,9,0.5) 50%, transparent 100%)',
      glassBackground: 'rgba(15, 25, 18, 0.5)',
      glassBorder: 'rgba(212, 163, 115, 0.1)',
      glassBlur: '16px',
    },
    palette: {
      textPrimary: '#f5efe6',
      textSecondary: 'rgba(245, 239, 230, 0.7)',
      accent: '#d4a373',
    },
    heroStyle: {
      alignment: 'center',
      imageTreatment: 'sepia(0.2) saturate(1.2) contrast(1.1) brightness(0.9)',
      titleWidth: '600px',
    },
    texture: 'none',
  },
};

export const DEFAULT_THEME: DestinationTheme = {
  id: 'default',
  displayFont: '"Playfair Display", serif',
  secondaryFont: '"Inter", sans-serif',
  bodyFont: '"Inter", sans-serif',
  titleMode: 'font',
  colorGrade: {
    pageBackground: '#0a0f19',
    overlayGradient: 'linear-gradient(to top, #0a0f19 0%, rgba(10,15,25,0.5) 60%, transparent 100%)',
    glassBackground: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
    glassBlur: '16px',
  },
  palette: {
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    accent: '#e2b170',
  },
  heroStyle: {
    alignment: 'left',
    imageTreatment: 'none',
    titleWidth: '500px',
  },
  texture: 'none',
};
