<script lang="ts" setup>
const page = usePage()
const name = computed(() => page.props.value.user)
</script>

<template>
    <Head title="Settings" />
    <div class="h-screen">
        <div>
            Welcome back {{ name }}
        </div>
        Settings
    </div>
</template>
