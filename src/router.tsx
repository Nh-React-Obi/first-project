import { createBrowserRouter } from "react-router";
import { Layout } from "./layouts/Layout";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { BottleDetail } from "./pages/BottleDetail";
import { BuildYourOwn } from "./pages/BuildYourOwn";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Events } from "./pages/Events";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:bottleId", element: <BottleDetail /> },
      { path: "build", element: <BuildYourOwn /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "events", element: <Events /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

