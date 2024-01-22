import { createApp, provide, h } from 'vue'
import './styles/main.css'
import App from './App.vue'
import initializeRouter from './router'
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from './apollo';
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
});

initializeRouter(app)

app.use(pinia)
app.mount('#app')
