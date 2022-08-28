<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        label?: string
        error?: string
        modelValue?: string
        type?: 'text' | 'password'
    }>(),
    {
        type: 'text',
    },
)

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'input', event: Event): void
}>()

const value = useVModel(props, 'modelValue', emit, { passive: true })
</script>

<template>
    <div>
        <label for="hs-validation-name-error" class="block text-sm font-medium mb-2 dark:text-white">
            {{ label }}
        </label>
        <div class="relative">
            <input
                v-bind="$attrs"
                id="hs-validation-name-error"
                v-model="value"
                :type="type" name="hs-validation-name-error"
                class="py-3 px-4 block w-full rounded-md text-sm  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                :class="[
                    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200  focus:border-blue-500 focus:ring-blue-500',
                    {
                    },
                ]" required aria-describedby="hs-validation-name-error-helper" @input="emit('input', $event)"
            >
            <div
                v-if="error"
                class="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3"
            >
                <svg
                    class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                    aria-hidden="true"
                >
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                    />
                </svg>
            </div>
        </div>
        <p v-if="error" id="hs-validation-name-error-helper" class="text-sm text-red-600 mt-2">
            {{ error }}
        </p>
    </div>
</template>
