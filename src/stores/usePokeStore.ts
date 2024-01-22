import { Color, Pokemon, PokemonState } from "@/types"
import { defineStore } from "pinia"
import { Ref, nextTick, ref } from "vue";

const usePokeStore = defineStore('usePokeStore', () => {
    const pokemon: Ref<Pokemon | null> = ref(null);
    const color: Ref<Color | null> = ref(null);
    const isVisible: Ref<boolean> = ref(false)

    const setPokemon = (selectedPokemon: Pokemon, selectedColor: Color) => {
        pokemon.value = selectedPokemon;
        color.value = selectedColor;
        isVisible.value = true;

        console.log({ pokemon, color });
    };

    const closeModal = () => {
        isVisible.value = false;
    }

    return { pokemon, color, isVisible, setPokemon, closeModal }

})

export default usePokeStore;
