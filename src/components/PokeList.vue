<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
    <poke-tile
      v-for="pokemon in pokemons"
      v-bind:key="pokemon.id"
      v-bind:pokemon="pokemon"
    />
  </div>
</template>

<script lang="ts" setup>
import { Pokemon } from '@/types'
import PokeTile from '@/components/PokeTile.vue'

defineProps<{ pokemons: Pokemon[] }>()
</script>
