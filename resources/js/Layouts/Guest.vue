<script setup lang="ts">
import { Link } from '@inertiajs/inertia-vue3'
import BreezeApplicationLogo from '@/Components/ApplicationLogo.vue'

interface Props {
    canLogin: boolean
    canRegister: boolean
    auth: {
        user?: App.Models.User
    }
}

const props = defineProps<Props>()
</script>

<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div>
            <Link href="/">
                <BreezeApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
            </Link>
            <!-- <div v-if="canLogin" class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                <Link
                    v-if="auth.user" :href="route('dashboard')"
                    class="text-sm text-gray-700 dark:text-gray-500 underline"
                >
                    Dashboard
                </Link>

                <template v-else>
                    <Link :href="route('login')" class="text-sm text-gray-700 dark:text-gray-500 underline">
                        Log in
                    </Link>
                    <Link
                        v-if="canRegister" :href="route('register')"
                        class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                    >
                        Register
                    </Link>
                </template>
            </div>
            <template v-else>
                <Link
                    href="users?foo=bar" class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline" :class="{
                        'font-bold underline': $page.url.startsWith('/users'),
                    }"
                >
                    Users
                </Link>
                <Link
                    href="settings" class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline" :class="{
                        'font-bold underline': $page.component === 'Settings',
                    }"
                >
                    Settings
                </Link>

                <Link
                    as="button" :data="{ foo: 'bar' }" href="logout2" method="POST"
                    class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                >
                    Log out
                </Link>
            </template> -->
        </div>

        <div class="w-full sm:max-w-4xl mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>
