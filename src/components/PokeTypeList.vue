<template>
  <div class="flex space-x-2 items-center justify-center rounded-xl w-full">
    <template v-if="loading">
      <skeleton-loader
        v-for="n in 2"
        v-bind:key="n"
        class="w-24 h-6 rounded-full"
      />
    </template>
    <span
      v-for="pokemonType in types"
      v-bind:key="pokemonType.type.id"
      class="capitalize text-white text-xs py-1 px-3 rounded-full"
      v-bind:style="{
        backgroundColor: getPokeTypeColor(pokemonType.type.name),
      }"
      >{{ pokemonType.type.name }}</span
    >
  </div>
</template>

<script lang="ts" setup>
import { PokemonType } from '@/types'
import { getPokeTypeColor } from '@/utils'
import SkeletonLoader from './loaders/SkeletonLoader.vue'

defineProps<{ types: PokemonType[]; loading: boolean }>()
</script>
