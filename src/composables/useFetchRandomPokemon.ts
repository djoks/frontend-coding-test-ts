import { Ref, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { Pokemon, PokemonResponse } from '@/types'
import { ApolloError } from '@apollo/client/errors'

/**
 * Fetches a random set of Pokémons using GraphQL.
 * 
 * @param {number} [limit=25] - The maximum number of Pokémon to fetch.
 * @returns An object containing:
 * - pokemons: A computed ref of an array of Pokémon objects.
 * - loading: A ref indicating if the query is in the loading state.
 * - error: A ref containing an ApolloError object if an error occurs during the query.
 */
const useFetchRandomPokemon = (
    limit = 25,
): {
    pokemons: Ref<Pokemon[]>
    loading: Ref<boolean>
    error: Ref<ApolloError | null>
} => {
    // Calculate a random offset to fetch a different set of Pokémons on each call.
    const offset = Math.floor(Math.random() * 1000)

    /**
     * Selects a random subset of Pokémon from the fetched list.
     * 
     * @param {Pokemon[]} pokemons - The list of Pokémon to select from.
     * @param {number} count - The number of Pokémon to select.
     * @returns {Pokemon[]} An array of randomly selected Pokémon.
     */
    const selectRandomPokemons = (
        pokemons: Pokemon[],
        count: number,
    ): Pokemon[] => {
        const shuffled = [...pokemons].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, count)
    }

    // GraphQL query to fetch Pokémon with dynamic limit and offset.
    const GET_POKEMONS = gql`
        query Pokemons($limit: Int!, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            status
            message
            results {
            id
            name
            artwork
            }
        }
        }
    `

    // Execute the query with the provided limit and calculated offset.
    const { result, loading, error } = useQuery<PokemonResponse>(
        GET_POKEMONS,
        () => ({ limit, offset }),
    )

    // Compute a subset of 5 random Pokémon from the fetched results.
    const pokemons = computed(
        () => selectRandomPokemons(result.value?.pokemons.results ?? [], 5) || [],
    )

    return { pokemons, loading, error }
}

export default useFetchRandomPokemon
