/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                neonBlue: '#00ffff',
                neonPurple: '#9900ff',
            },
        },
    },
    plugins: [],
};
