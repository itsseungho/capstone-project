import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.API_URL": JSON.stringify(
      "https://e09467f5-527a-4d9c-9c60-83643036f8d6-00-45zpr64p2cyo.sisko.replit.dev:3000/"
    ),
    "process.env.GOOGLE_BOOKS_API_KEY": JSON.stringify("AIzaSyDl3t75KPxbWHA0rz7FXMzeFMPCXacrjtg"),
  },
});
