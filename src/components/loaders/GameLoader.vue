<template>
  <div
    class="w-full items-center justify-center grid grid-cols-3 gap-1 md:gap-3 md:px-16 md:py-14 mt-5"
  >
    <skeleton-loader
      v-for="n in 9"
      v-bind:key="n"
      class="w-32 h-32 md:h-28 md:w-28 aspect-square rounded-xl"
    />
  </div>
</template>

<script lang="ts" setup>
import SkeletonLoader from './SkeletonLoader.vue'
</script>
