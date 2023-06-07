<template>
    <div class="border p-4 rounded-lg border-red-500 text-red-500 flex gap-1">
        <nuxt-icon name="warning" />{{ message }}
    </div>
</template>

<script setup>
defineProps({
    message: String
})
</script>