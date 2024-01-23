<template>
  <div
    v-show="imageLoaded"
    ref="card"
    class="flex flex-col items-center justify-end rounded-xl shadow overflow-hidden h-48 w-full bottom-0 bg-pokeball bg-no-repeat bg-center cursor-pointer"
    v-on:click="selectPokemon(pokemon)"
  >
    <img
      v-bind:src="pokemon.artwork"
      v-bind:alt="pokemon.name"
      crossorigin="anonymous"
      class="w-32 object-contain"
      v-on:load="handleImageLoad"
    />
    <div
      ref="caption"
      class="flex items-center justify-center space-x-1 py-1 px-2 rounded-full text-center bg-black bg-opacity-20 text-white mb-5"
    >
      <img
        src="@/assets/pokeball.png"
        alt="Pokeball"
        class="w-3 object-contain"
      />
      <span class="capitalize">{{ pokemon.name }}</span>
    </div>
  </div>
  <skeleton-loader v-if="!imageLoaded" class="w-full h-48 rounded-xl" />
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { getDominantImageColor } from '@/utils'
import { Color, Pokemon } from '@/types'
import { usePokeStore } from '@/stores'
import SkeletonLoader from '@/components/loaders/SkeletonLoader.vue'

defineProps<{ pokemon: Pokemon }>()

const card: Ref<HTMLElement | null> = ref(null)
const caption: Ref<HTMLElement | null> = ref(null)
const color: Ref<Color | null> = ref(null)
const imageLoaded = ref(false)
const store = usePokeStore()

const selectPokemon = (pokemon: Pokemon) => {
  if (color.value) {
    store.setPokemon(pokemon, color.value)
  }
}

const handleImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  color.value = getDominantImageColor(img)

  if (color.value) {
    if (card.value) {
      card.value.style.backgroundColor = color.value.light
    }

    if (caption.value) {
      caption.value.style.backgroundColor = color.value.dark
    }
  }

  imageLoaded.value = true
}
</script>
