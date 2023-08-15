/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,tsx}',],
  theme: {
      extend: {
          colors: {
              'primary': {
                  DEFAULT: '#68d793',
                  '600': '#4fad74',
              },
              'primary-contrast': '#454545',
              'secondary':{
                  DEFAULT:'#1e2824',
                  '600': '#000000',
              },
              'contrast': '#1e2824',
              'font-default': '#5b5c5c',
              'font-contrast': '#ffffff',
              'font-error': '#ff0000',
              'body-default': '#e5f0eb',
              'background': '#f4f4f5',
          },
          keyframes: {
              'fade-in-down': {
                  '0%': {
                      opacity: '0',
                      transform: 'translateY(-10px)'
                  },
                  '100%': {
                      opacity: '1',
                      transform: 'translateY(0)'
                  },
              },
              'fade-out-down': {
                  'from': {
                      opacity: '1',
                      transform: 'translateY(0px)'
                  },
                  'to': {
                      opacity: '0',
                      transform: 'translateY(10px)'
                  },
              },
              'fade-in-up': {
                  '0%': {
                      opacity: '0',
                      transform: 'translateY(10px)'
                  },
                  '100%': {
                      opacity: '1',
                      transform: 'translateY(0)'
                  },
              },
              'fade-out-up': {
                  'from': {
                      opacity: '1',
                      transform: 'translateY(0px)'
                  },
                  'to': {
                      opacity: '0',
                      transform: 'translateY(10px)'
                  },
              }
          },
          animation: {
              'fade-in-down': 'fade-in-down 1s ease-out',
              'fade-out-down': 'fade-out-down 1s ease-out',
              'fade-in-up': 'fade-in-up 1s ease-out',
              'fade-out-up': 'fade-out-up 1s ease-out'
          }
      },
      screens: {
          'xs':'330px',
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px',
      },
      fontSize: {
          xxs:'0.45rem',
          xs:'0.7rem',
          sm: '0.8rem',
          base: '1rem',
          xl: '1.25rem',
          '2xl': '1.563rem',
          '3xl': '1.953rem',
          '4xl': '2.441rem',
          '5xl': '3.052rem',
        }
  },
  plugins: [],
}



