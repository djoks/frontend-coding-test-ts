<template>
  <div class="flex flex-col space-y-1">
    <div class="flex justify-between">
      <skeleton-loader class="w-6 h-4 rounded-full" />
      <skeleton-loader class="w-6 h-4 rounded-full" />
    </div>
    <skeleton-loader class="w-full h-1.5 rounded-full" />
  </div>
</template>

<script lang="ts" setup>
import SkeletonLoader from './SkeletonLoader.vue'
</script>
