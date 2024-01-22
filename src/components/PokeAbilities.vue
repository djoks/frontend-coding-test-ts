<template>
  <div class="flex flex-col w-full space-y-3">
    <span>Abilities:</span>
    <div class="flex space-x-2 items-center w-full">
      <span
        v-for="ability in abilities"
        v-bind:key="ability.ability.id"
        class="capitalize bg-gray-200 text-xs py-1 px-3 rounded-full"
        >{{ ability.ability.name }}</span
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ability } from '@/types'

defineProps<{ abilities: Ability[] }>()
</script>
