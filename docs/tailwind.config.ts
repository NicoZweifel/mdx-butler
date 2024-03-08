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
          ...colors.lime,
        },
        secondary: {
          ...colors.purple,
        },
      },
    },
  },
  plugins: [],
});

export default config;
