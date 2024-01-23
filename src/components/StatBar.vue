<template>
  <div class="flex flex-col">
    <span class="flex text-xs justify-between capitalize">
      <span
        class="text-gray-600 dark:text-white dark:text-opacity-80 font-light"
        >{{ stat.stat.name }}</span
      >
      <span class="dark:text-white dark:text-opacity-80">{{
        stat.base_stat
      }}</span>
    </span>
    <div class="w-full rounded-full $ bg-gray-200">
      <div
        v-bind:style="{ backgroundColor: color, width: statWidth }"
        class="text-xs font-medium text-black dark:text-white dark:text-opacity-80 text-center p-0.5 leading-none rounded-full"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ComputedRef, computed } from 'vue'
import { Stat } from '@/types'
import { getStatColor } from '@/utils'

const MAX_STAT_VALUE = 255

const props = defineProps<{ stat: Stat }>()
const color = getStatColor(props.stat.stat.name)

const statWidth: ComputedRef = computed(() => {
  const widthPercentage: number = (props.stat.base_stat / MAX_STAT_VALUE) * 100
  return `${Math.min(widthPercentage, 100)}%`
})
</script>
