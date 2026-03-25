/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#0f5fa8',
          mid:     '#3b82f6',
          light:   '#dbeafe',
        },
        accent: {
          DEFAULT: '#0e9f6e',
          light:   '#d1fae5',
        },
      },
    },
  },
  plugins: [],
}
