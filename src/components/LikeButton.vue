<template>
  <button role="like-button" class="outline-none" v-on:click="likePokemon">
    <heart-filled-icon
      v-if="isLiked"
      class="w-4 h-4 object-contain animate-in fade-in animate-out fade-out"
      role="dislike"
    />
    <heart-icon
      v-else
      class="w-4 h-4 object-contain animate-in fade-in animate-out fade-out"
      role="like"
    />
  </button>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useLikePokemon } from '@/composables'
import { Pokemon } from '@/types'
import HeartIcon from '@/assets/heart.svg'
import HeartFilledIcon from '@/assets/heart-filled.svg'
import useToastStore from '@/stores/useToastStore'

const props = defineProps<{ pokemon: Pokemon }>()

const { isLiked, toggleLike, loadLikes } = useLikePokemon(props.pokemon.name)
const { makeToast } = useToastStore()

onMounted(() => {
  loadLikes()
})

const likePokemon = () => {
  toggleLike()

  if (isLiked.value) {
    makeToast(`You liked ${props.pokemon.name}!`)
  } else {
    makeToast(`You disliked ${props.pokemon.name}!`)
  }
}
</script>
