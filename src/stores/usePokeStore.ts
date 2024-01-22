import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import { Color, Pokemon } from '@/types'

const usePokeStore = defineStore('usePokeStore', () => {
  const pokemon: Ref<Pokemon | null> = ref(null)
  const color: Ref<Color | null> = ref(null)
  const isVisible: Ref<boolean> = ref(false)

  const setPokemon = (selectedPokemon: Pokemon, selectedColor: Color) => {
    pokemon.value = selectedPokemon
    color.value = selectedColor
    isVisible.value = true
  }

  const closeModal = () => {
    isVisible.value = false
    console.log('closeModal')
  }

  return { pokemon, color, isVisible, setPokemon, closeModal }
})

export default usePokeStore
