import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Adjust as needed
    rollupOptions: {
      external: ["react-responsive-carousel/lib/styles/carousel.min.css"], // Exclude react-responsive-carousel from bundling
    },
  },
});
