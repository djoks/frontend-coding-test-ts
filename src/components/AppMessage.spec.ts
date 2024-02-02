import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppMessage from '@/components/AppMessage.vue'

describe('AppMessage', () => {
  it('renders correctly', () => {
    const message = 'This is just a test message'
    const wrapper = mount(AppMessage, {
      props: { message },
    })

    expect(wrapper.exists()).toBeTruthy()
  })

  it('displays the passed message', () => {
    const message = 'Test message'
    const wrapper = mount(AppMessage, {
      props: { message },
    })

    expect(wrapper.text()).toContain(message)
  })
})
