import EventsPage  from "./pages/EventsPage";
import { createBrowserRouter } from "react-router"
import CalendarPage  from "./pages/CalendarPage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "*", 
                element: <CalendarPage />
            },
            {
                path: "events", 
                element: <EventsPage />
            },
            // {path: "*", element: <NotFound />}
        ]
    }
]);