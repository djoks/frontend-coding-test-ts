<template>
  <div class="flex space-x-2 items-center justify-center rounded-xl w-full">
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

defineProps<{ types: PokemonType[] }>()
</script>
