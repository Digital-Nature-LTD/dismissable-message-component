import { defineConfig } from "vite";
import livePreview from 'vite-live-preview'
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig(({ mode }) => ({
    base: "",
    plugins: [
        livePreview({}),
        libInjectCss()

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