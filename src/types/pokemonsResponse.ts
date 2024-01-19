import { Pokemon } from "./pokemon";

export interface PokemonsResponse {
    pokemons: {
        count: number;
        next: boolean;
        previous: boolean;
        nextOffset: number;
        prevOffset: number;
        status: boolean;
        message: string;
        results: Pokemon[];
    };
};
