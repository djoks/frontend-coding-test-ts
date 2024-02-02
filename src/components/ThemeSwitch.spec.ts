import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import { createTestingPinia } from '@pinia/testing'
import { useThemeStore } from '@/stores'
import { ref } from 'vue'

describe('ThemeSwitch', () => {
  it('toggles theme correctly', async () => {
    const wrapper = mount(ThemeSwitch, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    })

    const themeStore = useThemeStore()

    expect(themeStore.isDarkMode).toBe(false)

    expect(wrapper.find('svg[role="light-mode-icon"]').exists()).toBe(false)
    expect(wrapper.find('svg[role="dark-mode-icon"]').exists()).toBe(true)

    await wrapper.trigger('click')
    expect(themeStore.toggleTheme).toBeCalledTimes(1)

    expect(themeStore.isDarkMode).toBe(true)

    expect(wrapper.find('svg[role="dark-mode-icon"]').exists()).toBe(false)
    expect(wrapper.find('svg[role="light-mode-icon"]').exists()).toBe(true)

    await wrapper.trigger('click')

    expect(themeStore.isDarkMode).toBe(false)
    expect(wrapper.find('svg[role="light-mode-icon"]').exists()).toBe(false)
    expect(wrapper.find('svg[role="dark-mode-icon"]').exists()).toBe(true)
  })
})
