import { ref, watch } from 'vue'

const useLikePokemon = (pokemon: string) => {
  const isLiked = ref(false)

  const getLikedPokemons = (): string[] => {
    return JSON.parse(localStorage.getItem('likedPokemons') || '[]')
  }

  const loadLikes = () => {
    const likedPokemons = getLikedPokemons()
    isLiked.value = likedPokemons.includes(pokemon)
  }

  const saveLikes = (likedPokemons: string[]) => {
    localStorage.setItem('likedPokemons', JSON.stringify(likedPokemons))
  }

  const toggleLike = () => {
    isLiked.value = !isLiked.value
    const likedPokemons = getLikedPokemons()

    if (isLiked.value) {
      likedPokemons.push(pokemon)
    } else {
      const index = likedPokemons.indexOf(pokemon)
      if (index > -1) likedPokemons.splice(index, 1)
    }

    saveLikes(likedPokemons)
  }

  watch(isLiked, (newVal: boolean) => {
    const likedPokemons = JSON.parse(
      localStorage.getItem('likedPokemons') || '[]',
    )

    if (newVal) {
      if (!likedPokemons.includes(pokemon)) likedPokemons.push(pokemon)
    } else {
      const index = likedPokemons.indexOf(pokemon)
      if (index > -1) likedPokemons.splice(index, 1)
    }

    saveLikes(likedPokemons)
  })

  return { isLiked, toggleLike, loadLikes }
}

export default useLikePokemon
