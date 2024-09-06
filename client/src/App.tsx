import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todo from "./components/TodoPage/Todo";
import Signin from "./components/Auth/Signin/Signin";
import Signup from "./components/Auth/Signup/Signup";

const router = createBrowserRouter([
  { path: "/", element: <Todo /> },
  { path: "/login", element: <Signin /> },
  { path: "/register", element: <Signup /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
