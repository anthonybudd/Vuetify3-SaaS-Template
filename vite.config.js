// Plugins
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// Utilities
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from 'node:url';


export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        base: '/',
        build: {
            outDir: '../dist',
        },
        plugins: [
            vue({
                template: { transformAssetUrls },

            }),
            vuetify({
                autoImport: true,
                styles: {
                    configFile: 'src/styles/settings.scss',
                },
            }),
        ],
        define: { 'process.env': {} },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
            extensions: [
                '.js',
                '.json',
                '.jsx',
                '.mjs',
                '.ts',
                '.tsx',
                '.vue',
            ],
        },
        server: {
            port: 3000,
        },
    };
});
