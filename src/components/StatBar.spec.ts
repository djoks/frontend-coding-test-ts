import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatBar from '@/components/StatBar.vue'

describe('StatBar', () => {
  it('renders correctly with props', () => {
    const stat = { stat: { name: 'speed' }, base_stat: 120, effort: 0 }
    const wrapper = mount(StatBar, {
      props: { stat },
    })

    expect(wrapper.text()).toContain('speed')
    expect(wrapper.text()).toContain('120')
  })
})
