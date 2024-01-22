import Pokemon from './Pokemon'

export default interface PokemonResponse {
  pokemons: {
    count: number
    next: boolean
    previous: boolean
    nextOffset: number
    prevOffset: number
    status: boolean
    message: string
    results: Pokemon[]
  }
}
