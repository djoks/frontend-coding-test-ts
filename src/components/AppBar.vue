<template>
  <nav class="bg-gray-800 text-white dark:text-opacity-80">
    <div class="mx-auto px-3 md:px-8">
      <div class="relative flex items-center justify-between h-16">
        <button
          class="md:hidden flex items-center justify-center p-2 rounded-xl border dark:border-opacity-80 outline-none"
          v-on:click="menu.toggleMenu()"
        >
          <menu-icon class="w-8 h-8 object-contain dark:opacity-80" />
        </button>

        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="hidden md:flex space-x-10">
            <app-logo />
            <app-menu />
          </div>

          <teleport to="#modals">
            <menu-drawer />
          </teleport>
        </div>

        <theme-switch />
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import AppLogo from '@/components/AppLogo.vue'
import AppMenu from '@/components/AppMenu.vue'
import MenuDrawer from '@/components/MenuDrawer.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'

import MenuIcon from '@/assets/menu-icon.svg'
import { useMenuStore } from '@/stores'

const menu = useMenuStore()
</script>
