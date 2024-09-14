import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signin from "./components/Auth/Signin/Signin";
import Signup from "./components/Auth/Signup/Signup";
import TodoCS from "./components/TodoPage/Todo";
import ProtectedRoute from "./components/Auth/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/todo",
    element: (
      <ProtectedRoute>
        <TodoCS />
      </ProtectedRoute>
    ),
  },
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
