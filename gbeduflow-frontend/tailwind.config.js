/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'bg-primary': '#1A1A2E',
        'bg-secondary': '#2D2D50',
        'bg-tertiary': '#3A506B',
        
        // Text Colors
        'text-primary': '#FFFFFF',
        'text-secondary': '#B8B8CC',
        'text-muted': '#8A8A9A',
        
        // Accent Colors
        'accent-primary': '#3B82F6',
        'accent-secondary': '#00D4AA',
        'accent-warning': '#FFB800',
        
        // Data Visualization
        'chart-line-1': '#3B82F6',
        'chart-line-2': '#00D4AA',
        'chart-line-3': '#3A506B',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
