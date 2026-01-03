module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'typewriter': 'typewriter 2s steps(20) infinite alternate',
        'shine': 'shine 1.5s infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'name-reveal': 'name-reveal 1s ease-out forwards',
        // ✅ FIXED: Date animations properly merged
        'date-typewriter': 'date-typewriter 1.5s steps(15) infinite',
        'date-flip': 'date-flip 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'date-breathe': 'date-breathe 3s ease-in-out infinite',
        'date-glow': 'date-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        typewriter: {
          '0%, 100%': { width: '0%' },
          '50%': { width: '100%' },
        },
        shine: {
          '0%': { 'background-position': '200% 0' },
          '100%': { 'background-position': '-200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { textShadow: '0 0 5px rgba(59,130,246,0.5)' },
          '50%': { textShadow: '0 0 20px rgba(59,130,246,0.8), 0 0 40px rgba(147,51,234,0.6)' },
        },
        'name-reveal': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        // ✅ FIXED: Date keyframes properly merged
        'date-typewriter': {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '0%' },
        },
        'date-flip': {
          '0%': { transform: 'perspective(400px) rotateY(90deg)', opacity: 0 },
          '50%': { transform: 'perspective(400px) rotateY(0deg)', opacity: 1 },
          '100%': { transform: 'perspective(400px) rotateY(0deg)' },
        },
        'date-breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'date-glow': {
          '0%': { boxShadow: '0 0 5px rgba(34,197,94,0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(34,197,94,0.8), 0 0 30px rgba(59,130,246,0.4)' },
        }
      }
    }
  },
  plugins: [],
}
