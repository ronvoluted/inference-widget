const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        'transparent-blue': 'hsl(213 94% 68% / 0.3)',
      },
      dropShadow: {
        text: '0 0 0.1em black',
      },
      borderWidth: {
        thin: '1px',
        cap: '24px',
      },
    },
  },

  plugins: [],
};

module.exports = config;
