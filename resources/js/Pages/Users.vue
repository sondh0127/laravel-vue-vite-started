<script lang="ts" setup>
interface Props {
    time: string
    users: any
}

const props = defineProps<Props>()
</script>

<template>
    <div class="h-screen">
        Users {{ $page.props.user }}
        <PrelineTable :users="users" />
    </div>

    <div class="">
        Users 2
        <p>The current time is {{ time }}</p>

        <Link href="/users" class="text-blue-5" preserve-scroll>
            Refresh
        </Link>
    </div>
</template>
