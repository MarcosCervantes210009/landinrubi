import { StrictMode } from "react";
import App from "./App.jsx";

/* Cada objeto aquí se vuelve un .html real en el build.
   Rutas hijas SIN "/" al inicio:
     { path: "provincia-de-allende", element: <ProvinciaAllende /> }
   Y cada una también va en public/sitemap.xml. */

const routes = [
  {
    path: "/",
    element: (
      <StrictMode>
        <App />
      </StrictMode>
    ),
  },
];

export default routes;