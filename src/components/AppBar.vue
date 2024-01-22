<template>
    <nav class="bg-gray-800 text-white">
        <div class="mx-auto px-3 md:px-8">
            <div class="relative flex items-center justify-between h-16">
                <button @click="menu.toggleMenu()"
                    class="md:hidden flex items-center justify-center p-2 rounded-xl border outline-none">
                    <menu-icon class="w-8 h-8 object-contain" />
                </button>

                <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="hidden md:flex space-x-10">
                        <app-logo />
                        <app-menu />
                    </div>

                    <teleport to="#modals">
                        <menu-drawer />
                    </teleport>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { AppLogo, AppMenu, MenuDrawer } from '@/components';

import MenuIcon from '@/assets/menu-icon.svg';
import { useMenuStore } from '@/stores';

const menu = useMenuStore();
</script>