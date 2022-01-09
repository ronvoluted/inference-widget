const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    screens: {
      xs: '480px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'transparent-blue': 'hsl(213 94% 68% / 0.3)',
      },
      borderWidth: {
        thin: '1px',
        cap: '24px',
      },
      dropShadow: {
        text: '0 0 0.1em black',
      },
    },
  },

  plugins: [],
};

module.exports = config;
