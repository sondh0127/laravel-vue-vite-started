<script lang="ts" setup>
interface Props {
    time: string
    users: {
        data: App.Models.User[]
    }
    filters: {
        search: string
    }
}

const props = defineProps<Props>()

const search = ref(props.filters.search)

watchThrottled(search, (newSearch) => {
    Inertia.get('/users', { search: newSearch }, {
        preserveState: true,
        replace: true,
    })
}, { throttle: 500 })
</script>

<template>
    <div class="h-screen">
        Users {{ $page.props.user }}
        <PrelineTable v-model:search="search" :users="users" />
    </div>

    <div class="">
        Users 2
        <p>The current time is {{ time }}</p>

        <Link href="/users" class="text-blue-5" preserve-scroll>
            Refresh
        </Link>
    </div>
</template>
