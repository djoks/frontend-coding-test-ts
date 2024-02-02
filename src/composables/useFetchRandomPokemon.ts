import { Ref, computed, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { Pokemon, PokemonResponse } from '@/types'
import { ApolloError } from '@apollo/client/errors'

const useFetchRandomPokemon = (
  limit = 25,
): {
  pokemons: Ref<Pokemon[]>
  loading: Ref<boolean>
  error: Ref<ApolloError | null>
} => {
  const offset = Math.floor(Math.random() * 1000)

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

  const { result, loading, error } = useQuery<PokemonResponse>(
    GET_POKEMONS,
    () => ({ limit, offset }),
  )

  const pokemons = computed(
    () => selectRandomPokemons(result.value?.pokemons.results ?? [], 5) || [],
  )

  return { pokemons, loading, error }
}

const selectRandomPokemons = (
  pokemons: Pokemon[],
  count: number,
): Pokemon[] => {
  const shuffled = [...pokemons].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export default useFetchRandomPokemon
