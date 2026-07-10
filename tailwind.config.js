/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#062B45',
          900: '#04202f',
          800: '#062B45',
          700: '#083a5c',
        },
        royal: {
          DEFAULT: '#0A4D80',
          light: '#0d63a3',
        },
        brand: {
          orange: '#F58220',
          yellow: '#FFC107',
          green: '#7BC043',
          cyan: '#00B5E2',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(6,43,69,0.25)',
        glow: '0 0 40px -5px rgba(0,181,226,0.45)',
        card: '0 30px 80px -30px rgba(6,43,69,0.4)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg,#0A4D80 0%,#00B5E2 100%)',
        'sunset': 'linear-gradient(120deg,#F58220 0%,#FFC107 100%)',
        'mesh': 'radial-gradient(at 20% 20%, rgba(0,181,226,0.18) 0px, transparent 55%), radial-gradient(at 80% 10%, rgba(245,130,32,0.14) 0px, transparent 50%), radial-gradient(at 70% 80%, rgba(123,192,67,0.14) 0px, transparent 50%), radial-gradient(at 10% 90%, rgba(10,77,128,0.18) 0px, transparent 55%)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        spinslow: {
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseglow: {
          '0%,100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        borderspin: {
          to: { '--angle': '360deg' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'floaty-slow': 'floaty 9s ease-in-out infinite',
        spinslow: 'spinslow 24s linear infinite',
        'spinslow-rev': 'spinslow 32s linear infinite reverse',
        shimmer: 'shimmer 3s linear infinite',
        pulseglow: 'pulseglow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
