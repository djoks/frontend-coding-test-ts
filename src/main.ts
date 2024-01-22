import { createApp, provide, h } from 'vue'
import './styles/main.css'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
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
app.mount('#app')
