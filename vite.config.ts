import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
      "@providers": "/src/providers",
      "@images": "/src/assets/images",
      "@components": "/src/components",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
      "@styles": "/src/assets/styles",
      "@json": "/src/assets/json",
    },
  },
});
