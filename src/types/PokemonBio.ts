import Ability from './Ability'
import PokemonType from './PokemonType'
import Stat from './Stat'

export default interface PokemonBio {
  base_experience: number
  height: number
  id: number
  name: string
  order: number
  weight: number
  status: boolean
  message: string
  stats: Stat[]
  types: PokemonType[]
  abilities: Ability[]
}
