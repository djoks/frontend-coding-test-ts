import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises, VueWrapper } from '@vue/test-utils'
import PokeModal from '@/components/PokeModal.vue'
import { createTestingPinia } from '@pinia/testing'
import usePokeStore from '@/stores/usePokeStore'
import { ref } from 'vue'

const mockPokemonData = {
  pokemon: {
    base_experience: 64,
    height: 7,
    id: 1,
    name: 'bulbasaur',
    order: 1,
    weight: 69,
    status: true,
    message: '',
    abilities: [
      {
        ability: {
          id: null,
          url: 'https://pokeapi.co/api/v2/ability/65/',
          name: 'overgrow',
        },
      },
      {
        ability: {
          id: null,
          url: 'https://pokeapi.co/api/v2/ability/34/',
          name: 'chlorophyll',
        },
      },
    ],
    stats: [
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'hp',
          id: null,
        },
      },
      {
        base_stat: 49,
        effort: 0,
        stat: {
          name: 'attack',
          id: null,
        },
      },
      {
        base_stat: 49,
        effort: 0,
        stat: {
          name: 'defense',
          id: null,
        },
      },
      {
        base_stat: 65,
        effort: 1,
        stat: {
          name: 'special-attack',
          id: null,
        },
      },
      {
        base_stat: 65,
        effort: 0,
        stat: {
          name: 'special-defense',
          id: null,
        },
      },
      {
        base_stat: 45,
        effort: 0,
        stat: {
          name: 'speed',
          id: null,
        },
      },
    ],
    types: [
      {
        slot: 1,
        type: {
          id: null,
          name: 'grass',
        },
      },
      {
        slot: 2,
        type: {
          id: null,
          name: 'poison',
        },
      },
    ],
  },
}

vi.mock('@vue/apollo-composable', () => ({
  useQuery: () => ({
    result: ref(mockPokemonData),
    loading: ref(false),
    error: ref(null),
  }),
}))

describe('PokeModal', () => {
  let wrapper: VueWrapper<any>
  let pokeStore

  beforeEach(() => {
    const testingPinia = createTestingPinia({
      createSpy: vi.fn,
    })

    pokeStore = usePokeStore()
    pokeStore.closeModal = vi.fn()
    pokeStore.pokemon = {
      id: 1,
      name: 'bulbasaur',
      artwork: 'https://picsum.photos/200',
    }

    wrapper = mount(PokeModal, {
      global: {
        plugins: [testingPinia],
      },
    })
  })

  it('renders with data from store', async () => {
    await flushPromises()
    expect(wrapper.text()).toContain('bulbasaur')
    expect(wrapper.find('img').attributes('src')).toBe(
      'https://picsum.photos/200',
    )
    expect(wrapper.text()).toContain('7 CM')
    expect(wrapper.text()).toContain('69 KG')
  })
})
