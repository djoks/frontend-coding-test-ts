<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
    <poke-tile
      v-for="pokemon in pokemons"
      v-bind:key="pokemon.id"
      v-bind:pokemon="pokemon"
    />
    <template v-if="loading">
      <skeleton-loader
        v-for="n in 20"
        v-bind:key="n"
        class="w-full h-48 rounded-xl"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Pokemon } from '@/types'
import PokeTile from '@/components/PokeTile.vue'
import SkeletonLoader from '@/components/loaders/SkeletonLoader.vue'

defineProps<{ pokemons: Pokemon[]; loading: boolean }>()
</script>
