<template>
  <div
    v-show="imageLoaded"
    ref="card"
    class="flex flex-col relative items-center justify-end rounded-xl shadow overflow-hidden h-48 w-full bottom-0 bg-gray-200 dark:!bg-gray-900 bg-pokeball-light filter dark:brightness-75 dark:bg-pokeball-dark bg-no-repeat bg-center bg-contain cursor-pointer"
    v-bind:style="cardThemeStyle"
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
      class="flex items-center justify-center space-x-1 py-1 px-2 rounded-full text-center bg-black dark:bg-gray-700 bg-opacity-20 text-white mb-5"
      v-bind:style="captionThemeStyle"
    >
      <img
        src="@/assets/pokeball.png"
        alt="Pokeball"
        class="w-3 object-contain"
      />
      <span class="capitalize">{{ pokemon.name }}</span>
    </div>
    <span class="absolute dark:text-white top-2 left-3 filter"
      >#{{ pokemon.id }}</span
    >
  </div>
  <skeleton-loader v-if="!imageLoaded" class="w-full h-48 rounded-xl" />
</template>

<script lang="ts" setup>
import { computed, ref, Ref } from 'vue'
import { getDominantImageColor } from '@/utils'
import { Color, Pokemon } from '@/types'
import { usePokeStore, useThemeStore } from '@/stores'
import SkeletonLoader from '@/components/loaders/SkeletonLoader.vue'

defineProps<{ pokemon: Pokemon }>()

const card: Ref<HTMLElement | null> = ref(null)
const caption: Ref<HTMLElement | null> = ref(null)
const color: Ref<Color | null> = ref(null)
const imageLoaded = ref(false)

const store = usePokeStore()
const theme = useThemeStore()

const cardThemeStyle = computed(() => {
  if (!theme.isDarkMode && color.value) {
    return {
      backgroundColor: color.value.light,
    }
  }
  return {}
})

const captionThemeStyle = computed(() => {
  if (!theme.isDarkMode && color.value) {
    return {
      backgroundColor: color.value.dark,
    }
  }
  return {}
})

const selectPokemon = (pokemon: Pokemon) => {
  if (color.value) {
    store.setPokemon(pokemon, color.value)
  }
}

const handleImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement

  if (img) {
    color.value = getDominantImageColor(img)

    if (color.value && !theme.isDarkMode) {
      if (card.value) {
        card.value.style.backgroundColor = color.value.light
      }

      if (caption.value) {
        caption.value.style.backgroundColor = color.value.dark
      }
    }
  }

  imageLoaded.value = true
}
</script>
