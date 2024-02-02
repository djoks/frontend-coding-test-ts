<template>
  <div class="flex-shrink-0 flex items-center space-x-3">
    <logo v-if="!textOnly" v-bind:class="logoClass" role="logo-image" />
    <logo-type
      v-if="!imageOnly"
      v-bind:class="logoTypeClass"
      class="dark:opacity-80"
      role="logo-type"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Logo from '@/assets/logo.svg'
import LogoType from '@/assets/logo-type.svg'

const props = defineProps({
  textOnly: Boolean,
  imageOnly: Boolean,
  size: String,
})

const logoClass = computed(() => {
  switch (props.size) {
    case 'xl':
      return 'w-20 h-20 object-contain'
    case 'lg':
      return 'w-16 h-16 object-contain'
    default:
      return 'w-10 h-10 object-contain'
  }
})

const logoTypeClass = computed(() => {
  switch (props.size) {
    case 'xl':
      return 'w-32 h-32 object-contain'
    case 'lg':
      return 'w-24 h-24 object-contain'
    default:
      return 'w-24 h-24 object-contain'
  }
})
</script>
