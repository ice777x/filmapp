/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      rotate: {
        '3d': 'rotate3d(1,1,1 45deg)',
      },
      transformOrigin: {
        '3d': 'rotate3d(1,1,1 45deg)',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      }
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true }), require('@tailwindcss/line-clamp')],
}