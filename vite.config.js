import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-responsive-carousel"],
  },
  build: {
    chunkSizeWarningLimit: 1000, // Adjust as needed
  },
});
