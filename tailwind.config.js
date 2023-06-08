/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        semiWhite: '#ffffff99',
        semiBlue: '#1c2434bb',
        palegrey: '#f1f1f2',
        pink: '#ff89fe',
        yellow: '#fff170',
        lightgreen: '#00c8ba',
        darkblue: '#1c2434',
        white: '#ffffff',
        darkgreentxt: '#107b74',
        darkpinktxt: '#c727c5',
        darkpink: '#e060de',
        darkgreen: '#16a69d',
        st2: '#80D8D8',
        st3: '#FFF170',
        st4: '#FF89FE',
        st5: '#1C2434',
        'light-text-mid': '#32405d',
        'darkblue-bgvar': '#141a25',
        'darkblue-bg': '#1e2738',
        'bg-var-dk': '#141a25',
        'bg-dk': '#1c2434',
        'deco-dk': '#3d3d3d',
        'border-dk': '#6b6b6b',
        'txt-mid-dk': '#ababab',
        'txt-main-dk': '#ffffff',
        'txt-main': '#1c2434',
        'txt-mid': '#44587f',
        border: '#919191',
        deco: '#e0e0e0',
        'bg-var': '#f1f1f2',
        bg: '#ffffff',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
