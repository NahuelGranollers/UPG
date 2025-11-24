/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    // Remove the broad "./**/*.{js,ts,jsx,tsx}" pattern
    './src/**/*.{js,ts,jsx,tsx}', // Add this line if your code is in a 'src' folder
    './components/**/*.{js,ts,jsx,tsx}',
    './App.tsx',
    './index.tsx',
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          dark: '#1a1a1e',
          sidebar: '#2b2d31',
          'sidebar-hover': '#35373c',
          chat: '#313338',
          header: '#2b2d31',
          hover: '#3f4147',
          blurple: '#5865F2',
          'blurple-hover': '#4752c4',
          green: '#23a559',
          yellow: '#ffcc17',
          red: '#da373c',
          text: {
            normal: '#dbdee1',
            muted: '#949ba4',
            header: '#f2f3f5',
          },
        },
        // Colores UPG consistentes con Discord
        upg: {
          primary: '#5865F2', // Discord blurple como primary
          secondary: '#23a559', // Discord green
          accent: '#ffcc17', // UPG yellow
          danger: '#da373c', // Discord red
          warning: '#faa61a',
          success: '#23a559',
          surface: '#2b2d31', // Discord sidebar
          'surface-hover': '#35373c', // Discord sidebar-hover
          background: '#313338', // Discord chat
          border: '#3f4147', // Discord hover
          text: {
            primary: '#f2f3f5', // Discord header
            secondary: '#dbdee1', // Discord normal
            muted: '#949ba4', // Discord muted
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        discord: '8px',
        'discord-lg': '12px',
        'discord-xl': '16px',
      },
      boxShadow: {
        discord: '0 2px 10px rgba(0, 0, 0, 0.2)',
        'discord-lg': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'discord-xl': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
