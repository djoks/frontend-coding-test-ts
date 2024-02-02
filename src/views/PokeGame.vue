<template>
  <div class="container-sm pt-5 px-3 mx-auto flex flex-col md:flex-row">
    <div
      class="flex flex-col items-start space-y-5 pr-5 dark:text-white dark:text-opacity-80"
    >
      <h1 class="flex flex-col text-start text-2xl font-black">
        PokeGame
        <small class="text-sm font-light">
          Find three (3) matching Pokémon cards in a row.</small
        >
      </h1>
      <div>
        <p class="text-lg font-bold text-start">Instructions:</p>
        <ol class="list-decimal text-start ml-5">
          <li>Click 'Start' to begin.</li>
          <li>Click on a card to flip it over and reveal the Pokémon.</li>
          <li>Continue flipping cards until the entire grid is revealed.</li>
        </ol>
      </div>
      <div class="text-start">
        <p class="text-lg font-bold">Winning Condition:</p>
        <p>You win when you match three of the same Pokémon cards in a row.</p>
        <div class="flex space-x-2 mt-2">
          <div class="p-5 bg-gray-200 dark:bg-gray-800 rounded-xl">
            <img
              src="@/assets/bulbasaur.png"
              class="w-14 h-14 object-contain"
              alt="bulbasaur"
            />
          </div>
          <right-arrow-light v-if="isDarkMode" class="w-8 object-contain" />
          <right-arrow v-else class="w-8 object-contain" />
          <div class="p-5 bg-gray-200 dark:bg-gray-800 rounded-xl">
            <img
              src="@/assets/bulbasaur.png"
              class="w-14 h-14 object-contain"
              alt="bulbasaur"
            />
          </div>
          <right-arrow-light v-if="isDarkMode" class="w-8 object-contain" />
          <right-arrow v-else class="w-8 object-contain" />
          <div class="p-5 bg-gray-200 dark:bg-gray-800 rounded-xl">
            <img
              src="@/assets/bulbasaur.png"
              class="w-14 h-14 object-contain"
              alt="bulbasaur"
            />
          </div>
        </div>
      </div>
      <div class="text-start">
        <p class="text-lg font-bold">Losing Condition:</p>
        <p>
          You lose if all cards are flipped over without achieving three<br />consecutive
          matches of the same Pokémon.
        </p>
      </div>
    </div>
    <div class="relative">
      <game-loader v-if="loadingPokemon || loadingGame" />
      <canvas v-else ref="canvas" width="500" height="500"></canvas>

      <div
        v-if="status !== 'playing'"
        class="bg-gray-900 dark:bg-gray-500 dark:bg-opacity-30 bg-opacity-50 rounded-xl flex flex-col items-center justify-center"
        v-bind:class="{
          'w-full h-full absolute inset-0 z-50':
            status === '' || status === 'won' || status === 'lost',
        }"
      >
        <div v-if="status === 'won'" class="text-4xl font-bold mb-5">
          You Win!
        </div>
        <div v-if="status === 'lost'" class="text-4xl font-bold mb-5">
          You Lose!
        </div>
        <button
          class="bg-yellow-500 px-10 py-3 rounded-xl shadow"
          v-on:click="startGame"
        >
          {{ status === '' ? 'Start Game' : 'Play Again' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetchRandomPokemon, usePokeGame } from '@/composables'
import { watch, nextTick } from 'vue'
import { GameLoader } from '@/components'
import RightArrow from '@/assets/right-arrow.svg'
import RightArrowLight from '@/assets/right-arrow-light.svg'
import { useThemeStore } from '@/stores'
import { storeToRefs } from 'pinia'

const { pokemons, loading: loadingPokemon } = useFetchRandomPokemon()
const {
  canvas,
  cards,
  loading: loadingGame,
  initialize: initializeGame,
  start: startGame,
  check: checkGame,
  status,
} = usePokeGame(pokemons)
const theme = useThemeStore()
const { isDarkMode } = storeToRefs(theme)

watch(
  [loadingGame, loadingPokemon, isDarkMode],
  ([newLoadingGame, newLoadingPokemon]) => {
    if (!newLoadingGame && !newLoadingPokemon) {
      nextTick(async () => {
        await initializeGame(isDarkMode.value)
      })
    }
  },
)

watch([cards], ([newCards]) => {
  if (newCards.length >= 3) {
    nextTick(() => {
      checkGame()
    })
  }
})
</script>

<style>
canvas {
  display: block;
  max-width: 100%;
  max-height: 100vh;
}
</style>
