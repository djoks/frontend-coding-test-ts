<template>
  <div
    class="flex h-screen w-screen fixed inset-0 bg-black bg-opacity-50 z-40 animate-in fade-in"
    v-on:click.self="close()"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ close: () => void }>()
</script>
