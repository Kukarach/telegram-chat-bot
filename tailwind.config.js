/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Базовые цвета, которые должны быть доступны
        white: "#ffffff",
        black: "#000000",
        // Telegram Theme цвета
        "tg-bg": "var(--tg-theme-bg-color)",
        "tg-text-main": "var(--tg-theme-text-color)",
        "tg-text-secondary": "var(--tg-theme-hint-color)",
        "tg-link": "var(--tg-theme-link-color)",
        "tg-button": "var(--tg-theme-button-color)",
        "tg-button-text": "var(--tg-theme-button-text-color)",
        "tg-secondary-bg": "var(--tg-theme-secondary-bg-color)",
        // Обновленная цветовая схема
        "tg-bubble-user": "rgba(110, 34, 245, 0.7)",
        "tg-bubble-bot": "rgba(18, 18, 30, 0.7)",
        "tg-accent": "#FF2D75", // Неоновый розовый
        "tg-accent-secondary": "#8A2BE2", // Фиолетовый
        "tg-glass": "rgba(29, 26, 38, 0.5)", // Темный с прозрачностью для стекломорфизма
        "tg-gradient-start": "#1a1225", // Темно-фиолетовый
        "tg-gradient-end": "#2d1537", // Темно-пурпурный
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "tg-gradient": "linear-gradient(135deg, #1a1225 0%, #2d1537 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.1)",
        neon: "0 0 15px rgba(255, 45, 117, 0.5)",
      },
      borderRadius: {
        glass: "1.5rem",
        neon: "12px",
      },
      backdropBlur: {
        glass: "12px",
      },
      animation: {
        gradient: "gradient 8s ease infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
      },
      gridTemplateRows: {
        "chat-layout": "auto 1fr auto",
      },
    },
  },
  plugins: [],
} 