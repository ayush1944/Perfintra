/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {
    colors: {
      primary: '#4885ED',
      secondary: '#FFC107',
      success: '#4CAF50',
      danger: '#F44336',
      background: '#F5F5F5',
      card: '#FFFFFF',
      textPrimary: '#212121',
      textSecondary: '#757575',
    },
  },
},
plugins: [],
}

