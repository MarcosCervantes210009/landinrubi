import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  ssgOptions: {
    // Punto de entrada que exporta createRoot
    entry: "src/main.jsx",

    // Minifica el HTML generado
    formatting: "minify",

    // Carga los scripts sin bloquear el render
    script: "async",

    // Deja el HTML prerenderizado visible desde el primer frame
    // en vez de esperar a que React hidrate
    mock: true,
  },

  build: {
    // Vercel sirve esto tal cual
    outDir: "dist",
  },
});