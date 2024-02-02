import { describe, it, expect } from 'vitest'
import SkeletonLoader from '@/components/loaders/SkeletonLoader.vue'
import AbilitiesList from '@/components/AbilitiesList.vue'
import { mount } from '@vue/test-utils'

describe('AbilitiesList', () => {
  it('should display skeleton loaders when loading', () => {
    const wrapper = mount(AbilitiesList, {
      props: { loading: true, abilities: [] },
    })

    expect(wrapper.findAllComponents(SkeletonLoader)).toHaveLength(2)
    expect(wrapper.findAll('span[role="ability"]').length).toBe(0)
  })

  it('should display list of abilities when not loading', () => {
    const mockAbilities = [
      { ability: { id: 1, name: 'Ability One' } },
      { ability: { id: 2, name: 'Ability Two' } },
    ]
    const wrapper = mount(AbilitiesList, {
      props: { loading: false, abilities: mockAbilities },
    })

    const abilitySpans = wrapper.findAll('span[role="ability"]')
    expect(abilitySpans).toHaveLength(mockAbilities.length)
    expect(abilitySpans[0].text()).toBe(mockAbilities[0].ability.name)
    expect(abilitySpans[1].text()).toBe(mockAbilities[1].ability.name)
  })
})
