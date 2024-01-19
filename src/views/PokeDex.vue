<template>
    <div class="container pt-5 px-3 mx-auto overflow-y-scroll">
        <poke-list :pokemons="pokemons" />
        <div ref="sentinel" class="sentinel"></div>
    </div>
</template>

<script lang="ts" setup>
import { PokeList } from '@/components';

import { useInfiniteScroll, useFetchAllPokemon } from '@/composables';

const { pokemons, loading, nextPage } = useFetchAllPokemon();
const { sentinel } = useInfiniteScroll(nextPage);

</script>

