import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerVariantGroup, transformerDirectives } from 'unocss'
import { formPreflight } from './resources/js/unocss-forms'

export function createConfig({ strict = true, dev = true } = {}) {
    return defineConfig({
        envMode: dev ? 'dev' : 'build',
        theme: {
            colors: {

            },
        },
        shortcuts: [
        ],
        presets: [
            presetAttributify(),
            presetIcons(
                {
                    collections: {
                        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default as any),
                    },
                }
            ),
            presetWebFonts({
                provider: 'bunny',
                fonts: {
                    sans: 'Nunito',
                },
            }),
            presetUno(),

        ],
        transformers: [
            transformerVariantGroup(),
            transformerDirectives(),
        ],
        preflights: [
            formPreflight,
        ]
    })
}

export default createConfig()
