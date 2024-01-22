<template>
    <div class="container pt-5 px-3 mx-auto overflow-y-scroll">
        <poke-list :pokemons="pokemons" />

        <div ref="sentinel" class="sentinel"></div>

        <teleport to="#modals">
            <poke-modal v-if="store.isVisible" />
            <app-toast v-if="toast.isVisible" />
        </teleport>
    </div>
</template>

<script lang="ts" setup>
import { PokeList, PokeModal, AppToast } from '@/components';

import { useInfiniteScroll, useFetchAllPokemon } from '@/composables';
import usePokeStore from '@/stores/usePokeStore';
import useToastStore from '@/stores/useToastStore';

const { pokemons, loading, nextPage } = useFetchAllPokemon();
const { sentinel } = useInfiniteScroll(nextPage);
const store = usePokeStore();
const toast = useToastStore();

</script>

