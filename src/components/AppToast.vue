<template>
  <div
    v-if="toast.isVisible"
    v-bind:class="[
      'fixed min-w-28 z-50 flex flex-col space-y-2',
      positionClasses,
    ]"
  >
    <div
      v-for="(message, index) in toast.messages"
      v-bind:key="index"
      class="p-4 bg-black text-white rounded-md fade-in-0"
    >
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useToastStore } from '@/stores'

const toast = useToastStore()

const positionClasses = computed(() => {
  switch (toast.position) {
    case 'top-left':
      return 'top-5 left-5'
    case 'top-center':
      return 'top-5 left-1/2 -translate-x-1/2'
    case 'top-right':
      return 'top-5 right-5'
    case 'bottom-left':
      return 'bottom-5 left-5'
    case 'bottom-right':
      return 'bottom-5 right-5'
    case 'bottom-center':
    default:
      return 'bottom-5 left-1/2 -translate-x-1/2'
  }
})
</script>
