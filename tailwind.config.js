/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,css}"],
  theme: {
    screens: {
      mobile: {'max': '500px'},
      onlytablet: {'min': '500px', 'max': '850px'},
      tablet: {'min': '500px',},
      onlylaptop: {'min': '850px', 'max': '1280px'},
      laptop: {'min': '850px', },
      desktop: {'min': '1280px'} ,
    },
    colors: {
      'primary': "#4D5562",
      'secondary': "#040711",
      'terciary': "#F9FAFB",
      'iron': "#D2D5DA",
      'bright-grey': "#394150",
      'periwinkle-blue': "#7CA9F3",
      'sapphire': "#263FA9",
      'orion-nebula': "#A855F7",
    },
    fontFamily: {
      sans: ['"DM Sans"', 'sans-serif'],
    },
    extend: {
      borderRadius: {
        "5": "5px",
        "sm": "10px",
        "small": "15px",
        "md": "20px",
        "lg": "100px",
      },
      backgroundColor: {
        'glass-slate': 'rgba(30, 41, 59, 0.8)',
        'glass-effect': 'rgba(15,23,42,.6)',
      },
      backgroundImage: {
        'glass-effect': 'linear-gradient(180deg, rgba(226, 232, 255, 0), rgba(226, 232, 255, 0.12))',
        'highlight-gradient': 'linear-gradient(to bottom right, #6366f1, #a855f7, #ec4899)',
      },
      maxWidth: {
        "1250": "1250px"
      },
      fontSize: {
        "text-8": "8px",
        "text-10": "10px",
      },
      border: {
        'primary': "#4D5562",
        'periwinkle-blue': "#7CA9F3",
      },
      borderWidth: {
        '1': '1px',
      }
    }
  },
  plugins: [],
}