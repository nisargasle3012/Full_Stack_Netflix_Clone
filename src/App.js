import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage, { loader as homeLoader } from "./pages/HomePage";
import WatchPage from "./pages/WatchPage";
import GenreExplore, { loader as genreLoader } from "./pages/GenreExplore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // redirect root "/" to "/browse"
      { path: "", element: <Navigate to="/browse" /> },

      // browse page
      { path: "browse", element: <HomePage />, loader: homeLoader },

      // watch page
      { path: "watch", element: <WatchPage /> },

      // genre explore
      { path: "genre/:genreId", element: <GenreExplore />, loader: genreLoader },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
