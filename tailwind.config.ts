import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: 'Roboto, sans-serif',
      },
    },
  },
  plugins: [],
} satisfies Config
