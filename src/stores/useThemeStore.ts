import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

const useThemeStore = defineStore('useThemeStore', () => {
  const isDarkMode: Ref<boolean> = ref(false)

  const applyTheme = () => {
    if (isDarkMode.value) {
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    isDarkMode.value = savedTheme === 'dark'
    applyTheme()
  }

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    applyTheme()
  }

  return { isDarkMode, initializeTheme, toggleTheme }
})

export default useThemeStore
