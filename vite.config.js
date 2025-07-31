import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/roses-of-rome/" : "/",
  build: {
    outDir: "dist", // default is 'dist' — change if needed
  },
  plugins: [react()],
}));
