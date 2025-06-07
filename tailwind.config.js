/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Serif fonts
        georgia: ["Georgia", "serif"],
        times: ["Times New Roman", "Times", "serif"],
        garamond: ["Garamond", "serif"],
        baskerville: ["Baskerville", "serif"],

        // Sans-serif fonts
        arial: ["Arial", "sans-serif"],
        helvetica: ["Helvetica", "Arial", "sans-serif"],
        verdana: ["Verdana", "sans-serif"],
        tahoma: ["Tahoma", "sans-serif"],
        trebuchet: ["Trebuchet MS", "sans-serif"],

        // Monospace fonts
        courier: ["Courier New", "Courier", "monospace"],
        consolas: ["Consolas", "monospace"],
        monaco: ["Monaco", "monospace"],

        // Cursive/Display fonts
        cursive: ["cursive"],
        comic: ["Comic Sans MS", "cursive"],
        brush: ["Brush Script MT", "cursive"],
        papyrus: ["Papyrus", "fantasy"],
        impact: ["Impact", "fantasy"],

        // Web fonts
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        merriweather: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
