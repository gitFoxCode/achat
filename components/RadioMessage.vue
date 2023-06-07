<template>
    <div class="border p-4 rounded-lg border-blue-600 text-blue-300 flex gap-1">
        <nuxt-icon name="radio" /><span class="font-bold">{{ author }}</span> {{ message }}
    </div>
</template>

<script setup>
defineProps({
    message: String,
    author: String
})
</script>