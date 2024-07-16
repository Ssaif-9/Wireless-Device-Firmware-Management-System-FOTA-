/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
      phone: { min: "300px", max: "640px" },
      // => @media (min-width: 375px) { ... }
    },  
    theme: {
      extend: {
        backgroundImage: {
          'custom-image': "url('https://johan22.sirv.com/Designer%20(3_1).jpeg')",
        },
        colors: {
          'custom-color': '#ceeff4',
        },
        fontFamily: {
          Oswald: ['Oswald', 'serif'],
          // Add more custom font families as needed
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
