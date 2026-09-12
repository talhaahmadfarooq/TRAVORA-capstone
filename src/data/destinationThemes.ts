export type DestinationTheme = {
  id: string;
  displayFont: string;
  secondaryFont: string;
  bodyFont: string;
  palette: {
    background: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    surface: string;
    surfaceBorder: string;
  };
  heroStyle: {
    overlayGradient: string;
    titleTransform: string;
    titleSize: string;
    titleWeight: string;
    titleSpacing: string;
    alignment: 'left' | 'center' | 'asymmetric';
    imageTreatment: string;
  };
  texture: string;
  glassTreatment: {
    background: string;
    backdropFilter: string;
    border: string;
  };
};

export const DESTINATION_THEMES: Record<string, DestinationTheme> = {
  tokyo: {
    id: 'tokyo',
    displayFont: '"Kaushan Script", cursive, "Yu Gothic", sans-serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#050505',
      textPrimary: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      accent: '#ff2a5f',
      surface: 'rgba(10, 10, 15, 0.6)',
      surfaceBorder: 'rgba(255, 255, 255, 0.1)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%), linear-gradient(to top, #050505 0%, transparent 40%)',
      titleTransform: 'none',
      titleSize: '8rem',
      titleWeight: '700',
      titleSpacing: '0',
      alignment: 'left',
      imageTreatment: 'contrast(1.1) brightness(0.9)',
    },
    texture: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
    glassTreatment: {
      background: 'rgba(5, 5, 5, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
    }
  },
  venice: {
    id: 'venice',
    displayFont: '"Playfair Display", serif',
    secondaryFont: '"Cormorant Garamond", serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#1a1412',
      textPrimary: '#f8f4ec',
      textSecondary: 'rgba(248, 244, 236, 0.7)',
      accent: '#d4af37',
      surface: 'rgba(30, 24, 20, 0.4)',
      surfaceBorder: 'rgba(212, 175, 55, 0.15)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #1a1412 0%, rgba(26,20,18,0.2) 60%, transparent 100%)',
      titleTransform: 'none',
      titleSize: '9rem',
      titleWeight: '400',
      titleSpacing: '-0.02em',
      alignment: 'center',
      imageTreatment: 'sepia(0.2) contrast(1.05) brightness(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(26, 20, 18, 0.4)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(212, 175, 55, 0.1)',
    }
  },
  istanbul: {
    id: 'istanbul',
    displayFont: '"Cinzel", serif',
    secondaryFont: '"Cormorant Garamond", serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#e8e4db',
      textPrimary: '#1a1f24',
      textSecondary: 'rgba(26, 31, 36, 0.7)',
      accent: '#4a6b8c',
      surface: 'rgba(255, 255, 255, 0.4)',
      surfaceBorder: 'rgba(0, 0, 0, 0.1)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to right, #e8e4db 0%, rgba(232,228,219,0.7) 40%, transparent 100%)',
      titleTransform: 'uppercase',
      titleSize: '7rem',
      titleWeight: '400',
      titleSpacing: '0.05em',
      alignment: 'left',
      imageTreatment: 'sepia(0.1) contrast(0.95)',
    },
    texture: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
    glassTreatment: {
      background: 'rgba(232, 228, 219, 0.4)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
    }
  },
  santorini: {
    id: 'santorini',
    displayFont: '"Cinzel Decorative", serif',
    secondaryFont: '"Herr Von Muellerhoff", cursive',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#f2f8fa',
      textPrimary: '#1e3d59',
      textSecondary: 'rgba(30, 61, 89, 0.7)',
      accent: '#17b9d6',
      surface: 'rgba(255, 255, 255, 0.6)',
      surfaceBorder: 'rgba(30, 61, 89, 0.1)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #f2f8fa 0%, transparent 60%)',
      titleTransform: 'uppercase',
      titleSize: '6.5rem',
      titleWeight: '400',
      titleSpacing: '0.1em',
      alignment: 'asymmetric',
      imageTreatment: 'brightness(1.05) contrast(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(255, 255, 255, 0.5)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
    }
  },
  newyork: {
    id: 'newyork',
    displayFont: '"Anton", sans-serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#0a0a0a',
      textPrimary: '#ffffff',
      textSecondary: '#a0a0a0',
      accent: '#f3c300', // Taxi yellow
      surface: 'rgba(20, 20, 20, 0.8)',
      surfaceBorder: 'rgba(255, 255, 255, 0.15)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.8) 30%, transparent 100%), linear-gradient(to top, #0a0a0a 0%, transparent 30%)',
      titleTransform: 'uppercase',
      titleSize: '9rem',
      titleWeight: '400',
      titleSpacing: '-0.02em',
      alignment: 'left',
      imageTreatment: 'grayscale(100%) contrast(1.2) brightness(0.9)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(10, 10, 10, 0.6)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }
  },
  bali: {
    id: 'bali',
    displayFont: '"Caveat", cursive',
    secondaryFont: '"Playfair Display", serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#0d120e',
      textPrimary: '#f5efe6',
      textSecondary: 'rgba(245, 239, 230, 0.7)',
      accent: '#d4a373',
      surface: 'rgba(20, 30, 22, 0.4)',
      surfaceBorder: 'rgba(212, 163, 115, 0.15)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #0d120e 0%, rgba(13,18,14,0.4) 50%, transparent 100%)',
      titleTransform: 'none',
      titleSize: '10rem',
      titleWeight: '700',
      titleSpacing: '0',
      alignment: 'center',
      imageTreatment: 'sepia(0.3) saturate(1.2) contrast(1.1) brightness(0.9)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(20, 30, 22, 0.3)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(212, 163, 115, 0.1)',
    }
  },
};

// Fallback theme for any undefined destinations
export const DEFAULT_THEME: DestinationTheme = {
  id: 'default',
  displayFont: '"Playfair Display", serif',
  secondaryFont: '"Inter", sans-serif',
  bodyFont: '"Inter", sans-serif',
  palette: {
    background: '#0a0f19',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    accent: '#e2b170',
    surface: 'rgba(255, 255, 255, 0.03)',
    surfaceBorder: 'rgba(255, 255, 255, 0.1)',
  },
  heroStyle: {
    overlayGradient: 'linear-gradient(to top, #0a0f19 0%, rgba(10,15,25,0.4) 60%, transparent 100%)',
    titleTransform: 'none',
    titleSize: '6rem',
    titleWeight: '400',
    titleSpacing: '0',
    alignment: 'left',
    imageTreatment: 'none',
  },
  texture: 'none',
  glassTreatment: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  }
};
