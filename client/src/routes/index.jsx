import { Navigate, createBrowserRouter } from "react-router-dom";
import { MAIN_PATH } from "../constant";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: MAIN_PATH.root, // ""
        element: <Navigate to={`/${MAIN_PATH.browse}`} />,
      },
      {
        path: MAIN_PATH.browse, // "browse"
        lazy: () => import("src/pages/HomePage"),
      },
      {
        path: MAIN_PATH.genreExplore, // "genre"
        children: [
          {
            path: ":genreId",
            lazy: () => import("src/pages/GenreExplore"),
          },
        ],
      },
      {
        path: MAIN_PATH.watch, // "watch"
        lazy: () => import("src/pages/WatchPage"),
      },
    ],
  },
]);

export default router;
