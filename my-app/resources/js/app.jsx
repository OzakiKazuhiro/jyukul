import "./bootstrap";
import "../css/app.css";

import "leaflet";
import "leaflet/dist/leaflet.css";

import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import theme from "./theme"; // 作成したカスタムテーマをインポート

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ChakraProvider theme={theme}>
                {" "}
                {/* ここでカスタムテーマを指定 */}
                <App {...props} />
            </ChakraProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
