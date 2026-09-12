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
    displayFont: '"Playfair Display", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#121212',
      textPrimary: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      accent: '#c83b4c',
      surface: 'rgba(30, 30, 30, 0.6)',
      surfaceBorder: 'rgba(255, 255, 255, 0.1)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #121212 0%, rgba(18,18,18,0.2) 60%, transparent 100%)',
      titleTransform: 'none',
      titleSize: '6rem',
      titleWeight: '700',
      titleSpacing: '0',
      alignment: 'left',
      imageTreatment: 'contrast(1.05) brightness(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(18, 18, 18, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
    }
  },
  kyoto: {
    id: 'kyoto',
    displayFont: '"Cormorant Garamond", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#161616',
      textPrimary: '#fffff0',
      textSecondary: 'rgba(255, 255, 240, 0.7)',
      accent: '#c94d3f',
      surface: 'rgba(30, 30, 30, 0.6)',
      surfaceBorder: 'rgba(255, 255, 240, 0.1)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #161616 0%, rgba(22,22,22,0.2) 60%, transparent 100%)',
      titleTransform: 'none',
      titleSize: '6rem',
      titleWeight: '400',
      titleSpacing: '0',
      alignment: 'left',
      imageTreatment: 'sepia(0.1) brightness(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(22, 22, 22, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 240, 0.05)',
    }
  },
  lahore: {
    id: 'lahore',
    displayFont: '"Cinzel", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#111a14',
      textPrimary: '#fffff0',
      textSecondary: 'rgba(255, 255, 240, 0.7)',
      accent: '#c0a062',
      surface: 'rgba(17, 26, 20, 0.6)',
      surfaceBorder: 'rgba(192, 160, 98, 0.15)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #111a14 0%, rgba(17,26,20,0.2) 60%, transparent 100%)',
      titleTransform: 'uppercase',
      titleSize: '6rem',
      titleWeight: '400',
      titleSpacing: '0.05em',
      alignment: 'left',
      imageTreatment: 'sepia(0.15) brightness(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(17, 26, 20, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(192, 160, 98, 0.1)',
    }
  },
  marrakech: {
    id: 'marrakech',
    displayFont: '"Cormorant Garamond", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#231a15',
      textPrimary: '#fffff0',
      textSecondary: 'rgba(255, 255, 240, 0.7)',
      accent: '#c86f5e',
      surface: 'rgba(35, 26, 21, 0.6)',
      surfaceBorder: 'rgba(200, 111, 94, 0.15)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #231a15 0%, rgba(35,26,21,0.2) 60%, transparent 100%)',
      titleTransform: 'none',
      titleSize: '6rem',
      titleWeight: '400',
      titleSpacing: '0',
      alignment: 'center',
      imageTreatment: 'sepia(0.2) contrast(1.05) brightness(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(35, 26, 21, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(200, 111, 94, 0.1)',
    }
  },
  paris: {
    id: 'paris',
    displayFont: '"Playfair Display", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#1a1a1a',
      textPrimary: '#fffff0',
      textSecondary: 'rgba(255, 255, 240, 0.7)',
      accent: '#a0a0a0',
      surface: 'rgba(26, 26, 26, 0.6)',
      surfaceBorder: 'rgba(255, 255, 240, 0.1)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #1a1a1a 0%, rgba(26,26,26,0.2) 60%, transparent 100%)',
      titleTransform: 'none',
      titleSize: '6rem',
      titleWeight: '400',
      titleSpacing: '0',
      alignment: 'center',
      imageTreatment: 'grayscale(0.1) contrast(1.05) brightness(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(26, 26, 26, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 240, 0.05)',
    }
  },
  amsterdam: {
    id: 'amsterdam',
    displayFont: '"Cormorant Garamond", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#171a1c',
      textPrimary: '#f4f7f6',
      textSecondary: 'rgba(244, 247, 246, 0.7)',
      accent: '#6c889e',
      surface: 'rgba(23, 26, 28, 0.6)',
      surfaceBorder: 'rgba(108, 136, 158, 0.15)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #171a1c 0%, rgba(23,26,28,0.2) 60%, transparent 100%)',
      titleTransform: 'none',
      titleSize: '6rem',
      titleWeight: '400',
      titleSpacing: '0',
      alignment: 'left',
      imageTreatment: 'contrast(1.05) brightness(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(23, 26, 28, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(108, 136, 158, 0.1)',
    }
  },
  venice: {
    id: 'venice',
    displayFont: '"Playfair Display", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#14181a',
      textPrimary: '#fffff0',
      textSecondary: 'rgba(255, 255, 240, 0.7)',
      accent: '#a86558',
      surface: 'rgba(20, 24, 26, 0.6)',
      surfaceBorder: 'rgba(168, 101, 88, 0.15)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #14181a 0%, rgba(20,24,26,0.2) 60%, transparent 100%)',
      titleTransform: 'none',
      titleSize: '6rem',
      titleWeight: '400',
      titleSpacing: '0',
      alignment: 'center',
      imageTreatment: 'sepia(0.1) contrast(1.05) brightness(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(20, 24, 26, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(168, 101, 88, 0.1)',
    }
  },
  bali: {
    id: 'bali',
    displayFont: '"Playfair Display", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#131713',
      textPrimary: '#fffff0',
      textSecondary: 'rgba(255, 255, 240, 0.7)',
      accent: '#8f9a7a',
      surface: 'rgba(19, 23, 19, 0.6)',
      surfaceBorder: 'rgba(143, 154, 122, 0.15)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #131713 0%, rgba(19,23,19,0.2) 60%, transparent 100%)',
      titleTransform: 'none',
      titleSize: '6rem',
      titleWeight: '400',
      titleSpacing: '0',
      alignment: 'center',
      imageTreatment: 'saturate(1.1) brightness(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(19, 23, 19, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(143, 154, 122, 0.1)',
    }
  },
  istanbul: {
    id: 'istanbul',
    displayFont: '"Cinzel", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#1a1918',
      textPrimary: '#fffff0',
      textSecondary: 'rgba(255, 255, 240, 0.7)',
      accent: '#9a8163',
      surface: 'rgba(26, 25, 24, 0.6)',
      surfaceBorder: 'rgba(154, 129, 99, 0.15)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #1a1918 0%, rgba(26,25,24,0.2) 60%, transparent 100%)',
      titleTransform: 'uppercase',
      titleSize: '6rem',
      titleWeight: '400',
      titleSpacing: '0.05em',
      alignment: 'left',
      imageTreatment: 'sepia(0.1) contrast(1.05) brightness(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(26, 25, 24, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(154, 129, 99, 0.1)',
    }
  },
  newyork: {
    id: 'newyork',
    displayFont: '"Oswald", sans-serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#121212',
      textPrimary: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      accent: '#8a949c',
      surface: 'rgba(30, 30, 30, 0.6)',
      surfaceBorder: 'rgba(138, 148, 156, 0.15)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #121212 0%, rgba(18,18,18,0.2) 60%, transparent 100%)',
      titleTransform: 'uppercase',
      titleSize: '6rem',
      titleWeight: '400',
      titleSpacing: '0',
      alignment: 'left',
      imageTreatment: 'contrast(1.05) brightness(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(18, 18, 18, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(138, 148, 156, 0.1)',
    }
  },
  santorini: {
    id: 'santorini',
    displayFont: '"Playfair Display", serif',
    secondaryFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    palette: {
      background: '#121a24',
      textPrimary: '#fffff0',
      textSecondary: 'rgba(255, 255, 240, 0.7)',
      accent: '#6e8a9e',
      surface: 'rgba(18, 26, 36, 0.6)',
      surfaceBorder: 'rgba(110, 138, 158, 0.15)',
    },
    heroStyle: {
      overlayGradient: 'linear-gradient(to top, #121a24 0%, rgba(18,26,36,0.2) 60%, transparent 100%)',
      titleTransform: 'none',
      titleSize: '6rem',
      titleWeight: '400',
      titleSpacing: '0',
      alignment: 'left',
      imageTreatment: 'contrast(1.05) brightness(0.95)',
    },
    texture: 'none',
    glassTreatment: {
      background: 'rgba(18, 26, 36, 0.4)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(110, 138, 158, 0.1)',
    }
  }
};

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
