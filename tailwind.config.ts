import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)', 'sans-serif'],
        'playfair': ['var(--font-playfair)', 'serif'],
      },
      colors: {
        'coffee': {
          bg: {
            primary: '#2D1810',
            secondary: '#3D2820',
          },
          border: '#5A4034',
          text: {
            primary: '#F5E6D3',
            secondary: '#C9B8A0',
          },
          accent: '#4F9C8F',
          gold: '#FFD700',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-20px,0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(79, 156, 143, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(79, 156, 143, 0.6)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
