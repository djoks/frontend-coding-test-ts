<script lang="ts" setup>
const menuItems = [
    { url: '/', title: 'Home' },
    { url: '/pokedex', title: 'PokeDex' }
];
</script>

<template>
    <div class="flex ml-10 items-center align-middle">
        <div class="flex space-x-4">
            <router-link v-for="item in menuItems" :key="item.url" :to="item.url"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                exact-active-class="bg-gray-900 text-white capitalize">{{ item.title }}</router-link>
        </div>
    </div>
</template>