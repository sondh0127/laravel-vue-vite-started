<script setup lang="ts">
import BreezeCheckbox from '@/Components/Checkbox.vue'
import BreezeInput from '@/Components/Input.vue'
import BreezeInputError from '@/Components/InputError.vue'
import BreezeLabel from '@/Components/Label.vue'

defineProps({
    canResetPassword: Boolean,
    status: String,
})

defineOptions({
    layout: null,
})

const form = useForm({
    email: '',
    password: '',
    remember: false,
})

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    })
}
</script>

<template>
    <Head title="Log in" />

    <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
        {{ status }}
    </div>

    <form @submit.prevent="submit">
        <div>
            <BreezeLabel for="email" value="Email" />
            <BreezeInput id="email" v-model="form.email" type="email" class="mt-1 block w-full" required autofocus autocomplete="username" />
            <BreezeInputError class="mt-2" :message="form.errors.email" />
        </div>

        <div class="mt-4">
            <BreezeLabel for="password" value="Password" />
            <BreezeInput id="password" v-model="form.password" type="password" class="mt-1 block w-full" required autocomplete="current-password" />
            <BreezeInputError class="mt-2" :message="form.errors.password" />
        </div>

        <div class="block mt-4">
            <label class="flex items-center">
                <BreezeCheckbox v-model:checked="form.remember" name="remember" />
                <span class="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">
            <Link v-if="canResetPassword" :href="route('password.request')" class="underline text-sm text-gray-600 hover:text-gray-900">
                Forgot your password?
            </Link>

            <Button class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Log in
            </Button>
        </div>
    </form>
</template>
