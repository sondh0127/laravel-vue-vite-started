<script lang="ts" setup>
import { Link } from '@inertiajs/inertia-vue3'
const props = defineProps<{
    users: {
        data: App.Models.User[]
        links: {
            url: string | null
            active: boolean
            label: string
        }[]
    }
    search?: string
}>()

const searchModel = useVModel(props, 'search', undefined, { passive: true, defaultValue: '' })
</script>

<template>
    <div>
        <div class="flex flex-col">
            <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                    <div class="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                        <div class="py-3 px-4">
                            <div class="relative max-w-xs">
                                <label for="hs-table-with-pagination-search" class="sr-only">Search</label>
                                <input
                                    id="hs-table-with-pagination-search"
                                    v-model="searchModel" type="text"
                                    name="hs-table-with-pagination-search"
                                    class="p-3 pl-10 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                    placeholder="Search for items"
                                >
                                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                                    <svg
                                        class="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16"
                                        height="16" fill="currentColor" viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="overflow-y-scroll max-h-500px">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr v-for="user in users.data" :key="user.id">
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 w-10 text-center"
                                        >
                                            {{ user.id }}
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
                                        >
                                            {{ user.name }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                class="text-blue-500 hover:text-blue-700"
                                                :href="`/user/${user.id}/edit`"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="py-1 px-4">
                            <nav class="flex items-center space-x-1.5">
                                <Component
                                    :is="link.url ? Link : 'span'" v-for="(link, index) in users.links" :key="index"
                                    :href="link.url || '#'"
                                    aria-current="page"
                                    class="inline-flex items-center justify-center text-sm font-medium "
                                    :class="[
                                        index !== 0 && index !== users.links.length - 1
                                            ? 'bg-blue-500 text-white rounded-full w-10 h-10 p-3'
                                            : 'text-gray-400 hover:text-blue-600 gap-2 rounded-md p-2',
                                        {
                                            'bg-blue-700': link.active,
                                            'opacity-30': !link.url,
                                        },
                                    ]"
                                >
                                    <span v-html="link.label" />
                                </component>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
