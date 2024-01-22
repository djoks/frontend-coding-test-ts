import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';

const useToastStore = defineStore('useToastStore', () => {
    const MAX_DURATION = 5000;

    const isVisible = ref(false);
    const messages: Ref<string[]> = ref([]);
    const position = ref('bottom-center');

    const makeToast = (msg: string, pos: string = 'bottom-center') => {
        messages.value.push(msg);
        isVisible.value = true;
        position.value = pos;

        setTimeout(() => {
            messages.value.shift();
            if (messages.value.length === 0) {
                isVisible.value = false;
            }
        }, MAX_DURATION);
    };

    return { isVisible, messages, position, makeToast };
});

export default useToastStore;
