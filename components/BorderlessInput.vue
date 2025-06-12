<template>
    <input 
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        class="w-14 px-2 py-1 bg-transparent border-b border-gray-400 focus:border-green-500 outline-none text-white transition-colors"
    />
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: [String, Number],
        required: true
    },
    type: {
        type: String,
        default: 'text'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    min: {
        type: [String, Number],
        default: undefined
    },
    max: {
        type: [String, Number],
        default: undefined
    },
    step: {
        type: [String, Number],
        default: undefined
    }
})

defineEmits(['update:modelValue'])
</script>