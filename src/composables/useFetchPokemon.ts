import { Ref, ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { Pokemon } from '@/types/pokemon';
import { PokemonsResponse } from '@/types/pokemonsResponse';

const useFetchPokemon = (limit: number = 30): {
    pokemons: Ref<Pokemon[]>;
    loading: Ref<boolean>;
    nextPage: () => void;
    prevPage: () => void;
} => {
    const offset = ref(0);
    const pokemons = ref<Pokemon[]>([]);

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
  `;

    const { result, loading, refetch } = useQuery<PokemonsResponse>(GET_POKEMONS, () => ({ limit, offset: offset.value }));

    watch(result, (newResult) => {
        if (newResult?.pokemons.results) {
            const newPokemons = newResult.pokemons.results as Pokemon[];
            pokemons.value = [...pokemons.value, ...newPokemons];
        }
    });

    const fetchPokemons = () => {
        refetch();
    };

    const nextPage = () => {
        if (result.value && result.value.pokemons.next) {
            offset.value = result.value.pokemons.nextOffset;
            fetchPokemons();
        }
    };

    const prevPage = () => {
        if (result.value && result.value.pokemons.previous) {
            offset.value = result.value.pokemons.prevOffset;
            fetchPokemons();
        }
    };

    return { pokemons: pokemons, loading, nextPage, prevPage };
};

export default useFetchPokemon;

