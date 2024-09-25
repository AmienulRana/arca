import type { Config } from 'tailwindcss';
/* eslint-disable unicorn/prefer-module */
const config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '1.4rem',
      screens: {
        '2xl': '1400px',
        landscape: { min: '768px', max: '942px' }
      }
    },
    extend: {
      colors: {
        primary: '#15C829'
      },
      fontSize: {
        xxs: '10px'
      }
    }
  }
} satisfies Config;

export default config;
