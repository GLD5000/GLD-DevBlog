/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      gridTemplateColumns: {
        frAutoFr: '1fr auto 1fr',
        autoAuto: 'auto auto',
        autoFr: 'auto 1fr',
      },
      gridTemplateRows: {
        autoFr: 'auto 1fr',
      },
      minWidth: {
        body: '250px',
      },
      maxWidth: {
        body: '1000px',
        'body-sm': '800px',
      },
      width: {
        body: 'calc(100vw - 4rem)',
        'body-sm': 'calc(100vw - 3rem)',
      },
      colors: {
        'bg-var-dk': '#2f2f2f',
        'bg-dk': '#000000',
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
