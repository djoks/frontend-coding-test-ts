<template>
  <div class="container pt-5 px-3 mx-auto overflow-y-scroll">
    <h1 class="flex flex-col md:w-1/2 text-start text-2xl mb-5 font-black dark:text-white">
      PokeDex
      <small class="text-sm font-light">This simple Vue application displays a list of pokemon available through the
        <a class="text-blue-600" href="https://github.com/mazipan/graphql-pokeapi" target="__blank">GraphQL-PokeAPI</a>.
        Clicking
        on a Pokemon
        reveals more details.</small>
    </h1>
    <poke-list v-bind:pokemons="pokemons" v-bind:loading="loading" />

    <div ref="sentinel" class="sentinel"></div>

    <teleport to="#modals">
      <poke-modal v-if="store.isVisible" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import { useInfiniteScroll, useFetchAllPokemon } from '@/composables'
import usePokeStore from '@/stores/usePokeStore'
import { PokeList, PokeModal } from '@/components'

const { pokemons, loading, nextPage } = useFetchAllPokemon()
const { sentinel } = useInfiniteScroll(nextPage)
const store = usePokeStore()
</script>
