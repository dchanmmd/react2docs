import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    base: process.env.APP_BASE_URL || '/',
    plugins: [react()],
    resolve: {
        alias: {
            "#src": path.resolve(import.meta.dirname, "src"),
            "#components": path.resolve(import.meta.dirname, "src/components"),
            "#hooks": path.resolve(import.meta.dirname, "src/hooks"),
            "#styles": path.resolve(import.meta.dirname, "src/styles"),
        },
    },
});
