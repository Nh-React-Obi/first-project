import { createBrowserRouter } from "react-router";
import { Layout } from "./layouts/Layout";
import { Homepage } from "./pages/Homepage";
import BuildYourOwn from "./pages/BuildYourOwn";
import BottleDetails from "./pages/BottleDetail";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Homepage /> },

      { path: "catalog/:bottleId", element: <BottleDetails /> },
      {
        path: "/build-your-own",
        element: <BuildYourOwn />,
      },
    ],
  },
]);
