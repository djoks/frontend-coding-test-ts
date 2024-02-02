import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import LikeButton from '@/components/LikeButton.vue'
import { createTestingPinia } from '@pinia/testing'
import { useToastStore } from '@/stores'
import { ref } from 'vue'

const pokemon = { id: 1, name: 'pikachu', artwork: 'https://picsum.photos/200' }

describe('LikeButton', () => {
  beforeEach(() => {
    createTestingPinia({
      createSpy: vi.fn,
    })
  })

  it('should display the correct icon', async () => {
    const wrapper = mount(LikeButton, {
      props: {
        pokemon,
      },
      global: {
        stubs: {
          HeartIcon: true,
          HeartFilledIcon: true,
        },
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    expect(wrapper.isVisible()).toBe(true)
  })

  it('displays the correct icon based on like state', async () => {
    const wrapper = mount(LikeButton, {
      props: {
        pokemon,
      },
      global: {
        stubs: {
          HeartIcon: true,
          HeartFilledIcon: true,
        },
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })

    expect(wrapper.find('[role="like"]').exists()).toBe(true)
    expect(wrapper.find('[role="dislike"]').exists()).toBe(false)

    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[role="like"]').exists()).toBe(false)
    expect(wrapper.find('[role="dislike"]').exists()).toBe(true)
  })
})
