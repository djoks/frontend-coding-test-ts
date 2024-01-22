<template>
    <button @click="toggleLike">
        <heart-filled-icon v-if="isLiked" class="w-4 h-4 object-contain" />
        <heart-icon v-else class="w-4 h-4 object-contain" />
    </button>
</template>

<script lang="ts" setup>
import { useLikePokemon } from '@/composables';
import { Pokemon } from '@/types';
import { onMounted } from 'vue';
import HeartIcon from '@/assets/heart.svg';
import HeartFilledIcon from '@/assets/heart-filled.svg';

const props = defineProps<{ pokemon: Pokemon }>();

const { isLiked, toggleLike, loadLikes } = useLikePokemon(props.pokemon.name);

onMounted(() => {
    loadLikes();
});
</script>