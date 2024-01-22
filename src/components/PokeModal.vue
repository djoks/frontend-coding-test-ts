<template>
  <back-drop v-bind:close="store.closeModal">
    <div ref="card"
      class="flex flex-col self-center mx-auto md:flex-row bg-white rounded-xl shadow overflow-hidden w-full md:w-auto max-h-[90vh] md:max-h-full overflow-y-scroll"
      v-on:touchstart="handleTouchStart" v-on:touchmove="handleTouchMove" v-on:touchend="handleTouchEnd">
      <div class="flex flex-col">
        <div v-if="store.pokemon" class="flex flex-col px-5 py-5 w-full items-center">
          <div class="flex w-full justify-between capitalize font-bold">
            <div>#{{ store.pokemon.id }}</div>
            <div class="flex items-center space-x-2">
              <like-button v-bind:pokemon="store.pokemon" />
              <span>{{ store.pokemon.name }}</span>
            </div>
          </div>
          <img v-bind:src="store.pokemon.artwork" v-bind:alt="store.pokemon.name" crossorigin="anonymous"
            class="w-64 object-contain" />
          <poke-type-list v-if="bio?.types" v-bind:types="bio.types" />
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
      <div class="flex flex-col bg-white w-full md:w-72 justify-center pt-5 pb-36 md:py-0 px-5 space-y-5">
        <stat-list v-if="bio?.stats" v-bind:stats="bio.stats" />
        <poke-abilities v-if="bio?.abilities" v-bind:abilities="bio.abilities" />
      </div>
    </div>
  </back-drop>
</template>

<script lang="ts" setup>
import { Ref, computed, onMounted, onUnmounted, ref } from 'vue'
import usePokeStore from '@/stores/usePokeStore'
import { useFetchPokemon } from '@/composables'
import PokeTypeList from '@/components/PokeTypeList.vue'
import StatList from '@/components/StatList.vue'
import PokeAbilities from '@/components/PokeAbilities.vue'
import LikeButton from '@/components/LikeButton.vue'
import BackDrop from '@/components/BackDrop.vue'

const store = usePokeStore()

const { result, loading, error } = useFetchPokemon(store.pokemon?.name)

const bio = computed(() => result.value?.pokemon)

const card: Ref<HTMLElement | null> = ref(null)
const startY = ref(0)
const currentY = ref(0)
const touching = ref(false)

onMounted(() => {
  if (store.pokemon && store.color) {
    if (card.value) {
      card.value.style.backgroundColor = store.color.light
    }
  }

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
