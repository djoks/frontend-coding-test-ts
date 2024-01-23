<template>
  <div class="flex flex-col w-full space-y-3">
    <span>Abilities:</span>
    <div class="flex space-x-2 items-center w-full">
      <template v-if="loading">
        <skeleton-loader
          v-for="n in 2"
          v-bind:key="n"
          class="w-24 h-6 rounded-full"
        />
      </template>
      <span
        v-for="ability in abilities"
        v-else
        v-bind:key="ability.ability.id"
        class="capitalize bg-gray-200 text-xs py-1 px-3 rounded-full"
        >{{ ability.ability.name }}</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ability } from '@/types'
import SkeletonLoader from './loaders/SkeletonLoader.vue'

defineProps<{ abilities: Ability[]; loading: boolean }>()
</script>
