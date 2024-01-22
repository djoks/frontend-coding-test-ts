<template>
    <button class="outline-none" @click="likePokemon">
        <heart-filled-icon v-if="isLiked" class="w-4 h-4 object-contain animate-in fade-in animate-out fade-out" />
        <heart-icon v-else class="w-4 h-4 object-contain animate-in fade-in animate-out fade-out" />
    </button>
</template>

<script lang="ts" setup>
import { useLikePokemon } from '@/composables';
import { Pokemon } from '@/types';
import { onMounted } from 'vue';
import HeartIcon from '@/assets/heart.svg';
import HeartFilledIcon from '@/assets/heart-filled.svg';
import useToastStore from '@/stores/useToastStore';

const props = defineProps<{ pokemon: Pokemon }>();

const { isLiked, toggleLike, loadLikes } = useLikePokemon(props.pokemon.name);
const toast = useToastStore();

onMounted(() => {
    loadLikes();
});

const likePokemon = () => {
    toggleLike();

    if (isLiked.value) {
        toast.makeToast(`You liked ${props.pokemon.name}!`);
    } else {
        toast.makeToast(`You disliked ${props.pokemon.name}!`);
    }
};
</script>