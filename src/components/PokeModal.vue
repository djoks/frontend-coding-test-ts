<template>
  <back-drop v-bind:close="store.closeModal">
    <div
      class="flex flex-col self-center mx-auto md:flex-row bg-white dark:bg-gray-700 rounded-xl shadow overflow-hidden w-full md:w-auto max-h-[90vh] md:max-h-full overflow-y-scroll animate-in slide-in-from-bottom"
      v-bind:style="themeStyle"
      v-on:touchstart="handleTouchStart"
      v-on:touchmove="handleTouchMove"
      v-on:touchend="handleTouchEnd"
    >
      <div class="flex flex-col">
        <div
          v-if="store.pokemon"
          class="flex flex-col px-5 py-5 w-full items-center"
        >
          <div class="flex w-full justify-between capitalize font-bold">
            <div class="dark:text-white dark:text-opacity-80">
              #{{ store.pokemon.id }}
            </div>
            <div class="flex items-center space-x-2">
              <like-button v-bind:pokemon="store.pokemon" />
              <span class="dark:text-white dark:text-opacity-80">{{
                store.pokemon.name
              }}</span>
            </div>
          </div>
          <img
            v-bind:src="store.pokemon.artwork"
            v-bind:alt="store.pokemon.name"
            crossorigin="anonymous"
            class="w-64 object-contain"
          />
          <poke-type-list
            v-bind:types="bio?.types || []"
            v-bind:loading="loading"
          />
        </div>

        <div class="flex py-1 bg-gray-50 dark:bg-gray-800">
          <div
            class="flex w-1/2 items-center justify-between text-xs px-3 py-4 border-r dark:border-gray-600"
          >
            <span class="dark:text-white dark:text-opacity-80">Weight</span>
            <skeleton-loader v-if="loading" class="w-10 h-4 rounded-full" />
            <span v-else class="font-bold dark:text-white dark:text-opacity-80"
              >{{ bio?.weight }} KG</span
            >
          </div>
          <div
            class="flex w-1/2 items-center justify-between text-xs px-3 py-4"
          >
            <span class="dark:text-white dark:text-opacity-80">Height</span>
            <skeleton-loader v-if="loading" class="w-10 h-4 rounded-full" />
            <span v-else class="font-bold dark:text-white dark:text-opacity-80"
              >{{ bio?.height }} CM</span
            >
          </div>
        </div>
      </div>
      <div
        class="flex flex-col bg-white dark:bg-gray-900 w-full md:w-72 justify-center pt-5 pb-36 md:py-0 px-5 space-y-5"
      >
        <stat-list v-bind:stats="bio?.stats || []" v-bind:loading="loading" />
        <abilities-list
          v-bind:abilities="bio?.abilities || []"
          v-bind:loading="loading"
        />
      </div>
    </div>
  </back-drop>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useFetchPokemon } from '@/composables'
import PokeTypeList from '@/components/PokeTypeList.vue'
import StatList from '@/components/StatList.vue'
import AbilitiesList from '@/components/AbilitiesList.vue'
import LikeButton from '@/components/LikeButton.vue'
import BackDrop from '@/components/BackDrop.vue'
import SkeletonLoader from '@/components/loaders/SkeletonLoader.vue'
import { usePokeStore, useThemeStore, useToastStore } from '@/stores'

const store = usePokeStore()
const theme = useThemeStore()
const toast = useToastStore()

const { result, loading, error } = useFetchPokemon(store.pokemon?.name)

const bio = computed(() => result.value?.pokemon)

const startY = ref(0)
const currentY = ref(0)
const touching = ref(false)

if (error.value) {
  toast.makeToast('Sorry, an error occurred while trying to retrieve the data.')
}

const themeStyle = computed(() => {
  if (!theme.isDarkMode && store.color) {
    return {
      backgroundColor: store.color.light,
    }
  }
  return {}
})

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const handleTouchStart = (e: TouchEvent) => {
  startY.value = e.touches[0].clientY
  currentY.value = startY.value
  touching.value = true
}

const handleTouchMove = (e: TouchEvent) => {
  if (e.currentTarget) {
    const target = e.currentTarget as HTMLElement

    currentY.value = e.touches[0].clientY
    const deltaY = currentY.value - startY.value

    if (deltaY > 0) {
      target.style.transform = `translateY(${deltaY}px)`
    }
  }
}

const handleTouchEnd = (e: TouchEvent) => {
  if (e.currentTarget) {
    const target = e.currentTarget as HTMLElement

    touching.value = false
    const deltaY = currentY.value - startY.value
    if (deltaY > 100) {
      store.closeModal()
    }

    target.style.transform = ''
  }
}
</script>
