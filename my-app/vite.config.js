import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        port: 5173,
        // host: "localhost",
        host: "0.0.0.0",
        hmr: {
            host: "localhost",
        },
        watch: {
            usePolling: true,
        },
    },
});
