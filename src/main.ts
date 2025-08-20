import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { PiniaPersistPlugin } from '@/utils/pinia-persist'

import App from './App.vue'
import './styles/main.css'
import './styles/icons.css'
import './themes/default.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const app = createApp(App)

const pinia = createPinia()
pinia.use(PiniaPersistPlugin)

app.use(pinia)
app.use(router)

app.mount('#app')
