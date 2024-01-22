<template>
    <div v-if="stats" class="flex flex-col w-full space-y-3">
        <span>Base Stats:</span>
        <stat-bar :stat="stat" v-for="stat in stats"></stat-bar>
    </div>
</template>

<script lang="ts" setup>
import { Stat } from '@/types';
import { StatBar } from '@/components';

defineProps<{ stats: Stat[] }>();

</script>