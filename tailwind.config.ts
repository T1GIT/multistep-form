import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        main: 'var(--font-family)',
      },
      colors: {
        primary: 'var(--primary-color)',
      },
    },
  },
  plugins: [],
} satisfies Config
