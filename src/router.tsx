import { createBrowserRouter } from "react-router";
import { Homepage } from "./pages/Homepage";
import { BottleDetails } from "./pages/BottleDetail";
import { NotFound } from "./pages/NotFound";
import BuildYourOwn from "./pages/BuildYourOwn";
import { Layout } from "./layouts/Layout";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "catalog/:id",
        element: <BottleDetails />,
      },
      {
        path: "build",
        element: <BuildYourOwn />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
