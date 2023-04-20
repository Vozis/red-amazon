const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const twColors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */

const colors = {
  transparent: twColors.transparent,
  black: twColors.black,
  white: twColors.white,
  primary: '#F69916',
  secondary: '#161D25',
  'bg-color': '#F2F2F5',
  blue: '#328B9B',
  gray: '#CDCDCD',
  red: '#EB3E4D',
};

module.exports = {
  content: [
    join(
      __dirname,
      './{src, pages, components}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors,
    extend: {
      keyframes: {
        animationOpacity: {
          from: { opacity: 0.2 },
          to: { opacity: 1 },
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.9)',
          },
          '50%': {
            opacity: 0.3,
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        animationOpacity: 'animationOpacity .5s ease-in-out',
        scaleIn: 'scaleIn .35s ease-in-out',
      },
    },
  },
  plugins: [],
};
