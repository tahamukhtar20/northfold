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
                'primary-light': '#AACCFF',
                'primary-dark': '#265094',
                'secondary': '#333333',
                'secondary-light': '#666666',
                'secondary-dark': '#222222',
                'tertiary': '#25ccdc',
                'tertiary-light': '#a6f7ff',
                'tertiary-dark': '#0096a7',
            },
            fontFamily: {
                'inconsolata': ['Inconsolata'],
            },
        }
    },
    plugins: [],
}