import { MenuItem } from "@/types";
import { defineStore } from "pinia"
import { Ref, ref, watch } from "vue";
import { useRoute } from "vue-router";

const useMenuStore = defineStore('useMenuStore', () => {
    const route = useRoute();
    const isVisible: Ref<boolean> = ref(false);

    const menuItems: Ref<MenuItem[]> = ref([
        { url: '/', title: 'Home', isActive: true },
        { url: '/pokedex', title: 'PokeDex', isActive: false }
    ]);

    const toggleMenu = () => {
        isVisible.value = true;
    }

    const closeMenu = () => {
        isVisible.value = false;
    }

    watch(route, () => {
        closeMenu();
    });

    return { isVisible, menuItems, toggleMenu, closeMenu }

})

export default useMenuStore;
