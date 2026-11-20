import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { router } from "./router";
import ThemeProvider from "./context/ThemeContext";
import SalesProvider from "./context/SalesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SalesProvider>
        <RouterProvider router={router} />
      </SalesProvider>
    </ThemeProvider>
  </StrictMode>,
);
