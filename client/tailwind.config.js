/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        todoPal: "#293737",
        btnTodo: "#91d2cd",
      },
      backgroundImage: {
        bgMain: 'url("/utility/img/wallpaper3.jpg")',
        bgAuth:
          'url("https://images.unsplash.com/photo-1527766833261-b09c3163a791?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        bgNotFound:
          'url("https://images.unsplash.com/photo-1493314894560-5c412a56c17c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      },
      boxShadow: {
        custom: "inset 0 2px 33px 3px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
