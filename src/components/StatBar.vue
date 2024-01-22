<template>
    <div class="flex flex-col">
        <span class="flex text-xs justify-between capitalize">
            <span class="text-gray-600 font-light">{{ stat.stat.name }}</span> <span>{{ stat.base_stat }}</span>
        </span>
        <div class="w-full rounded-full $ bg-gray-200">
            <div :style="{ backgroundColor: color, width: statWidth }"
                class="text-xs font-medium text-black text-center p-0.5 leading-none rounded-full">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Stat } from '@/types';
import { getStatColor } from '@/utils';
import { ComputedRef, computed } from 'vue';

const MAX_STAT_VALUE = 255;

const props = defineProps<{ stat: Stat }>();
const color = getStatColor(props.stat.stat.name);

const statWidth: ComputedRef = computed(() => {
    const widthPercentage: number = (props.stat.base_stat / MAX_STAT_VALUE) * 100;
    return `${Math.min(widthPercentage, 100)}%`;
});
</script>
