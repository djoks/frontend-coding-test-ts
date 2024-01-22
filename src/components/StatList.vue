<template>
  <div class="space-y-3">
    <span>Base Stats:</span>
    <div v-if="stats" class="grid grid-cols-2 md:grid-cols-1 w-full gap-3">
      <stat-bar
        v-for="stat in stats"
        v-bind:key="stat.stat.name"
        v-bind:stat="stat"
      ></stat-bar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Stat } from '@/types'
import StatBar from '@/components/StatBar.vue'

defineProps<{ stats: Stat[] }>()
</script>
