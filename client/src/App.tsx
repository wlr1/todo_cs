import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signin from "./components/Auth/Signin/Signin";
import Signup from "./components/Auth/Signup/Signup";
import TodoCS from "./components/TodoPage/Todo";

const router = createBrowserRouter([
  { path: "/", element: <TodoCS /> },
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
