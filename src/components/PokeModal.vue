<template>
    <div class="flex items-end md:items-center justify-center h-screen w-screen fixed inset-0 top-0 left-0 bg-black bg-opacity-50 z-50 animate-in slide-in-from-bottom"
        @click.self="store.closeModal()">
        <div class="flex flex-col md:flex-row bg-white rounded-xl shadow overflow-hidden w-full md:w-auto">
            <div class="flex flex-col">
                <div ref="card" v-if="store.pokemon" class="flex flex-col px-5 py-5 w-full items-center">
                    <div class="flex w-full justify-between capitalize font-bold">
                        <div>#{{ store.pokemon.id }}</div>
                        <div>{{ store.pokemon.name }}</div>
                    </div>
                    <img :src="store.pokemon.artwork" :alt="store.pokemon.name" crossorigin="anonymous"
                        class="w-64 object-contain" />
                    <poke-type-list v-if="bio?.types" :types="bio.types" />
                </div>

                <div class="flex py-1 bg-gray-50">
                    <div class="flex w-1/2 items-center justify-between text-xs px-3 py-4 border-r">
                        <span>Weight</span>
                        <span class="font-bold">{{ bio?.weight }} KG</span>
                    </div>
                    <div class="flex w-1/2 items-center justify-between text-xs px-3 py-4">
                        <span>Height</span>
                        <span class="font-bold">{{ bio?.height }} CM</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full md:w-72 justify-center pt-5 pb-24 md:py-0 px-5 space-y-5">
                <stat-list v-if="bio?.stats" :stats="bio.stats" />
                <abilities v-if="bio?.abilities" :abilities="bio.abilities" />
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { Ref, computed, onMounted, onUnmounted, ref, watch } from 'vue';
import usePokeStore from '@/stores/usePokeStore';
import { useFetchPokemon } from '@/composables';
import { PokeTypeList, StatList, Abilities } from '@/components';

const store = usePokeStore();

const { result, loading, error } = useFetchPokemon(store.pokemon?.name);

const bio = computed(() => result.value?.pokemon);

const card: Ref<HTMLElement | null> = ref(null);
const title: Ref<HTMLElement | null> = ref(null);

onMounted(() => {
    if (store.pokemon && store.color) {
        if (card.value) {
            card.value.style.backgroundColor = store.color.light;
        }
    }
});
</script>
