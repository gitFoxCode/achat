<template>
    <div class="border p-4 rounded-lg border-red-400 text-red-400 flex gap-1">
        <nuxt-icon name="system" /> <span class="font-bold">System:</span> {{ message }}
    </div>
</template>

<script setup>
defineProps({
    message: String
})
</script>