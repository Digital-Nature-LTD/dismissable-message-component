import { defineConfig } from "vite";
import livePreview from 'vite-live-preview'


export default defineConfig(({ mode }) => ({
    base: "",
    plugins: [
        livePreview({}),
    ],
    preview: {},
    build: {
        sourcemap: true,
        assetsInlineLimit: Number.MAX_SAFE_INTEGER,
        lib: {
            entry: "src/index.js",
            name: "dn_dismissable_message_component",
            formats: ["es", "cjs", "umd", "iife"],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: mode === 'development' ? {
            input: {
                'index.html': 'index.html',
            },
        } : {},
    },
}));