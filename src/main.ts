import { createApp, provide, h } from 'vue'
import './styles/main.css'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import { useThemeStore } from '@/stores'
import App from './App.vue'
import initializeRouter from './router'
import apolloClient from './apollo'

const pinia = createPinia()
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

initializeRouter(app)

app.use(pinia)

const themeStore = useThemeStore()
themeStore.initializeTheme()

app.mount('#app')
