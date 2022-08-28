import '@unocss/reset/tailwind.css'
import './bootstrap'
import '../css/app.css'
import 'uno.css'
import type { DefineComponent } from 'vue'
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ZiggyVue } from '../../vendor/tightenco/ziggy/src/js/vue'
import { Ziggy } from './ziggy'
import Guest from './Layouts/Guest.vue'
import Authenticated from './Layouts/Authenticated.vue'
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel'

createInertiaApp({
    title: title => `${title} | ${appName}`,
    resolve: async (name) => {
        console.log('[LOG] ~ file: app.ts ~ line 18 ~ name', name)
        const page = await resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')) as unknown as DefineComponent
        console.log('[LOG] ~ file: app.ts ~ line 19 ~ page', page)

        page.default.layout = name.startsWith('Auth') ? Guest : (page.default.layout ?? Authenticated)
        return page
    },
    setup({ el, app, props, plugin }) {
        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .mount(el)
    },
})

InertiaProgress.init({ color: '#3b82f6', showSpinner: true })
