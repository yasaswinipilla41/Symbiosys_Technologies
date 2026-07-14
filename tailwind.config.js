/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // The void — pure black is every surface
        void: '#000000',
        paper: {
          DEFAULT: '#000000',
          2: '#000000',
          3: '#050505',
        },
        // Typographic colors on the void
        ink: {
          DEFAULT: '#FFFFFF', // bone white — primary text
          soft: '#E4E4E6',
        },
        muted: {
          DEFAULT: '#9A9A9A', // ash gray — secondary
          light: '#BDBDBD', // silver mist — tertiary
        },
        // Faint separators only (no strong borders in this system)
        line: {
          DEFAULT: 'rgba(255,255,255,0.10)',
          soft: 'rgba(255,255,255,0.06)',
        },
        charcoal: {
          DEFAULT: '#000000',
          800: '#000000',
          700: '#070707',
        },
        navy: {
          DEFAULT: '#062B45',
          900: '#04202f',
          800: '#062B45',
          700: '#0a3a5c',
        },
        royal: {
          DEFAULT: '#0A4D80',
          light: '#0d63a3',
        },
        // Single saturated action accent (Symbiosys cyan) + warm spark
        accent: {
          DEFAULT: '#00B5E2',
          soft: '#4FD3F5',
          deep: '#0A4D80',
        },
        spark: {
          DEFAULT: '#F58220', // warm emphasis (labels, accents)
          soft: '#FFC107',
        },
        verdant: '#15846E',
        brand: {
          orange: '#F58220',
          yellow: '#FFC107',
          green: '#7BC043',
          cyan: '#00B5E2',
        },
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px -24px rgba(11,22,34,0.22)',
        glow: '0 0 40px -5px rgba(46,139,255,0.5)',
        card: '0 30px 80px -34px rgba(11,22,34,0.4)',
        'card-hover': '0 40px 90px -30px rgba(11,22,34,0.5)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg,#0A4D80 0%,#2E8BFF 60%,#00B5E2 100%)',
        'mesh': 'radial-gradient(at 20% 20%, rgba(46,139,255,0.22) 0px, transparent 55%), radial-gradient(at 82% 12%, rgba(0,181,226,0.18) 0px, transparent 52%), radial-gradient(at 70% 82%, rgba(10,77,128,0.28) 0px, transparent 55%), radial-gradient(at 8% 88%, rgba(46,139,255,0.16) 0px, transparent 55%)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        spinslow: { to: { transform: 'rotate(360deg)' } },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseglow: {
          '0%,100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        gradientmove: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        auroradrift: {
          '0%,100%': { transform: 'translate3d(-3%,-2%,0) scale(1.05)' },
          '33%': { transform: 'translate3d(5%,4%,0) scale(1.18)' },
          '66%': { transform: 'translate3d(-2%,6%,0) scale(1.1)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'floaty-slow': 'floaty 9s ease-in-out infinite',
        spinslow: 'spinslow 26s linear infinite',
        'spinslow-rev': 'spinslow 34s linear infinite reverse',
        shimmer: 'shimmer 3s linear infinite',
        pulseglow: 'pulseglow 6s ease-in-out infinite',
        gradientmove: 'gradientmove 8s ease infinite',
        aurora: 'auroradrift 26s ease-in-out infinite',
        'aurora-rev': 'auroradrift 34s ease-in-out infinite reverse',
      },
    },
  },
  plugins: [],
}
