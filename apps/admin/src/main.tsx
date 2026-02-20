import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Blogs from "./pages/Blogs.tsx";
import BlogItem from "./pages/BlogItem.tsx";
import About from "./pages/About.tsx";
import Home from "./pages/Home.tsx";
import SignUp from "./pages/Signup.tsx";
import AuthLayout from "./Layouts/Auth.tsx";
import LogIn from "./pages/Login.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "blog",
        element: (
          <ProtectedRoute>
            <Blogs />
          </ProtectedRoute>
        ),
      },
      {
        path: "blog/:blogId",
        Component: BlogItem,
      },
      {
        path: "about",
        Component: About,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LogIn,
      },
      {
        path: "signup",
        Component: SignUp,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
