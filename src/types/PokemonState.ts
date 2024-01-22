import Pokemon from "./Pokemon";

export default interface PokemonState {
    selectedPokemon: Pokemon | null;
    isModalOpen: boolean;
}