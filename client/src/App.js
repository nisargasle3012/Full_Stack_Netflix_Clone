// App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import HomePage, { loader as homeLoader } from "./pages/HomePage";
import WatchPage from "./pages/WatchPage";
import GenreExplore, { loader as genreLoader } from "./pages/GenreExplore";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

import MainLayout from "./layouts/MainLayout";
import { protectedLoader } from "./loaders/protectedLoader";

const router = createBrowserRouter([
  // Public routes
  { path: "main", element: <MainPage /> },
  { path: "signin", element: <SignIn /> },
  { path: "signup", element: <SignUp /> },
  { path: "", element: <Navigate to="/main" /> },

  // Protected routes
  {
    path: "/", // base path for protected routes
    element: <MainLayout />,
    children: [
      {
        path: "browse",
        element: <HomePage />,
        loader: async () => {
          // Verify JWT cookie with backend
          const data = await protectedLoader();
          return homeLoader(data); // pass user/movies if needed
        },
      },
      {
        path: "watch",
        element: <WatchPage />,
        loader: protectedLoader,
      },
      {
        path: "genre/:genreId",
        element: <GenreExplore />,
        loader: async ({ params }) => {
          await protectedLoader();
          return genreLoader({ params });
        },
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
