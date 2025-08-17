// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     darkMode: ["class"],
//     content: [
//       "./index.html", // <-- Add this for Vite
//       "./src/**/*.{js,ts,jsx,tsx}", // <-- This single line covers everything in src
//     ],
//     prefix: "",
//     theme: {
//       container: {
//         center: true,
//         padding: "2rem",
//         screens: {
//           "2xl": "1400px",
//         },
//       },
//       extend: {
//         // Your theme extensions from shadcn/ui
//         colors: {
//           border: "hsl(var(--border))",
//           input: "hsl(var(--input))",
//           ring: "hsl(var(--ring))",
//           background: "hsl(var(--background))",
//           foreground: "hsl(var(--foreground))",
//           // etc...
//         },
//         // ... rest of your theme
//       },
//     },
//     plugins: [require("tailwindcss-animate")],
//   }


/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto Mono', 'monospace'],
      },
      colors: {
        'custom-dark': '#0F172A', // A dark slate blue
        'custom-light-dark': '#1E293B', // A lighter slate blue for cards
      }
    },
  },
  plugins: [],
}