<script lang="ts" setup>
defineProps({
    textOnly: Boolean,
    imageOnly: Boolean
});
</script>

<template>
    <div class="flex-shrink-0 flex items-center">
        <img v-if="!textOnly" class="w-14 h-14" src="@/assets/logo.svg" alt="Zammad Logo Image" />
        <img v-if="!imageOnly" class="ml-3" src="@/assets/logotype.svg" alt="Zammad Logo Text" />
    </div>
</template>