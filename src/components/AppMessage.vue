<template>
  <div
    class="inline-flex p-5 text-sm bg-gray-200 dark:bg-gray-700 dark:text-white border border-dotted border-black dark:border-white dark:border-opacity-80 rounded-xl md:max-w-1/2"
  >
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
defineProps<{ message: string }>()
</script>
