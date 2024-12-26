module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'poppins-thin': ['Poppins-Thin', 'sans-serif'],
      },
      colors: {
        main_color: '#0C2757',//dark
        second: "#4B6386",//pastel
        blue: "#3A8EF6",//ugly
        admin: '#D865ED',
        admin_light: '#fef0fc',
        etat: '#47F6A2',
        etat_light: '#e8fff7',
        infermier: '#FF34A0',
        infermier_light: '#ffeaf5',
        blue_light: '#d0f0f4',
        blue_gray: '#778ea4',
        orange: '#ffb900',
        orange_little_darker: '#f5c851',
        red:'#ff1f21',
        red_little_darker: '#f56e7c',
        red_light: '#f8e4eb',
        orange_light: '#f5f2e6',
        blue_lighter: '#f8fcfc',
        autre: '#0535dc',
        autre_light: '#3D7FF41A',
        blue_gray: '#8B9BB3',
        grayish: '#7C7C7C'
      },
    },
  },
  plugins: [],
}

