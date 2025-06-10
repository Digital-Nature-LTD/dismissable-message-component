import path from "path";
import { defineConfig } from "vite";
import livePreview from 'vite-live-preview'

export default defineConfig({
    base: "",
    plugins: [
        livePreview({}),
    ],
    preview: {},
    build: {
        assetsInlineLimit: Infinity, // inline css images
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "dn_dismissable_message_component",
            formats: ["es", "cjs", "umd", "iife"],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            input: {
                'index.html': 'index.html',
            },
        },
        // rollupOptions: {
        //     external: [],
        //     output: {
        //         globals: {
        //
        //         },
        //     },
        // },
    },
});