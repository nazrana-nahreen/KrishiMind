/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981', // Matching active pill and logo
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        mint: {
          bg: '#eaf8f0',
          light: '#f4fbf6',
          card: '#f8fdfa',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(16, 185, 129, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 20px 40px -10px rgba(16, 185, 129, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
