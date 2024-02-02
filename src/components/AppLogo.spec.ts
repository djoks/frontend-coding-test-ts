import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppLogo from '@/components/AppLogo.vue'

describe('AppLogo', () => {
  it('does not render logo image when textOnly is true', () => {
    const wrapper = mount(AppLogo, {
      props: { textOnly: true },
    })

    expect(wrapper.find('svg[role="logo-image"]').exists()).toBeFalsy()
  })

  it('does not render logo type when imageOnly is true', () => {
    const wrapper = mount(AppLogo, {
      props: { imageOnly: true },
    })

    expect(wrapper.find('svg[role="logo-type"]').exists()).toBeFalsy()
  })

  it('applies correct classes based on size prop', () => {
    const wrapper = mount(AppLogo, {
      props: { size: 'xl' },
    })

    expect(wrapper.find('*[role="logo-image"]').classes()).toContain('w-20')
    expect(wrapper.find('*[role="logo-image"]').classes()).toContain('h-20')
    expect(wrapper.find('*[role="logo-type"]').classes()).toContain('w-32')
    expect(wrapper.find('*[role="logo-type"]').classes()).toContain('h-32')
  })
})
