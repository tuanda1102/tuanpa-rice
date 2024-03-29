const { nextui } = require('@nextui-org/react');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        ...defaultTheme.spacing,
        sidebar: '100px',
        header: '90px',
        banner: '380px',
        input: '56px',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
