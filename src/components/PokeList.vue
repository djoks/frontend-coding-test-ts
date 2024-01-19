<template>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        <poke-tile v-for="pokemon in pokemons" :key="pokemon.id" :pokemon="pokemon" />
    </div>
</template>

<script lang="ts" setup>
import { Pokemon } from '@/types/pokemon';
import { PokeTile } from '@/components';

defineProps<{ pokemons: Pokemon[] }>();

</script>