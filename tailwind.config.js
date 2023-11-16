/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#4081E9',
                'secondary': '#333333',
                'tertiary': '#25ccdc',
            }
        },
    },
    plugins: [],
}