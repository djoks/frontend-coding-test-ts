<script lang="ts" setup>
import Logo from '@/assets/logo.svg';
import LogoType from '@/assets/logo-type.svg';

defineProps({
    textOnly: Boolean,
    imageOnly: Boolean
});
</script>

<template>
    <div class="flex-shrink-0 flex items-center">
        <logo v-if="!textOnly" class="w-14" />
        <logo-type v-if="!imageOnly" class="ml-3" />
    </div>
</template>