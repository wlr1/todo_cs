/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bgMain:
          'url("https://images.unsplash.com/photo-1553649033-3fbc8d0fa3cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        bgTodoBlock:
          'url("https://images.unsplash.com/photo-1557360798-c91519105dd7?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      },
      boxShadow: {
        custom: "inset 0 2px 110px 3px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
