import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { PropertyDetail } from "./pages/PropertyDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/propiedad/:id",
    Component: PropertyDetail,
  },
  {
    path: "*",
    Component: Home,
  },
]);
