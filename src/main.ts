import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'
import { createPinia } from 'pinia'

const Pinia = createPinia()

createApp(App).use(ElementPlus).use(Pinia).mount('#app')
