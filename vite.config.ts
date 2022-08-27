import path from 'path'
import { defineConfig } from 'vite'
import Laravel from 'laravel-vite-plugin'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueMacros from 'unplugin-vue-macros/vite'

export default defineConfig({
    resolve: {
        alias: {
            'ziggy-js': path.resolve('vendor/tightenco/ziggy/dist/index.m.js'),
            '@': path.resolve('resources/js'),
        },
    },
    plugins: [
        Laravel({
            input: 'resources/js/app.ts',
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        VueMacros({ version: 3, defineModel: true }),
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
        Components({
            dts: 'resources/js/components.d.ts',
            dirs: ['resources/js/Components'],
            resolvers: [
                (componentName) => {
                    const inertiaComponents = ['Head', 'Link']
                    if (inertiaComponents.includes(componentName))
                        return { name: componentName, from: '@inertiajs/inertia-vue3' }
                },
            ],
        }),
        AutoImport({
            dts: 'resources/js/auto-imports.d.ts',
            imports: [
                'vue',
                '@vueuse/core',
                {
                    'ziggy-js': [
                        ['default', 'route'],
                    ],
                },
                {
                    '@inertiajs/inertia-vue3': [
                        'usePage',
                    ],
                },
                {
                    '@inertiajs/inertia': [
                        'Inertia',
                    ],
                },
            ],
            presetOverriding: true,
            vueTemplate: true,
            dirs: [
                'resources/js//composables',
                // './composables/**', // all nested modules
            ],

        }),

    ],
    ssr: {
        noExternal: ['@inertiajs/server'],
    },
})
