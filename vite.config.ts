import { defineConfig } from 'vite';
import Laravel from 'laravel-vite-plugin';
import Vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite'

export default defineConfig({
    plugins: [
        Laravel({
            input: 'resources/js/app.ts',
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        Vue({
            reactivityTransform: true,
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        Unocss({}),
    ],
    ssr: {
        noExternal: ['@inertiajs/server'],
    },
});
