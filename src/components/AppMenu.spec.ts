import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AppMenu from '@/components/AppMenu.vue'
import { createPinia, setActivePinia } from 'pinia'
import { Home, PokeDex } from '@/views'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/pokedex',
      component: PokeDex,
    },
  ],
})

vi.mock('@/stores/useMenuStore', () => ({
  default: vi.fn(() => ({
    menuItems: [
      { url: '/', title: 'Home' },
      { url: '/pokedex', title: 'PokeDex' },
    ],
  })),
}))

describe('AppMenu', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders menu items from the store', () => {
    const wrapper = mount(AppMenu, {
      global: {
        plugins: [router],
      },
    })

    const menuItems = wrapper.findAll('a[href]')
    expect(menuItems).toHaveLength(2)
  })

  it('displays correct menu item titles', () => {
    const wrapper = mount(AppMenu, {
      global: {
        plugins: [router],
      },
    })
    const menuItems = wrapper.findAll('a[href]')

    expect(menuItems[0].text()).toContain('Home')
    expect(menuItems[1].text()).toContain('PokeDex')
  })
})
