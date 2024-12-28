module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'poppins-thin': ['Poppins-Thin', 'sans-serif'],
      },
      colors: {
        main_color: '#0C2757',
        second: "#4B6386",
        blue: "#3A8EF6",
        doctor: '#D865ED',
        radiologue: '#47F6A2',
        laborantin: '#FF34A0',
        blue_light: '#d0f0f4',
        
      },
    },
  },
  plugins: [
    require('tailwindcss-filters'), 
  ],
}
