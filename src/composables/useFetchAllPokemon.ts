import { Ref, ref, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { Pokemon, PokemonResponse } from '@/types'
import { ApolloError } from '@apollo/client/errors'

const useFetchAllPokemon = (
  limit = 20,
): {
  pokemons: Ref<Pokemon[]>
  loading: Ref<boolean>
  error: Ref<ApolloError | null>
  nextPage: () => void
} => {
  const offset = ref(0)
  const pokemons = ref<Pokemon[]>([])

  const GET_POKEMONS = gql`
    query Pokemons($limit: Int!, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        nextOffset
        prevOffset
        status
        message
        results {
          id
          url
          name
          image
          artwork
          dreamworld
        }
      }
    }
  `

  const { result, loading, error, refetch } = useQuery<PokemonResponse>(
    GET_POKEMONS,
    () => ({ limit, offset: offset.value }),
  )

  watch(result, (newResult) => {
    if (newResult?.pokemons.results) {
      const newPokemons = newResult.pokemons.results
      pokemons.value = [...pokemons.value, ...newPokemons]
    }
  })

  const fetchPokemons = () => {
    refetch()
  }

  const nextPage = () => {
    if (result.value && result.value.pokemons.next) {
      offset.value = result.value.pokemons.nextOffset
      fetchPokemons()
    }
  }

  return { pokemons, loading, error, nextPage }
}

export default useFetchAllPokemon
