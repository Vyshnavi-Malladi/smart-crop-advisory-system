/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#059669', // Emerald 600
                    light: '#34D399',   // Emerald 400
                    dark: '#064E3B',    // Emerald 900
                },
                secondary: {
                    DEFAULT: '#0EA5E9', // Sky 500
                    light: '#7DD3FC',   // Sky 300
                    dark: '#0369A1',    // Sky 700
                },
                accent: '#F59E0B',    // Amber 500
                surface: {
                    light: '#F8FAFC',   // Slate 50
                    dark: '#0F172A',    // Slate 900
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'glass-hover': '0 10px 40px rgba(0, 0, 0, 0.2)',
            }
        },
    },
    plugins: [],
}
