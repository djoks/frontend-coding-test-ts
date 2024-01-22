<script lang="ts" setup>
import { AppLogo, AppMenu, AppToast } from '@/components';

</script>

<template>
  <nav class="bg-gray-800 text-white">
    <div class="mx-auto px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <app-logo />
          <app-menu />
        </div>
      </div>
    </div>
  </nav>
  <main class="flex justify-center">
    <router-view />
  </main>
</template>
