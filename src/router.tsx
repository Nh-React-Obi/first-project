import { createBrowserRouter } from "react-router";
import { Homepage } from "./pages/Homepage";
import { BottleDetails } from "./pages/BottleDetail";
import { NotFound } from "./pages/NotFound";
import BuildYourOwn from "./pages/BuildYourOwn";
import EventsPage from "./pages/EventsPage";
import CalendarPage from "./pages/CalendarPage";
import { Layout } from "./layouts/Layout";
import FullOrderPage from "./exports/App";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "catalog/:bottleId", element: <BottleDetails /> },
      { path: "build", element: <BuildYourOwn /> },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "order",
        element: <FullOrderPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
