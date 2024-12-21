/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        main_color: '#0C2757',
        second : "#4B6386",
        blue: "#3A8EF6", 
        doctor: '#D865ED', 
        radiologue: '#47F6A2', 
        laborantin: '#FF34A0', 

      },
    },
  },
  plugins: [],
}
