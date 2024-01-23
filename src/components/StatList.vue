<template>
  <div class="space-y-3">
    <span class="dark:text-white dark:text-opacity-80">Base Stats:</span>
    <div v-if="stats" class="grid grid-cols-2 md:grid-cols-1 w-full gap-3">
      <template v-if="loading">
        <stat-loader v-for="n in 6" v-bind:key="n" />
      </template>
      <stat-bar
        v-for="stat in stats"
        v-else
        v-bind:key="stat.stat.name"
        v-bind:stat="stat"
      ></stat-bar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Stat } from '@/types'
import StatBar from '@/components/StatBar.vue'
import StatLoader from './loaders/StatLoader.vue'

defineProps<{ stats: Stat[]; loading: boolean }>()
</script>
