<template>
  <div class="w-screen h-screen overflow-scroll dark:bg-gray-900">
    <app-bar />
    <main class="flex justify-center transition-all delay-50">
      <router-view />
    </main>
    <teleport to="#modals">
      <app-toast v-if="toast.isVisible" />
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue'
import { useToastStore } from '@/stores'
import { AppToast } from '@/components'

const toast = useToastStore()
</script>
