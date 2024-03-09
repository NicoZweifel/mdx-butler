import resolveConfig from 'tailwindcss/resolveConfig';
import colors from 'tailwindcss/colors';
const config = resolveConfig({
  darkMode: 'class',
  content: [
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './renderer/**/*.{ts,tsx}',
    './docs/**/*.{tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.purple,
        },
        secondary: {
          ...colors.blue,
        },
      },
    },
  },
  plugins: [],
});

export default config;
