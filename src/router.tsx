import { createBrowserRouter } from "react-router";
import { Homepage } from "./pages/Homepage";
import { BottleDetails } from "./pages/BottleDetail";
import { NotFound } from "./pages/NotFound";
import BuildYourOwn from "./pages/BuildYourOwn";
import EventsPage from "./pages/EventsPage";
import CalendarPage from "./pages/CalendarPage";
import { Layout } from "./layouts/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "catalog/:bottleId", element: <BottleDetails /> },
      { path: "build", element: <BuildYourOwn /> },
      { path: "*", element: <NotFound /> },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
    ],
  },
]);
