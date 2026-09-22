/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fest: {
          dark: '#FDF6E9',
          card: '#FFFFFF',
          cardBorder: '#111111',
          primary: '#FFD400',
          primaryHover: '#F5C500',
          accent: '#FF3EA5',
          cyan: '#00C2D1',
          emerald: '#00B86B',
          rose: '#FF3B30',
          violet: '#7C5CFF',
          orange: '#FF6B35'
        },
        brut: {
          yellow: '#FFD400',
          blue: '#3B82F6',
          pink: '#FF3EA5',
          green: '#00B86B',
          orange: '#FF6B35',
          cream: '#FDF6E9'
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'Outfit', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'glow-primary': '5px 5px 0px 0px #111111',
        'glow-accent': '5px 5px 0px 0px #111111',
        'glow-emerald': '5px 5px 0px 0px #111111',
        'glow-cyan': '5px 5px 0px 0px #111111',
        'pop': '6px 6px 0px 0px #111111',
        'pop-sm': '3px 3px 0px 0px #111111',
        'pop-lg': '10px 10px 0px 0px #111111',
        'pop-pink': '6px 6px 0px 0px #111111, 0 0 0 3px #FF3EA5',
        'brut': '6px 6px 0px 0px #ffffff',
        'brut-sm': '3px 3px 0px 0px #ffffff',
        'brut-lg': '10px 10px 0px 0px #ffffff',
        'brut-pink': '6px 6px 0px 0px #ffffff, 0 0 0 3px #FF3EA5',
      },
      screens: {
        'xs': '375px',
      }
    },
  },
  plugins: [],
};
