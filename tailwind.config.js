/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    // Remove the broad "./**/*.{js,ts,jsx,tsx}" pattern
    "./src/**/*.{js,ts,jsx,tsx}",        // Add this line if your code is in a 'src' folder
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          dark: '#1a1a1e',
          sidebar: '#2b2d31',
          chat: '#313338',
          header: '#2b2d31',
          hover: '#3f4147',
          blurple: '#5865F2',
          green: '#23a559',
		  yellow: '#ffcc17',
          red: '#da373c',
          text: {
            normal: '#dbdee1',
            muted: '#949ba4',
            header: '#f2f3f5'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
