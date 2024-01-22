import { Ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { PokemonBio } from '@/types'
import { ApolloError } from '@apollo/client/errors'

const useFetchPokemon = (
  name: string | undefined,
): {
  result: Ref<{ pokemon: PokemonBio } | undefined>
  loading: Ref<boolean>
  error: Ref<ApolloError | null>
} => {
  const GET_POKEMON = gql`
    query Pokemon($name: String!) {
      pokemon(name: $name) {
        base_experience
        height
        id
        name
        order
        weight
        status
        message
        stats {
          base_stat
          effort
          stat {
            id
            url
            name
          }
        }
        types {
          type {
            id
            name
          }
        }
        abilities {
          ability {
            id
            name
          }
        }
      }
    }
  `

  const { result, loading, error } = useQuery<{
    pokemon: PokemonBio
  }>(GET_POKEMON, { name })

  return { result, loading, error }
}

export default useFetchPokemon
