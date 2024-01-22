<template>
  <div v-if="menu.isVisible" class="flex h-full md:hidden">
    <back-drop v-bind:close="menu.closeMenu">
      <div class="animate-in slide-in-from-left-50">
        <div
          v-if="menu.isVisible"
          class="h-full flex flex-col w-72 bg-gray-800 animate-in slide-in-from-left-50"
        >
          <div class="flex justify-center border-b border-gray-700">
            <app-logo size="xl" />
          </div>
          <app-menu />
        </div>
      </div>
    </back-drop>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@/stores'
import AppLogo from '@/components/AppLogo.vue'
import AppMenu from '@/components/AppMenu.vue'
import BackDrop from '@/components/BackDrop.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const menu = useMenuStore()
const route = useRoute()

watch(route, () => {
  menu.closeMenu()
})
</script>
