import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AppToast from '@/components/AppToast.vue'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/stores/useToastStore', () => ({
  default: vi.fn(() => ({
    isVisible: true,
    messages: ['Message 1', 'Message 2'],
    position: 'bottom-left',
  })),
}))

describe('AppToast', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders when visible', () => {
    const wrapper = mount(AppToast)
    expect(wrapper.isVisible()).toBe(true)
  })

  it('displays all messages', () => {
    const wrapper = mount(AppToast)
    const messages = wrapper.findAll('.p-4')
    expect(messages).toHaveLength(2)
    expect(messages[0].text()).toContain('Message 1')
    expect(messages[1].text()).toContain('Message 2')
  })

  it('applies correct position classes', () => {
    const wrapper = mount(AppToast)
    expect(wrapper.classes()).toContain('bottom-5')
    expect(wrapper.classes()).toContain('left-5')
  })
})
