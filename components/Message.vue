<template>
    <div class="flex gap-2">
        <span class="font-bold">{{ nickname }}</span>
        <p> {{ message }} </p>
    </div>
</template>

<script setup>
defineProps({
    nickname: String,
    message: String
})
</script>