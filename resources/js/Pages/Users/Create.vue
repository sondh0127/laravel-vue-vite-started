<script lang="ts" setup>
const form = useForm({
    name: '',
    email: '',
    password: '',
})

function handleSubmit() {
    form.post('/users', {
        // preserveScroll: true
        onSuccess: () => {
            form.reset('name')
        },
    })
}

provide('formKey', form)
</script>

<template>
    <Head title="Create User" />

    <div>
        <h1 class="text-3xl">
            Create New User
        </h1>
        <form class="flex flex-col gap-2" @submit.prevent="handleSubmit">
            <InputField
                v-model="form.name" label="Name" :error="form.errors.name"
                @input="() => form.clearErrors('name')"
            />
            <InputField
                v-model="form.email" label="Email" :error="form.errors.email"
                @input="() => form.clearErrors('email')"
            />
            <InputField
                v-model="form.password" type="password" label="Password" :error="form.errors.password"
                @input="() => form.clearErrors('password')"
            />

            <button
                :disabled="form.processing" type="submit"
                class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 disabled:opacity-30"
            >
                Submit
            </button>
        </form>
    </div>
</template>
