/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: {
            DEFAULT: '#0f2942',
            dark: '#0a1d30',
            light: '#1c3d5e',
            subtle: '#e8edf3'
          },
          saffron: {
            DEFAULT: '#c25e00',
            dark: '#9c4b00',
            light: '#f59e0b',
            subtle: '#fef3c7'
          },
          slate: {
            DEFAULT: '#334155',
            muted: '#64748b',
            border: '#cbd5e1',
            bg: '#f8fafc',
            card: '#ffffff'
          },
          green: {
            DEFAULT: '#15803d',
            dark: '#166534',
            subtle: '#dcfce7'
          },
          maroon: {
            DEFAULT: '#991b1b',
            subtle: '#fee2e2'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        olchiki: ['"Noto Sans Ol Chiki"', '"Guru Gomke"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
