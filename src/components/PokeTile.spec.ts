import SkeletonLoader from '@/components/loaders/SkeletonLoader.vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import PokeTile from '@/components/PokeTile.vue'
import { createTestingPinia } from '@pinia/testing'

describe('PokeTile', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    const testingPinia = createTestingPinia({
      createSpy: vi.fn,
    })

    wrapper = mount(PokeTile, {
      props: {
        pokemon: {
          id: 1,
          name: 'bulbasaur',
          artwork: 'https://picsum.photos/200',
        },
      },
      global: {
        plugins: [testingPinia],
      },
    })
  })

  it('renders correctly and handles image load', async () => {
    // Check initial state
    expect(wrapper.findComponent(SkeletonLoader).exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe(
      'https://picsum.photos/200',
    )

    // Simulate image loading
    await wrapper.find('img').trigger('load')

    // Check if imageLoaded state is true after image load
    expect(wrapper.vm.imageLoaded).toBe(true)

    // Simulate clicking the card
    await wrapper.trigger('click')
  })
})
