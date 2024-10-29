import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import TodoCS from "./components/TodoPage/Todo";
import ProtectedRoute from "./components/Auth/ProtectedRoute/ProtectedRoute";

import { lazy, Suspense } from "react";

const Signin = lazy(() => import("./components/Auth/Signin/Signin"));
const Signup = lazy(() => import("./components/Auth/Signup/Signup"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/todo",
    element: (
      <ProtectedRoute>
        <TodoCS />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Signin />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
