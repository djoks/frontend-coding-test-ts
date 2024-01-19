<template>
    <router-link to="/">
        <div ref="card"
            class="flex flex-col items-center justify-end rounded-xl shadow overflow-hidden h-48 w-full bottom-0 bg-pokeball bg-no-repeat bg-center">
            <img :src="pokemon.artwork" :alt="pokemon.name" crossorigin="anonymous" @load="handleImageLoad"
                class="w-32 object-contain " />
            <div ref="caption"
                class="flex items-center justify-center space-x-1 py-1 px-2 rounded-full text-center bg-black bg-opacity-20 text-white mb-5">
                <img src="@/assets/pokeball.png" alt="Pokeball" class="w-3 object-contain" />
                <span class="capitalize">{{ pokemon.name }}</span>
            </div>
        </div>
    </router-link>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { getDominantImageColor } from '@/utils';
import { Color } from '@/types/color';
import { Pokemon } from '@/types/pokemon';

defineProps<{ pokemon: Pokemon }>();

const card: Ref<HTMLElement | null> = ref(null);
const caption: Ref<HTMLElement | null> = ref(null);

const handleImageLoad = (event: Event) => {
    const img = event.target as HTMLImageElement;
    const color: Color = getDominantImageColor(img);

    if (card.value) {
        card.value.style.backgroundColor = color.light;
    }

    if (caption.value) {
        caption.value.style.backgroundColor = color.dark;
    }
};

</script>