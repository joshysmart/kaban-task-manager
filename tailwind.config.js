/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    "bg-todo-blue",
    "bg-doing-purple",
    "bg-done-green"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'lines-dark': '#3E3F4E',
        'lines-light': '#E4EBFA',
        'main-purple': '#635FC7',
        'input-border': 'rgba(130, 143, 163, 0.25)',
        'button-secondary-idle': '#635FC71A',
        'button-secondary-hover': '#635FC740',
        'black': '#000112',
        'overlay': '#00000080',
        'main-purple-hover': '#A8A4FF',
        'very-dark-grey-dark-bg': '#20212C',
        'dark-grey': '#2B2C37',
        'medium-grey': '#828FA3',
        'light-grey-light-bg': '#F4F7FD',
        'red': '#EA5555',
        'red-hover': '#FF9898',
        'checkbox-border': 'rgba(130, 143, 163, 0.25)',
        'todo-blue': '#49C4E5',
        'doing-purple': '#635FC7',
        'done-green': '#67E2AE',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'new-column-gradient-light': 'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.50) 100%)',
        'new-column-gradient-dark': 'linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}