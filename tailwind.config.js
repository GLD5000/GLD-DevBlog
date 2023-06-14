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
      dropShadow: {
        logo: "1px 2px 3px rgba(0, 0, 0, 1)",
        hero: "-0.5vw 0.5vw 1vw rgba(0, 0, 0, 0.75)",
        "hero-dk": "-1vw 1vw 2vw #999",
        "post-dk": "0px 1px 3px #999f",
        star: "-1px 1px 7px rgba(0, 0, 0, 1)",
        "star-dk": "-1px 1px 200px white",
      },

    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
