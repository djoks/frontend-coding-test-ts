import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import AppBar from '@/components/AppBar.vue'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { Home, PokeDex } from '@/views'

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

const setupTeleportTarget = () => {
  const target = document.createElement('div')
  target.id = 'modals'
  document.body.appendChild(target)
}

vi.mock('@/stores/useMenuStore', () => ({
  default: vi.fn(() => ({
    isVisible: false,
    menuItems: [
      { url: '/', title: 'Home' },
      { url: '/pokedex', title: 'PokeDex' },
    ],
    toggleMenu: vi.fn(),
    closeMenu: vi.fn(),
  })),
}))

describe('AppBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    setupTeleportTarget()
  })

  afterEach(() => {
    const modals = document.getElementById('modals')
    if (modals) {
      document.body.removeChild(modals)
    }
  })

  it('renders correctly', async () => {
    const wrapper = mount(AppBar, {
      global: {
        plugins: [router],
      },
    })
    await flushPromises()
    expect(wrapper.find('nav.bg-gray-800').exists()).toBe(true)
  })

  it('toggles menu visibility on button click', async () => {
    const wrapper = mount(AppBar, {
      global: {
        plugins: [router],
      },
    })
    const button = wrapper.find('button')
    await button.trigger('click')
  })
})
