<template>
  <div class="container pt-5 px-3 mx-auto overflow-y-scroll">
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
