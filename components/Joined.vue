<template>
    <div class="text-amber-300 flex gap-1">
        <nuxt-icon name="sparkles" /> <span class="font-bold">{{ user }}</span> dołączył!
    </div>
</template>

<script setup>
defineProps({
    user: String
})
</script>